---
lastModified: 08-07-2024
---

<script>
  import { Commands, Definition } from "$lib/components";

  let commands = [{name:'npm', command:"npm install angus"}, {name:'pnpm', command:"pnpm install angus"}, {name:'bun', command:"bun add angus && bun add angus && bun add angus && bun add angus"}]
</script>

You can use the `Commands` component imported from `$lib/components`. Pass it an array of objects containing each a `name` key representing for exemple a package manager and a `command` key representing the associated command.

# Config exemple

Here is a simple config exemple

```svelte
<script>
  import { Commands } from '$lib/components';
</script>

<Commands
  commands={[
    {
      name: 'npm',
      command: 'npm install angus'
    },
    {
      name: 'pnpm',
      command: 'pnpm install angus'
    },
    {
      name: 'bun',
      command: 'bun add angus && bun add angus && bun add angus && bun add angus'
    }
  ]}
/>
```

# Result

Here is what the previous config outputs
<Commands commands={commands} />

# SyncKey

You can use the `syncKey` property to sync multiple `Commands` components selected elements. For exemple :

```svelte
<Commands commands={commands} syncKey="test" />
<Commands commands={commands} syncKey="test" />
```

Gives the following result :


<Commands commands={commands} syncKey="test" />
<Commands commands={commands} syncKey="test" />


# Definition

<Definition name="Commands" description="The commands component.">
  <Definition.Prop type="array" path="commands" required>The name of the component.</Definition.Prop>
  <Definition.Prop type="string" path="commands.name" required>The name of the file or directory.</Definition.Prop>
  <Definition.Prop type="string" path="commands.command" required>The actual command displayed.</Definition.Prop>
  <Definition.Prop type="string" path="syncKey">A key used to identify and sync multiple components selected item.</Definition.Prop>
</Definition>
