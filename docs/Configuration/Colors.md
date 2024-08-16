---
lastModified: 08-16-2024
---

<script>
  import { Definition } from "$lib/components"
</script>




# Definition

The color config is made thru the exported `colors` object.

<Definition
  name="colors"
  description="The colors object."
>
  <Definition.Prop type="object" path="tailwindColors" required>
    The array of pages defining the pages of the documentation.
  </Definition.Prop>
  <Definition.Prop type="string" path="codeBlockTheme" required>

    The name of the code block theme see [https://shiki.matsu.io/themes](https://shiki.matsu.io/themes) for a list of themes. If you change the theme, you might also want to change the variable color in `src/code.css 8:14`.
  </Definition.Prop>
</Definition>
