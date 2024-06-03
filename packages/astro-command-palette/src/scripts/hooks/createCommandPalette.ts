import type {
  CommandPaletteAction,
  CommandPaletteItem,
  CommandPaletteItemProps
} from '../../types';
import { store } from '../internals';

export const _assignID = (item: CommandPaletteItemProps) => {
  const id = Math.random().toString(16).slice(2);
  return { ...item, id } as CommandPaletteItem;
};

export const _assignActionsID = (item: CommandPaletteItemProps) => {
  return _assignID(item) as CommandPaletteAction;
};

export const createCommandPaletteItems = (items: CommandPaletteItemProps[]) => {
  const current = items.length > 0 ? items : defaultItems;

  const data = current.map(item => {
    if (item.type === 'page') {
      item.actions = item.actions.map(action => {
        return _assignActionsID(action);
      });
    }
    return _assignID(item);
  });

  store.setItems(data);
  console.log(store.getItems());
};

const defaultItems: CommandPaletteItemProps[] = [
  {
    name: 'Author',
    type: 'action',
    url: 'https://pauchiner.es',
    icon: '<svg viewBox="0 0 16 16" fill="currentColor"> <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg> '
  },
  {
    name: 'Documentation',
    type: 'action',
    icon: `<svg viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm2.25 8.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 3a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" /> </svg> `,
    url: 'https://github.com/pauchiner/astro-command-palette'
  },
  {
    name: 'Change Color Theme',
    icon: `<svg viewBox="0 0 16 16" fill="currentColor"> <path d="M12.613 1.258a1.535 1.535 0 0 1 2.13 2.129l-1.905 2.856a8 8 0 0 1-3.56 2.939 4.011 4.011 0 0 0-2.46-2.46 8 8 0 0 1 2.94-3.56l2.855-1.904ZM5.5 8A2.5 2.5 0 0 0 3 10.5a.5.5 0 0 1-.7.459.75.75 0 0 0-.983 1A3.5 3.5 0 0 0 8 10.5 2.5 2.5 0 0 0 5.5 8Z" /> </svg> `,
    type: 'page',
    actions: [
      {
        name: 'System',
        type: 'action',
        icon: '<svg viewBox="0 0 16 16" fill="currentColor"> <path fill-rule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z" clip-rule="evenodd" /> </svg> ',
        handler: () => {
          const isDark =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute(
            'data-theme',
            isDark ? 'dark' : 'light'
          );
        }
      },
      {
        name: 'Light mode',
        type: 'action',
        icon: '<svg viewBox="0 0 16 16" fill="currentColor" > <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" /> </svg>',
        handler: () => {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      },
      {
        name: 'Dark mode',
        type: 'action',
        icon: '<svg viewBox="0 0 16 16" fill="currentColor"> <path d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z" /> </svg>',
        handler: () => {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      }
    ]
  }
]

export default createCommandPaletteItems;
