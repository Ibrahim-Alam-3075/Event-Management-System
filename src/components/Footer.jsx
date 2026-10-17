import './Footer.css'

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Event Pulse
        </p>
        <p className="footer-subtext">
          Powered by Ibrahim Alam & Co.
        </p>
      </div>
    </footer>
  )
}

export default Footer
