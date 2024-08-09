---
name: Definition
---

<script>
  import { Definition } from "$lib/components";
</script>

<Definition
name="createCollapsible"
description="The builder function used to create the collapsible component."
definition={
{
"name":"props",
"content": [
{
"name":"disabled",
"default":"false",
"type": "boolean",
"description": "Whether or not the collapsible is disabled."
},
{
"name":"forceVisible",
"default":"false",
"type": "boolean",
"description": "Whether or not to force the collapsible to always be visible. This is useful for custom transitions and animations using conditional blocks."
},
{
"name":"defaultOpen",
"default":"false",
"type": "boolean",
"description": "Whether the collapsible is open by default or not."
},
{
"name":"open",
"type": "Writable<boolean>",
"description": "A writable store that controls whether or not the collapsible is open."
},
{
"name":"onOpenChange",
"type": "ChangeFn<boolean>",
"description": "A callback called when the value of the open store should be changed."
},
{
"name":"defaultOpen",
"default":"false",
"type": "boolean",
"description": "Whether the collapsible is open by default or not."
},
{
"name":"defaultOpen",
"default":"false",
"type": "boolean",
"description": "Whether the collapsible is open by default or not."
}
]
}}
/>
