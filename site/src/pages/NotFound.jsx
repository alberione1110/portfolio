import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="notfound">
      <h1>404</h1>
      <p>요청한 페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="btn">홈으로</Link>
    </section>
  )
}
