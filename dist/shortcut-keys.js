class KeyboardShortcut {
    constructor(listeners) {
        this._D = document.body;
        this._listeners = listeners || {};
        if (!this._listeners.keydownHandler) {
            // 如果未设置 keydown 事件回调，使用默认方式
            this._listeners.keydownHandler = (e) => {
                const code = (e.code || e.key),
                    // @ts-ignore
                    keyCode = code.substring(code.startsWith("Key") ? 3 : 0), keys = [];
                e.ctrlKey && keys.push('ctrl');
                e.shiftKey && keys.push('shift');
                e.altKey && keys.push('alt');
                e.metaKey && keys.push('meta');
                keys.push(keyCode.toLowerCase());
                const k = keys.join("+"), l = this._listeners[k];
                if (l) {
                    l(e), l.propagate && e.stopPropagation(), e.preventDefault();
                }
            };
        }
        this.bindKeyDown = this._listeners.keydownHandler;
    }
    /**
     * 设置快捷键<br>
     * 监听 keydown(按下)/keyup(弹起) 事件，按下事件被触发时捕捉当前键码，弹起事件被触发时快捷键捕获完成，并且触发 [call] 回调函数。<br>
     * 设置成功后需要使用 closeKeys 关闭事件。
     * @param el 需要监听的控件，如 HtmleElement  .classname  #id
     * @param call 回调函数
     */
    setKeys(el, call, keydownCall) {
        const element = this._el(el) || this._D;
        let hotKeys = { code: '' }, sequence = {}, isDone = false, doneFunc = (target) => {
            hotKeys.keys = Object.keys(sequence).concat(hotKeys.code);
            call && call(hotKeys, target);
        };
        this._listeners.hotKeysHandler = (e) => {
            const { type } = e, ev = e;
            if ("keydown" === type) {
                isDone = false,
                    hotKeys.alt = e.altKey,
                    hotKeys.shift = e.shiftKey,
                    hotKeys.ctrl = e.ctrlKey,
                    hotKeys.meta = e.metaKey,
                    hotKeys.keyCode = e.keyCode,
                    // @ts-ignore
                    hotKeys.code = e.code.substring(e.code.startsWith("Key") ? 3 : 0);
                ["ctrl", "shift", "alt", "meta"].map(k => {
                    if (ev[k + 'Key'] && !(k in sequence))
                        sequence[k] = Object.keys(sequence).length;
                });
                keydownCall && doneFunc(e.currentTarget);
            }
            else if ("keyup" === type) {
                if (Object.keys(sequence).length == 0)
                    return;
                if (isDone) {
                    doneFunc(e.currentTarget);
                    console.log("新快捷热键为:", hotKeys.keys?.join(" + ")), sequence = {};
                    return;
                }
                isDone = true;
            }
        };
        return this
            ._addEvent(element, "keydown", this._listeners.hotKeysHandler)
            ._addEvent(element, "keyup", this._listeners.hotKeysHandler);
    }
    /**
     * 关闭设置快捷键时使用的 keydown/keyup 事件。
     * @param el 需要取消监听的控件，如 HtmleElement  .classname  #id
     */
    closeKeys(el) {
        const element = this._el(el) || this._D;
        this._listeners.hotKeysHandler && this
            ._removeEvent(element, "keydown", this._listeners.hotKeysHandler).
            _removeEvent(element, "keyup", this._listeners.hotKeysHandler);
        delete this._listeners['hotKeysHandler'];
    }
    /**
     * 监听快捷键
     * @param el 需要监听的控件，允许为 null，可以使用 [bindKeyDown] 函数触发事件，如 HtmleElement  .classname  #id
     * @param keys 需要监听的键，如 ctrl+a  ctrl+shift+a  meta+a
     * @param l 需要触发的回调函数
     * @param propagate 是否允许向上传递事件响应，默认为允许
     */
    on(el, keys, l, propagate) {
        const ks = this._compose(keys);
        this._listeners[ks] = l, this._listeners[ks].propagate = propagate;
        if (el) {
            const element = this._el(el);
            this._addEvent(element, "keydown", this._listeners.keydownHandler);
        }
        return this;
    }
    /**
     * 关闭监听快捷键
     * @param el 已监听的控件，如 HtmleElement  .classname  #id
     * @param keys 已监听的键
     */
    off(el, keys) {
        const ks = this._compose(keys || "");
        if (ks)
            delete this._listeners[ks];
        if (el) {
            const element = this._el(el);
            this._removeEvent(element, "keydown", this._listeners.keydownHandler);
        }
        return this;
    }
    _addEvent(el, type, l) {
        el?.addEventListener(type, l, false);
        return this;
    }
    _removeEvent(el, type, l) {
        el?.removeEventListener(type, l, false);
        return this;
    }
    _compose(keys) {
        // 把快捷键组合为字符串，做为关键词。如: ctrl+a 或 ctrl+shift+a 或 meta+a
        if (typeof (keys) === "string") {
            return keys.toLowerCase();
        }
        const h = [];
        keys.ctrl && h.push('ctrl');
        keys.shift && h.push('shift');
        keys.alt && h.push('alt');
        keys.meta && h.push('meta');
        h.push(keys.code.toLowerCase());
        return h.join("+");
    }
    _el(el) {
        return typeof (el) === "string" ? document.querySelector(el) : el;
    }
}


(function(W, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        W.ShortcutKeys = factory();
    }
})(this, function(){
    const keyboardListeners = {};
    const ShortcutKeys = new KeyboardShortcut(keyboardListeners);
    return ShortcutKeys
})
