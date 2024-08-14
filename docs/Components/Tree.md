---
lastModified: 08-09-2024
---

<script>
  import { Tree, Definition } from "$lib/components";

  const treeStructure = [
    {
      name: "src",
      children: [
        "+page.svelte", "Component.svelte",
        {
          name: "lib",
          children: [
            {
              name: "components",
              highlighted: true,
              children: [
                {
                  name: "core",
                  children: [
                    {
                      name:"Tree.svelte",
                      highlighted:true
                    },
                    "index.js"
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
    {
      name: "docs",
      children: [
        "Home.md",
        {
          name: "Components",
          open: false,
          children: [
            "Commands.md", "Tooltip.md", "Tree.md"
          ]
        }
      ]
    }
  ]
</script>

You can use the `Tree` component imported from `$lib/components`. Pass it a tree of files and directory to be displayed interactively.

# Config

```svelte
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
```

# Result

<Tree tree={treeStructure} />

# Definition

<Definition
  name="Tree"
  description="The tree component."
>
  <Definition.Prop type="array" path="tree" default="[]" required>The actual array of the tree.</Definition.Prop>
  <Definition.Prop type="string" path="tree.name" required>The file or directory name.</Definition.Prop>
  <Definition.Prop type="boolean" path="tree.open" default="true">If the children is a directory, controls whether the children are displayed.</Definition.Prop>
  <Definition.Prop type="array" path="tree.children">The list of children of a directory.</Definition.Prop>
  <Definition.Prop type="boolean" path="tree.highlighted" default="false">Controls weather to hight a directory or file.</Definition.Prop>

  <Definition.Note>For a single file, instead of using an object with a name, you can just use a string representing it's name</Definition.Note>
</Definition>
