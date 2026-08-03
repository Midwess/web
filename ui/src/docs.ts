export { UnifiedSession } from './features/unified/UnifiedSession'
export type {
  UnifiedSessionProps,
  UnifiedTheme,
} from './features/unified/UnifiedSession'
export { blockCatalog, componentCatalog } from './features/unified/docs/catalog'

import { blockCatalog, componentCatalog } from './features/unified/docs/catalog'

export const documentationPaths = [
  ...componentCatalog.map((item) => `/components/${item.slug}`),
  ...blockCatalog.map((item) => `/blocks/${item.slug}`),
]
