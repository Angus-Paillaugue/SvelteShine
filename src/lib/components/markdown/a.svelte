<script>
  import Icon from '@iconify/svelte'
  const { href, children } = $props();

  let isPointingOutside = href.startsWith("http") || href.startsWith("mailto");
</script>

<a {href} target={isPointingOutside ? '_blank' : '_self'} class="link">
  {@render children()}
  {#if isPointingOutside}
    <Icon icon="material-symbols:open-in-new-rounded" class="size-4" />
  {/if}
</a>
