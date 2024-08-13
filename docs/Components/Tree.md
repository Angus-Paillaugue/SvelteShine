---
name: Tree
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
notes={[
"For a single file, instead of using an object with a name, you can just use a strin representing it's name"
]}
definition={
{
"name":"props",
"content": [
{
"name":"tree",
"default":"[]",
"type": "array",
"description": "The actual array of tha tree."
},
{
"name":"tree.name",
"type": "string",
"description": "The file or directory name."
},
{
"name":"tree.open",
"default":"true",
"type": "boolean",
"description": "(Optionnal) If the children is a directory, controls whether the children are displayed."
},
{
"name":"tree.children",
"type": "array",
"description": "(Optionnal) The list of children of a directory."
},
{
"name":"tree.highlighted",
"type": "boolean",
"default": "false",
"description": "(Optionnal) Controls weather to hight a directory or file."
}
]
}
}
/>
