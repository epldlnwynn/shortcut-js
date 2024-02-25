# ShortcutKeys 使用指南

---

> 键盘快捷键监听和采集

### 快速采集快捷键
``` typescript
    // 导入对象
    import Shortcuts from "ShortcutJs";


    // 一次性采集快捷键     
    Shortcuts.setKeys(document.body, k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
    })
    
    
    // 采集快捷键，采集过程中显示已按下的键     
    Shortcuts.setKeys(document.body, k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
    }, true)
    
    
    // 采集完成清除监听的 keydown和keyup 事件
    Shortcuts.closeKeys(document.body)
    
```

### 监听快捷键

``` typescript
    // 导入对象
    import Shortcuts from "ShortcutJs";


    // 使用对象方式创建
    const keys: HotKeys = {shift:true, code:"A", ctrl:true};
    Shortcuts.on(document.body, keys, e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })
    
    // 直接使用字符串方式
    Shortcuts.on(document.body, "ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })
    
    // 防止事件向上传递
    Shortcuts.on(document.body, "ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    }, true)
    
    // 关闭事情
    Shortcuts.off(document.body, "ctrl+shift+a")
    
```

### 直接绑定到控件

``` html
    <input onKeyDown={Shortcuts.bindKeyDown} type="text" />
```

```typescript
    // 导入对象
    import Shortcuts from "ShortcutJs";

    // 绑定事件，当 [input] 控件接收到组合键时会触发回调
    Shortcuts.on(null, "ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })

```



## 许可证

---

MIT © Epldlnwynn 2023
