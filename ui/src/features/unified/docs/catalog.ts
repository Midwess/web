import type { IconName } from '../../../components/ui/icon'

export type CatalogSection = 'components' | 'blocks'

export type CatalogItem = {
  slug: string
  label: string
  count: number
  description: string
  icon: IconName
}

export const componentCatalog: CatalogItem[] = [
  { slug: 'select', label: 'Select', count: 6, icon: 'chevron', description: 'Accessible option pickers for simple, grouped, and operational choices.' },
  { slug: 'button', label: 'Button', count: 8, icon: 'arrow', description: 'Purposeful actions with clear hierarchy, useful sizing, and visible states.' },
  { slug: 'input', label: 'Input & Field', count: 5, icon: 'search', description: 'Inputs, search fields, labels, descriptions, and validation states.' },
  { slug: 'accordion', label: 'Accordion', count: 3, icon: 'chevron', description: 'Progressive disclosure for dense guidance, settings, and supporting information.' },
  { slug: 'alert', label: 'Alert', count: 4, icon: 'warning', description: 'Contextual feedback for operational success, warnings, errors, and neutral updates.' },
  { slug: 'badge', label: 'Badge', count: 5, icon: 'sparkles', description: 'Compact semantic signals for statuses, progress, and metadata.' },
  { slug: 'avatar', label: 'Avatar', count: 4, icon: 'users', description: 'Individual and grouped identity treatments with useful fallbacks.' },
  { slug: 'checkbox', label: 'Checkbox', count: 4, icon: 'check', description: 'Independent selection controls for tasks, preferences, and bulk actions.' },
  { slug: 'combobox', label: 'Combobox', count: 3, icon: 'search', description: 'Searchable selection for long lists of people, locations, and commands.' },
  { slug: 'dialog', label: 'Dialog', count: 3, icon: 'layers', description: 'Focused modal workflows for decisions that require additional context.' },
  { slug: 'file-upload', label: 'File Upload', count: 3, icon: 'plus', description: 'Dropzone and file selection patterns with immediate filename feedback.' },
  { slug: 'calendar', label: 'Calendar', count: 3, icon: 'calendar', description: 'Compact date selection for schedules, ranges, and operational planning.' },
  { slug: 'rating', label: 'Rating', count: 3, icon: 'sparkles', description: 'Interactive sentiment input for reviews, quality checks, and feedback.' },
  { slug: 'skeleton', label: 'Skeleton', count: 3, icon: 'layers', description: 'Content-shaped loading placeholders that preserve page structure.' },
  { slug: 'stepper', label: 'Stepper', count: 3, icon: 'arrow', description: 'Guided multi-step progress for onboarding and complex submissions.' },
  { slug: 'switch', label: 'Switch', count: 4, icon: 'settings', description: 'Immediate on/off preferences with clear labels and supporting context.' },
  { slug: 'tabs', label: 'Tabs', count: 3, icon: 'layers', description: 'Direct navigation between a small number of related content views.' },
  { slug: 'timeline', label: 'Timeline', count: 3, icon: 'clock', description: 'Sequential events for activity, project milestones, and operational history.' },
  { slug: 'progress', label: 'Progress', count: 4, icon: 'chart', description: 'Linear status indicators for setup, capacity, and task completion.' },
  { slug: 'card', label: 'Card & Surface', count: 6, icon: 'bag', description: 'Composable surfaces using the merged editorial color language.' },
]

export const blockCatalog: CatalogItem[] = [
  { slug: 'dashboard', label: 'Dashboard', count: 4, icon: 'home', description: 'Operational summaries combining metrics, charts, tasks, and AI guidance.' },
  { slug: 'chat', label: 'Chat workspace', count: 3, icon: 'sparkles', description: 'A scrollable multi-pane conversation experience for people and AI.' },
  { slug: 'list', label: 'Data list', count: 5, icon: 'calendar', description: 'Searchable and filterable operational lists with bulk actions.' },
  { slug: 'team', label: 'Team board', count: 3, icon: 'users', description: 'Capacity summaries and a workflow board for live team status.' },
  { slug: 'work-os', label: 'Work OS collection', count: 6, icon: 'sparkles', description: 'Media-rich chat, editorial imagery, AI summaries, and focused productivity widgets.' },
  { slug: 'component-library', label: 'System overview', count: 1, icon: 'settings', description: 'A composed overview of tokens, controls, forms, and semantic states.' },
]

export function getCatalog(section: CatalogSection) {
  return section === 'components' ? componentCatalog : blockCatalog
}
