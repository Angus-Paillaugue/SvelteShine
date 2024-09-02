<script>
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';

  const {
    type = 'warning',
    class: className,
    children,
    style = 'custom',
    ...restProps
  } = $props();

  const baseClasses = {
    github: 'border-l-2 p-2 pl-4 my-2',
    custom: 'border p-2 rounded my-2'
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
      note: 'border-blue-600 dark:border-blue-800',
      tip: 'border-emerald-600 dark:border-emerald-800',
      important: 'border-indigo-600 dark:border-indigo-800',
      warning: 'border-amber-600 dark:border-amber-800',
      caution: 'border-red-600 dark:border-red-800'
    }
  };
  const iconClasses = {
    github: {
      note: 'text-blue-600 dark:text-blue-500',
      tip: 'text-emerald-600 dark:text-emerald-500',
      important: 'text-indigo-600 dark:text-indigo-500',
      warning: 'text-amber-600 dark:text-amber-500',
      caution: 'text-red-600 dark:text-red-500'
    },
    custom: {
      note: 'text-blue-600 dark:text-blue-500',
      tip: 'text-emerald-600 dark:text-emerald-500',
      important: 'text-indigo-600 dark:text-indigo-400',
      warning: 'text-amber-600 dark:text-amber-500',
      caution: 'text-red-600 dark:text-red-500'
    }
  };

  // Same regardless of style
  const iconNames = {
    note: 'lucide:info',
    tip: 'material-symbols:lightbulb-outline-rounded',
    important: 'iconoir:message-alert',
    warning: 'lucide:message-square-warning',
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
    role="alert"
    {...restProps}
  >
    {#if style === 'github'}
      <div class="note flex flex-col gap-1">
        <div
          class={cn(
            'flex flex-row items-center gap-2',
            iconClasses[style][type]
          )}
        >
          <Icon class="size-6" icon={iconNames[type]} />
          <span class="font-semibold capitalize !text-inherit">{type}</span>
        </div>
        <p class="m-0 text-text-body dark:text-text-body-dark">
          {@render children()}
        </p>
      </div>
    {:else if style === 'custom'}
      <div class="note flex flex-row items-center gap-2">
        <Icon
          class={cn('size-6', iconClasses[style][type])}
          icon={iconNames[type]}
        />
        <p class="m-0 text-text-body dark:text-text-body-dark">
          {@render children()}
        </p>
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

<style>
  :global(.note p) {
    @apply !text-inherit;
  }
</style>
