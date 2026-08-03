import { UnifiedSession } from '@midwess/orbit-ui/docs'
import '@midwess/orbit-ui/docs.css'
import { useLocation } from 'react-router-dom'
import { SeoHead } from '@/lib/seo'

export default function OrbitUI() {
  const location = useLocation()

  return (
    <>
      <SeoHead
        title="Orbit UI"
        description="Orbit’s React and TypeScript component library, design language, and product blocks."
        path={location.pathname}
      />
      <UnifiedSession
        basePath="/ui"
        initialPath={location.pathname}
        initialTheme="dark"
      />
    </>
  )
}
