import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', color: 'red' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: 'gray', margin: '15px 0' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          backgroundColor: 'navy',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          textDecoration: 'none',
        }}
      >
        Go to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
