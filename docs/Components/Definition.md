---
lastModified: 08-07-2024
---

<script>
  import { Definition } from "$lib/components";
</script>

# Explanation

This component is used to define and explain component usage.

## Exemple

Here you can see a chunk of the code for the definition of the tree component

```js
<Definition name="Tree" description="The tree component.">
  <Definition.Prop type="array" path="tree" default="[]" required>
    The actual array of the tree.
  </Definition.Prop>
  <Definition.Prop type="array" path="tree.children">
    The list of children of a directory.
  </Definition.Prop>

  <Definition.Note>For a single file, instead of using an object with a name...</Definition.Note>
</Definition>
```

# Definition

<Definition name="Definition" description="The definition component.">
  <Definition.Prop type="string" path="name" required>The name of the component.</Definition.Prop>
  <Definition.Prop type="string" path="description">The Description of the component.</Definition.Prop>
  <Definition.Prop type="HTMLElement" path="<slot>" required>The actual contents of the note.</Definition.Prop>
  <Definition.Note>

  You can link to a definition component by adding a link to `#definition-Definition.name`.
  For exemple, if you have a Definition named `test`, you can link to it with a link : `(link to test)[#definition-test]`.
  </Definition.Note>
</Definition>


<Definition name="Definition.Prop"description="A prop of the component.">
  <Definition.Prop type="string" path="path" required>The "name" of the prop.</Definition.Prop>
  <Definition.Prop type="HTMLElement" path="<slot>" required>The description of the prop.</Definition.Prop>
  <Definition.Prop type="string" path="type" required>The type of the prop.</Definition.Prop>
  <Definition.Prop type="string" path="default">The default value of the prop (if it has one).</Definition.Prop>
  <Definition.Prop type="boolean" path="required">If the prop is required.</Definition.Prop>
</Definition>


<Definition name="Definition.Note" description="A note about the component.">
  <Definition.Prop type="HTMLElement" path="<slot>" required>The "name" of the prop.</Definition.Prop>
</Definition>
