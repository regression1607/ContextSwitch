const Privacy = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          Privacy <span style={{ color: '#c8f542' }}>Policy</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
          Last updated: February 2026
        </p>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Introduction</h2>
            <p>
              Welcome to ContextSwitch ("we," "our," or "us"). We are committed to protecting your personal information 
              and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our browser extension and website.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Information We Collect</h2>
            <p style={{ marginBottom: '1rem' }}>We may collect the following types of information:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Account Information:</strong> Name, email address when you create an account</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Conversation Data:</strong> AI conversation contexts you choose to save (stored locally on your device)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data:</strong> How you interact with our extension and services</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Contact Information:</strong> Information you provide when contacting us</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
            <p style={{ marginBottom: '1rem' }}>We use your information to:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Provide and maintain our services</li>
              <li style={{ marginBottom: '0.5rem' }}>Process your subscription and payments</li>
              <li style={{ marginBottom: '0.5rem' }}>Send you updates and marketing communications (with your consent)</li>
              <li style={{ marginBottom: '0.5rem' }}>Respond to your inquiries and support requests</li>
              <li style={{ marginBottom: '0.5rem' }}>Improve our products and services</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Data Storage & Security</h2>
            <p>
              Your conversation data is stored locally on your device using browser storage. We do not have access to 
              your saved conversations unless you explicitly share them with us. We implement appropriate security 
              measures to protect your personal information.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Third-Party Services</h2>
            <p>
              We may use third-party services for payment processing, analytics, and other functionalities. These 
              services have their own privacy policies and we encourage you to review them.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Your Rights</h2>
            <p style={{ marginBottom: '1rem' }}>You have the right to:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Access your personal data</li>
              <li style={{ marginBottom: '0.5rem' }}>Correct inaccurate data</li>
              <li style={{ marginBottom: '0.5rem' }}>Delete your account and data</li>
              <li style={{ marginBottom: '0.5rem' }}>Opt-out of marketing communications</li>
              <li style={{ marginBottom: '0.5rem' }}>Export your data</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>7. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our 
              marketing efforts. You can control cookies through your browser settings.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Email:</strong> <a href="mailto:ekanshrajput1607@gmail.com" style={{ color: '#c8f542' }}>ekanshrajput1607@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
