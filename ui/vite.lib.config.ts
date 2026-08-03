import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        alert: resolve(import.meta.dirname, 'src/components/ui/alert.tsx'),
        avatar: resolve(import.meta.dirname, 'src/components/ui/avatar.tsx'),
        badge: resolve(import.meta.dirname, 'src/components/ui/badge.tsx'),
        button: resolve(import.meta.dirname, 'src/components/ui/button.tsx'),
        icon: resolve(import.meta.dirname, 'src/components/ui/icon.tsx'),
        'icon-action': resolve(import.meta.dirname, 'src/components/ui/icon-action.tsx'),
        progress: resolve(import.meta.dirname, 'src/components/ui/progress.tsx'),
        'section-title': resolve(import.meta.dirname, 'src/components/ui/section-title.tsx'),
        surface: resolve(import.meta.dirname, 'src/components/ui/surface.tsx'),
        'view-heading': resolve(import.meta.dirname, 'src/components/ui/view-heading.tsx'),
        cn: resolve(import.meta.dirname, 'src/lib/cn.ts'),
      },
      name: 'OrbitUI',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
})
