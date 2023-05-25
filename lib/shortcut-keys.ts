
interface HotKeys {
    alt?: boolean;  // 是否按下 Alt 键
    ctrl?: boolean;  // 是否按下 Ctrl 键
    meta?: boolean;  // 是否按下 Meta 键
    shift?: boolean;  // 是否按下 Shift 键
    keyCode?: number;  // 按键码，如 65=A
    code: string;  // 按键名称，如 A

    keys?: Array<string>; // 逻辑使用属性，已知按下的键，如 ['alt', 'a']
};

class KeyboardShortcut {
    readonly _listeners: any;
    readonly _D: HTMLElement = document.body;

    /**
     * 直接绑定到控件
     */
    bindKeyDown: (e: KeyboardEvent) => void;

    constructor(listeners?: any) {
        this._listeners = listeners || {};

        if (!this._listeners.keydownHandler) {
            // 如果未设置 keydown 事件回调，使用默认方式
            this._listeners.keydownHandler = (e: KeyboardEvent) => {
                const code = (e.code || e.key),
                    // @ts-ignore
                    keyCode = code.substring(code.startsWith("Key") ? 3 : 0),
                    keys = [];
                e.ctrlKey && keys.push('ctrl')
                e.shiftKey && keys.push('shift')
                e.altKey && keys.push('alt')
                e.metaKey && keys.push('meta')
                keys.push(keyCode.toLowerCase())

                const k = keys.join("+"), l = this._listeners[k]
                if (l) {
                    l(e),l.propagate && e.stopPropagation(), e.preventDefault()
                }
            }
        }

        this.bindKeyDown = this._listeners.keydownHandler
    }


    /**
     * 设置快捷键<br>
     * 监听 keydown(按下)/keyup(弹起) 事件，按下事件被触发时捕捉当前键码，弹起事件被触发时快捷键捕获完成，并且触发 [call] 回调函数。<br>
     * 设置成功后需要使用 closeKeys 关闭事件。
     * @param el 需要监听的控件，如 HtmleElement  .classname  #id
     * @param call 回调函数
     */
    setKeys(el: any | null, call?: (e: HotKeys) => void, keydownCall?: boolean) {
        const element = this._el(el) || this._D;
        let hotKeys:HotKeys = { code: '' }, sequence: any = {}, isDone = false, doneFunc = () => {
            hotKeys.keys = Object.keys(sequence).concat(hotKeys.code)
            call && call(hotKeys)
        };
        this._listeners.hotKeysHandler = (e: KeyboardEvent) => {
            const { type } = e, ev = e as any;
            if ("keydown" === type) {
                isDone = false,
                    hotKeys.alt = e.altKey,
                    hotKeys.shift = e.shiftKey,
                    hotKeys.ctrl = e.ctrlKey,
                    hotKeys.meta = e.metaKey,
                    hotKeys.keyCode = e.keyCode,
                    // @ts-ignore
                    hotKeys.code = e.code.substring(e.code.startsWith("Key") ? 3 : 0);

                ["ctrl","shift","alt", "meta"].map(k => {
                    if (ev[k + 'Key'] && !(k in sequence)) sequence[k] = Object.keys(sequence).length;
                })

                keydownCall && doneFunc()
            } else if ("keyup" === type) {
                if (Object.keys(sequence).length == 0) return;

                if (isDone) {
                    doneFunc()
                    console.log("新快捷热键为:", hotKeys.keys?.join(" + ")), sequence = {}
                    return;
                }
                isDone = true;
            }
        };

        return this
            ._addEvent(element,"keydown", this._listeners.hotKeysHandler)
            ._addEvent(element,"keyup", this._listeners.hotKeysHandler) as any
    }

    /**
     * 关闭设置快捷键时使用的 keydown/keyup 事件。
     * @param el 需要监听的控件，如 HtmleElement  .classname  #id
     */
    closeKeys(el: any | null) {
        const element = this._el(el) || this._D;
        this._listeners.hotKeysHandler && this
            ._removeEvent(element, "keydown", this._listeners.hotKeysHandler).
            _removeEvent(element, "keyup", this._listeners.hotKeysHandler)
        delete this._listeners['hotKeysHandler']
    }


    /**
     * 监听快捷键
     * @param el 需要监听的控件，允许为 null，可以使用 [bindKeyDown] 函数触发事件
     * @param keys 需要监听的键，如 ctrl+a  ctrl+shift+a  meta+a
     * @param l 需要触发的回调函数
     * @param propagate 是否允许向上传递事件响应，默认为允许
     */
    on(el: any | null, keys: HotKeys | string, l: (e: KeyboardEvent) => void, propagate?: boolean) {
        const ks = this._compose(keys)
        this._listeners[ks] = l, this._listeners[ks].propagate = propagate

        if (el) {
            const element = this._el(el);
            this._addEvent(element, "keydown", this._listeners.keydownHandler);
        }

        return this as any
    }

    /**
     * 关闭监听快捷键
     * @param el 已监听的控件
     * @param keys 已监听的键
     */
    off(el: any | null, keys?: HotKeys | string) {
        const ks = this._compose(keys || "")
        if (ks) delete this._listeners[ks];

        if (el) {
            const element = this._el(el);
            this._removeEvent(element, "keydown", this._listeners.keydownHandler)
        }

        return this as any
    }


    _addEvent(el: HTMLElement, type: string, l: any) {
        el?.addEventListener(type, l, false);
        return this
    }
    _removeEvent(el: HTMLElement, type: string, l: any) {
        el?.removeEventListener(type, l, false);
        return this
    }
    _compose(keys: HotKeys | string): string {
        // 把快捷键组合为字符串，做为关键词。如: ctrl+a 或 ctrl+shift+a 或 meta+a
        if (typeof (keys) === "string") {
            return keys.toLowerCase()
        }

        const h = [];
        keys.ctrl && h.push('ctrl')
        keys.shift && h.push('shift')
        keys.alt && h.push('alt')
        keys.meta && h.push('meta')
        h.push(keys.code.toLowerCase())
        return h.join("+")
    }
    _el(el): HTMLElement {
        return typeof (el) === "string" ? document.querySelector(el) : el;
    }
}


const keyboardListeners: any = { };
const ShortcutKeys = new KeyboardShortcut(keyboardListeners);

// @ts-ignore
if (typeof window !== "undefined") window.ShortcutKeys = ShortcutKeys;

export default ShortcutKeys;
