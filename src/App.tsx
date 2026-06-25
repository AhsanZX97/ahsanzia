import { useState, useRef, useEffect } from 'react'

const ACCENT = 'oklch(0.62 0.18 40)'
const GREEN  = 'oklch(0.72 0.16 150)'
const EMAIL  = 'hello@ahsanzia.dev'

const TESTS = [
  { name: 'builds web apps',       time: '0.18s' },
  { name: 'ships mobile apps',     time: '0.27s' },
  { name: 'automates the QA',      time: '0.09s' },
  { name: 'replies to your email', time: '0.04s' },
]

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
  mono: { fontFamily: "'IBM Plex Mono', monospace" },
  muted: { color: 'oklch(0.5 0.01 255)' },
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

        <TestRunner />
      </main>

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ ...s.mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', ...s.muted }}>
            Let's work together
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <EmailLink href={`mailto:${EMAIL}`}>{EMAIL}</EmailLink>
            <CopyButton onClick={copyEmail} copied={copied} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, ...s.mono, fontSize: 12, letterSpacing: '0.04em', ...s.muted, textAlign: 'right' }}>
          <span>Remote · Available worldwide</span>
          <div style={{ display: 'flex', gap: 14 }}>
            <FooterLink href="https://github.com/ahsanzia">GitHub ↗</FooterLink>
            <FooterLink href="https://linkedin.com/in/ahsanzia">LinkedIn ↗</FooterLink>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TestRunner() {
  const [passed,  setPassed]  = useState(0)
  const [running, setRunning] = useState(-1)
  const [done,    setDone]    = useState(false)
  const ct = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    ct.current = setTimeout(cycle, 700)
    return () => { if (ct.current) clearTimeout(ct.current) }
  }, [])

  function cycle() {
    setPassed(0); setRunning(-1); setDone(false)
    let i = 0
    function step() {
      if (i >= TESTS.length) {
        setRunning(-1); setDone(true)
        ct.current = setTimeout(cycle, 3800)
        return
      }
      setRunning(i)
      ct.current = setTimeout(() => {
        setPassed(i + 1); setRunning(-1)
        i++
        ct.current = setTimeout(step, 240)
      }, 480)
    }
    ct.current = setTimeout(step, 500)
  }

  const statusLabel = done ? 'PASS' : 'RUNS'
  const statusColor = done ? GREEN : ACCENT
  const failLine    = done ? '0 failing · 0.58s' : 'running…'

  return (
    <div style={{ width: '100%', maxWidth: 440, marginLeft: 'auto', background: 'oklch(0.205 0.012 255)', borderRadius: 8, overflow: 'hidden', fontFamily: "'IBM Plex Mono', monospace", boxShadow: '0 22px 48px -28px oklch(0.2 0.02 255 / 0.55)' }}>
      {/* title bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px', borderBottom: '1px solid oklch(0.3 0.01 255)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.55 0.13 30)' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.62 0.1 90)' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.62 0.11 150)' }} />
          </span>
          <span style={{ fontSize: 12, color: 'oklch(0.6 0.01 255)' }}>ahsan.test.ts</span>
        </div>
        <span style={{ fontSize: 10, letterSpacing: '0.14em', padding: '3px 9px', borderRadius: 4, color: statusColor, border: `1px solid ${statusColor}`, transition: 'color .35s, border-color .35s' }}>
          {statusLabel}
        </span>
      </div>

      {/* test rows */}
      <div style={{ padding: '18px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {TESTS.map((t, i) => {
          const status = i < passed ? 'pass' : i === running ? 'run' : 'pending'
          const icon      = status === 'pass' ? '✓' : status === 'run' ? '▸' : '·'
          const iconColor = status === 'pass' ? GREEN : status === 'run' ? ACCENT : 'oklch(0.45 0.01 255)'
          const nameColor = status === 'pending' ? 'oklch(0.5 0.01 255)' : 'oklch(0.85 0.005 255)'
          const timeColor = status === 'pass' ? 'oklch(0.62 0.01 255)' : 'oklch(0.4 0.01 255)'
          return (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              <span style={{ width: 14, textAlign: 'center', color: iconColor, transition: 'color .35s' }}>{icon}</span>
              <span style={{ color: nameColor, transition: 'color .35s', whiteSpace: 'nowrap' }}>{t.name}</span>
              <span style={{ flex: 1, borderBottom: '1px dotted oklch(0.34 0.01 255)', height: 0 }} />
              <span style={{ color: timeColor, transition: 'color .35s' }}>{t.time}</span>
            </div>
          )
        })}
      </div>

      {/* footer */}
      <div style={{ padding: '12px 16px', marginTop: 8, borderTop: '1px solid oklch(0.3 0.01 255)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: GREEN }}>✓ {passed} passing</span>
        <span style={{ ...s.muted }}>{failLine}</span>
      </div>
    </div>
  )
}

function EmailLink({ href, children }: { href: string; children: React.ReactNode }) {
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
        color: hovered ? ACCENT : 'oklch(0.235 0.012 255)',
        textDecoration: 'none',
        borderBottom: `2px solid ${hovered ? ACCENT : 'transparent'}`,
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

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? ACCENT : 'oklch(0.4 0.01 255)',
        textDecoration: 'none',
        transition: 'color 0.15s',
      }}
    >
      {children}
    </a>
  )
}
