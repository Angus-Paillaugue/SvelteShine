---
name: Note
---

# Exemples

<script>
  import { Note, Definition } from "$lib/components"
</script>

<Note type="note">
  Useful information that users should know, even when skimming content.
</Note>
<Note type="tip">
  Helpful advice for doing things better or more easily.
</Note>
<Note type="important">
  Key information users need to know to achieve their goal.
</Note>
<Note type="warning">
  Urgent info that needs immediate user attention to avoid problems.
</Note>
<Note type="caution">
  Advises about risks or negative outcomes of certain actions.
</Note>

# Definition

<Definition
name="Note"
description="The note component."
definition={
{
"name":"props",
"content": [
{
"name":"type",
"default":"\"warning\"",
"type": "string",
"description": "The type of the alert. Can be \"note\", \"tip\", \"important\", \"warning\" or \"caution\""
},
{
"name":"<slot>",
"type": "HTMLElement",
"description": "The actual contents of the note."
},
{
"name":"style",
"default":"\"custom\"",
"type": "string",
"description": "The styling of the component. Either \"custom\" or \"github\""
},
{
"name":"class",
"type": "string",
"description": "(Optionnal) Classes to add to the alert component's outer most div"
}
]
}}
/>
