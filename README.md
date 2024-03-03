# ShortcutKeys 使用指南

---

> 键盘快捷键监听和采集

### 快速采集快捷键
``` typescript
    // 导入对象
    import Shortcuts from '@epldlnwynn/shortcut-js';


    // 一次性采集快捷键     
    Shortcuts.getHotKeys(k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
        return true
    })
    
    
    // 采集快捷键，采集过程中显示已按下的键     
    Shortcuts.getHotKeys(document.body, k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
        
        return true
    })
    
   
    
```

### 监听快捷键

``` typescript
    // 导入对象
    import Shortcuts from '@epldlnwynn/shortcut-js';


    // 使用对象方式创建
    const keys: HotKeys = {shift:true, code:"A", ctrl:true};
    Shortcuts.on(document.body, keys, e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })
    
    // 直接使用字符串方式
    Shortcuts.on("ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })
    
    // 防止事件向上传递
    Shortcuts.on("ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    }, true)
    
    // 只触发一次事件
    Shortcuts.once("ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    }
    
    // 关闭事情
    Shortcuts.off(document.body)
    // or
    Shortcuts.off("ctrl+shift+a")
    
```



## 许可证

---

MIT © Epldlnwynn 2023
