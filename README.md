<p align="center">
  <img alt="Astro Command Palette" src="./.github/assets/logo-light.svg#gh-light-mode-only">
  <img alt="Astro Command Palette" src="./.github/assets/logo-dark.svg#gh-dark-mode-only">
</p>
<p align="center">
  A minimal command palette for <a href="https://astro.build">Astro</a> with 0 dependencies.
  <img width="700" alt="Showcase" src="./.github/assets/showcase-light.png#gh-light-mode-only">
  <img width="700" alt="Showcase" src="./.github/assets/showcase-dark.png#gh-dark-mode-only">
</p>

# Getting Started

## 🛠️ Installation
```bash
npm install astro-command-palette
```

## 🚀 Usage
Just by importing the component and putting inside the body, your command palette is already working.

```astro
---
import CommandPalette from 'astro-command-palette';
---

<body>
  <CommandPalette />
</body>
```

### 💨 Creating Actions
```html
<script>
  import createCommandPaletteItems from 'astro-command-palette/hooks';
  
  createCommandPaletteItems([
    {
      type: 'action',
      name: 'My New Action',
      icon: '<svg>...</svg>', // Optional
      handler: () => console.log("Hello Word!")
    },
    // A link action without icon
    {
      type: 'action',
      name: 'My New Link',
      url: 'https://github.com'
    }
  ])
</script>
```

### 📄 Creating Pages
You can also define nested pages with more actions:

```html
<script>
  import createCommandPaletteItems from 'astro-command-palette/hooks';
  
  createCommandPaletteItems([
    {
      type: 'page',
      name: 'My New Page',
      icon: '<svg>...</svg>', // Optional
      actions: [/* Define the actiions inside your new page */]
    }
])
</script>
```


### 🎨 Styling
By the moment the only way to customize the command palette is with css variables:

| CSS Variable                              | Description                                             |
| ----------------------------------------  | ------------------------------------------------------- |
| `--command-palette-bg-color`              | Background color of the command palette modal           |
| `--command-palette-border-radius`         | Border radius of the command palette                   |
| `--command-palette-border-color`          | Border color of the command palette                    |
| `--command-palette-backdrop-color`        | Background color of the backdrop overlay                |
| `--command-palette-header-font-size`      | Font size of the command palette header                 |
| `--command-palette-header-bg-color`       | Background color of the header                          |
| `--command-palette-header-text-color`     | Text color of the header                                |
| `--command-palette-header-font-family`    | Font family of the header                               |
| `--command-palette-header-placeholder-color` | Text color of the placeholder text in the input field |
| `--command-palette-icons-color`           | Color of the icons in command items                     |
| `--command-palette-items-selected`        | Background color of selected items                     |
| `--command-palette-items-font-size`       | Font size of the command items                          |
| `--command-palette-items-text-color`      | Text color of the command items                         |
| `--command-palette-items-font-family`     | Font family of the command items                        |
| `--command-palette-footer-bg-color`       | Background color of the footer                          |
| `--command-palette-keybinds-bg-color`     | Background color of the keybinds section                |
| `--command-palette-footer-text-color`     | Text color of the footer                                |
| `--command-palette-footer-font-family`    | Font family of the footer                               |
| `--command-palette-keybinds-text-color`   | Text color of the keybinds                              |
| `--command-palette-keybinds-font-family`  | Font family of the keybinds                             |
| `--command-palette-keybinds-border-radius` | Border radius of the keybinds                          |

## 🤝 Contributing

All contributions are welcome:

[CONTRIBUTING.md](CONTRIBUTING.md)

[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)


<div align="center">
    <sup>With 🧡 by Pau García Chiner</sup>
</div>
