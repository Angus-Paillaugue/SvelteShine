---
lastModified: 08-16-2024
description: Start building modern documentation in under five minutes
projectName: SvelteShine
---

<script>
  import { Collapsible, Commands } from "$lib/components";
</script>


# Getting Started

Welcome to the {projectName}! This guide will help you get started quickly with setting up and using the project. Follow these steps to clone the repository, install dependencies, run the setup script, and start editing your documentation.


## Prerequisites

Before you begin, ensure you have the following installed on your machine:
 - [Node.js](https://nodejs.org/en/download/package-manager) (version 20 or later)
 - [Git](https://git-scm.com/downloads)

## Getting Started


### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash no-line-numbers
git clone https://github.com/Angus-Paillaugue/SvelteShine
cd SvelteShine
```

### 2. Install Dependencies

Next, install the necessary dependencies by running:

<Commands commands={[{name:'npm', command:'npm install'}, {name:'pnpm', command:'pnpm install'}]} />

This will install all required packages for the project.


### 3. Run the Setup Script

Once the dependencies are installed, run the setup script to initialize your project:

```bash no-line-numbers
npm run setup
```

This script will guide you through the initial configuration of your project.


### 4. Start the Development Server

Now, start the development server to begin editing your documentation:

```bash no-line-numbers
npm run dev
```

This command will launch the SvelteKit development server, allowing you to view your documentation locally at [localhost:5173](http://localhost:5173)


### 5. Edit the Config File
With the server running, you can now edit the config file located at `project.config.js`. Here, you can customize:

 - Tailwind Colors: Set your project's primary color palette.
 - Sidebar : You can change it's style and add socials links.
 - Project Information: Update the name, description, and other metadata for your project.
 - Markdown Pages: Reference the markdown files you want to include in the sidebar.


# Features

Here are some of the key features you can use:

 - [Custom Images](/docs/Components/Images): Easily include and style images within your markdown files.
 - [Multiple Commands Selector](/docs/Components/Commands): Display multiple command options in a user-friendly format.
 - [Directory Tree](/docs/Components/Tree): Visualize file structures with collapsible directory trees.
 - [Collapsible Content](/docs/Components/Collapsible): Create sections of content that can be expanded or collapsed by the user.
 - [Dropdowns](/docs/Components/Dropdown): Add dropdown menus for compact and organized content presentation.
 - [Notes](/docs/Components/Note): Highlight important notes in the style of GitHub.
 - [Component Definition](/docs/Components/Definition): Document and showcase custom Svelte components.
 - [Tooltips](/docs/Components/Tooltip): Add tooltips to provide additional context to your content.
 - [API Reference](/docs/Components/Api-reference): Document API endpoints with detailed reference sections.
 - [Tables](/docs/Components/Tables): Create and style tables for structured data presentation.
 - [Component Preview](/docs/Components/ComponentPreview): Preview Svelte components directly within your documentation.


# Conclusion

That's it! You're now ready to start building your documentation with {projectName}. As you continue developing, you can take full advantage of the customization options and features provided by this template.

If you encounter any issues or have questions, please refer to the project's documentation (as it grows) or reach out for support.

Happy documenting!
