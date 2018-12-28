# Interview

## 基本类型

string、number、boolean、null、undefined、Symbol

除了null和undefined之外，所有基本类型都有包裹这个基本类型值的等价对象：

String、Number、Boolean、Symbol，对象的valueOf()方法返回基本类型值

## 浮点数的坑

![float-hole](http://reyshieh.com/assets/float-hole.png)

想必以上的输出程序员在编写代码的时候都见过，这就是浮点数运算的锅。

在JavaScript中，浮点数是采用IEEE-754格式定义的，即双精度格式，每个浮点数占**64位**，包括整数。

其中，第1位为**标记位**，表示正数或负数。中间11位表示**指数**，允许指数最大到**2047**（0-2047），如果指数部分的值在0到2047之间（不含两个端点），那么有效数字的第一位默认总是1^?^，不保存在64位浮点数之中，也就是，有效数字这时总是**1.xx…xx**的形式，其中**xx…xx**的部分保存在64位浮点数之中，最长可能为52位，因此，**JavaScript提供的有效数字最长为53个二进制位**。剩下52位是**尾数(有效数字)**，也就是允许精度到52位以后。因此，不难看出，Javascript中是存在+0和-0的，Infinity和NaN也被编码为浮点数，指数取最大值，尾数为0，它表示为正无穷或负无限。

```
(-1)^符号位 * 1.xx...xx * 2^指数部分
```

该公式是正常情况下(指数部分在0到2047之间)，一个数在JavaScript内部实际的表示形式

对于不理解浮点数在计算机中是如何表示，可以通过[IEEE754 64-bit](http://www.binaryconvert.com/convert_double.html)可视化界面来帮助理解~

精度最多只能到53个二进制位，意味着，绝对值小于2的53次方的整数，即-2^53^到2^53^，都可以精确表示

```js
Math.pow(2, 53)
// 9007199254740992
 
Math.pow(2, 53) + 1
// 9007199254740992

Math.pow(2, 53) + 2
// 9007199254740994

Math.pow(2, 53) + 3
// 9007199254740996

Math.pow(2, 53) + 4
// 9007199254740996
```

由于2的53次方是一个16位的十进制数值，所以，换句话说，**JavaScript对15位的十进制数都可以精确处理**

```js
Math.pow(2, 53)
// 9007199254740992

// 多出的三个有效数字，将无法保存
9007199254740992111
// 9007199254740992000
```

JavaScript在几种情况下，**会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示**：

1. 小数点前的数字多与21位

   ```js
   1234567890123456789012
   // 1.2345678901234568e+21
   
   123456789012345678901
   // 123456789012345680000
   ```

2. 小数点后的零多余5个

   ```js
   // 小数点后紧跟5个以上的零，
   // 就自动转为科学计数法
   0.0000003 // 3e-7
   
   // 否则，就保持原来的字面形式
   0.000003 // 0.000003
   ```

指数用11个二进制位，分成一半负数，[0,1022]表示负数(阶码对应为-1023~-1)，[1024-2047]表示正数(阶码对应为1~1024)。1023(01111111111)实际代码阶码为0，也就是JavaScript能表示的数值范围为2^1024^到2^-1023^（开区间）之间，超出的数无法表示。

> 浮点数的阶码是用移码计算的，即对真值补码的符号位取反
>
> 正整数的符号位0，反码和补码等同于原码
>
> 负整数符号位固定为1，原码，反码和补码的表示都不相同，有原码表示法变成反码和补码的规则如下：
>
> 1. 原码符号位为1不变，整数的每一位二进制数位求反得反码
> 2. 反码符号位为1不变，反码数值位最低位加1得补码

实际公式为:

```js
V = (-1)^S * 2^(E-1023) * (1.M)
// S:符号位
// E: 指数位
// M: 尾数位，超出的部分自动进一舍零

// 双精度浮点数，阶码的计算 E-1023,其中1023是由移码计算得来，即符号位为0，其他位数都为1，
// 因此不难看出，单精度浮点数，阶码的计算则为 E-2^7 === E-127
// 所以，单精度浮点数的表示公式为
// V = (-1)^S * 2^(E-127) * (1.M)
```

如果一个数大于等于2的1024次方，那么就会发生"正向溢出"，即JavaScript无法表示这么大的数，这时会返回Infinity

```js
Math.pow(2, 1024) // Infinity
```

如果一个数小于2的-1075次方（指数部分最小值-1023，再加上小数部分的52位），那么就是"负向溢出"，即JavaScript无法表示这么小的数，这时会直接返回0

```js
Math.pow(2, -1075) // 0
```

**特殊数值**

- 正零和负零

  在正常的场合，正零和负零都会被当做正常的0

  只有在把+0和-0当做分母，返回的值才是不相等的

  ```js
  (1 / +0) === (1 / -0) // false, +Infinity和-Infinity
  ```

- NaN

  主要出现在字符串解析成数字出错的场合

  ```js
  5 - 'x' // NaN
  ```

  一些数学函数的运算结果也会出现NaN，如Math.acos(2)，Math.log(-1)，Math.sqrt(-1)等

  **0除以0也会得到NaN**

  NaN不是独立的数据类型，而是一个特殊数据值，**它的数据类型依然属于Number**，使用typeof运算符可以看得出来

  ```js
  typeof NaN // 'number'
  ```

  NaN不等于任何值，包括它本身

  ```js
  NaN === NaN // false
  ```

  数组的**indexOf**方法内部使用的是严格相等运算符，所以该方法对NaN不成立

  ```js
  [NaN].indexOf(NaN) // -1
  ```

  NaN在布尔运算时被当做false

  ```js
  Boolean(NaN) // false
  ```

- Infinity

  “无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非0数值除以0，得到Infinity

  ```js
  Math.pow(2, 1024) // Infinity
  
  0 / 0 // NaN
  1 / 0 // Infinity
  ```

  Infinity大于一切数值(除了NaN)，-Infinity小于一切数值(除了NaN)

  ```js
  Infinity > 1000 // true
  -Infinity < -1000 // true
  ```

  Infinity与NaN比较，总是返回false

  ```js
  Infinity > NaN // false
  -Infinity > NaN // false
  ```

  0乘以Infinity，返回NaN；0除以Infinity，返回0；Infinity除以0，返回Infinity

  ```js
  0 * Infinity // NaN
  0 / Infinity // 0
  Infinity / 0 // Infinity
  ```

  Infinity加或乘以Infinity，返回的还是Infinity

  ```js
  Infinity + Infinity // Infinity
  Infinity * Infinity // Infinity
  ```

  Infinity减或除以Infinify，得到NaN

  ```js
  Infinity - Infinity // NaN
  Infinity / Infinity // NaN
  ```

  Infinity与null计算时，**null会转成0**，等同于与0计算

  ```js
  null * Infinity // NaN
  null / Infinity // 0
  Infinity / null // Infinity
  ```

  Infinity与undefined计算都是NaN

  ```js
  undefined + Infinity // NaN
  undefined - Infinity // NaN
  undefined * Infinity // NaN
  undefined / Infinity // NaN
  Infinity / undefined // NaN
  ```

推荐处理浮点数可以使用像[mathjs](https://github.com/josdejong/mathjs)这样的库。

> ?: 为什么指数部分的值在0到2047之间（不含两个端点），那么有效数字的第一位默认总是1？
>
> 在计算机中，二进制数值都会转换成对应的科学计数法表示。如4.5，转换成二进制是100.1，特学技术法表示是1.001 * 2^2，因此，不难看出，第1位，在非零情况下，都为1.

资料：https://github.com/camsong/blog/issues/9

## 值类型和引用类型

值类型（string、number、boolean、null、undefined）

- 占用空间固定，保存在**栈**中（当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁。因此，所有在方法中定义的变量都是放在栈内存中的；**栈中存储的是基础变量以及一些对象的引用变量，基础变量的值是存储在栈中，而引用变量存储在栈中的是指向堆中的数组或者对象的地址，因此，修改引用类型总会影响到其他指向这个地址的引用变量**）
- **保存和复制的是值本身**
- 使用typeof检测数据的类型
- 基本类型数据是值类型

引用类型（object、array、function）

- 占用空间不固定，保存在**堆**中（当在程序中创建一个对象时，对象将被保存到运行时数据区中，以便反复利用，这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量引用，则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用时，系统的垃圾回收机制才会回收它）
- **保存与复制的是指向对象的一个指针**
- 使用instanceof检测数据类型
- 使用new()方法构造出的对象是引用型

### 纯函数

对于一个函数，给定一个输入，返回一个唯一的输出。除此之外，不会对外部环境产生任何附带影响，称为纯函数。所有函数内部定义的变量在函数返回之后都被垃圾回收掉。

如果函数的输入是对象(Array、Function、Object)，虽然还是按值传递，但对于对象来说，应该说是**按共享传递**比较合适。实际传递的是该对象的副本，因此修改了该副本中某个值，还是会影响到对象本身。但如果对该对象直接替换，会导致找不到原值，而不会修改原值。

e.g.

```js
// 非纯函数
function changeAgelmpure(person) {
    person.age = 25;
    return person;
}
var reyshieh = {
    name: 'reyshieh',
    age: 26
};
var changedRey = changeAgelmpure(reyshieh);
console.log(reyshieh); // {name: 'reyshieh', age: 25}
console.log(changedRey); // {name: 'reyshieh', age: 25}

// 纯函数
function changeAgeImpure(person) {
    var newPersonObj = JSON.parse(JSON.stringify(person));
    newPersonObj.age = 25;
    return newPersonObj;
}
var reyshieh = {
    name: 'reyshieh',
    age: 26
};
var changedRey = changeAgelmpure(reyshieh);
console.log(reyshieh); // {name: 'reyshieh', age: 26}
console.log(changedRey); // {name: 'reyshieh', age: 25}
```

```js
function changeAgeAndReference(person) {
    person.age = 25; // 此时还没有修改对象本身，修改属性后，影响原来的对象
    person = {
        name: 'John',
        age: 50
    }; // 修改了对象本身，不再具有引用关系
    
    return person;
}
var personObj1 = {
    name: 'Alex',
    age: 30
};
var personObj2 = changeAgeAndReference(personObj1);
console.log(personObj1); // -> ? {name: "Alex", age: 25}
console.log(personObj2); // -> ? {name: "John", age: 50}
```

## 强转换

### 隐式转换为布尔："truthy"和"falsy"

当转换布尔值时，任何值都可以被使用。以下这些值会被转换为false：

- undefined，null
- Boolean：false
- Number：-0，+0，NaN
- String：''

所有其他值都会认为是true

被转换成'false'的值称为falsy；被转换成'true'的值称为truthy

### 典型运算符操作结果

```js
// 比较
[] == ![] // true 左边取toString取到空字符串再转数字得到0，右边被!强制转为boolean得到false再转数字
NaN !== NaN // true
false == []; // true boolean转数字，数组取toString得到空字符串再转数字
false == {}; // false boolean转数字，对象取valueOf得到空对象"[object Object]"
"" == []; // true 字符串转数字，数组取toString得到空字符串再转数字
"" == {}; // false 字符串转数字，对象取valueOf得到空对象"[object Object]"
"" == [null]; // true 数组取toString得到空字符串，转数字后得到0
0 == '\n'; // true '\n'即为''，转数字后得到0
0 == []; // true
0 == {}; // false
1 == true // true
2 == true // false
"2" == true // flase

null == false; // false，null和undefined比较为true，null和1或0比较都为false
null == true; // false
null == undefined; // true
null > 0 // false
null < 0 // false
null == 0 // false
null >= 0 // true

// 加法
true + 1 // 1
undefined + 1 // NaN

let obj = {};

{} + 1 // 1，这里的 {} 被当成了代码块
{ 1 + 1 } + 1 // 1

obj + 1 // [object Object]1
{} + {} // Chrome 上显示 "[object Object][object Object]"，Firefox 显示 NaN

[] + {} // [object Object] []转为空字符串，{}转为字符串'[object Object]'
[] + a // [object Object]
+ [] // 等价于 + "" => 0
{} + [] // 0 {}被当成空而无作用，+[]被强制转型为数字
a + [] // [object Object]

[2,3] + [1,2] // '2,31,2'
[2] + 1 // '21'
[2] + (-1) // "2-1"

// 减法或其他操作，无法进行字符串连接，因此在错误的字符串格式下返回 NaN
[2] - 1 // 1
[2,3] - 1 // NaN
{} - 1 // -1
```

### JSON的字符串化

JSON.stringify将值序列化为JOSN字符串，和ToString有关，但并不等于强制转型

- 若为简单值，字符串、数字、boolean、null，规则和ToString相同
- 若字符串中有非法值undefined、function、symbol、具有循环的对象，JSON.stringify会自动忽略这些非法值或抛出异常。若某个元素的值为非法值，则会自动转为null；若其中的一个属性为非法值(如function)，会排除这个属性
- 若待转换的对象中带有**toJSON方法**，会优先调用该方法，并将该方法返回的值作为序列化的结果

```js
JSON.stringify(undefined) // undefined，忽略非法值
JSON.stringify(function() {}) // undefined，忽略非法值
JSON.stringify(Symbol()) // undefined，忽略非法值
JSON.stringify([1, 2, 3, undefined]) // "[1,2,3,null]"，非法值以 null 取代
JSON.stringify({ a: 2, b: function() {}}) // "{"a":2}"，忽略非法屬性
```

```js
// 循环错误
const a = { someProperty: 'Jack' };
const b = { anotherProperty: a };
a.b = b;
JSON.stringify(a) // Uncaught TypeError: Converting circular structure to JSON
JSON.stringify(b) // Uncaught TypeError: Converting circular structure to JSON
```

toJSON e.g.

```js
const someObj = {
  a: 2,
  b: function() {}, // 非法!
  toJSON: function() {
    return {
      a: 3, // 序列化過程只包含 a 屬性
    }
  },
}

JSON.stringify(someObj); // "{"a":3}"
```

用toJSON解决循环错误

```js
const a = {
    someProperty: 'Jack',
    toJSON: function() {
        return {
            prompt: 'Hello World'
        }
    },
};

const b = {
    anotherProperty: a,
    toJSON: function() {
        return {
            prompt: 'Hello World'
        }
    },
};

a.b = b;

// 序列化成功！不會被報錯了！
JSON.stringify(a) // "{"prompt":"Hello World"}"
JSON.stringify(b) // "{"prompt":"Hello World"}"
```

JSON.stringify可传入第二个选择性参数(取代器)来过滤需要序列化的属性

- 取代器是数组时，数组内的元素为指定要包含的属性名称。

  ```js
  // e.g.
  const someObj = {
      a: 2,
      b: function() {},
  }
  
  JSON.stringify(someObj, ['a']); // "{"a": 2}"
  ```

- 取代器是函数时，函数是用来返回需要做序列化的属性的值。

  ```js
  const someObj = {
    a: 2,
    b: function() {},
  }
  
  JSON.stringify(someObj, function(key, value) {
    if (key !== 'b') {
      return value
    }
  });
  
  // "{"a":2}"
  ```

### ToNumber

规则

- undefined -> NaN

- null -> +0 即0

- boolean true -> 1 false -> +0 即0

- string -> NaN

- **object**，尤其重要

  - **若有定义valueOf方法，优先使用valueOf取基本类型值**
  - **若没有valueOF方法，则改用toString方法取得基本类型值，再用ToNumber转为数字**
  - **Object.create(null)建立的null没有valueOf或toString方法**

  ```js
  const a = {
    name: 'Apple',
    valueOf: function() {
      return '999'
    }
  }
  
  Number(a) // 999
  ```

### 类型转换技巧

- 使用一元正/负运算符转换

  ```js
  +('123') // 123
  -('-123') // 123
  
  // 用该方式将日期转换为时间戳，等价于Date.now()或.getTime()
  const timestamp = +new Date();
  timestamp // 1539236301262
  ```

- 使用一元位元否定运算符(bitwise not, ~)

  该运算符用来进行二进制的补码运算(~x => -(x+1), 如 ~42 => -43)

  ```js
  const str = 'Hello World';
  
  function find(target) {
    const result = str.indexOf(target);
  
    if (~result) {
      console.log(`找到了，索引值原本是 ${result}，被轉為 ${~result}`);
    } else {
      console.log(`找不到，回傳結果原本是 ${result}，被轉為 ${~result}`);
    }
  }
  
  find('llo'); // 找到了，索引值原本是 2，被轉為 -3
  find('abc') // 找不到，回傳結果原本是 -1，被轉為 0
  ```

- 使用~~将浮点数转为整数

  其运算方式与运行两次~操作，同时截断小数的结果，类似!!的真假判断两次

  使用**x | 0也可以得到与~~的结果相同**，区别在于 ~~运算符的优先级更高，遇到四则运算时不用包括号

  它与**Math.floor()运算的结果不同**

  ```js
  Math.floor(-29.8) // -30
  ~~-29.8 // -29
  -29.8 | 0 // -29
  ```

### 关系比较

规则

1. 若一个是null，另一个是undefined，返回true
2. 若一个是null，另一个是非undefined和null，返回false

3. 若两个运算符都是字符串，直接依照字母顺序比较

4. 除了1，2，3点之外的状况，遵循以下

- **先使用ToPrimitive做强制转型-先使用valueOf取得值，再用toString方法转为字符串**
- **若有任一值转型后的结果不是字符串，就是用ToNumber的规则转为数字，来做数字上的比较**

e.g.

```js
const a = [12];
const b = ['13'];

a < b // true, '12' < '13'
a > b // false
```

下例比较有意思

```js
const a = { b: 12 };
const b = { b: 13 };

a < b // false, '[object Object]' < '[object Object]'
a > b // false，其实是比较b < a， '[object Object]' < '[object Object]'
a == b // false，其实是比较两实例的引用

// 以下两个难以理解
a >= b // true，其实是!(b > a)，因此!false得到true
a <= b // true
```

### ==、===、Object.is比较

| x                   | y                   | `==`    | `===`   | `Object.is` |
| ------------------- | ------------------- | ------- | ------- | ----------- |
| `undefined`         | `undefined`         | `true`  | `true`  | `true`      |
| `null`              | `null`              | `true`  | `true`  | `true`      |
| `true`              | `true`              | `true`  | `true`  | `true`      |
| `false`             | `false`             | `true`  | `true`  | `true`      |
| `"foo"`             | `"foo"`             | `true`  | `true`  | `true`      |
| `{ foo: "bar" }`    | `x`                 | `true`  | `true`  | `true`      |
| `0`                 | `0`                 | `true`  | `true`  | `true`      |
| `+0`                | `-0`                | `true`  | `true`  | `false`     |
| `0`                 | `false`             | `true`  | `false` | `false`     |
| `""`                | `false`             | `true`  | `false` | `false`     |
| `""`                | `0`                 | `true`  | `false` | `false`     |
| `"0"`               | `0`                 | `true`  | `false` | `false`     |
| `"17"`              | `17`                | `true`  | `false` | `false`     |
| `[1,2]`             | `"1,2"`             | `true`  | `false` | `false`     |
| `new String("foo")` | `"foo"`             | `true`  | `false` | `false`     |
| `null`              | `undefined`         | `true`  | `false` | `false`     |
| `null`              | `false`             | `false` | `false` | `false`     |
| `undefined`         | `false`             | `false` | `false` | `false`     |
| `{ foo: "bar" }`    | `{ foo: "bar" }`    | `false` | `false` | `false`     |
| `new String("foo")` | `new String("foo")` | `false` | `false` | `false`     |
| `0`                 | `null`              | `false` | `false` | `false`     |
| `0`                 | `NaN`               | `false` | `false` | `false`     |
| `"foo"`             | `NaN`               | `false` | `false` | `false`     |
| `NaN`               | `NaN`               | `false` | `false` | `true`      |

## typeof

返回一个字符串，来表示数据的类型

| 数据类型                             | Type                     |
| ------------------------------------ | ------------------------ |
| Undefined                            | "undefined"              |
| Null                                 | "object"                 |
| 布尔值                               | "boolean"                |
| 数值                                 | "number"                 |
| 字符串                               | "string"                 |
| Symbol                               | "symbol"                 |
| 宿主对象（JS环境提供的，比如浏览器） | Implementation-dependent |
| 函数对象                             | "function"               |
| 任何其他对象                         | "object"                 |

来几个e.g.

```js
// 例1
var y = 1, x = y = typeof x;
x;//"undefined"
// 表达式是从右往左的，x由于变量提升，类型不是null，而是undefined，所以x=y=”undefined”

// 例2
(function f(f){
  return typeof f();//"number"
})(function(){ return 1; });
// 传入的参数为f也就是function(){ return 1; }这个函数。通过f()执行后，得到结果1，所以typeof 1返回”number”

// 例3
var foo = {
  bar: function() { return this.baz; },
  baz: 1
};
(function(){
  return typeof arguments[0]();//"undefined"
})(foo.bar);
// this永远指向函数执行时的上下文，而不是定义时的（ES6的箭头函数不算）。当arguments执行时，this已经指向了window对象。所以是”undefined”

// 例4
var foo = {
  bar: function(){ return this.baz; },
  baz: 1
}
typeof (f = foo.bar)();//undefined
// 同样是this的指向问题

// 例5
var f = (function f(){ return "1"; }, function g(){ return 2; })();
typeof f;//"number"
// 分组选择符，举例
// var a = (1,2,3);
// document.write(a);//3,会以最后一个为准
// 因此上例实际是返回第二个函数

// 例6
var x = 1;
if (function f(){}) {
  x += typeof f;
}
x;//"1undefined"
// 这是一个javascript语言规范上的问题，在条件判断中加入函数声明。这个声明语句本身没有错，也会返回true，但是javascript引擎在搜索的时候却找不到该函数。所以结果为”1undefined”

// 例7
(function(foo){
  return typeof foo.bar;
})({ foo: { bar: 1 } }); // "undefined"
// 形参的foo指向的是{ foo: { bar: 1 } }这个整体
```

typeof在两种情况下会返回"undefined"

- 变量没有被声明
- 变量的值是`undefined`

e.g.

```js
typeof undeclareVariable === "undefined" // true

var declareVariable;
typeof declareVariable // 'undefined'

typeof undefined // 'undefined'
```

但如果在一个未声明的变量上，直接判断当前值是否是undefined，就会抛出异常，因为只有`typeof`才可以正常检测未声明的变量的同时还不报错

e.g.

```js
undeclareVariable === undefined
// ReferenceError: undeclareVariable is not defined
```

未初始化的变量，没有被传入参数的形参，不存在的属性，都不会出现上面的问题，因为它们总是可访问的，值总是`undefined`

```js
var declaredVariable;
declaredVariable === undefined; // true

(function (x) { return x === undefined }())
// true

({}).foo === undefined
// true
```

可以使用Object.prototype.toString来判断类型，判断的结果是准确的

```js
Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
```

## instanceof

伪代码

```js
function new_instance_of(leftValue, rightValue) {
    let rightProto = rightValue.prototype; // 取右表达式的prototype值
    leftValue = leftValue.__proto__;
    
    while (true) {
		if (leftValue === null) {
            return false;
		}
		if (leftValue === rightValue) {
            return true;
		}
		leftValue = leftValue.__proto__;
	}
}
```

实际上，instanceof的主要实现原理就是对__ proto __ 和prototype的理解，下面有对这两个做分析

### __ proto __和prototype

-  方法(Function)是对象，方法的原型(Function.prototype)是对象。因此无论是方法还是方法的原型，都具有对象共有的特征
- 对象在创建实例后，实例需要和对象构造函数原型产生引用，他们之间是通过__ proto __隐式指向的，这样实例就能够访问在构造函数原型中定义的属性和方法
- 原型对象也有一个属性，constructor，这个属性包含一个指针，指回原构造函数

引用一张关系图

![prototype-and-proto](http://reyshieh.com/assets/prototype-and-proto.png)

解释：

1. 构造函数Foo() -- 构造函数的原型属性Foo.prototype指向了原型对象，在原型对象里共有的方法，所有构造函数声明的实例(如f1，f2)都可以共享方法

2. 原型对象Foo.prototype — 保存着实例共享的方法，有一个指针constructor指回构造函数

3. 实例 — f1和f2是Foo对象的两个实例，这两个对象也有属性__ proto __，指向构造函数的原型对象，这样就可以像1中所述访问原型对象的所有方法

4. 构造函数Foo()除了是方法，还是对象，也同样有__ proto __属性，会指向它的构造函数的原型对象，也就是Function。

   因此，__ proto __ 指向了Function.prototype

5. 逐级往上指向，再指向Object.prototype，最后Object.prototype的 __ proto __ 属性指向null

由该图，可以推断出

```js
Object instanceof Object // true，由图可知，Object的prototype属性是Object.prototype，而由于Object本身是一个函数，由Function所创建，所以Object.__proto__的值是Function.prototype，而Function.prototype的__proto__属性是Object.prototype，所以可以判断出为true
Function instanceof Function // true
Function instanceof Object // true，由图可知，Foo函数的prototype属性时Foo.prototype，而Foo的__proto__属性是Function.prototype，而Function.prototype的__proto__属性并没有指向Foo.prototype，因此可以判断出为false
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
```

最后总结：

- 实例有属性__ proto __，指向该实例对应对象的构造函数的原型

- 对象有属性__ proto __，还有属性prototype，prototype指向该对象的原型对象

  __ proto __指向对象构造函数的构造函数的原型

## this、this(箭头函数)、call、apply、bind

### this

永远指向最后调用它的那个对象，或理解为***运行时***所在的对象

### this(箭头函数)

总是指向***定义时***所在的对象，或理解为指向**所在函数**运行时的this。有这么一句话："箭头函数没有this绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则this绑定的是最后一层非箭头函数的this，否则，this为undefined"。

### call

改变this的指向

```js
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

### apply

改变this的指向

```js
fun.apply(thisArg, [argsArray])
```

### bind

改变this的指向，创建一个新的函数，但需要手动去调用

e.g.

```js
// demo1
var a = {
    name: 'A',
    fn: function () {
        console.log(this)
    },
    fnArrow: () => console.log(this)
}
a.fn()  // {name: "A", fn: ƒ, fnArrow: ƒ}
a.fnArrow() // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …} 因为箭头函数指向定义时的对象，此时定义在window，指向window
a.fn.call({name: 'B'})  // {name: "B"}
a.fnArrow.call({name: 'B'}) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …} 因为箭头函数指向定义时的对象，此时定义在window，指向window
var fn1 = a.fn
fn1()  // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
var fn2 = a.fnArrow
fn2() // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …} 因为箭头函数指向定义时的对象，此时定义在window，指向window

// demo2
function fn() {
    console.log('real', this)
    var arr = [1, 2, 3]
    // 普通 JS
    arr.map(function (item) {
        console.log('js', this)
        return item + 1
    })
    // 箭头函数
    arr.map(item => {
        console.log('es6', this)
        return item + 1
    })
}
fn.call({a: 100})
// 输出如下：
//    real {a: 100}
//    js Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//    js Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//    js Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//    es6 {a: 100}
//    es6 {a: 100}
//    es6 {a: 100}
fn()
// 输出如下：
//	real Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//	js Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//	js Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//	js Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//	es6 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//	es6 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//	es6 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// 因为 fn函数只有运行后，箭头函数才会按照定义生成this指向，因此此时箭头函数定义时的所在对象恰好是fn运行时所在的对象。
// 上例中的两个输出，第一个输出，因为fn运行时所指向的对象是{a: 100},因此箭头函数的定义时指向也为{a: 100};第二个输出，因为fn运行时所指向的对象是window，因此箭头函数的定义时指向也为window

// demo3
function foo() {
  return () => {
    return () => {
      return () => {
        console.log("id:", this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()();
var t2 = f().call({id: 3})();
var t3 = f()().call({id: 4});

// 输出：
// id: 1
// id: 1
// id: 1
// 原因很简单 因为f在运行时已经确定了此时的箭头函数的定义时指向，接下来的运行时的变化将不会影响this的指向

// this 对象
var bob = {
    _name: "Bob",
    _friends: [],
    printFriends() {
        this._friends.forEach(f => console.log(this._name + " knows " + f));
    }
}

// arguments 对象
function square() {
    let example = () => {
        let numbers = [];
        for (let number of arguments) {
            numbers.push(number * number);
        }
        return numbers;
    };
    return example();
};

square(2, 4, 7.5, 8); // returns: [4, 16, 56,25, 64]

// demo4
var name = "windowsName";

var a = {
    name : "Cherry",

    func1: function () {
        console.log(this.name)     
    },

    func2: function () {
        setTimeout( () => {
            this.func1()
        },100);
    }

};

a.func2()     // Cherry
var b = func2;
b(); // Uncaught TypeError: this.func1 is not a function
```

## 闭包

闭包是能读取其他函数内部变量的函数

闭包的用处：

- 可以读取函数内部的变量
- 让变量的值始终在内存中

```js
function init() {
    var name = 'Mozilla'; // name 是一个被init创建的局部变量
    function displayName() { // displayName()是内部函数，一个闭包
        alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init();
```

e.g.

```js
var name = "The Window";

var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};

alert(object.getNameFunc()());
// getNameFunc方法返回的函数是挂在window上的，所以this指向window，弹出框显示The Window
```

```js
var name = "The Window";

var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
    		return that.name;
    	};
	}
};

alert(object.getNameFunc()());
//  因为this指针用内部的代替了，所以返回的是My Object
```

```js
var makeCounter = function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); // 0
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); // 2
console.log(Coutner2.value()); // 0
```

上例可以看出两个不同的计数器，是相互独立的。每个闭包都是引用自己的词法作用域内的变量privateCounter

## 作用域

> 作用域是程序源代码中定义变量的区域，是用于确定在何处以及如何查找变量(标识符)的规则
>
> 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限
>
> ECMAScript 6之前只有**全局作用域**和**函数作用域**

### 静态作用域(词法作用域)

函数的作用域在函数定义的时候就决定了。

```js
function fn1(x) {
    var y = x + 4;
    function f2(z) {
        console.log(x, y, z);
    }
    fn2(y * 5);
}
fn1(6); // 6 10 50
```

词法作用域在书写代码时函数声明的位置就决定了。编译阶段已经能够知道全部标识符在哪里以及是如何声明的，所以词法作用域是静态的作用域，也就是词法作用域能够预测在执行代码的过程中如何查找标识符

### 动态作用域

函数的作用域在函数调用的时候才决定

## 函数式编程

借助数组的map方法，可以很方便的实现数组的函数式

```js
const nextCharForNumStr = (str) => [str]
	.map(s => s.trim())
	.map(s => parseInt(s))
	.map(i => i + 1)
	.map(i => String.fromCharCode(i))

nextCharForNumStr(' 64 ') // ['A']
```

这里的技巧在于，可以将需要变换的字符串，放在数组中，将对字符串的操作拆解成多个小步骤

根据上面的思路，可以创建一个新的类型，在类型中定义map方法，实现和数组map相似的功能

```js
const Box = (x) => ({
    map: f => Box(f(x)),		// 返回容器为了链式调用
    fold: f => f(x),			// 将元素从容器中取出
    inspect: () => `Box(${x})`	// 看容器里有什么内容
});

const nextCharForNumStr = (str) => Box(str)
	.map(s => s.trim())
	.map(i => parseInt(i))
	.map(i => i + 1)
	.map(i => String.fromCharCode(i))
	.fold(c => c.toLowerCase());
	
nextCharForNumStr(' 64 '); // a
```

https://github.com/BuptStEve/blog/issues/15

## JS表达式(expressions)与语句(statements)

**一个表达式返回一个值**，可以在任何需要值的地方使用表达式，也就是，会在我们使用它的地方期望得到一个值。举例如调用function中的参数(arguments)，或者声明=的右边都属于expressions的位置

下面的每一行都是一个expression

```js
myvar
100 + x
fn("a", "b")
```

可以粗略的将一个语句描述为**一个行为**，循环结构和if语句就是语句的例子。程序基本上是一系列语句的结合(**基础声明除外**)，如在MDN中定义的if语句

```js
if (condition)
	statement1
[else
	statement2]
```

当JavaScript需要编写一条语句时，均可以写入一个表达式，这样的语句称为**表达式语句**，例如在`statement1`的地方写入一个`function`，这个function就称为`expression statement`，属于特殊的statement，这个function自然可以return一个值，同事也可以在内部产生一些`side effect`，不过如果我们重点放在`side effect`部分时，通常会返回`undefined`。

```js
function say() {
    console.log('hello');
}

say();

// undefined
// hello
```

通常一个statement是独立的

但不能编写一条语句来代替表达式。如，if语句不能成为函数的参数

有些语句和表达式之间是有相似的功能的。

e.g.

```js
// if语句和条件运算符
var x;
if (y >= 0) {
    x = y;
} else {
    x = -y;
}
// 条件运算符
var x = (y >= 0 ? y : -y);
// 等号和封号之间的代码是一个表达式。括号不是必要的，括号是为了是代码更加清晰易懂
```

### 封号和逗号运算符

封号用来连接不同的语句

```js
foo(); bar();
```

逗号运算符计算两个表达式的值并返回第二个表达式的值

```js
"a", "b" // 输出 'b'

var x = ("a", "b")
x // 输出 'b'

console.log(("a", "b")) // 输出 b
```

### 对象字面量(object literal)和块级作用域(block)

对象字面量e.g.

```js
{
    foo: bar(3, 5)
}
```

上述代码是一个合法的语句：

- 代码块：花括号中的一系列语句
- 标签：在任意语句前添加标签，这里的标签是foo
- 语句：表达式语句bar(3, 5)

{}可用于定义作用域或对象字面量

e.g.

```js
[] + {} // [object Object]

{} + [] // 0
```

这两个语句返回结果不一样。第二个语句的加号左边相当于一个代码块({})，后面加上一个[]，所以返回0

Javascript允许一个块级作用域既不充当循环也不充当if语句的一部分而独立存在。e.g.

```js
// 该例可以通过标签命名块级作用域，并在合适的时机跳出这个作用域，返回到上层作用域中
function test(printTwo) {
    priting: {
        console.log("One");
        if (!printTwo) break printing;
        console.log("Two");
    }
    console.log("Three");
}

test(false);
// 输出：
// One
// Three
test(true);
// 输出：
// One
// Two
// Three
```

### 函数表达式和函数声明

函数声明

```js
function() {}
```

可以在这个表达式上加一个名字，将它变成命名后的函数表达式

```js
function foo() {}
```

命名后的函数表达式和函数声明仅从语句上是无法区分的，但效果截然不同

- 函数表达式产生一个值(函数)
- 函数声明是一个动作：创建一个变量，其值是函数

如果需要立即调用函数，必须使用函数表达式，不能使用函数声明？[不理解]

```js
(function() {})();
(function foo())();
// 实际二者都可执行，如何理解上句话？
```

### 使用对象字面量和函数表达式作为语句

因为有些表达式和语句无法区分开，意味着相同的代码由于上下文环境不同，作用也是不同的。

为了避免歧义，JavaScript语法**禁止表达式语句以大括号和关键字function开始**

如果想写一个以这两个标记中的任何一个开始的表达式语句，应该把它**放在括号里面**，它不会改变它的结果，但确保它出现在只有表达式的上下文中。

e.g.

```js
// eval 
// 在语句上下文中解析它所受到的参数。如果想让eval返回一个对象，则必须在对象字面量周围加上括号
eval("{foo: 123}") // 123
eval("({foo: 123})") // {foo: 123}
```

```js
// 自执行函数(IIFEs)
(function () {return "abc"}()) // 'abc'

// 如果省略括号，则会出现语法错误(函数声明不能声明匿名函数)
function() {return "abc"}() // SyntaxError

// 即使添加了名字也会返回语法错误(函数声明不能被立即调用)
function foo() {return "abc"}() // SyntaxError
```

另外，还有一种方式可以保证表达式在表达式上下文中被解析的方法，即在函数声明之前添加一个一元运算符(如+或!)，但是与括号不同的是，这些符号会改变输出的表示形式:

```js
+function() {console.log("hello")}() 
// 输出：
// hello
// NaN
// NaN出现正式由于+号运算undefined的结果，也可以使用void运算符：
void function() {console.log("hello")}()
// 输出：
// hello
// undefined
```

#### 连接多个IIFEs

要使用封号

```js
(function() {}())
(function() {}())
// TypeError: undefined is not a function
// 错误原因是JavaScript认为第二行是尝试将第一行的结果作为函数调用
// 解决方法是：
(function() {}());
(function() {}())
// OK
// 还可以使用一元运算符的操作符，可以省略封号，因为执行会自动添加封号
void function (){}()
void function (){}()
// OK
```
