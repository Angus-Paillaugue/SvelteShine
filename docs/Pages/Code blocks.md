---
lastModified: 07-25-2024
---

With these custom code parser, you can really add a lot of wow factor to them. Let me show you.

# File name

You can add the file name by adding `:`after the language and the file name after :

````md
```javascript:filename.js

```
````

## Highlight lines

You can highlight line multiple ways

### In the code block data

You can highlight a single or a range of line :

````md
```js {1, 3-5}
console.log('Line 1');
console.log('Line 2');
console.log('Line 3');
console.log('Line 4');
console.log('Line 5');
```
````

Here is the result

```js {1, 3-5}
console.log('Line 1');
console.log('Line 2');
console.log('Line 3');
console.log('Line 4');
console.log('Line 5');
```

### Inline highlighting

You can highlight a single line (`// [!code highlight]`) or a range of line (`// [!code highlight:3]`) :

````md
```js
console.log('Line 1'); // [!code highlight]
console.log('Line 2');
console.log('Line 3'); // [!code highlight:3]
console.log('Line 4');
console.log('Line 5');
```
````

Here is the result

```js
console.log('Line 1'); // [!code highlight]
console.log('Line 2');
console.log('Line 3'); // [!code highlight:3]
console.log('Line 4');
console.log('Line 5');
```

## Code diff

You can show users the deletion and addition of code lines by adding `// [!code --]` (removed line) or `// [!code ++]` (added line) at the end of the concerned lin(s)

Here is the result

```js
console.log('Line 1');
console.log('New line'); // [!code ++]
console.log('Deleted line'); // [!code --]
console.log('Line 4');
console.log('Line 5');
```

## Line numbers

By default, the line numbers are shown in code blocks. You can remove them by adding `no-lines-numbers` in the code block meta like so :

````md
```js no-lines-numbers
console.log('This code block has no line numbers');

console.log('Yay!');
```
````

And here is what it looks like without line numbers :

```js no-lines-numbers
console.log('This code block has no line numbers');

console.log('Yay!');
```
