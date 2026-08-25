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
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/docs.ts'),
      name: 'OrbitUIDocs',
      formats: ['es', 'cjs'],
      fileName: (format) => `docs.${format === 'es' ? 'js' : 'cjs'}`,
      cssFileName: 'docs',
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
