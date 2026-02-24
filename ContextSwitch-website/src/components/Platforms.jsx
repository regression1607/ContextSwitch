const platforms = [
  {
    name: 'ChatGPT',
    color: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.1)',
  },
  {
    name: 'Claude',
    color: '#fb923c',
    bgColor: 'rgba(251, 146, 60, 0.1)',
  },
  {
    name: 'Gemini',
    color: '#60a5fa',
    bgColor: 'rgba(96, 165, 250, 0.1)',
  },
];

const Platforms = () => {
  return (
    <section id="platforms" style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Platforms</span>
          <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Works with your favorite
            <br />
            <span className="gradient-text">AI assistants</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '42rem', margin: '0 auto' }}>
            Seamlessly integrates with all major AI chat platforms. 
            One extension, multiple platforms.
          </p>
        </div>

        {/* Platform Cards */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="platform-card"
              style={{
                width: '16rem',
                padding: '2rem',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
                cursor: 'default',
                transition: 'transform 0.3s ease',
              }}
            >
              <div style={{
                width: '5rem',
                height: '5rem',
                margin: '0 auto 1.5rem',
                borderRadius: '1rem',
                background: platform.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {index === 0 && (
                  <svg style={{ width: '2.5rem', height: '2.5rem', color: platform.color }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z"/>
                  </svg>
                )}
                {index === 1 && (
                  <svg style={{ width: '2.5rem', height: '2.5rem', color: platform.color }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
                {index === 2 && (
                  <svg style={{ width: '2.5rem', height: '2.5rem', color: platform.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                )}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>{platform.name}</h3>
              <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#34d399' }}>
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Supported
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>More platforms coming soon...</p>
          <a 
            href="https://chrome.google.com/webstore" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Get Started Free
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Platforms;
