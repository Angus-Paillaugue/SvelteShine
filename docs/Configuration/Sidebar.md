---
lastModified: 08-16-2024
---

<script>
  import { Definition } from "$lib/components"
</script>


<Definition
  name="sideBar"
  description="The sideBar object defining sideBar of the website."
>
  <Definition.Prop type="string" path="style" default="details" required>The style of the sidebar. Either "static" or "details".</Definition.Prop>
  <Definition.Prop type="boolean" path="develop" default="true" required>

    If the sideBar.style is set to details, this controls weather the collapsible are open (`true`) or closed (`false`) by default.
  </Definition.Prop>
  <Definition.Prop type="string" path="style" default="details" required>The style of the sidebar. Either "static" or "details".</Definition.Prop>
  <Definition.Prop type="string" path="socials" default="details" required>

    See [sideBar.socials](#definition-sideBar.socials).
  </Definition.Prop>
</Definition>

<Definition
  name="sideBar.socials"
  description="The socials object describing the socials displayed on right of the sidebar."
>
  <Definition.Prop type="string" path="target" default="_self">The target property of the social link. Can be "_blank"|"_self"|"_parent"|"_top"|"framename".</Definition.Prop>
  <Definition.Prop type="array" path="list" required>

    See [sideBar.socials.list](#definition-sideBar.socials.list).
  </Definition.Prop>
</Definition>


<Definition
  name="sideBar.socials.list"
  description="An array of socials displayed on the right of the sidebar."
>
  <Definition.Prop type="string" path="name" required>The name of the social (ex : GitHub).</Definition.Prop>
  <Definition.Prop type="string" path="url" required>The url of the social page.</Definition.Prop>
  <Definition.Prop type="boolean" path="icon">The name of the social icon.</Definition.Prop>
</Definition>
