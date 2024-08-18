---
lastModified: 08-14-2024
---

<script>
  import { Collapsible } from '$lib/components';
  import { Definition } from "$lib/components";
</script>

# Exemples

## Base collapsible

<Collapsible summary="Base collapsible">
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

## Group of collapsible

To make a collapsible group, you just have to wrap your collapsible into the `Collapsible.Group` component.

<Collapsible.Group>
<Collapsible summary="Collapsible 1">

#### Collapsible 1

```js
function collapsibleFunction() {
  return 'Yay!';
}
```

</Collapsible>
<Collapsible summary="Collapsible 2">

#### Collapsible 2

```js
function collapsibleFunction() {
  return 'Yay!';
}
```

</Collapsible>
<Collapsible summary="Collapsible 3">

#### Collapsible 3

```js
function collapsibleFunction() {
  return 'Yay!';
}
```

</Collapsible>
</Collapsible.Group>

# Definition

<Definition
  name="Collapsible"
  description="The collapsible component."
>
  <Definition.Prop type="string" path="summary" required>The summary text that will appear when the collapsible is closed.</Definition.Prop>
  <Definition.Prop type="HTMLElement" path="<slot>" required>The contents of the collapsible when it is expanded. Can contain markdown.</Definition.Prop>
  <Definition.Prop type="$bindable(boolean)" path="open" default="false">Whether the collapsible is open by default or not.</Definition.Prop>
  <Definition.Prop type="string" path="class">List of classes to apply the the outside most element.</Definition.Prop>
</Definition>

<Definition
  name="Collapsible.Group"
  description="The collapsible group wrapper component."
>
  <Definition.Prop type="HTMLElement" path="<slot>" required>A list of `Collapsible`.</Definition.Prop>
  <Definition.Note>This component is just a wrapper. It dos't have any props except for the `slot`</Definition.Note>
</Definition>
