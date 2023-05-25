# ShortcutsUtil 使用指南

---

> 键盘快捷键监听和采集

### 快速采集快捷键
``` typescript
    // 导入对象
    import Shortcuts from "ShortcutKeys";


    // 一次性采集快捷键     
    Shortcuts.setKeys(k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
    })
    
    
    // 采集快捷键，采集过程中显示已按下的键     
    Shortcuts.setKeys(k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
    }, true)
    
    
    // 采集完成清除监听的 keydown和keyup 事件
    Shortcuts.closeKeys()
    
```

### 监听快捷键

``` typescript
    // 导入对象
    import Shortcuts from "ShortcutKeys";


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
    import Shortcuts from "ShortcutKeys";

    // 绑定事件，当 [input] 控件接收到组合键时会触发回调
    Shortcuts.on(null, "ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })

```



## 免责声明

Copyright © 2023

- 切勿用于商业及非法用途，否则后果自负。
- 如有侵权请联系删除。
