---
---

<script>
  import { Collapsible } from '$lib/components';
  import { Definition } from "$lib/components";
</script>

# Exemples

## Base collapsible

<Collapsible summary="Base collapsible" >

You can really put anything in here !

### Heading

1. List item 1
2. List item 2
    - Sub list item 1
    - Sub list item 2


</Collapsible>

## With code inside

<Collapsible summary="With code inside">

You can add all sorts of things in here including code blocks

```js
function logSomething(something) {
  console.log('Something', something);
}
```

</Collapsible>

## With an icon

<Collapsible summary="With an icon" icon="line-md:moon-alt-loop">

Wow! this collapsible is super pretty

</Collapsible>


# Definition

<Definition
name="Collapsible"
description="The collapsible component."
definition={
{
"name":"props",
"content": [
{
"name":"summary",
"type": "string",
"description": "The summary text that will apear when the collapsible is closed."
},
{
"name":"<slot>",
"type": "HTMLElement",
"description": "The contents of the collapsible when it is expanded. Can contain markdown"
},
{
"name":"open",
"default":"false",
"type": "$bindable(boolean)",
"description": "(Optionnal) Whether the collapsible is open by default or not."
},
{
"name":"icon",
"type": "string",
"description": "(Optionnal) The name of the icon that will apear between the summary arrow and text."
},
{
"name":"class",
"type": "string",
"description": "(Optionnal) List of classes to apply the the outside most element"
}
]
}}
/>
