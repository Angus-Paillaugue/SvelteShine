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
The icon metadata field is optional, but if you want to add it, you can do so by adding the `icon` metadata field to the code block. By default the icon will be chosen dynamically based on the file name.
This field can either be `dynamic`(default) | `default` | `false`.

Here are exemple of each values : 

```svelte name=filename.svelte icon=dynamic
<!-- icon=dynamic
  This will show the icon based on the file name
-->
```

```svelte name=filename.svelte icon=default
<!-- icon=default
  This will show the default icon 
-->
```

```svelte name=filename.svelte icon=false
<!-- icon=false
  This will hide the icon 
-->
```

# Highlight lines

You can highlight a single line (`// [!code highlight]`) or a range of line (`// [!code highlight:3]`) by adding the comment at the end of the line(s) you want to highlight :

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

By default, the line numbers are not shown in code blocks. You can display them by adding `lineNumbers` in the code block meta like so :

````markdown
```js lineNumbers
console.log('This code block has line numbers');

console.log('Yay!');
```
````

And here is what it looks like with line numbers :

```js lineNumbers
console.log('This code block has line numbers');

console.log('Yay!');
```

The actual code passed is `lineNumbers=true`, so you can also use that or `lineNumbers=false` to remove the line numbers if they are already displayed by default.

# Copy code

By default, a copy code button is added on every `<pre>` tag. If you can to remove it, add `no-copy` to the code block metadata or if you use the component from `$lib/components/markdown/pre.svelte`, you can pass the `copyCode` prop to false


# Code snippet
You can create a code snippet like a command by creating a code block, and adding `snippet` in it's metadata.
Commands can be multi-lines although it is recommended to keep them short.


The following example shows how to install a package using npm :
````markdown
```bash snippet
npm install
```
````

Result :

```bash snippet
npm install
```