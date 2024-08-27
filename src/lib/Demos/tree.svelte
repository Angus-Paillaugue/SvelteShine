<script>
  import { Tree } from '$lib/components';

  const treeStructure = [
    {
      name: 'src',
      children: [
        '+page.svelte',
        'Component.svelte',
        {
          name: 'lib',
          children: [
            {
              name: 'components',
              highlighted: true,
              children: [
                {
                  name: 'core',
                  children: [
                    {
                      name: 'Tree.svelte',
                      highlighted: true
                    },
                    'index.js'
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'docs',
      children: [
        'Home.md',
        {
          name: 'Components',
          open: false,
          children: ['Commands.md', 'Tooltip.md', 'Tree.md']
        }
      ]
    }
  ];
</script>

<Tree tree={treeStructure} />
