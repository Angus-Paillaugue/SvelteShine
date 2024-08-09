---
name: Tooltip
description: Easley use tooltips
lastModified: 07-25-2024
---

# Creating a tooltip

You can add a tooltip to some text by wrapping it into a `<span>` and adding a `data-tooltip="content"` attribute to it like so :

```svelte
<p>
  Lorem ipsum dolor sit amet, <span data-tooltip="This does not mean anything" class="font-bold"
    >adipisicing elit</span
  >.
</p>
```

And here is the result :

<p>
  Lorem ipsum dolor sit amet, <span data-tooltip="This does not mean anything" class="font-bold">adipisicing elit</span>.
</p>

<div class="grid grid-cols-4 gap-4 w-fit">
  <p data-tooltip="Tooltip content" tabindex="0" class="text-center">
    Top
  </p>

  <p data-tooltip="Tooltip content" tabindex="0" class="tooltip-left text-center">
    Left
  </p>

  <p data-tooltip="Tooltip content" tabindex="0" class="tooltip-right text-center">
    Right
  </p>

  <p data-tooltip="Tooltip content" tabindex="0" class="tooltip-bottom text-center">
    Bottom
  </p>

  <p data-tooltip="Tooltip content" tabindex="0" class="text-center tooltip-small">
    Small Top
  </p>

  <p data-tooltip="Tooltip content" tabindex="0" class="tooltip-left tooltip-small text-center">
    Small Left
  </p>

  <p data-tooltip="Tooltip content" tabindex="0" class="tooltip-right tooltip-small text-center">
    Small Right
  </p>

  <p data-tooltip="Tooltip content" tabindex="0" class="tooltip-bottom tooltip-small text-center">
    Small Bottom
  </p>
</div>
