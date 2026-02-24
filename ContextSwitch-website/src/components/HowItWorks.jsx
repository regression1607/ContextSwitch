const steps = [
  {
    number: '01',
    title: 'Install the Extension',
    description: 'Add ContextSwitch to Chrome in one click. No account required to get started.',
  },
  {
    number: '02',
    title: 'Save Your Context',
    description: 'While chatting with any AI, click Save to capture the entire conversation as a project.',
  },
  {
    number: '03',
    title: 'Compress with AI',
    description: 'Optionally compress your context to save tokens while keeping all essential information.',
  },
  {
    number: '04',
    title: 'Load Anywhere',
    description: 'Start a new chat and load your context. Continue your work seamlessly across sessions.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ padding: '6rem 0', background: '#0d0d0d' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">How It Works</span>
          <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Simple workflow,
            <br />
            <span className="gradient-text">powerful results</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '42rem', margin: '0 auto' }}>
            Get started in seconds. No complex setup or configuration required.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {steps.map((step, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 700, 
                color: 'rgba(255,255,255,0.08)', 
                marginBottom: '0.75rem',
                lineHeight: 1,
              }}>
                {step.number}
              </div>
              
              {/* Visual Card */}
              <div style={{
                width: '100%',
                height: '10rem',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {index === 0 && (
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'rgba(200, 245, 66, 0.2)', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg style={{ width: '2rem', height: '2rem', color: '#c8f542' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                )}
                {index === 1 && (
                  <div style={{ padding: '1rem', width: '100%', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: 'rgba(167, 139, 250, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#a78bfa', fontSize: '0.5rem' }}>AI</span>
                      </div>
                      <div style={{ flex: 1, height: '0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                      <div style={{ flex: 1, height: '0.4rem', background: 'rgba(200, 245, 66, 0.2)', borderRadius: '4px' }} />
                      <div style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: 'rgba(200, 245, 66, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#c8f542', fontSize: '0.5rem' }}>You</span>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem' }}>
                      <span style={{ padding: '0.2rem 0.4rem', background: '#c8f542', color: '#0a0a0a', fontSize: '0.6rem', fontWeight: 600, borderRadius: '0.25rem' }}>✓ Saved</span>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}>5000</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.5rem' }}>tokens</div>
                      </div>
                      <svg style={{ width: '1rem', height: '1rem', color: '#a78bfa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div style={{ padding: '0.4rem', background: 'rgba(167, 139, 250, 0.2)', borderRadius: '0.4rem', border: '1px solid rgba(167, 139, 250, 0.3)', textAlign: 'center' }}>
                        <div style={{ color: '#a78bfa', fontSize: '0.6rem' }}>1500</div>
                        <div style={{ color: '#a78bfa', fontSize: '0.5rem' }}>tokens</div>
                      </div>
                    </div>
                    <span style={{ color: '#34d399', fontSize: '0.65rem', fontWeight: 500 }}>70% compression</span>
                  </div>
                )}
                {index === 3 && (
                  <div style={{ padding: '1rem', width: '100%', position: 'relative', height: '100%' }}>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', marginBottom: '2rem' }}>New Chat</div>
                    <div style={{ 
                      background: 'rgba(200, 245, 66, 0.1)', 
                      border: '1px solid rgba(200, 245, 66, 0.3)', 
                      borderRadius: '0.4rem', 
                      padding: '0.6rem',
                    }}>
                      <div style={{ color: '#c8f542', fontSize: '0.65rem', fontWeight: 500, marginBottom: '0.2rem' }}>Context Loaded</div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.55rem' }}>Project: React Dashboard • 15 messages</div>
                    </div>
                  </div>
                )}
              </div>
              
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
