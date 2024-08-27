---
lastModified: 07-25-2024
---

With these custom code parser, you can really add a lot of wow factor to them. Let me show you.

# File name

You can add the file name by adding `:`after the language and the file name after :

````markdown
```javascript name=filename.svelte
<SomeSvelteComponent />
```
````

```javascript name=filename.svelte
<SomeSvelteComponent />
```

## File icon

If you added a file name, you will be able to see the file icon preceding the filename.
You can change it's display status by adding `icon=true|false` in the code block metadata.

# Highlight lines

You can highlight line multiple ways

## In the code block data

You can highlight a single or a range of line :

````markdown
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

## Inline highlighting

You can highlight a single line (`// [!code highlight]`) or a range of line (`// [!code highlight:3]`) :

````markdown
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

# Code diff

You can show users the deletion and addition of code lines by adding `// [!code --]` (removed line) or `// [!code ++]` (added line) at the end of the concerned lin(s)

Here is the result

```js
console.log('Line 1');
console.log('New line'); // [!code ++]
console.log('Deleted line'); // [!code --]
console.log('Line 4');
console.log('Line 5');
```

# Line numbers

By default, the line numbers are not shown in code blocks. You can display them by adding `line-numbers` in the code block meta like so :

````markdown
```js line-numbers
console.log('This code block has line numbers');

console.log('Yay!');
```
````

And here is what it looks like with line numbers :

```js line-numbers
console.log('This code block has line numbers');

console.log('Yay!');
```
