---
name: Home
description: This is the description for the home page
lastModified: 07-25-2024
---

```js:test.js {2, 4-5}
const test = "Test" // [!code --]

console.log(test)
console.log(test)
console.log(test)
console.log(test)
console.log(test) // [!code highlight:2]
console.log(test)
console.log(test)
console.log(test)
console.log(test) // [!code ++]
console.log(test)
console.log(test) // [!code highlight]
console.log(test)
console.log(test)
console.log(test)
```

this is a command : `cat passwords.txt`

<script>
  let count = $state(0)
</script>

<p>
  {count}
</p>

<button onclick={() => (count ++)}>Increment</button>
