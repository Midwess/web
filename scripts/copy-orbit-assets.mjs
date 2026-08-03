#!/usr/bin/env node
import { cp, mkdir } from 'node:fs/promises'

const sourceRoot = new URL('../ui/public/', import.meta.url)
const targetRoot = new URL('../dist/ui/', import.meta.url)

await mkdir(targetRoot, { recursive: true })

for (const directory of ['restaurant', 'work-os']) {
  await cp(
    new URL(`${directory}/`, sourceRoot),
    new URL(`${directory}/`, targetRoot),
    { recursive: true },
  )
}

console.log('[copy-orbit-assets] copied Orbit demonstration assets to dist/ui/')
