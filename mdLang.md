# Markdown Language
we can use # for different level title, for example, ## for second title
>## second title
### `third title`
*is a dot of list
* like this
* and this

**ltalic

*这是斜体*  _这也是斜体_

**这是粗体**  __这也是粗体__

~~这是删除体文字~~

>为什么叫行内代码


这是链接的示例

[Markdown Preview Enhanced （插件文档）](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/)

这是图片的示例

![我不知道这有什么用](https://avatars.githubusercontent.com/u/95906252)
 
使用插件paste image ,加快捷键 ctrl+alt+v  ，可以粘贴截图内容

![](./asset/2022-01-05-09-54-05.png)

代码块展示
```javascript {.line-numbers}
import JQuery form {JQ}
const developer = 'arthur'
kickArthur = (param) => {
    // 感觉语法高亮的功能不是特别舒服
    return `${param}developer`
}

```

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

{~~这个是要被替换的内容~>这是替换出来的内容~~}