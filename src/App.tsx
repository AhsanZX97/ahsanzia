import { useState, useRef } from 'react'

const ACCENT = 'oklch(0.62 0.18 40)'
const EMAIL = 'hello@ahsanzia.dev'

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    gap: 'clamp(28px, 5vh, 60px)',
    padding: 'clamp(26px, 4vw, 56px)',
    background: 'oklch(0.97 0.004 255)',
    color: 'oklch(0.235 0.012 255)',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  mono: {
    fontFamily: "'IBM Plex Mono', monospace",
  },
  muted: {
    color: 'oklch(0.5 0.01 255)',
  },
  border: {
    borderColor: 'oklch(0.88 0.006 255)',
  },
}

export default function App() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function copyEmail() {
    navigator.clipboard?.writeText(EMAIL).catch(() => {})
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div style={s.page}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...s.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', ...s.muted }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, border: '1px solid oklch(0.235 0.012 255)', fontWeight: 500, letterSpacing: 0, color: 'oklch(0.235 0.012 255)' }}>
            AZ
          </span>
          <span>Ahsan&nbsp;Zia</span>
          <span style={{ color: 'oklch(0.78 0.008 255)' }}>/</span>
          <span>Freelance</span>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, border: '1px solid oklch(0.86 0.006 255)', borderRadius: 999, padding: '8px 15px', ...s.mono, fontSize: 11.5, letterSpacing: '0.06em', color: 'oklch(0.4 0.01 255)', background: 'oklch(0.99 0.003 255)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, animation: 'az-pulse 2.4s ease-in-out infinite', display: 'inline-block' }} />
          Available for freelance — June 2026
        </div>
      </header>

      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(240px, 0.95fr)', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2.4vw, 30px)' }}>
          <div style={{ ...s.mono, fontSize: 13, letterSpacing: '0.04em', ...s.muted }}>
            Full-stack development · QA automation
          </div>
          <h1 style={{ margin: 0, fontWeight: 600, fontSize: 'clamp(54px, 8.6vw, 128px)', lineHeight: 0.92, letterSpacing: '-0.035em', fontFamily: "'Space Grotesk', sans-serif" }}>
            Ahsan Zia
          </h1>
          <p style={{ margin: 0, maxWidth: '48ch', fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.5, color: 'oklch(0.42 0.01 255)' }}>
            I build web and mobile apps end to end — then write the automated tests that keep them from breaking. One person, the whole pipeline: from prototype, to production, to the QA that holds it together.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid oklch(0.88 0.006 255)' }}>
          {[
            { n: '01', title: 'Web Development', sub: 'Modern web apps, front to back.' },
            { n: '02', title: 'App Development', sub: 'Native-feeling mobile, shipped.' },
            { n: '03', title: 'QA & Automation',  sub: "Tests that catch it before your users do." },
          ].map(({ n, title, sub }) => (
            <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: 'clamp(14px, 1.6vw, 20px) 0', borderBottom: '1px solid oklch(0.88 0.006 255)' }}>
              <span style={{ ...s.mono, fontSize: 12, color: ACCENT, minWidth: 24 }}>{n}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 'clamp(17px, 1.5vw, 21px)', fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</span>
                <span style={{ fontSize: 14, ...s.muted }}>{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ ...s.mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', ...s.muted }}>
            Let's work together
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <EmailLink href={`mailto:${EMAIL}`} accent={ACCENT}>
              {EMAIL}
            </EmailLink>
            <CopyButton onClick={copyEmail} copied={copied} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, ...s.mono, fontSize: 12, letterSpacing: '0.04em', ...s.muted, textAlign: 'right' }}>
          <span>Remote · Available worldwide</span>
          <div style={{ display: 'flex', gap: 14 }}>
            <FooterLink href="https://github.com/ahsanzia" accent={ACCENT}>GitHub ↗</FooterLink>
            <FooterLink href="https://linkedin.com/in/ahsanzia" accent={ACCENT}>LinkedIn ↗</FooterLink>
          </div>
        </div>
      </footer>
    </div>
  )
}

function EmailLink({ href, accent, children }: { href: string; accent: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 'clamp(26px, 3.6vw, 46px)',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: hovered ? accent : 'oklch(0.235 0.012 255)',
        textDecoration: 'none',
        borderBottom: `2px solid ${hovered ? accent : 'transparent'}`,
        transition: 'border-color 0.15s, color 0.15s',
      }}
    >
      {children}
    </a>
  )
}

function CopyButton({ onClick, copied }: { onClick: () => void; copied: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12,
        letterSpacing: '0.04em',
        color: hovered ? 'oklch(0.235 0.012 255)' : 'oklch(0.4 0.01 255)',
        background: 'transparent',
        border: `1px solid ${hovered ? 'oklch(0.5 0.01 255)' : 'oklch(0.84 0.006 255)'}`,
        borderRadius: 999,
        padding: '8px 14px',
        transition: 'border-color 0.15s, color 0.15s',
      }}
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}

function FooterLink({ href, accent, children }: { href: string; accent: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? accent : 'oklch(0.4 0.01 255)',
        textDecoration: 'none',
        transition: 'color 0.15s',
      }}
    >
      {children}
    </a>
  )
}
