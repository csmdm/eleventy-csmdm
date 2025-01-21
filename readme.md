# CSM Duilio Marcante

New website for **CSM Duilio Marcante**, based on [Eleveny Excellent](https://github.com/madrilene/eleventy-excellent) starter.

Preview: https://csmdm.netlify.app

**Find detailed docs here: https://eleventy-excellent.netlify.app/get-started/**

## Development

Use at least version 20 of nodejs.

### Install dependencies

```bash
npm install
```

### Working locally

Starts watch tasks to compile when changes detected. Saves the global CSS file as external CSS for refresh without page reload.

```bash
npm start
```

### Starting the CMS

```bash
npx decap-server
```

Both eleventy and decap-server must be started, then acces the CMS at <http://localhost:8080/admin>.

### Creating a production build

Minify JS, CSS and HTML. Inlines the global CSS file for fastest site performance in production. **Also, drafts are excluded.**

```bash
npm run build
```

## Add a blog post

In all language directories, add a new markdown file to the `posts` directory. The front matter should look like this:

```yaml
---
title: Example blog post
date: 2024-07-11
key: 'example-blog' # this sets the translation relationship. Must be identical on all sides, and unique for only this relationship. if the key is not set, the file name must be identical in both languages.
excerpt: The excerpt is used as a preview text in all archive views and as a meta description
tags:
  - example
author: andrea # This is the author's key from the _data/authors.js file
image: # This sets a dedicated blog post image
  src: './src/assets/images/blog/blog-image.jpg' #
  alt: 'a description of the image' # This is the alt text for the image. It can be left empty if the image is purely decorative.
---
```

You can also adjust how this post is displayed in the meta tags (for search engines, preview etc.):

```yaml
---
discover:
  title: 'This replaces the content of the <head> HTML element.'
  description: '.This replaces the content of the <de> HTML element.'
---
```

### Permalinks

The is determined by the file name. to overwrite, set a custom permalink in the front matter. Remember to include the language code, subdirectories and the file name index.html.

```yaml
---
permalink: '/fr/blog/custom-permalink-string/index.html'
---
```

### Drafts

In development (`npm run start`), you can preview posts that won't be published in production (`npm run build`) by setting `draft: true` in the front matter.

```yaml
---
draft: true
---
```

### Front Matter gotchas

#### Indentation

Correct indentation and string handling are crucial for defining metadata for your templates. YAML requires consistent indentation using spaces (not tabs) to represent hierarchy. Typically, two spaces per indentation level are used. Indentation is used to denote structure. For example, sub-properties should be indented under their parent properties.

```yaml
title: My Blog Post
image:
  src: './src/assets/images/blog/cern-meetup.jpg'
  alt: "Un éléphant réaliste traverse un hémisphère, avec l'icône de l'atome à sa gauche et à sa droite."
```

#### Handling Strings

In YAML, you can use single quotes (') or double quotes ("). Single quotes will treat the content literally, while double quotes allow for escape sequences (like \n for a newline).

```yaml
a-key: 'Learning about "YAML Syntax"'
another-key: 'She said, "Hello, YAML!"'
yet-one-more-key: "It's easy once you get the hang of it"
```

## CSS methodology

This project uses the [CUBE CSS methodology](https://cube.fyi/). CUBE stands for "Composition Utility Block Exception". Inspired by BEM, it embraces the cascade and its main principle ist simplicity.

First comes a modern CSS reset and the main elements of the design system: the fonts, variables (colors, spacing etc.) and a set of globally valid low-specificity rules.

- The **composition** layer controls the overall layout and rhythm of elements. Think of the composition as a skeleton.
- The **block** applies a collection of design tokens within a concise group. It styles the button and athe card for example.
- **Utilities** apply a single CSS property, or a concise group of related properties to create re-usable helpers.
- An **exception** is a deviation from the rules outlined in a block and is is related to a state change.

### Design tokens

Edit all preferences (colors, fluid text sizes etc.) in `src/_data/designTokens/*.json`. This project uses Tailwind to generates utility classes on demand. It uses the utils functions in the `_config` direcotory (`clampGenerator` and `tokensToTailwind`) to generate CSS clamp values for fluid type and space and converts whatever the design tokens into Tailwind friendly configuration objects. We get a block of custom Properties, based on design tokens. Also, we get custom utilities that we can use in markup, such as `gutter-m` or `flow-space-s`.

### Edit and add CSS

Add and delete your globally available custom block stylesheets in `src/assets/css/global/blocks/*.css`.

You can add per-page or component bundles of CSS. Instead of adding your CSS file to the `src/assets/css/global/blocks/` directory, you can place them in `src/assets/css/bundle/`. All CSS files in there will be stored alongside `global.css` in `.src/_includes/css/`. You can now include them in the "inline" bundle only on pages or components where you need them:

```
{% css "inline" %}
  {% include "css/your-stylesheet.css" %}
{% endcss %}
```

## Fonts

You can add or delete fonts in `src/assets/fonts`.

Next, edit `src/assets/css/global/base/fonts.css`.

Add your new font aliases in `src/_data/designTokens/fonts.json`.

Finally, in `src/_includes/head/preloads.njk` edit the font preloads if necessary.

## JavaScript

This starter has **no real JS dependency**. If JavaScript is not available, components that rely on it -- like the theme switcher -- will be hidden. In case of the drawer menu, pills will be shown instead.

There are two kinds of bundles for JavaScript in this starter, see `.src/_includes/head/js-inline.njk` and `.src/_includes/head/js-defer.njk`.
By default, we include Eleventy's [is-land](https://github.com/11ty/is-land) framework and the theme toggle inline.

You can include more scripts like so:

```
{% js "inline" %}
  {% include "scripts/your-inline-script.js" %}
{% endjs %}
```

Same goes for scripts that should be defered:

```
{% js "defer" %}
  {% include "scripts/your-defered-script.js" %}
{% endjs %}
```

Scripts stored in `src/assets/scripts/components/` are sent to the output folder, while scripts in `src/assets/scripts/bundle/` are sent to `.src/_includes/scripts/`, from where you can include them in the respective bundle.

## SVG

All SVG icons used in the starter are in `src/assets/svg`. There is a directory dedicated to the dividers, the platform icons and a general folder called "misc".

**Shortcode**

The `svg.js` shortcode allows for the seamless inclusion of SVG files. Located in `src/_config/shortcodes/svg.js`, this shortcode requires only the folder and file name of the SVG, omitting the file extension. By default, SVGs are injected with an `aria-hidden="true"` attribute. The SVGs should be stored in the `src/assets/svg` directory, and referenced using the format `"folder/svg-name"`.

```
{% svg "path", "aria-name", "class-name", "inline-style" %}
{% svg "misc/star", "A yellow star icon", "spin", "block-size: 4ex; fill: var(--color-tertiary);" %}
```

The star icon resoves to:

`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24" aria-label="A yellow star icon" style="block-size: 4ex; fill: var(--color-tertiary)" class="spin"><path> (...) </path></svg>`

## Images

This starter uses Eleventy's build-time image transformations.

Find more info on https://www.11ty.dev/docs/plugins/image/ and edit settings in `src/_config/shortcodes/image`.

### Syntax

In the most basic version it contains the path to the image, alt text (can be an empty string if the image is decorative)

```
{% image "path to image", "alt text" %}
```

It defaults to `loading = 'lazy'`, the picture element gets its set of images from `widths = [580, 960, 1240]` and compares to a condition of `90vw`.

If you want to be very specific, you can pass in manually all the conditions, add `null` to skip.

The class names are passed in the outer container, the `<picture>` or `<figure>` element (`<figure>` is added if you set a caption).

```
{% image "path to image", "alt text", "caption text", "eager", "class names", "(min-width:30em) 50vw, 100vw", [200, 400] %}

{% image "path to image", "alt text", null, "eager" %}
```

### Markdown syntax

Thanks to the [markdown-it-eleventy-img](https://github.com/solution-loisir/markdown-it-eleventy-img) package markdown also has it own image syntax. `src` is already prepended here, see `config/plugins/markdown.js`.

#### Picture element

```markdown
![alt text](/path/to/image)
```

#### Figure element with caption

```markdown
![alt text](/path/to/image 'caption text')
```

## Open Graph images

When you share a blog post, a thumbnail image appears.

This project generates these images for blog posts automatically. They take in the title and date of the post. The fallback and default image for all other pages is the image set as `opengraph_default`in the `meta.js` global data file.

For the moment, **the images are created in development**. That is because if the system executing the build has not installed the brand font, it will not be used.

The steps to create a new blog post in both languages with an OG image are:

- create the blog post in both languages, with a unique title.
- run dev mode before, while or after (`npm run dev`)
- The directory `src/assets/og-images` is created, a new image is added (called `lang-frontmatter-title-preview.jpeg`, for example `en-welcome-to-the-new-data-bene-blog-preview.jpeg`). If you did not make any changes to other post titles, only the new images are to be be committed.
- Run `npm run build`. The new images get added to the production build.
- Sync with server.

## Config directory

All configuration settings are divided into small thematic areas: separate modules in `src/_config` which are imported into the main configuration file.

- **collections.js**: Manages Eleventy collections such as posts and tags: https://www.11ty.dev/docs/collections/
- **events.js**: For code that should run at certain times during the compiling process: https://www.11ty.dev/docs/events/
- **filters.js**: Used within templating syntax to transform data into a more presentable format: https://www.11ty.dev/docs/filters/
- **plugins.js**: Everything I or Eleventy considers to be a plugin: https://www.11ty.dev/docs/plugins/
- **shortcodes.js**: Defines shortcodes for reusable content: https://www.11ty.dev/docs/shortcodes/
- **utils**: The utils directory is not meant for the Eleventy config file, but for internal configuration reuse.

Each configuration category (filters, plugins, shortcodes, etc.) is modularized. or example, `dates.js` within the `filters` folder contains date-related filters.

```js
import dayjs from 'dayjs';

export const toISOString = dateString => dayjs(dateString).toISOString();
export const formatDate = (date, format) => dayjs(date).format(format);
```

These individual modules are then imported and consolidated in a central `filters.js` file, which exports all the filters as a single default object.

```js
import {toISOString, formatDate} from './filters/dates.js';
// more imports

export default {
  toISOString,
  formatDate
  // more exports
};
```

### Integration in Eleventy Config

In the main Eleventy configuration file (`eleventy.config.js`), these modules are imported:

```js
import filters from './src/_config/filters.js';
import shortcodes from './src/_config/shortcodes.js';
```

They are then used to register filters and shortcodes with Eleventy, using this nice concise syntax:

```js
eleventyConfig.addFilter('toIsoString', filters.toISOString);
eleventyConfig.addFilter('formatDate', filters.formatDate);
// More filters...
eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
```

This method hopefully keeps the Eleventy config clean and focused, only concerning itself with the registration of functionalities, while the logic and definition remain abstracted in their respective modules.

See also: [how to organize the Eleventy configuration file](https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/).
