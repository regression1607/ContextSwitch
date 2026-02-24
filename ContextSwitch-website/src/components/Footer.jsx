const socialIconStyle = {
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  background: '#0a0a0a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  transition: 'background 0.3s',
};

const Footer = () => {
  return (
    <footer>
      {/* Trusted By Section */}
      <div style={{ background: '#c8f542', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <p style={{ textAlign: 'center', color: 'rgba(10,10,10,0.6)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Trusted by developers at</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
            {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'].map((company) => (
              <span key={company} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'rgba(10,10,10,0.4)' }}>{company}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Join Conversation Section */}
      <div style={{ background: '#c8f542', padding: '3rem 0' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '1rem' }}>
            Join the conversation
          </h2>
          <p style={{ color: 'rgba(10,10,10,0.6)', marginBottom: '2rem' }}>
            Follow us for updates, tips, and new features
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/meridiancms/" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            {/* X (Twitter) */}
            <a href="https://x.com/EkanshRajput16" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61588347547718" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ background: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem' }}>
            {/* Logo & Newsletter */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', background: '#0a0a0a', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: '#c8f542' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a0a0a' }}>ContextSwitch</span>
              </div>
              <p style={{ color: 'rgba(10,10,10,0.6)', marginBottom: '1.5rem', maxWidth: '20rem' }}>
                Subscribe for updates, new features, and AI productivity tips.
              </p>
              <form style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  placeholder="Email*"
                  style={{ 
                    flex: 1, 
                    padding: '0.75rem 1rem', 
                    border: '1px solid rgba(10,10,10,0.2)', 
                    borderRadius: '0.5rem', 
                    color: '#0a0a0a',
                    outline: 'none',
                  }}
                />
                <button type="submit" style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: '#0a0a0a', 
                  color: 'white', 
                  fontWeight: 500, 
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  Submit
                </button>
              </form>
              <p style={{ fontSize: '0.75rem', color: 'rgba(10,10,10,0.4)', marginTop: '0.75rem' }}>
                By submitting I consent to receiving occasional emails from ContextSwitch. See <a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
              </p>
            </div>

            {/* Support Links */}
            <div>
              <h4 style={{ fontWeight: 600, color: '#0a0a0a', marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="/contact" style={{ color: 'rgba(10,10,10,0.6)', textDecoration: 'none' }}>Contact Us</a>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="mailto:ekanshrajput1607@gmail.com" style={{ color: 'rgba(10,10,10,0.6)', textDecoration: 'none' }}>Email Support</a>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="/refund" style={{ color: 'rgba(10,10,10,0.6)', textDecoration: 'none' }}>Cancellation Policy</a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 style={{ fontWeight: 600, color: '#0a0a0a', marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="/privacy" style={{ color: 'rgba(10,10,10,0.6)', textDecoration: 'none' }}>Privacy Policy</a>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="/terms" style={{ color: 'rgba(10,10,10,0.6)', textDecoration: 'none' }}>Terms & Conditions</a>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="/disclaimer" style={{ color: 'rgba(10,10,10,0.6)', textDecoration: 'none' }}>Disclaimer</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(10,10,10,0.1)' }}>
            <p style={{ textAlign: 'center', color: 'rgba(10,10,10,0.4)', fontSize: '0.875rem' }}>
              © {new Date().getFullYear()} ContextSwitch. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
