## Partials
Sass自动缓存编译后的模板与partials,这样能够显著提升重新编译的速度。

`partials`文件命名以 _ 开头，导入其他文件时不需要带 _, 改文件不会被单独编译

## Encodings 编码格式
Sass首先根据CSS spec判断文件的编码格式，然后是@charset声明，最后是Ruby string encoding；假如都没有检测到，默认使用UTF-8编码。

# CSS Extensions 功能拓展
## Nested Rules 嵌套规则
允许父选择器中嵌套子选择器，如下所示
```scss
.parent{
  .child {
    color: red;
  }
}
```
## Referencing Parent Selectors: &
使用&代表嵌套规则外层的父选择器，编译后的&将会被替换成外层的父选择器;
如果存在多层嵌套，最外层的父选择器会一级一级向下传递;
&必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器;
``` scss
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
``` css
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
## Nested Properties属性嵌套
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
## Placeholder Selector占位符选择器
Sass支持标准的CSS多行注释`/* */`及单行注释`//`，前者会被完整输出到编译后的CSS文件中，而后者不会
插值语句也可以在多行注释中使用

# SassScript
## Interactive Shell
在命令行中输入sass -i，然后输入想要测试的SassScript查看输出结果
``` scss
$ sass -i
>> 1px + 1px +1px
3px
>> #777 + #888
white
```

## Variables $
``` scss
$width: 5em;

#main {
  width: $width
}
```

变量支持块级作用域；在块级作用域中定义的变量只能在块级作用域中使用
在变量后添加 !global可以将局部变量转换为全局变量

## Data Types
* number `1, 2, 10, 10px`
* string `"foo", 'bar', baz`
* color `blue, #04a3f9, rgba(255,0,0,0.5)`
* boolean `true, false`
* null
* list 以空格或逗号作分隔符 1.5em 1em 0 2em, Helvetica, Arial, sans-serif
* map (相当于JS的Map)   (key1: value, key2: value2)
  
### string
SassScript 支持的CSS的两种字符串类型
* quoted strings  "www" 'ccc' 
* unquoted strings   solid bold
在编译css文件时不会改变其类型
当使用 #{} (interpolation)时，有引号的字符串被编译为无引号字符串，便于在mixin中引用选择器名

### Lists
lists 指 Sass如何处理CSS中margin: 10px 15px 0 0 或者 font-face： Helvetica Arial sans-serif 这样通过空格或者逗号分隔的一系列的值

* nth() 访问数组中的某一项
* join() 将多个数组连接在一起
* append() 在数组中添加新值
* @each 指令遍历数组的每一项

数组中可以包含子数组，如 1px 2px, 5px 6px
如果内外两层使用相同的分隔方式，需要用圆括号包裹内层，可以写成 (1px 2px) (5px 6px)

### Maps
map是键值对的集合
``` scss
map: (
  sub-map-1 : (
    key: value
  );
  sub-map-2: (
    key: value
  )
  // ...
)
```

### Colors 
存在问题，不建议使用

## Operations
所有数据类型均支持相等运算 == 或 !=

### Number Operations
SassScript支持数字的加减乘除、取整等运算
* +
* -
* *
* /
* %
这些运算会在不同单位间转换值

* <
* \>
* <=
* \>=

#### Division /
以下三种情况 / 将被视为除法运算的符号
* 值或值的一部分，是变量或者函数的返回值
> $width / 2
> round(1.5) / 2
* 如果值被圆括号包裹
> (500px / 2)
* 如果值是算术表达式的一部分 
> 5px + 8px / 2px

以下是正常CSS分隔符
font: 10px / 8px

如果需要使用变量，同时又要确保 / 不做除法运算，而是完整地编译到CSS文件中，只需要使用 #{} 插值表达式包裹变量

### Color Operations
颜色值运算不常用，建议查看[文档](https://www.sass.hk/docs/#:~:text=6.4.2.%20%E9%A2%9C%E8%89%B2%E5%80%BC%E8%BF%90%E7%AE%97%20(Color%20Operations))

### String Operations
\+ 可用于连接字符串，引号取决于 + 左侧的字符串

在有引号的文本字符串中使用 #{} 插值语句可以添加动态的值
``` scss
p:before {
  content: 'I ate #{5 + 19} pies!';
}
```

### Boolean Operations
``` scss
@debug not true; // false
@debug not false; // true

@debug true and true; // true
@debug true and false; // false

@debug true or false; // true
@debug false or false; // false
```

### Parentheses
``` scss
p {
  width: 1em + (2em * 3);
}
```
## Functions
[函数文档](https://sass-lang.com/documentation/modules/math)

## Interpolation #{}

## Variable Defaults: !default
在变量结尾添加 !default 赋予默认值，不能重复使用，不会覆盖已有值
``` scss
$content: '这是 content 的默认值' !default;
``` 
null视为没有值，可以用 !default 赋予默认值

# @-Rules and Directives
## @import
Sass 拓展了 @import 的功能，允许其导入 SCSS 或 Sass 文件。
被导入的文件将合并编译到同一个 CSS 文件中，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

在以下情况下，@import 仅作为普通的 CSS 语句，不会导入任何 Sass 文件
* 文件扩展名是.css
* 文件名以 http:// 开头
* 文件名是 url()
* @import 包含media queries
  
如果不是上述情况，Sass会寻找文件名相同，扩展名为.scss或.sass的文件并将其导入

### Partials
如果需要导入 SCSS 或者 Sass 文件，但又`不希望将其编译为 CSS`，只需要在`文件名前添加下划线`，这样会告诉 Sass 不要编译这些文件，但导入语句中却不需要添加下划线。

注意，`不可以同时存在添加下划线与未添加下划线的同名文件`，添加下划线的文件将会被忽略。

### Nested @import
大多数情况下，在文件的最外层使用@import
@import 嵌套入CSS的样式或者@media中，与平时的用法相同， 不推荐使用

## @media
允许@media嵌套在css规则内， 允许@media互相嵌套

## @extend
``` scss
// 将parent的样式，继承给child
.child {
  @extend .parent;
  border: 1px solid red;
}
```
### @extend in Directives
Sass不可以将@media外的css规则延伸给指令内层的css
``` scss
// 以下@extend是可行的
@media print {
  .error {
    border: 1px #f00;
  }
  .seriousError {
    @extend .error;
  }
}

// 以下会报错
.error {
  border: 1px #f00;
}

@media print {
  .seriousError {
    // INVALID EXTEND: .error is used outside of the '@media print' directive
    @extend .error;
  }
}
```

## @debug

## @warn
用于某些情况抛出提示

# Control Directives
SassScript 提供了一些基础的控制指令，比如在满足一定条件时引用样式，或者`设定范围重复输出格式`。控制指令是一种高级功能，日常编写过程中并不常用到

## @if @else if @else
``` scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

## @for $item from int_1 to int_2 {}
不包含int_2的循环

## @for $item from int_1 through int_2 {}
包含int_2的循环

`int必须为整数`

## @each
@each $item in <list> {}
``` scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// 用于多个参数时
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

// 用于map时
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

## @while
``` scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

## @mixin
``` scss
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
h1 { @include sexy-border(blue, 2in); }

// 使用... 来将参数视为值列表处理
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

# Function Directive
Sass支持自定义函数
``` scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  // 需要调用 @return 输出结果
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

# Output Style
Sass 提供了四种输出格式，可以通过 :style option 选项设定，或者在命令行中使用 --style 选项。
``` scss
// nested
#main {
  color: #fff;
  background-color: #000; }
  #main p {
    width: 10em; }

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline; }

// expanded
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline;
}

// compact
#main { color: #fff; background-color: #000; }
#main p { width: 10em; }

.huge { font-size: 10em; font-weight: bold; text-decoration: underline; }

// compressed
#main{color:#fff;background-color:#000}#main p{width:10em}.huge{font-size:10em;font-weight:bold;text-decoration:underline}
```