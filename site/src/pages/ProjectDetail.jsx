import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = getProject(slug)
  if (!p) return <NotFound />

  const idx = projects.findIndex((x) => x.slug === slug)
  const next = idx >= 0 ? projects[(idx + 1) % projects.length] : projects[0]

  return (
    <article className="detail">
      <Link to="/#projects" className="back">← 프로젝트 목록</Link>

      <header className="detail-head">
        <div className="title-row">
          <h1>{p.no && <span className="pno big">P{p.no}</span>}{p.name}</h1>
          <div className="gh-links">
            {p.links.map((l) => (
              <a key={l.url} className="gh-btn" href={l.url} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
                {p.links.length === 1 ? 'GitHub에서 보기' : l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
        <p className="lead">{p.summary}</p>
        <dl className="facts">
          <div><dt>기간</dt><dd>{p.period}</dd></div>
          <div><dt>유형</dt><dd>{p.type}</dd></div>
          <div><dt>팀 구성</dt><dd>{p.team}</dd></div>
          <div><dt>내 역할</dt><dd>{p.role}</dd></div>
        </dl>
      </header>

      <section className="block">
        <h2>배경</h2>
        <p>{p.problem}</p>
      </section>

      <section className="block">
        <h2>구조</h2>
        {p.diagrams?.length > 0 ? (
          p.diagrams.map((g) => (
            <figure key={g.src} className="figure">
              <img src={g.src} alt={g.caption} loading="lazy" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))
        ) : (
        <ol className="flow">
          {p.flow.map((step, i) => (
            <li key={step}>
              <span className="flow-step">{step}</span>
              {i < p.flow.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
        )}
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

      {p.troubleshootings?.length > 0 && (
        <section className="block">
          <h2>트러블슈팅</h2>
          {p.troubleshootings.map((t) => (
            <div key={t.title} className="ts-block">
              <h3 className="ts-title">{t.title}</h3>
              {t.diagram && (
                <figure className="figure">
                  <img src={t.diagram.src} alt={t.diagram.caption} loading="lazy" />
                  <figcaption>{t.diagram.caption}</figcaption>
                </figure>
              )}
              <dl className="ts">
                {t.rows.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
          ))}
        </section>
      )}

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
