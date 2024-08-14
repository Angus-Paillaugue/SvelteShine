---
name: Tooltip
description: Easley use tooltips
lastModified: 07-25-2024
---
<script>
  import { Tooltip, Definition } from "$lib/components";
</script>

# Exemples

## Top

Lorem ipsum <Tooltip title="dolor sit" position="top">I'm a tooltip</Tooltip> amet consectetur.


## Left

Lorem ipsum <Tooltip title="dolor sit" position="left">I'm a tooltip</Tooltip> amet consectetur.


## Bottom

Lorem ipsum <Tooltip title="dolor sit" position="bottom">I'm a tooltip</Tooltip> amet consectetur.


## Right

Lorem ipsum <Tooltip title="dolor sit" position="right">I'm a tooltip</Tooltip> amet consectetur.

## With a link
Lorem ipsum <Tooltip title="dolor sit">[I'm a tooltip with a link](#)</Tooltip> amet consectetur.


# Definition

<Definition
name="Tooltip"
description="The tooltip component."
definition={
{
"name":"props",
"content": [
{
"name":"title",
"type": "string",
"description": "The text shown that, when hovered, reveals the content of the tooltip."
},
{
"name":"<slot>",
"type": "HTMLElement",
"description": "The content of the tooltip."
},
{
"name":"position",
"default":"\"top\"",
"type": "string",
"description": "The position of the tooltip. Can be either \"top\", \"right\", \"bottom\" or \"right\""
}
]
}}
/>
