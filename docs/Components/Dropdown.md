---
lastModified: 08-17-2024
---

<script>
  import { Dropdown, ComponentPreview } from "$lib/components";
</script>

<ComponentPreview>

  <Dropdown>
    <Dropdown.Trigger type="ghost">
      Open
    </Dropdown.Trigger>
    {#snippet items()}
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
    {/snippet}
  </Dropdown>

</ComponentPreview>
