import { Link } from 'react-router-dom'
import { profile, skills, papers, certificates, experience, strengths } from '../data/profile.js'
import { projects, research } from '../data/projects.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text">
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
          </div>
          <img className="portrait" src={profile.photo} alt={`${profile.name} 프로필 사진`} width="180" height="232" />
        </div>
      </section>

      <section id="about" className="section">
        <h2 className="section-title">Strengths</h2>
        <div className="strengths">
          {strengths.map((s) => (
            <div key={s.title} className="strength">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="section">
        <h2 className="section-title">Experience</h2>
        <div className="exp-list">
          {experience.map((e) => (
            <div key={e.title} className="exp">
              <p className="exp-period">{e.period}</p>
              <div>
                <h3>{e.title}</h3>
                <p className="exp-role">{e.role}</p>
                <ul className="bullets">
                  {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                {e.ref && <Link to={`/projects/${e.ref}`} className="more">관련 프로젝트 보기 →</Link>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        <div className="project-list">
          {projects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card">
              <div className="card-head">
                <h3><span className="pno">P{p.no}</span>{p.name}</h3>
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

      <section id="research" className="section">
        <h2 className="section-title">Research</h2>
        <div className="project-list">
          {research.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card">
              <div className="card-head">
                <h3>{p.name}</h3>
                <span className="period">{p.period}</span>
              </div>
              <p className="summary">{p.summary}</p>
              <p className="meta"><span>{p.type}</span><span>{p.role}</span></p>
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
            <span className="label">팀 협업으로 이해</span>
            <ul className="tags outline">
              {skills.collab.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section two-col">
        <div>
          <h2 className="section-title">Papers</h2>
          {papers.map((pp) => (
            <div key={pp.title} style={{ marginBottom: 18 }}>
              <p className="paper-title">「{pp.title}」</p>
              <p className="muted">{pp.venue}, {pp.year} · {pp.note}</p>
              <Link to={`/projects/${pp.ref}`} className="more">관련 프로젝트 ({pp.refLabel}) →</Link>
            </div>
          ))}
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
