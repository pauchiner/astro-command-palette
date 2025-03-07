export { default as CommandPalette } from './components/Component.astro'
export { createCommandPaletteItems } from './scripts/hooks/createCommandPalette'

export type {
	CommandPaletteItem,
	CommandPaletteItemProps,
	CommandPaletteActionProps,
	CommandPalettePage,
	CommandPaletteAction,
	CommandPaletteLinkAction,
	CommandPaletteButtonAction,
	CommandPaletteBaseItem,
	CommandPaletteItemType
} from './types'
