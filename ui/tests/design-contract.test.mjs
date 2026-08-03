import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const tokens = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')
const styles = await readFile(new URL('../src/styles/components.css', import.meta.url), 'utf8')
const registry = JSON.parse(await readFile(new URL('../registry.json', import.meta.url), 'utf8'))
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))

test('continuous squircle corners are the default Orbit geometry', () => {
  assert.match(tokens, /--u-corner-shape:\s*squircle;/)
  assert.match(styles, /\.orbit-ui[^{}]*\.unified-session[^{}]*\{\s*corner-shape:\s*var\(--u-corner-shape, squircle\);\s*\}/)
})

test('buttons use the shared rounded control geometry', () => {
  assert.match(tokens, /--u-radius-button:\s*18px;/)
  assert.match(tokens, /--u-radius-button-compact:\s*15px;/)
  assert.match(tokens, /--u-radius-icon-button:\s*17px;/)
  assert.match(styles, /\.u-button\s*\{[^{}]*border-radius:\s*var\(--u-radius-button, 18px\);/)
  assert.match(styles, /\.u-button--compact\s*\{[^{}]*border-radius:\s*var\(--u-radius-button-compact, 15px\);/)
  assert.match(styles, /\.u-icon-action\s*\{[^{}]*border-radius:\s*var\(--u-radius-icon-button, 17px\);/)
})

test('alerts use the shared continuous-corner geometry', () => {
  assert.match(tokens, /--u-radius-alert:\s*20px;/)
  assert.match(tokens, /--u-radius-alert-prominent:\s*24px;/)
  assert.match(styles, /\.u-alert\s*\{[^{}]*border-radius:\s*var\(--u-radius-alert, 20px\);/)
  assert.match(styles, /\.u-alert--prominent\s*\{[^{}]*border-radius:\s*var\(--u-radius-alert-prominent, 24px\);/)
})

test('true circles and capsules retain round geometry', () => {
  assert.match(tokens, /--u-corner-shape-round:\s*round;/)
  assert.match(styles, /\.u-badge[^{}]*\.u-avatar[^{}]*\{\s*corner-shape:\s*var\(--u-corner-shape-round, round\);\s*\}/)
})

test('the smallest readable interface label starts at twelve pixels', () => {
  assert.match(tokens, /--u-text-xs:\s*0\.75rem;/)
  assert.match(tokens, /--u-text-sm:\s*0\.875rem;/)
})

test('the public package exposes typed, directly importable components', () => {
  for (const name of ['alert', 'avatar', 'badge', 'button', 'icon', 'icon-action', 'progress', 'section-title', 'surface', 'view-heading', 'cn']) {
    const entry = packageJson.exports[`./${name}`]
    assert.ok(entry, `missing package export: ${name}`)
    assert.match(entry.types, /^\.\/dist\/types\//)
    assert.match(entry.import, new RegExp(`^\\./dist/${name}\\.js$`))
    assert.match(entry.require, new RegExp(`^\\./dist/${name}\\.cjs$`))
  }
})

test('the documentation shell is a typed package entry for SSR hosts', () => {
  const entry = packageJson.exports['./docs']
  assert.ok(entry)
  assert.equal(entry.types, './dist/types/docs.d.ts')
  assert.equal(entry.import, './dist/docs.js')
  assert.equal(entry.require, './dist/docs.cjs')
  assert.equal(packageJson.exports['./docs.css'], './dist/docs.css')
})

test('the shadcn source registry references real TypeScript and style files', async () => {
  assert.equal(registry.$schema, 'https://ui.shadcn.com/schema/registry.json')
  assert.ok(registry.items.some((item) => item.name === 'orbit-theme'))
  assert.ok(registry.items.some((item) => item.name === 'alert'))
  assert.ok(registry.items.some((item) => item.name === 'button'))

  for (const item of registry.items) {
    assert.ok(item.name)
    assert.ok(item.description)
    for (const file of item.files) {
      await access(new URL(`../${file.path}`, import.meta.url))
    }
  }
})
