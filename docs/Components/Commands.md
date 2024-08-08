---
name: Commands
---

<script>
  import { Commands } from "$lib/components";

  let commands = [{name:'npm', command:"npm install angus"}, {name:'pnpm', command:"pnpm install angus"}, {name:'bun', command:"bun add angus && bun add angus && bun add angus && bun add angus"}]
</script>

You can use the `Commands` component imported from `$lib/components`. Pass it an array of objects containing each a `name` key representing for exemple a package manager and a `command` key representing the associated command.

### Here is an exemple of config :

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

### And here is the result :

<Commands commands={commands} />
