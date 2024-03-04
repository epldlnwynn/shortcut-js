# ListenKeys 使用指南

---

> 这是一个简单的 WEB 端快捷键监听和采集工具包


### 安装
```shell
npm i listen-keys

# or 

yarn add listen-keys
```

### 快速采集快捷键
``` typescript
    // 导入对象
    import ListenKeys from 'listen-keys';


    // 一次性采集快捷键     
    ListenKeys.get(k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
        return true
    })
    
    
    // 采集快捷键，采集过程中显示已按下的键     
    ListenKeys.get(document.body, k => {
        console.log('采集快捷键', k.keys?.join(" + "), k)
        
        return true
    })
    
   
    
```

### 监听快捷键

``` typescript
    // 导入对象
    import ListenKeys from 'listen-keys';


    // 使用对象方式创建
    const keys: HotKeys = {shift:true, code:"A", ctrl:true};
    ListenKeys.on(document.body, keys, e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })
    
    // 直接使用字符串方式
    ListenKeys.on("ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    })
    
    // 防止事件向上传递
    ListenKeys.on("ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    }, true)
    
    // 只触发一次事件
    ListenKeys.once("ctrl+shift+a", e => {
        console.log('触发快捷键事件', e.keyCode, e.key, e.code, e)
    }
    
    // 关闭事情
    ListenKeys.off(document.body)
    // or
    ListenKeys.off("ctrl+shift+a")
    
```



## 许可证

---

MIT © Epldlnwynn 2023
