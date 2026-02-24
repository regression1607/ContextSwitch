import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    setVisible(true);
    
    // Check for logged in user
    const storedUser = localStorage.getItem('contextswitch_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('contextswitch_token');
    localStorage.removeItem('contextswitch_user');
    setUser(null);
  };

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'all 0.5s ease',
    background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
    transform: visible ? 'translateY(0)' : 'translateY(-100%)',
    opacity: visible ? 1 : 0,
  };

  return (
    <>
    <nav style={navStyle}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ 
              width: '2.5rem', 
              height: '2.5rem', 
              background: '#c8f542', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#0a0a0a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>ContextSwitch</span>
          </a>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {[
              { label: 'Features', href: '#features' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'Platforms', href: '#platforms' },
              { label: 'Pricing', href: '#pricing' },
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                style={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.color = 'white'}
                onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="https://chrome.google.com/webstore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}
            >
              Get Extension
            </a>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a 
                  href="/profile"
                  style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => e.target.style.color = '#c8f542'}
                  onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {user.name?.split(' ')[0]}
                </a>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    padding: '0.5rem 1rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '9999px',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.625rem 1.25rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '9999px',
                  background: 'transparent',
                  color: 'white',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Sign in
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
    
    <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
  </>
  );
};

export default Navbar;
