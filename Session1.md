# Javascript Syntax

Javascript's syntax draws from the family of "C"-style languages, so the syntax is similar to that of C, C++, C#, and Java. That means semi-colons and curly braces!

But there are some important differences as we will see.

## Literals

**Number literals** can be written as integers, decimals, or with scientific notation:

```js
3
3.14
123e5
```

**String literals** can be written with either double or single quotes:

```js
'hello, world'
"hello, world"
```

**Expression literals** evaluate to a value:  
(In general, the [expected standard operators](http://www.w3schools.com/js/js_operators.asp) are supported.)

```is
1 + 2
2 - 1
1 * 2
1 / 2
```

**Array literals** are noted by square brackets:

```js
[1, 2, 3, 4, 5]
```

**Object literals** define objects:

```js
{ 
	firstName: 'John',
	lastName: 'Doe',
	age: 29}
```
**Function literals** define functions:

```js
function add(x, y) {
	return x + y;}
```

## Comparisons

The [standard comparison operators](http://www.w3schools.com/js/js_comparisons.asp) are supported by Javascript.

However, Javascript supports two types of equality comparisons:

* `==` (equal in value)
* `===` (equal in value and type)

```js
console.log(3 == '3');	// true
```
```js
console.log(3 === '3');	// false
```
 `==` will attempt to coerce the values to the same type before comparing them.
 
`===` will not coerce the values, therefore the values must be equal in value _and_ type.

In general, `===` should be used unless automatic coercion is required.

## Truthy and Falsy

Conditional expressions (such as `if`) evaluate values to be either **truthy** or **falsy**.

Since most values in Javascript are considered **truthy** (objects, arrays, most numbers and strings), it's easier to enumerate all the falsy values:

```js
false	// obviously
0		// the only falsy number
''		// the empty string
null
undefined
NaN
```

## Variables

JavaScript uses the **var** keyword to define variables, and a single equal sign to assign values to variables.

Variables that have been defined but not assigned a value yet have the special value of **undefined**.

Variables can explicitly be set to the predefined values of **null** or **undefined**.
	Variables are not assigned to any particular type, and can reference different types during their lifetime:

```js
var x;
x = 'hello';
x = [1, 2, 3];
x = { name: 'Joe' };
x = null;
x = undefined;
```
**NOTE:** Statements should end with a semi-colon as above. Though the ending semi-colon is technically not required by the language, it is a good practice to include them.

Many consider the _automatic semi-colon insertion_ feature of Javascript to be evil. Consider the following:

```js
function foo() {
	return
	{
		firstName: 'John',
		lastName: 'Doe'	
	};}
```
It would appear that the object containing firstName and lastName would be returned, however Javascript automatically inserts a semi-colon after the `return` statement. The value actually returned is `undefined`. Javascript views the above code as:

```js
function foo() {
	return;
	{
		firstName: 'John',
		lastName: 'Doe'	
	};}
```

Therefore, a generally accepted coding standard for Javascript is to always place opening curly braces at the end of the opening statement:

```js
function foo(x) {
	if (x) {
		doSomething(x);	}}
```

as opposed to:

```js
function foo(x) 
{
	if (x)
	{
		doSomething(x);	}}
```

**WARNING:** A variable does not have to be explicitly defined in Javascript. It can be declared simply by assigning it a value. **DON'T DO THIS!** Doing so will create what is effectively a global variable and could cause unwanted side-effects.

**TIP:** The [`'use strict';`](http://www.w3schools.com/js/js_strict.asp) statement can be used to prevent the automatic declaration of variables (as well as other common Javascript errors).

The scope of a variable is the enclosing function (or globally if not enclosed in a function definition). Variable definitions are **hoisted** to the top of the function. That means that the following functions are equivalent:

```js
function foo(arg) {
	if (arg) {
		var x = arg + 10;
		bar(x);	}
	
	x = x + 1;
	return x;
}
```

```js
function foo(arg) {
	var x;
	
	if (arg) {
		x = arg + 10;
		bar(x);	}
	
	x = x + 1;
	return x;
}
```

Many Javascript developers follow the practice of declaring all variables in a function at the beginning of a function.

## Objects

Objects are typically created using literal notation. Properties can be added to object simply by assigning them a value. Properties can be referenced using either dot notation or square bracket notation:

```js
var obj = {};

obj.firstName = 'John';
obj['lastName'] = 'Doe';

console.log(obj['firstName']);	// John
console.log(obj.lastName);		// Doe 
```

Any valid string can be used as a property name, however if the string is not a valid identifier (containing spaces, special characters, etc.), then the square bracket notation must be used:

```js
var obj = {};
obj['## %930 $ks'] = 'foo';
console.log(obj['## %930 $ks']);	// foo
```

Javascript supports standard conditional statements such as [`if`](http://www.w3schools.com/js/js_if_else.asp) and [`switch`](http://www.w3schools.com/js/js_switch.asp) and iterative statements such as [`for`](http://www.w3schools.com/js/js_loop_for.asp) and [`while`](http://www.w3schools.com/js/js_loop_while.asp).

**NOTE:** The **for..in** loop often confuses developers. It is designed to loop over each **property** for a given object. For example:

```js 
var obj = { fname: 'john', lname: 'doe' };
	
for (var prop in obj) {
	console.log(prop);			// fname, lname
	console.log(obj[prop]);		// john, doe}
```
For arrays, **for..in** iterates over the **indices** in the array:

```js
var arr = ['larry', 'moe', 'curly'];

for (var index in array) {
	console.log(index);			// 0, 1, 2
	console.log(arr[index]);	// larry, moe, curly}
```
## Types

Javascript defines several native types. Some of the most common are:

- [string](http://www.w3schools.com/js/js_string_methods.asp)
- [number](http://www.w3schools.com/js/js_numbers.asp)
- [boolean](http://www.w3schools.com/js/js_booleans.asp)
- [array](http://www.w3schools.com/js/js_array_methods.asp)
- [date](http://www.w3schools.com/js/js_date_methods.asp)
- [regexp](http://www.w3schools.com/js/js_regexp.asp)
- [error](http://www.w3schools.com/js/js_errors.asp)

Each type has a corresponding constructor function. In general, direct use of these constructor functions, except for `Date()` and `Error()` should be avoided as they could potentially introduce performance penalties and unwanted side effects. ([more information](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/ch3.md))

The `Date()` and `Error()` constructors are much more commonly useful than the other natives, because there is no literal form for either.

Constructor functions will be covered in more detail later in the class.

## Functions

Javascript supports first-class functions. According to [wikipedia](http://en.wikipedia.org/wiki/First-class_function):

> In computer science, a programming language is said to support first-class functions (or function literal) if it treats functions as first-class objects. Specifically, this means that the language supports constructing new functions during the execution of a program, storing them in data structures, passing them as arguments to other functions, and returning them as the values of other functions.

Therefore, functions can be declared as named literals or as variable declarations:

```js
function add(x, y) {
	return x + y;}
```

```js
var add = function (x, y) {
	return x + y;};
```
The above function declarations are _almost_ equivalent. The difference is that the literal definition will be **hoisted** to the top of its containing function and can thus be called anywhere within the containing function. The variable definition is hoisted as well, but the variable will be undefined until the assignment is made.

```js
function foo() {
	console.log(add(1, 2)); 	// 3
	
	function add(x, y) {
		return x + y;	}}
```
```js
function foo() {
	console.log(add(1, 2));	// TypeError: undefined is not a function
	
	var add = function(x, y) {
		return x + y;	};}
```

**Function parameters** may be defined in a function definition, however when a function is called _any number of arguments_ can be provided.

Extra arguments that are not referenced in the function are simply ignored. This scenario will not cause an error, but most likely will provide unexpected results:

```js
function add(x, y) {
	return x + y;}

var sum = add(1, 2, 3, 4, 5);
console.log(sum);	// 3
```
Providing too few arguments to a function may result in an error or unexpected results depending on how the parameters are used within the function:

```js
function add(x, y) {
	return x + y;}

var sum = add(1);
console.log(sum);	// NaN
```
In this case the result is `NaN` which means "not a number". This is a special value that indicates that an invalid numeric value was evaluated. In this case, the parameter `x` was assigned the value of `1`, but the value of parameter `y` was `undefined`. Adding `undefined` to `1` resulted in `NaN`. (See note on `NaN` below.)

##Working with a variable number of parameters

Every function has an intrinsic **arguments** variable which allows for the enumeration of the actual arguments passed to the function:

```js
function add(/* arguments */) {
	var sum = 0;
	
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];	}
	
	return sum;}

console.log(add(1, 2));		// 3
console.log(add(1, 2, 3));	// 6
console.log(add(1));		// 1
console.log(add(0));		// 0
```

**NOTE: NaN is weird** - consider the following:

```js
console.log(typeof NaN);	// number
```

```js
console.log(NaN === NaN);	// false
```
 
**Immediately invoked functions** are functions that are execute as soon as they are defined. Since variables are scoped at the function level, this can be a useful technique for containing the scope of variables:

```js
(function () {
	var x = 10;
	x = doSomething(x);
	x = doSomethingElse(x);
	return x;}());		// note the () which cause the invocation
```

A common use of an **IIF** is to enable **[strict mode](http://www.w3schools.com/js/js_strict.asp)** for a given function:

```js
(function () {
	'use strict';
	var x = 10;
	x = doSomething(x);
	x = doSomethingElse(x);
	return x;}());		// note the () which cause the invocation
```

We will see more advanced examples of working with a variable number of arguments, passing functions as arguments to other functions, constructing new functions at runtime, and returning functions as values of other functions in a subsequent class.

