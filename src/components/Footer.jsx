import './Footer.css'

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} EventHub — Event Management System.
        </p>
        <p className="footer-subtext">
          Powered by React, Redux Toolkit & Ticketmaster Discovery API.
        </p>
      </div>
    </footer>
  )
}

export default Footer
