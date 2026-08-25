# Orbit UI

Orbit UI is a composable React and TypeScript component library built from the merged Restaurant Operations and Work OS design studies. The package provides reusable primitives; the Vite documentation app demonstrates components and full product blocks in dark and light themes.

## Install

```bash
npm install @midwess/orbit-ui
```

Import the package stylesheet once at the application root:

```tsx
import '@midwess/orbit-ui/styles.css'
```

Then import only the component entry points an application uses:

```tsx
import { Badge } from '@midwess/orbit-ui/badge'
import { Button } from '@midwess/orbit-ui/button'
import { Logo } from '@midwess/orbit-ui/logo'
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from '@midwess/orbit-ui/alert'
import { Surface } from '@midwess/orbit-ui/surface'

export function Example() {
  return (
    <section className="orbit-ui" data-orbit-theme="dark">
      <Logo motion="trace" />
      <Surface tone="coral">
        <Badge>Operations</Badge>
        <h2>Evening service is ready</h2>
        <Button tone="neutral">Open brief</Button>
      </Surface>
      <Alert tone="warning">
        <AlertContent>
          <AlertTitle>Inventory risk</AlertTitle>
          <AlertDescription>Oat milk is below the safety level.</AlertDescription>
        </AlertContent>
      </Alert>
    </section>
  )
}
```

The typed root export remains available for convenience, while component
subpaths keep application imports explicit and independently consumable.

Documentation hosts can render the exact Orbit catalog through the dedicated
SSR-safe entry instead of duplicating its pages:

```tsx
import { UnifiedSession } from '@midwess/orbit-ui/docs'
import '@midwess/orbit-ui/docs.css'

<UnifiedSession basePath="/ui" initialPath="/ui/components/alert" />
```

## Install source with shadcn

Orbit is also a public shadcn-compatible GitHub registry. Copy a component and
its declared dependencies into an application with:

```bash
npx shadcn@latest add Midwess/orbit-ui/alert
```

Registry consumers own the installed TypeScript source. Package consumers use
the compiled npm artifacts; both modes share the same components and tokens.

## Development

```bash
npm install
npm run dev
npm run build
```

`npm run build` type-checks the project, builds the distributable package into `dist/`, emits TypeScript declarations, and builds the documentation site into `docs-dist/`.

## Package structure

```text
src/index.ts             Typed root package entry point
src/components/ui/       Directly importable TypeScript components
src/lib/                 Dependency-free component utilities
src/styles/              Tokens and distributable component styles
src/features/unified/    Documentation catalog and reusable product blocks
registry.json            shadcn-compatible GitHub source registry
public/                  Demonstration imagery used by documentation blocks
```

The public package exports `Alert`, `Button`, `IconAction`, `Logo`, `Surface`, `Badge`, `Avatar`,
`AvatarGroup`, `ProgressBar`, `ViewHeading`, `SectionTitle`, `Icon`, and `cn`
through both typed root exports and component subpaths.

## Design principles

- Compose explicit component variants instead of accumulating boolean modes.
- Keep product blocks independent from documentation-shell state.
- Use semantic HTML and preserve keyboard, focus, status, and reduced-motion behavior.
- Treat continuous G2-style squircle corners as a system requirement for every rounded rectangle; reserve round corners for true circles and capsules.
- Use the shared button-radius tokens for standard, compact, and icon actions so control geometry stays consistent across products.
- Reserve orange for primary decisions; use coral, violet, cyan, sage, and yellow for category and context.
- Support both `data-orbit-theme="dark"` and `data-orbit-theme="light"`.

## License

[MIT](LICENSE)
