# The 'this' Keyword

The meaning of the keyword ```this``` is one of the more confusing concepts for many Javascript developers. 

```this``` is an implicit parameter to every function call and references the **context** of a function call (not to be confused with **scope** which we will cover later).

As with other parameters, you cannot determine the value of ```this``` simply by looking at a function definition, you must examine how the method is called.

There are 4 rules governing the binding of ```this```:

## Default Binding

The default binding rule applies to standalone function invocations. ```this``` will reference the Javascript global object unless ```strict mode``` is enabled for the function in which case the value will be ```undefined```.

```js
function foo() {
	// this === global object}

foo();
```

```
function foo() {
	'use strict';
	// this === undefined}

foo();
```
(Note that ```use strict``` must be enabled on the function itself, but not on the calling code.)

## Implicit Binding

Implicit binding is where ```this``` starts to gain some usefulness.

```js
function foo() {
	'use strict';
	console.log(this.name);}

var obj = {
	name: 'Mary',
	bar: foo};

obj.bar();	// 'Mary' (this === obj)
foo();		// cannot read property 'name' of undefined (default binding applies)
```
It is possible to lose the implicit binding for a function. Consider:

```js
function foo() {
	'use strict';
	console.log(this.name);}

var obj = {
	name: 'Mary',
	bar: foo};

var fn = obj.bar;
fn();		// cannot read property 'name' of undefined (default binding applies)
```
## Explicit Binding

```this``` can be explicitly set for a given invocation of a function using the ```call()``` method which is provided for each function. ```call()``` invokes the function in the normal manner, but with the addition of an extra (first) parameter which will be bound to ```this```:

```js
function foo() {
	'use strict';
	console.log(this.name);}

var obj = {
	name: 'Mary'
};

foo.call(obj);	// 'Mary'
```
The ```bind()``` function can also be used to create a new function that will always invoke a function with the given ```this``` binding:

```js
function foo() {
	'use strict';
	console.log(this.name);}

var obj = {
	name: 'Mary'
};

var bar = foo.bind(obj);	
bar();		// 'Mary'
```

## ```new``` Binding

Functions may be called with the ```new``` keyword which will create a new object to be bound to ```this```. When called with ```new```, the function will automatically have a return value if ```this``` if there is no other value returned.

By convention, functions which are expected to be called with the ```new``` keyword should have upper-cased names (this is just a widely accepted convention, nothing in the language requires it). These are typically referred to as **constructor functions**:

```js
function Person(name) {
	this.name = name;
}

var p = new Person('Mary');
console.log(p.name);		// 'Mary'

```

# Prototypal Inheritance

Javascript inheritance is implemented using **prototype object**. Every object has an internal prototype property which comes may come into play when resolving an identifier on an object. One way to explicitly set the prototype of an object is to use the ```Object.create(prototype)``` method. Consider:

```js
var obj = Object.create({ name: 'Mary' });

console.log(obj.name));		// 'Mary'
console.log(obj.hasOwnProperty('name'));	// false
```
When resolving an identifier on a given object, first the object itself is examined. If the identifier is not resolved, then the object's prototype object is examined. If not resolved, then that object's prototype is examined, etc. until the prototype chain runs out. Only then is an ```undefined``` value returned.

However when assigning a value to a property of an object, the value is assigned directly to the object itself and not the prototype. (There are a few unusual cases when setting property values, [see here for more details](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch5.md).)

```js
var proto = {
	name: 'Mary'};

var obj = Object.create({ name: 'Mary' });
obj.name = 'Martha';

console.log(obj.name);		// 'Martha'
console.log(proto.name);	// 'Mary'
console.log(obj.hasOwnProperty('name'));	// true
```
## Prototypes and Constructor Functions

One of the most common uses of prototypes is in conjunction with constructor functions. Functions have a prototype property... and any ```new``` objects created by invoking the function with get the function's prototype as their prototype.

```js
function Person(fname, lname) {
	this.fname = fname;
	this.lname = lname;}

Person.prototype.getFullName = function () {
	return this.fname + ' ' + this.lname;};

var p = new Person('John', 'Doe');
console.log(p.getFullName());		// 'John Doe'
```
# Variable Scope

Javascript uses **lexical scoping** at the function level. This means that variables are in scope in the functions in which they are declared, and in any functions declared within that function.

```js
function outer(a) {
  function inner(b) {
    console.log(a, b); 	// 'a' from outer scope, 'b' from inner scope
  }
  
  inner(4);
}

outer(3);	// 3, 4 written to the console
```

When attempting to resolve a variable, the current scope is examined. If the variable is not resolved in the current scope, then the containing scope is examined and so on. If the variable is never resolved, an error is thrown.

**Shadowing** occurs when a variable of a same name as another variable in a parent scope is declared.

```js
function outer(a) {
  function inner(b) {
    var a = 5;
    console.log(a, b); 	// 'a' is shadowed
  }
  
  inner(4);
}

outer(3);	// 5, 4 written to the console
```
# Closure

> Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

```js
function always(value) {
	return function () {
		return value;	};}

var seven = always(7);		// returns a function that always returns 7
console.log(seven());		// 7 written to the console
```
In the example above, the value passed to ```always()``` is captured by the inner function which is then returned to the caller. This results in a **closure**.

>["Understanding closures is like when Neo sees the Matrix for the first time."](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/ch5.md)

Normally after a function is executed, it's inner scope will go away to be eventually garbage collected. However in the example above, the returned function still have a reference to the scope of it's containing function.

Another example:

```js
function wait(message) {
	setTimeout(function () { console.log(message); }, 1000);}
	
wait('hello');
wait('world');
console.log('waiting...');
```

#Homework Review

Memoize: [http://jsbin.com/letuko/2/edit](http://jsbin.com/letuko/2/edit)

# Functional Programming

- composing functions
- referential transparency
- functional refactoring
- average salary example

## Refactoring #1 - Function Wrap

Any value can be replaced by an immediately invoked function that returns that value.

```js
var i = 7;
```

is equivalent to

```js
var i = function () { return 7; }();
```
 
## Refactoring #2 - Extract Parameter

Any value in a function can be replace by a parameter with the same value.

```js
var i = function (x) { return x; }(7);
```

## Refactoring #3 - Extract Function

Any inline function can be replaced by named function (with necessary parameters of course).

```js
function identity(x) {
	return x;}

var i = identity(7);
```