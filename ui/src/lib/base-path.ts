import { createContext, createElement, useContext, type ReactNode } from 'react'

const defaultBasePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const BasePathContext = createContext(defaultBasePath)

export function normalizeBasePath(basePath = defaultBasePath) {
  if (!basePath || basePath === '/') return ''
  return `/${basePath.replace(/^\/+|\/+$/g, '')}`
}

export function withBasePath(path: string, basePath = defaultBasePath) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizeBasePath(basePath)}${normalizedPath}` || '/'
}

export function withoutBasePath(pathname: string, basePath = defaultBasePath) {
  const normalizedBasePath = normalizeBasePath(basePath)
  if (!normalizedBasePath || !pathname.startsWith(`${normalizedBasePath}/`) && pathname !== normalizedBasePath) return pathname
  return pathname.slice(normalizedBasePath.length) || '/'
}

export function BasePathProvider({ basePath, children }: { basePath?: string; children: ReactNode }) {
  return createElement(
    BasePathContext.Provider,
    { value: normalizeBasePath(basePath) },
    children,
  )
}

export function useBasePath() {
  return useContext(BasePathContext)
}
