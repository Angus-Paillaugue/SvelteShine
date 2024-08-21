---
lastModified: 08-16-2024
---

<script>
  import { Definition } from "$lib/components"
</script>

<Definition
  name="project"
  description="The project object."
>
  <Definition.Prop type="string" path="name" required>The name of your project.</Definition.Prop>
  <Definition.Prop type="string" path="description" required>A short ( &lt; 200 words) description of your project.</Definition.Prop>
  <Definition.Prop type="string" path="author" required>Your name or project name.</Definition.Prop>
  <Definition.Prop type="string" path="keywords" required>Used for SEO. Used to describe your project.</Definition.Prop>
</Definition>
