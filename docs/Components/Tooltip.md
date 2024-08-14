---
lastModified: 08-14-2024
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

## With long text

Lorem ipsum <Tooltip title="dolor sit">I'm a long text to test the capability of this tooltip component. This text could continue forever and it would't matter.</Tooltip> amet consectetur.

# Definition

<Definition
  name="Tooltip"
  description="The tooltip component."
>
  <Definition.Prop type="string" path="title" required>The text shown that, when hovered, reveals the content of the tooltip.</Definition.Prop>
  <Definition.Prop type="HTMLElement" path="<slot>" required>The content of the tooltip.</Definition.Prop>
  <Definition.Prop type="string" path="position" default="top">The position of the tooltip. Can be either "top", "right", "bottom" or "right".</Definition.Prop>
</Definition>
