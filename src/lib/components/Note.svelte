<script>
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';

  const { type = 'warning', class: className, children, style = 'custom', ...restProps } = $props();

  const baseClasses = {
    github: 'border-l-2 p-2 pl-4 my-2',
    custom: 'border p-2 rounded-md my-2'
  };
  const typeClasses = {
    github: {
      note: 'border-blue-600',
      tip: 'border-green-600',
      important: 'border-indigo-600',
      warning: 'border-amber-600',
      caution: 'border-red-600'
    },
    custom: {
      note: 'text-blue-600 dark:text-blue-500 border-blue-600 bg-blue-50/50 dark:bg-blue-500/30',
      tip: 'text-emerald-600 dark:text-emerald-500 border-emerald-600 bg-emerald-50/50 dark:bg-emerald-500/30',
      important:
        'text-indigo-600 dark:text-indigo-500 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/30',
      warning:
        'text-amber-600 dark:text-amber-500 border-amber-600 bg-amber-50/50 dark:bg-amber-500/30',
      caution: 'text-red-600 dark:text-red-500 border-red-600 bg-red-50/50 dark:bg-red-500/30'
    }
  };
  const iconClasses = {
    github: {
      note: 'text-blue-600',
      tip: 'text-green-600',
      important: 'text-indigo-600',
      warning: 'text-amber-600',
      caution: 'text-red-600'
    },
    custom: {
      note: 'text-blue-600',
      tip: 'text-green-600',
      important: 'text-indigo-600',
      warning: 'text-amber-600',
      caution: 'text-red-600'
    }
  };

  // Same regardless of style
  const iconNames = {
    note: 'material-symbols:info-outline-rounded',
    tip: 'material-symbols:lightbulb-outline-rounded',
    important: 'iconoir:message-alert',
    warning: 'material-symbols:warning-outline-rounded',
    caution: 'material-symbols:dangerous-outline-rounded'
  };
</script>

{#if !Object.keys(typeClasses).includes(style)}
  <p>
    Invalid note style. Should be either {Object.keys(typeClasses)
      .map((el) => `"${el}"`)
      .join(', ')}
  </p>
{:else if Object.keys(typeClasses[style]).includes(type)}
  <div
    class={cn(baseClasses[style], typeClasses[style][type], className)}
    {...restProps}
    role="alert"
  >
    {#if style === 'github'}
      <div class="flex flex-col gap-1">
        <div class="flex flex-row items-center gap-2 {iconClasses[style][type]}">
          <Icon class="size-6" icon={iconNames[type]} />
          <span class="font-semibold capitalize">{type}</span>
        </div>
        <p class="m-0 text-neutral-700 dark:text-neutral-300">{@render children()}</p>
      </div>
    {:else if style === 'custom'}
      <div class="flex flex-row items-center gap-2">
        <Icon class="size-6" icon={iconNames[type]} />
        <p class="m-0 text-neutral-700 dark:text-neutral-300">{@render children()}</p>
      </div>
    {/if}
  </div>
{:else}
  <p>
    Invalid note type. Should be either {Object.keys(typeClasses[style])
      .map((el) => `"${el}"`)
      .join(', ')}
  </p>
{/if}
