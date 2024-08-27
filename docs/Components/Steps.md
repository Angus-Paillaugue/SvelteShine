---
lastModified: 08-25-2024
---

<script>
  import { Steps, Definition } from "$lib/components";
</script>

# Exemple

<Steps>
<Steps.Step>
Task one

```js
function test() {
  console.log('test');
}
```
</Steps.Step>

<Steps.Step>

Task two
 - Thing to do
 - Other thing to do

</Steps.Step>

<Steps.Step>
Task three
</Steps.Step>

</Steps>

# Definition

<Definition name="Steps" description="The steps component.">
  <Definition.Prop type="<slot>" path="children">The list of Steps.Step.</Definition.Prop>
  <Definition.Prop type="string" path="class">A list of extra classes to apply.</Definition.Prop>
</Definition>

<Definition name="Steps.Step" description="The steps component.">
  <Definition.Prop type="<slot>" path="children">The content of the step.</Definition.Prop>
  <Definition.Prop type="string" path="class">A list of extra classes to apply.</Definition.Prop>
</Definition>
