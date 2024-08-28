---
description: Create demos of your components
lastModified: 08-28-2024
---

<script>
  import { Steps, Definition } from '$lib/components';
</script>

You can create demos od components or just re-suable code chunks with the `<Demo>` component.

# Get started

<Steps>
  <Steps.Step>

  Create a demo svelte file in `src/lib/Demos`.
  </Steps.Step>

  <Steps.Step>
  Populate the file with the code of your demo.
  </Steps.Step>

  <Steps.Step>

  Update the demos registry (used by the `<Demo>` component to fetch the component and code). You only need to run this script when adding and removing demo files.

  ```bash
  npm run update-registry
  ```
  </Steps.Step>

  <Steps.Step>

  You can now use the `<Demo>` component ans pass it the `name` prop. The name should be the name of the demo file you created.
  For exemple, I create a `tree.svelte` demo inside the `src/lib/Demos` dir. The name passed to the `<Demo>` component is `tree`.
  </Steps.Step>
</Steps>


# Definition

<Definition name="Demo" description="The demo component.">
  <Definition.Prop type="string" path="name" required>The name of the demo file.</Definition.Prop>
  <Definition.Prop type="string" path="lang" default="svelte">If the demo is not a svelte file, you need to specify it's language for syntax highlighting.</Definition.Prop>
  <Definition.Prop type="boolean" path="container" default="true">

  Whether the component preview is in a `<ComponentPreview>` container or not.
  </Definition.Prop>
  <Definition.Prop type="boolean" path="code" default="true">Weather to show the code of the demo. If false, the tabs will be hidden since only the preview will be shown.</Definition.Prop>

</Definition>
