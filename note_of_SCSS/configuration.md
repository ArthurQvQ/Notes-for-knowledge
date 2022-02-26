##Partials
Sass自动缓存编译后的模板与partials,这样能够显著提升重新编译的速度。

`partials`文件命名以 _ 开头，导入其他文件时不需要带 _, 改文件不会被单独编译

##Encodings 编码格式
Sass首先根据CSS spec判断文件的编码格式，然后是@charset声明，最后是Ruby string encoding；假如都没有检测到，默认使用UTF-8编码。

#CSS Extensions 功能拓展
##Nested Rules 嵌套规则
允许父选择器中嵌套子选择器，如下所示
```scss
.parent{
  .child {
    color: red;
  }
}
```
##Referencing Parent Selectors: &
使用&代表嵌套规则外层的父选择器，编译后的&将会被替换成外层的父选择器;
如果存在多层嵌套，最外层的父选择器会一级一级向下传递;
&必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器;
```scss
#main {
  color: black;
  .test {
    font-weight: bold;
    &-one:hover { 
      color: red;
    }
  }
}
```
编译为
```css
#main {
  color: black; 
}
#main test {
  font-weight: bold; 
}
#main test-one:hover {
  color: red; 
}
```
##Nested Properties属性嵌套
有些CSS属性遵循相同的命名空间，Sass允许将属性嵌套在命名空间中
```scss
.test {
  border: {
    width: 1px;
    type: solid;
    color: aliceblue;
  }
}
```
##Placeholder Selector占位符选择器
Sass支持标准的CSS多行注释`/* */`及单行注释`//`，前者会被完整输出到编译后的CSS文件中，而后者不会
插值语句也可以在多行注释中使用

#SassScript
