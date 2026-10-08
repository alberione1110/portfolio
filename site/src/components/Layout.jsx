import { Link, Outlet } from 'react-router-dom'
import { profile } from '../data/profile.js'

const YEAR = new Date().getFullYear()

export default function Layout() {
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="brand">{profile.name}</Link>
        <nav className="nav">
          <Link to="/#projects">Projects</Link>
          <Link to="/#skills">Skills</Link>
          <Link to="/#contact">Contact</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <p>
          이 사이트는 React(Vite)로 만들고 Terraform으로 구성한 S3 · CloudFront · Route 53 위에
          GitHub Actions로 배포합니다.{' '}
          <a href={profile.siteRepo} target="_blank" rel="noreferrer">소스 보기</a>
        </p>
        <p className="muted">© {YEAR} {profile.name}</p>
      </footer>
    </div>
  )
}
