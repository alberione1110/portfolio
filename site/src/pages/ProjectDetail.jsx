import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = getProject(slug)
  if (!p) return <NotFound />

  const idx = projects.findIndex((x) => x.slug === slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <article className="detail">
      <Link to="/#projects" className="back">← 프로젝트 목록</Link>

      <header className="detail-head">
        <h1>{p.name}</h1>
        <p className="lead">{p.summary}</p>
        <dl className="facts">
          <div><dt>기간</dt><dd>{p.period}</dd></div>
          <div><dt>유형</dt><dd>{p.type}</dd></div>
          <div><dt>팀 구성</dt><dd>{p.team}</dd></div>
          <div><dt>내 역할</dt><dd>{p.role}</dd></div>
        </dl>
        <div className="actions">
          {p.links.map((l) => (
            <a key={l.url} className="btn ghost" href={l.url} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      </header>

      <section className="block">
        <h2>배경</h2>
        <p>{p.problem}</p>
      </section>

      <section className="block">
        <h2>구조</h2>
        <ol className="flow">
          {p.flow.map((step, i) => (
            <li key={step}>
              <span className="flow-step">{step}</span>
              {i < p.flow.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      </section>

      <section className="block">
        <h2>핵심 기능</h2>
        <ul className="bullets">
          {p.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      {p.metrics && (
        <section className="block">
          <h2>결과</h2>
          <div className="metrics">
            {p.metrics.items.map((m) => (
              <div key={m.label} className="metric">
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>
          <p className="muted small">{p.metrics.caption}</p>
        </section>
      )}

      <section className="block split">
        <div>
          <h2>내가 한 일</h2>
          <ul className="bullets">
            {p.mine.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
        {p.teamWork.length > 0 && (
          <div>
            <h2>팀원 담당</h2>
            <ul className="bullets muted-list">
              {p.teamWork.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        )}
      </section>

      {p.extra && (
        <section className="block callout">
          <h2>{p.extra.title}</h2>
          <p>{p.extra.body}</p>
        </section>
      )}

      <section className="block">
        <h2>기술 스택</h2>
        <ul className="tags">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      <nav className="next">
        <Link to={`/projects/${next.slug}`}>다음 프로젝트: {next.name} →</Link>
      </nav>
    </article>
  )
}
