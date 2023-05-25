// LICENSE is MIT
//
// Copyright (c) 2023
//

/**
 * 热键设置
 */
export interface HotKeys {
    alt?: boolean;  // 是否按下 Alt 键
    ctrl?: boolean;  // 是否按下 Ctrl 键
    meta?: boolean;  // 是否按下 Meta 键
    shift?: boolean;  // 是否按下 Shift 键
    keyCode?: number;  // 按键码，如 65=A
    code: string;  // 按键名称，如 A

    keys?: Array<string>; // 逻辑使用属性，已知按下的键，如 ['alt', 'a']
}


export interface ShortcutKeys {

    /**
     * 直接绑定到控件
     */
    bindKeyDown: (e: KeyboardEvent) => void;

    /**
     * 设置快捷键<br>
     * 监听 keydown(按下)/keyup(弹起) 事件，按下事件被触发时捕捉当前键码，弹起事件被触发时快捷键捕获完成，并且触发 [call] 回调函数。<br>
     * 设置成功后需要使用 closeKeys 关闭事件。
     * @param call 回调函数
     */
    setKeys(call?: (e: HotKeys) => void, keydownCall?: boolean): ShortcutKeys;

    /**
     * 关闭设置快捷键时使用的 keydown/keyup 事件。
     */
    closeKeys(): void;


    /**
     * 监听快捷键
     * @param el 需要监听的控件，允许为 null，可以使用 [bindKeyDown] 函数触发事件
     * @param keys 需要监听的键，如 ctrl+a  ctrl+shift+a  meta+a
     * @param l 需要触发的回调函数
     * @param propagate 是否允许向上传递事件响应，默认为允许
     */
    on(el: any | null, keys: HotKeys | string, l: (e: KeyboardEvent) => void, propagate?: boolean): ShortcutKeys;

    /**
     * 关闭监听快捷键
     * @param el 已监听的控件
     * @param keys 已监听的键
     */
    off(el: any | null, keys?: HotKeys | string): ShortcutKeys;


    new(listeners?: any): ShortcutKeys;
    default: ShortcutKeys;
}

declare const ShortcutKeys: ShortcutKeys;

declare global {
    interface Window {
        ShortcutKeys: ShortcutKeys
    }
}

export default ShortcutKeys;
