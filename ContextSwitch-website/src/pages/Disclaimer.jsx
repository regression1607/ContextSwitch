const Disclaimer = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          <span style={{ color: '#c8f542' }}>Disclaimer</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
          Last updated: February 2026
        </p>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. General Disclaimer</h2>
            <p>
              The information provided by ContextSwitch ("we," "us," or "our") on our website and browser extension 
              is for general informational purposes only. All information is provided in good faith, however, we 
              make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, 
              validity, reliability, availability, or completeness of any information.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>2. No Professional Advice</h2>
            <p>
              The Service is designed to help users save and manage their AI conversation contexts. It is not 
              intended to provide professional, legal, financial, or any other type of advice. You should consult 
              with appropriate professionals for specific advice tailored to your situation.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Third-Party Platforms</h2>
            <p>
              ContextSwitch integrates with third-party AI platforms including ChatGPT (OpenAI), Claude (Anthropic), 
              and Gemini (Google). We are not affiliated with, endorsed by, or sponsored by these companies. 
              These platforms have their own terms of service and privacy policies that users must comply with.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Data & Content Disclaimer</h2>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>We are not responsible for the content of your saved conversations</li>
              <li style={{ marginBottom: '0.5rem' }}>Users are solely responsible for the legality and appropriateness of their saved content</li>
              <li style={{ marginBottom: '0.5rem' }}>Our compression feature may alter the original content; we do not guarantee exact reproduction</li>
              <li style={{ marginBottom: '0.5rem' }}>Data stored locally is subject to your device's security measures</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Service Availability</h2>
            <p>
              We strive to ensure the Service is available at all times, but we do not guarantee uninterrupted 
              access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances 
              beyond our control. We are not liable for any loss or damage arising from service interruptions.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>6. External Links</h2>
            <p>
              Our website may contain links to external websites. We are not responsible for the content, 
              privacy practices, or availability of these external sites. The inclusion of any link does not 
              imply endorsement by us.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>7. Limitation of Liability</h2>
            <p>
              UNDER NO CIRCUMSTANCE SHALL WE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, 
              SPECIAL, OR EXEMPLARY DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE. 
              THIS INCLUDES, BUT IS NOT LIMITED TO, LOSS OF DATA, LOSS OF PROFITS, OR ANY OTHER LOSSES.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>8. Changes to Disclaimer</h2>
            <p>
              We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately 
              upon posting to our website. Your continued use of the Service constitutes acceptance of any 
              modifications.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>9. Contact Us</h2>
            <p>
              If you have any questions about this Disclaimer, please contact us:
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

export default Disclaimer;
