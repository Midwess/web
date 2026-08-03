import { useState, type ReactNode } from 'react'
import { Icon } from '../../../components/ui/icon'

export function DemoCard({ title, description, code, children, className = '' }: { title: string; description?: string; code: string; children: ReactNode; className?: string }) {
  const [showCode, setShowCode] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    window.setTimeout(() => setCopyState('idle'), 1800)
  }

  return <article className={`u-demo-card ${className}`}>
    <div className="u-demo-canvas">{showCode ? <pre><code>{code}</code></pre> : children}</div>
    <footer><div><b>{title}</b>{description ? <span>{description}</span> : null}</div><div><button onClick={copyCode} aria-label={`Copy ${title} code`}><Icon name={copyState === 'copied' ? 'check' : 'layers'} size={16} /><span className="u-copy-label" aria-live="polite">{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy'}</span></button><button onClick={() => setShowCode((current) => !current)} aria-pressed={showCode}>{showCode ? 'View preview' : 'View code'}</button></div></footer>
  </article>
}
