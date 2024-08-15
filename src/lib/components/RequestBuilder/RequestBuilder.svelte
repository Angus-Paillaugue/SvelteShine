<script>
  import { cn } from '$lib/utils';
  import { Button } from '$lib/components/';
  import Icon from '@iconify/svelte';

  const { method = 'GET', path, baseUrl, headers, body, ...restProps } = $props();
  let isSendingRequest = $state(false);

  const getPathElements = () => {
    if (!path) return [];
    let pathElements = [];
    if (path.startsWith('/')) {
      pathElements = path.slice(1);
    }
    return pathElements
      .split('/')
      .map((el) => ['/', el])
      .flat();
  };

  const isPathParam = (el) => el.startsWith('(') && el.endsWith(')');

  const formatRequest = () => {
    // TODO: Handle params in path
    return baseUrl + path.startsWith('/') ? path : '/' + path.startsWith('/');
  };

  const sendRequest = async () => {
    isSendingRequest = true;
    const response = await fetch(formatRequest(), {
      method,
      headers,
      body,
      ...restProps
    });
    console.log(response);
    isSendingRequest = false;
  };
</script>

<div
  class="flex flex-row items-center justify-between gap-2 rounded-md border border-main dark:border-main-dark"
>
  <div class="flex grow flex-row items-center gap-2">
    <div class="http-keyword w-fit" data-keyword={method.toLocaleUpperCase()}>
      {method.toLocaleUpperCase()}
    </div>
    <span class="h-6 w-px bg-neutral-300/50 dark:bg-neutral-700/50"></span>
    <div class="flex flex-row items-center gap-2">
      {#each getPathElements() as pathElement}
        <span
          class={cn(
            pathElement === '/'
              ? 'text-text-body dark:text-text-body-dark'
              : 'text-text-heading dark:text-text-heading-dark',
            isPathParam(pathElement) &&
              'rounded-md border border-primary-700 bg-primary-600/20 px-2 py-0.5 text-primary-900 dark:text-primary-100'
          )}>{pathElement}</span
        >
      {/each}
    </div>
  </div>
  <Button class="ml-auto" onclick={sendRequest}>
    {#if isSendingRequest}
      <Icon icon="svg-spinners:90-ring-with-bg" class="size-7" />
    {:else}
      Send
    {/if}
  </Button>
</div>
