<script>
  import { Commands } from '$lib/components';

  const commands = [
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
  ];
</script>

<Commands {commands} />
