import { useState, useRef, useEffect } from 'react'
import FindComedyImg from './assets/FindComedy.png'
import FightNightImg from './assets/FightNight.png'
import TrollFaceImg  from './assets/Face Maker.png'

const ACCENT = 'oklch(0.62 0.18 40)'
const GREEN  = 'oklch(0.72 0.16 150)'
const EMAIL  = 'ahsan97@hotmail.co.uk'

const TESTS = [
  { name: 'builds web apps',       time: '0.18s' },
  { name: 'ships mobile apps',     time: '0.27s' },
  { name: 'automates the QA',      time: '0.09s' },
  { name: 'AI tooling & integration', time: '0.03s' },
  { name: 'replies to your email', time: '0.04s' },
]

const SKILLS: { label: string; tags: string[] }[] = [
  { label: 'Languages',                tags: ['Java', 'TypeScript', 'JavaScript', 'Python', 'Ruby'] },
  { label: 'Test automation',          tags: ['Playwright', 'Cypress', 'Selenium', 'Capybara', 'Cucumber · BDD'] },
  { label: 'API, data & performance',  tags: ['REST Assured', 'Postman', 'SQL', 'MongoDB', 'Kafka', 'Elasticsearch / OpenSearch', 'JMeter', 'Gatling'] },
  { label: 'CI/CD & cloud',            tags: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker', 'AWS'] },
  { label: 'Reporting',                tags: ['Jira Xray', 'Allure', 'Quality dashboards', 'Stakeholder metrics'] },
  { label: 'AI',                       tags: ['Claude Code', 'MCP servers', 'LLM-driven test generation'] },
  { label: 'Methodology',              tags: ['Agile / Scrum', '3 Amigos', 'Shift-Left', 'TDD / BDD'] },
]

const PROJECTS = [
  {
    name: 'FindComedy',
    img:  FindComedyImg,
    desc: 'London comedy directory — performers find the right open-mic night in seconds.',
    href: 'https://github.com/AhsanZX97/FindComedy',
    stat: { value: '400+', label: 'visitors · launch week' },
  },
  {
    name: 'FightNight',
    img:  FightNightImg,
    desc: 'Mobile app for tracking boxing, MMA, and combat sports events with reminders.',
    href: 'https://github.com/AhsanZX97/FightNight',
    stat: null,
  },
  {
    name: 'Facemaker',
    img:  TrollFaceImg,
    desc: 'Browser game where you match a troll face and get rated via AI in 10 seconds.',
    href: 'https://github.com/AhsanZX97/Facemaker',
    stat: null,
  },
]

const EXPERIENCE = [
  { title: 'Software Developer in Test', company: "Moody's Corporation",  years: '2024 — 2026' },
  { title: 'QA Engineer',               company: 'Solirius Consulting',   years: '2020 — 2024' },
]

const s = {
  page:  { minHeight: '100vh', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', gap: 'clamp(28px, 5vh, 60px)', padding: 'clamp(26px, 4vw, 56px)', background: 'oklch(0.97 0.004 255)', color: 'oklch(0.235 0.012 255)', fontFamily: "'Space Grotesk', sans-serif" },
  mono:  { fontFamily: "'IBM Plex Mono', monospace" },
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
    <>
      {/* ── Hero ── */}
      <div style={s.page}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...s.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', ...s.muted }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, border: '1px solid oklch(0.235 0.012 255)', fontWeight: 500, letterSpacing: 0, color: 'oklch(0.235 0.012 255)' }}>AZ</span>
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
            <div style={{ ...s.mono, fontSize: 13, letterSpacing: '0.04em', ...s.muted }}>Full-stack development · QA automation · AI Engineering</div>
            <h1 style={{ margin: 0, fontWeight: 600, fontSize: 'clamp(54px, 8.6vw, 128px)', lineHeight: 0.92, letterSpacing: '-0.035em', fontFamily: "'Space Grotesk', sans-serif" }}>Ahsan Zia</h1>
            <p style={{ margin: 0, maxWidth: '48ch', fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.5, color: 'oklch(0.42 0.01 255)' }}>
              I build web and mobile apps end to end — then write the automated tests that keep them from breaking. One person, the whole pipeline: from prototype, to production, to the QA that holds it together.
            </p>
          </div>
          <TestRunner />
        </main>

        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ ...s.mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', ...s.muted }}>Let's work together</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <EmailLink href={`mailto:${EMAIL}`} accent={ACCENT}>{EMAIL}</EmailLink>
              <CopyButton onClick={copyEmail} copied={copied} borderColor="oklch(0.84 0.006 255)" color="oklch(0.4 0.01 255)" hoverBorder="oklch(0.5 0.01 255)" hoverColor="oklch(0.235 0.012 255)" />
            </div>
            <span style={{ ...s.mono, fontSize: 11.5, letterSpacing: '0.06em', color: 'oklch(0.58 0.01 255)' }}>↓ work · experience · skills</span>
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

      {/* ── 01 Selected work ── */}
      <section style={{ padding: 'clamp(64px, 9vh, 120px) clamp(26px, 4vw, 56px)', borderTop: '1px solid oklch(0.9 0.006 255)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num="01" label="Selected work" />
          <h2 style={{ margin: '0 0 clamp(28px, 4vh, 48px)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'oklch(0.235 0.012 255)' }}>A few things I've built.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
            {PROJECTS.map(p => (
              <div key={p.name} style={{ border: '1px solid oklch(0.88 0.006 255)', borderRadius: 10, overflow: 'hidden', background: 'oklch(0.99 0.003 255)', display: 'flex', flexDirection: 'column' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.name}</span>
                    <PlainLink href={p.href} accent={ACCENT} style={{ ...s.mono, fontSize: 15, color: 'oklch(0.45 0.01 255)' }} target="_blank">↗</PlainLink>
                  </div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: 'oklch(0.45 0.01 255)' }}>{p.desc}</p>
                  {p.stat && (
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 22, fontWeight: 600, color: ACCENT }}>{p.stat.value}</span>
                      <span style={{ ...s.mono, fontSize: 12, ...s.muted }}>{p.stat.label}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 Experience ── */}
      <section style={{ padding: 'clamp(64px, 9vh, 120px) clamp(26px, 4vw, 56px)', borderTop: '1px solid oklch(0.9 0.006 255)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num="02" label="Experience" />
          <h2 style={{ margin: '0 0 clamp(20px, 3vh, 36px)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'oklch(0.235 0.012 255)' }}>Where I've done it.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid oklch(0.88 0.006 255)' }}>
            {EXPERIENCE.map(e => (
              <div key={e.company} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, padding: '22px 0', borderBottom: '1px solid oklch(0.88 0.006 255)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 'clamp(18px, 1.7vw, 22px)', fontWeight: 600, letterSpacing: '-0.01em' }}>{e.title}</span>
                  <span style={{ fontSize: 14.5, ...s.muted }}>{e.company}</span>
                </div>
                <span style={{ ...s.mono, fontSize: 13, ...s.muted, whiteSpace: 'nowrap' }}>{e.years}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Skills & tools ── */}
      <section style={{ padding: 'clamp(64px, 9vh, 120px) clamp(26px, 4vw, 56px) clamp(72px, 11vh, 130px)', borderTop: '1px solid oklch(0.9 0.006 255)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num="03" label="Skills & tools" />
          <h2 style={{ margin: '0 0 clamp(28px, 4vh, 48px)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'oklch(0.235 0.012 255)' }}>The toolkit.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(28px, 3vw, 44px)' }}>
            {SKILLS.map(group => (
              <div key={group.label} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ ...s.mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', ...s.muted }}>{group.label}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {group.tags.map(tag => (
                    <span key={tag} style={{ display: 'inline-flex', padding: '6px 11px', border: '1px solid oklch(0.88 0.006 255)', borderRadius: 6, fontSize: 13, color: 'oklch(0.35 0.01 255)', background: 'oklch(0.99 0.003 255)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Contact (dark) ── */}
      <section style={{ padding: 'clamp(76px, 12vh, 150px) clamp(26px, 4vw, 56px)', borderTop: '1px solid oklch(0.9 0.006 255)', background: 'oklch(0.205 0.012 255)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, ...s.mono, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.6 0.01 255)' }}>
            <span style={{ color: ACCENT }}>04</span>
            <span>Contact</span>
            <span style={{ flex: 1, height: 1, background: 'oklch(0.32 0.01 255)' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: 'clamp(34px, 5.5vw, 72px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.02, color: 'oklch(0.96 0.004 255)' }}>
            Let's build<br />something solid.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginTop: 10 }}>
            <EmailLink href={`mailto:${EMAIL}`} accent={ACCENT} dark>{EMAIL}</EmailLink>
            <CopyButton onClick={copyEmail} copied={copied} borderColor="oklch(0.36 0.01 255)" color="oklch(0.72 0.01 255)" hoverBorder="oklch(0.6 0.01 255)" hoverColor="oklch(0.95 0.004 255)" />
          </div>
        </div>
      </section>
    </>
  )
}

// ── Shared components ────────────────────────────────────────────

function TestRunner() {
  const [passed,  setPassed]  = useState(0)
  const [running, setRunning] = useState(-1)
  const [done,    setDone]    = useState(false)
  const ct = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    ct.current = setTimeout(cycle, 700)
    return () => { if (ct.current) clearTimeout(ct.current) }
  }, [TESTS.length])

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

  return (
    <div style={{ width: '100%', maxWidth: 440, marginLeft: 'auto', background: 'oklch(0.205 0.012 255)', borderRadius: 8, overflow: 'hidden', fontFamily: "'IBM Plex Mono', monospace", boxShadow: '0 22px 48px -28px oklch(0.2 0.02 255 / 0.55)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px', borderBottom: '1px solid oklch(0.3 0.01 255)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.55 0.13 30)' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.62 0.1 90)' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.62 0.11 150)' }} />
          </span>
          <span style={{ fontSize: 12, color: 'oklch(0.6 0.01 255)' }}>ahsan.test.ts</span>
        </div>
        <span style={{ fontSize: 10, letterSpacing: '0.14em', padding: '3px 9px', borderRadius: 4, color: statusColor, border: `1px solid ${statusColor}`, transition: 'color .35s, border-color .35s' }}>{statusLabel}</span>
      </div>
      <div style={{ padding: '18px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {TESTS.map((t, i) => {
          const status    = i < passed ? 'pass' : i === running ? 'run' : 'pending'
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
      <div style={{ padding: '12px 16px', marginTop: 8, borderTop: '1px solid oklch(0.3 0.01 255)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: GREEN }}>✓ {passed} passing</span>
        <span style={{ color: 'oklch(0.5 0.01 255)' }}>{done ? '0 failing · 0.58s' : 'running…'}</span>
      </div>
    </div>
  )
}

function SectionHeader({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.5 0.01 255)', marginBottom: 16 }}>
      <span style={{ color: ACCENT }}>{num}</span>
      <span>{label}</span>
      <span style={{ flex: 1, height: 1, background: 'oklch(0.88 0.006 255)' }} />
    </div>
  )
}

function EmailLink({ href, accent, dark, children }: { href: string; accent: string; dark?: boolean; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  const base = dark ? 'oklch(0.96 0.004 255)' : 'oklch(0.235 0.012 255)'
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em', color: hovered ? accent : base, textDecoration: 'none', borderBottom: `2px solid ${hovered ? accent : 'transparent'}`, transition: 'border-color 0.15s, color 0.15s' }}
    >
      {children}
    </a>
  )
}

function CopyButton({ onClick, copied, borderColor, color, hoverBorder, hoverColor }: {
  onClick: () => void; copied: boolean
  borderColor: string; color: string; hoverBorder: string; hoverColor: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: '0.04em', color: hovered ? hoverColor : color, background: 'transparent', border: `1px solid ${hovered ? hoverBorder : borderColor}`, borderRadius: 999, padding: '8px 14px', transition: 'border-color 0.15s, color 0.15s' }}
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}

function FooterLink({ href, accent, children }: { href: string; accent: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? accent : 'oklch(0.4 0.01 255)', textDecoration: 'none', transition: 'color 0.15s' }}>
      {children}
    </a>
  )
}

function PlainLink({ href, accent, style, target, children }: { href: string; accent: string; style?: React.CSSProperties; target?: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ ...style, color: hovered ? accent : (style?.color as string), textDecoration: 'none', transition: 'color 0.15s' }}>
      {children}
    </a>
  )
}
