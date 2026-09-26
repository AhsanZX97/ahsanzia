import { useEffect, useRef, useState } from 'react'
import FindComedyImg from './assets/FindComedy.png'
import FightNightImg from './assets/FightNight.png'
import TrollFaceImg from './assets/Face Maker.png'

const EMAIL = 'ahsan97@hotmail.co.uk'

const SKILLS: { label: string; tags: string[] }[] = [
  {
    label: 'Languages',
    tags: ['Java', 'TypeScript', 'JavaScript', 'Python', 'Ruby'],
  },
  {
    label: 'Test automation',
    tags: ['Playwright', 'Cypress', 'Selenium', 'Capybara', 'Cucumber · BDD'],
  },
  {
    label: 'API, data & performance',
    tags: [
      'REST Assured',
      'Postman',
      'SQL',
      'MongoDB',
      'Kafka',
      'Elasticsearch / OpenSearch',
      'JMeter',
      'Gatling',
    ],
  },
  {
    label: 'CI/CD & cloud',
    tags: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker', 'AWS'],
  },
  {
    label: 'Reporting',
    tags: ['Jira Xray', 'Allure', 'Quality dashboards', 'Stakeholder metrics'],
  },
  {
    label: 'AI',
    tags: ['Claude Code', 'MCP servers', 'LLM-driven test generation'],
  },
  {
    label: 'Methodology',
    tags: ['Agile / Scrum', '3 Amigos', 'Shift-Left', 'TDD / BDD'],
  },
]

const PROJECTS = [
  {
    name: 'FindComedy',
    img: FindComedyImg,
    desc: 'London comedy directory — performers find the right open-mic night in seconds.',
    href: 'https://github.com/AhsanZX97/FindComedy',
    stat: { value: '400+', label: 'visitors · launch week' },
  },
  {
    name: 'FightNight',
    img: FightNightImg,
    desc: 'Mobile app for tracking boxing, MMA, and combat sports events with reminders.',
    href: 'https://github.com/AhsanZX97/FightNight',
    stat: null,
  },
  {
    name: 'Facemaker',
    img: TrollFaceImg,
    desc: 'Browser game where you match a troll face and get rated via AI in 10 seconds.',
    href: 'https://github.com/AhsanZX97/Facemaker',
    stat: null,
  },
]

const EXPERIENCE = [
  {
    title: 'Software Developer in Test',
    company: "Moody's Corporation",
    years: '2024 — 2026',
  },
  {
    title: 'QA Engineer',
    company: 'Solirius Consulting',
    years: '2020 — 2024',
  },
]

const STAGES = [
  {
    id: 'bio',
    label: 'Biography',
    file: 'biography.md',
    hint: 'Meet the engineer',
    icon: 'person',
  },
  {
    id: 'skills',
    label: 'Skills',
    file: 'skills.config.ts',
    hint: 'Inspect the toolkit',
    icon: 'tools',
  },
  {
    id: 'experience',
    label: 'Experience',
    file: 'experience.log',
    hint: 'Trace the journey',
    icon: 'history',
  },
  {
    id: 'work',
    label: 'Selected work',
    file: 'releases',
    hint: 'Explore the projects',
    icon: 'box',
  },
] as const
type Stage = (typeof STAGES)[number]['id']
type IconName =
  | 'person'
  | 'tools'
  | 'history'
  | 'box'
  | 'branch'
  | 'workflow'
  | 'arrow'
  | 'code'
  | 'check'
  | 'mail'

function Icon({
  name,
  className = '',
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, React.ReactNode> = {
    person: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21v-3a7 7 0 0 1 14 0v3" />
      </>
    ),
    tools: (
      <path d="m4 4 16 16M20 4 4 20M3 7l4-4m10 18 4-4M17 3l4 4M3 17l4 4" />
    ),
    history: <path d="M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v5l3 2" />,
    box: (
      <path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5M12 13 3 8m9 5v9M7 5.8l9 5" />
    ),
    branch: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M6 7v10m12-10a10 10 0 0 1-10 10H6" />
      </>
    ),
    workflow: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <path d="M6 9v9h9M9 6h9v9" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
  }
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export default function App() {
  const [stage, setStage] = useState<Stage>('bio')
  const [explored, setExplored] = useState<string[]>([])
  const selected = STAGES.find((item) => item.id === stage)!
  return (
    <div className="portfolio">
      <a className="skip-link" href="#portfolio-content">
        Skip to portfolio content
      </a>
      <header className="site-header">
        <div className="repo-identity">
          <span className="avatar">AZ</span>
          <span>
            Ahsan Zia <span className="slash">/</span> <b>portfolio</b>
          </span>
          <span className="badge public-badge">Public</span>
        </div>
        <a className="button contact-button" href={`mailto:${EMAIL}`}>
          <Icon name="mail" /> Get in touch
        </a>
      </header>
      <div className="repo-nav">
        <span className="repo-tab">
          <Icon name="workflow" /> Portfolio workflow
        </span>
        <span className="repo-description">
          Software development & quality engineering
        </span>
        <a href="https://github.com/AhsanZX97" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
      <main className="page-main" id="portfolio-content" tabIndex={-1}>
        <div className="page-heading">
          <div>
            <div className="eyebrow">
              <span className="status-dot" /> AVAILABLE FOR FREELANCE
            </div>
            <h1>
              Good software.
              <br className="mobile-break" /> Proven to work.
            </h1>
            <p>I build it. I test it. I help you ship it with confidence.</p>
          </div>
          <span className="branch-label">
            <Icon name="branch" /> main
          </span>
        </div>
        <section className="workflow" aria-label="Portfolio workflow">
          <div className="workflow-heading">
            <div>
              <Icon name="workflow" />
              <b>Explore my workflow</b>
              <span className="badge">4 stages</span>
            </div>
            <span className="mono">portfolio.yml</span>
          </div>
          <nav className="pipeline" aria-label="Portfolio stages">
            {STAGES.map((item, index) => (
              <div className="pipeline-slot" key={item.id}>
                <button
                  className="job"
                  type="button"
                  aria-pressed={stage === item.id}
                  aria-controls="stage-content"
                  onClick={() => setStage(item.id)}
                >
                  <span className="job-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.hint}</small>
                  </span>
                  <span className="job-number">0{index + 1}</span>
                </button>
                {index < STAGES.length - 1 && (
                  <span className="connector" aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                )}
              </div>
            ))}
          </nav>
        </section>
        <div className="section-meta">
          <span>
            <Icon name={selected.icon} /> {selected.label}
            <span className="slash">/</span>
            <span className="mono">{selected.file}</span>
          </span>
          <span className="section-hint">Select a stage to explore</span>
        </div>
        <div className="detail-grid" id="stage-content">
          <section className="content-panel" aria-label={selected.label}>
            {stage === 'bio' && (
              <>
                <div className="section-kicker">
                  THE PERSON BEHIND THE PIPELINE
                </div>
                <h2>Hi, I'm Ahsan.</h2>
                <p className="intro-copy">
                  A developer with a tester's mindset.
                </p>
                <p className="body-copy">
                  I build web and mobile apps end to end — then write the
                  automated tests that keep them from breaking. From the first
                  prototype to production, quality is part of the build.
                </p>
                <div className="tags">
                  <span>Full-stack development</span>
                  <span>QA automation</span>
                  <span>AI engineering</span>
                </div>
                <div className="profile-note">
                  <span className="mini-avatar">AZ</span>
                  <div>
                    <b>Ahsan Zia</b>
                    <small>Remote · Available worldwide</small>
                  </div>
                  <Icon name="check" />
                </div>
              </>
            )}
            {stage === 'skills' && (
              <>
                <div className="section-kicker">DEPENDENCIES, WELL CHOSEN</div>
                <h2>The toolkit.</h2>
                <p className="body-copy">
                  The tools I use to build, investigate, automate, and deliver.
                </p>
                <div className="skills-list">
                  {SKILLS.map((group) => (
                    <div className="skill-group" key={group.label}>
                      <h3>{group.label}</h3>
                      <div className="tags">
                        {group.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {stage === 'experience' && (
              <>
                <div className="section-kicker">EXPERIENCE IN PRODUCTION</div>
                <h2>Where I've done it.</h2>
                <p className="body-copy">
                  Quality engineering, from consulting to financial technology.
                </p>
                <div className="experience-list">
                  {EXPERIENCE.map((job, index) => (
                    <article className="experience-item" key={job.company}>
                      <span className="company-avatar">
                        {index === 0 ? 'M' : 'S'}
                      </span>
                      <div>
                        <span className="mono">{job.years}</span>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="quiet-note">
                  <Icon name="branch" />
                  <span>
                    A career built around making software more reliable.
                  </span>
                </div>
              </>
            )}
            {stage === 'work' && (
              <>
                <div className="section-kicker">SELECTED RELEASES</div>
                <h2>Built. Tested. Shipped.</h2>
                <div className="projects">
                  {PROJECTS.map((project) => (
                    <a
                      className="project"
                      key={project.name}
                      href={project.href}
                      aria-label={`View ${project.name} on GitHub`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={project.img} alt="" />
                      <div>
                        <h3>
                          {project.name} <span>↗</span>
                        </h3>
                        <p>{project.desc}</p>
                        {project.stat && (
                          <small>
                            {project.stat.value} {project.stat.label}
                          </small>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </section>
          <div className="companion-column">
            {stage === 'bio' && <TestRunner />}
            {stage === 'skills' && (
              <section className="tool-panel" aria-label="Test design matrix">
                <ToolHeading
                  icon="tools"
                  title="Test design matrix"
                  badge="PLANNING"
                />
                <div className="tool-body">
                  <h3>Start with the right question.</h3>
                  <p className="tool-description">
                    A good test strategy goes beyond automation.
                  </p>
                  <table className="test-matrix">
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Approach</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Does it work?</td>
                        <td>Functional testing</td>
                      </tr>
                      <tr>
                        <td>What could break?</td>
                        <td>Exploratory testing</td>
                      </tr>
                      <tr>
                        <td>Will it stay working?</td>
                        <td>Regression testing</td>
                      </tr>
                      <tr>
                        <td>Is it the right thing?</td>
                        <td>Acceptance criteria</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="tool-footnote">
                    Human curiosity + repeatable checks.
                  </div>
                </div>
              </section>
            )}
            {stage === 'experience' && (
              <section
                className="tool-panel"
                aria-label="Career release history"
              >
                <ToolHeading
                  icon="history"
                  title="Career release history"
                  badge="TIMELINE"
                />
                <div className="tool-body">
                  <ol className="release-history">
                    {EXPERIENCE.map((job) => (
                      <li key={job.company}>
                        <span className="mono">{job.years}</span>
                        <h3>{job.company}</h3>
                        <p>{job.title}</p>
                        <span className="history-tag">Career milestone</span>
                      </li>
                    ))}
                  </ol>
                  <div className="tool-footnote">
                    The people and places behind the practice.
                  </div>
                </div>
              </section>
            )}
            {stage === 'work' && (
              <ExploratorySession explored={explored} onChange={setExplored} />
            )}
            <div className="companion-caption">
              <Icon name="code" />
              <span>
                {stage === 'bio'
                  ? 'Thoughtful builds. Confident releases.'
                  : stage === 'skills'
                    ? 'The right technique for the right risk.'
                    : stage === 'experience'
                      ? 'Every chapter adds to the toolkit.'
                      : 'Real users rarely follow the happy path.'}
              </span>
            </div>
          </div>
        </div>
      </main>
      <footer className="site-footer">
        <Contact />
        <div className="footer-links">
          <span>Remote · Available worldwide</span>
          <a
            href="https://github.com/AhsanZX97"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/ahsanzia"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </footer>
    </div>
  )
}

function ToolHeading({
  icon,
  title,
  badge,
}: {
  icon: IconName
  title: string
  badge: string
}) {
  return (
    <div className="tool-heading">
      <span>
        <Icon name={icon} />
        {title}
      </span>
      <span className="tool-badge">{badge}</span>
    </div>
  )
}

function Contact() {
  const [message, setMessage] = useState('')
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setMessage('Email copied')
    } catch {
      setMessage(
        'Could not copy. Select the email address to copy it manually.',
      )
    }
  }
  return (
    <div>
      <span className="eyebrow">LET'S BUILD SOMETHING SOLID</span>
      <div className="contact-row">
        <a className="email-link" href={`mailto:${EMAIL}`}>
          {EMAIL} <span>↗</span>
        </a>
        <button className="button" type="button" onClick={copyEmail}>
          Copy email
        </button>
      </div>
      <span
        className="copy-status"
        role="status"
        aria-label="Email copy status"
      >
        {message}
      </span>
    </div>
  )
}

const EXPLORATIONS = [
  { label: 'Discover an event', prompt: 'Is the next step clear?' },
  {
    label: 'Try an unexpected path',
    prompt: 'What happens when nothing matches?',
  },
  {
    label: 'Explore on a small screen',
    prompt: 'Can you still find the details?',
  },
]

function ExploratorySession({
  explored,
  onChange,
}: {
  explored: string[]
  onChange: (value: string[]) => void
}) {
  return (
    <section className="tool-panel" aria-label="Exploratory session">
      <ToolHeading icon="check" title="Exploratory session" badge="MANUAL" />
      <div className="tool-body">
        <h3>Follow your curiosity.</h3>
        <p className="tool-description">
          Sample charter / FindComedy
          <br />
          Explore how someone finds their next open mic.
        </p>
        <div className="checklist">
          {EXPLORATIONS.map((item) => (
            <label key={item.label}>
              <input
                type="checkbox"
                checked={explored.includes(item.label)}
                onChange={(event) =>
                  onChange(
                    event.target.checked
                      ? [...explored, item.label]
                      : explored.filter((value) => value !== item.label),
                  )
                }
              />
              <span>
                {item.label}
                <small>{item.prompt}</small>
              </span>
            </label>
          ))}
        </div>
        <div className="checklist-footer">
          <span role="status">{explored.length} / 3 explored</span>
          <button
            className="text-button"
            type="button"
            onClick={() => onChange([])}
          >
            Reset checklist
          </button>
        </div>
      </div>
    </section>
  )
}

const PROFILE_TESTS = [
  'builds web apps',
  'ships mobile apps',
  'automates the QA',
  'connects AI tools',
]

function TestRunner() {
  const [passed, setPassed] = useState(PROFILE_TESTS.length)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const running = passed < PROFILE_TESTS.length
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function replay() {
    timers.current.forEach(clearTimeout)
    setPassed(0)
    timers.current = PROFILE_TESTS.map((_, index) =>
      setTimeout(() => setPassed(index + 1), (index + 1) * 450),
    )
  }

  return (
    <section className="tool-panel terminal" aria-label="Profile test runner">
      <ToolHeading icon="code" title="ahsan.test.ts" badge="DEMO" />
      <div className="terminal-body">
        <p className="terminal-command">
          <span>$</span> npm run test:profile
        </p>
        <p className="terminal-suite">
          {running ? '›' : '✓'} your next engineer
        </p>
        {PROFILE_TESTS.map((test, index) => (
          <div
            className={`test-line ${index >= passed ? 'test-pending' : ''}`}
            key={test}
          >
            <span className="line-number">0{index + 1}</span>
            <span className="test-pass">
              {index < passed ? '✓' : index === passed ? '›' : '·'}
            </span>
            <span>{test}</span>
          </div>
        ))}
        <div className="terminal-summary">
          <b role="status">{passed} passing</b>
          <span>Profile illustration</span>
        </div>
        <button
          className="replay-button"
          type="button"
          onClick={replay}
          disabled={running}
        >
          <Icon name="history" />
          {running ? 'Running…' : 'Re-run demo'}
        </button>
      </div>
    </section>
  )
}
