import { Link } from 'react-router-dom'
import { profile, skills, paper, certificates } from '../data/profile.js'
import { projects } from '../data/projects.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">{profile.title}</p>
        <h1>{profile.name}</h1>
        <p className="lead">{profile.tagline}</p>
        <ul className="intro">
          {profile.intro.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="interests">
          <span className="label">관심 분야</span>
          {profile.interests.join(' · ')}
        </p>
        <div className="actions">
          <a className="btn" href={`mailto:${profile.email}`}>Email</a>
          <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        <div className="project-list">
          {projects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card">
              <div className="card-head">
                <h3>{p.name}</h3>
                <span className="period">{p.period}</span>
              </div>
              <p className="summary">{p.summary}</p>
              <p className="meta">
                <span>{p.type}</span>
                <span>{p.role}</span>
              </p>
              <ul className="tags">
                {p.stack.slice(0, 5).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <span className="more">자세히 보기 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <h2 className="section-title">Skills</h2>
        <div className="skill-rows">
          <div className="skill-row">
            <span className="label">주로 사용</span>
            <ul className="tags">
              {skills.main.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="skill-row">
            <span className="label">직접 구축</span>
            <ul className="tags">
              {skills.built.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="skill-row">
            <span className="label">학습 중</span>
            <ul className="tags outline">
              {skills.learning.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section two-col">
        <div>
          <h2 className="section-title">Paper</h2>
          <p className="paper-title">「{paper.title}」</p>
          <p className="muted">{paper.venue}, {paper.year} · {paper.note}</p>
        </div>
        <div>
          <h2 className="section-title">Certificates</h2>
          <ul className="certs">
            {certificates.map((c) => (
              <li key={c.name}>
                <span>{c.name}</span>
                <span className={c.status === '취득' ? 'badge done' : 'badge'}>
                  {c.status}{c.date ? ` · ${c.date}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2 className="section-title">Contact</h2>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </section>
    </>
  )
}
