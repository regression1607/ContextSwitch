const Refund = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          Cancellation <span style={{ color: '#c8f542' }}>Policy</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
          Last updated: February 2026
        </p>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Free Tier</h2>
            <p>
              ContextSwitch offers a free tier with unlimited context saves. No payment is required for the free 
              tier, and you can use it indefinitely without any charges.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Paid Subscriptions - No Refund Policy</h2>
            <p style={{ marginBottom: '1rem' }}>
              For our paid plans (Pro and Enterprise), please note:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>No Refunds:</strong> All subscription payments are final and non-refundable</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Cancellation Only:</strong> You can cancel your subscription at any time, but no refunds will be issued for the current or past billing periods</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Service Access:</strong> After cancellation, you will continue to have access until the end of your current billing period</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Cancellation Policy</h2>
            <p style={{ marginBottom: '1rem' }}>You can cancel your subscription at any time:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Your subscription will remain active until the end of the current billing period</li>
              <li style={{ marginBottom: '0.5rem' }}>You will not be charged for the next billing cycle</li>
              <li style={{ marginBottom: '0.5rem' }}>Your account will automatically revert to the free tier after cancellation</li>
              <li style={{ marginBottom: '0.5rem' }}>Your saved contexts will remain accessible (local storage)</li>
              <li style={{ marginBottom: '0.5rem' }}>Unused compression credits do not carry over after cancellation</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>4. How to Cancel</h2>
            <p style={{ marginBottom: '1rem' }}>To cancel your subscription:</p>
            <ol style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Contact us via email at <a href="mailto:ekanshrajput1607@gmail.com" style={{ color: '#c8f542' }}>ekanshrajput1607@gmail.com</a></li>
              <li style={{ marginBottom: '0.5rem' }}>Provide your registered email address</li>
              <li style={{ marginBottom: '0.5rem' }}>Request subscription cancellation</li>
              <li style={{ marginBottom: '0.5rem' }}>You will receive a confirmation email within 24-48 hours</li>
            </ol>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Important Notes</h2>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>We recommend trying our free tier before subscribing to a paid plan</li>
              <li style={{ marginBottom: '0.5rem' }}>Please review our features carefully before making a purchase</li>
              <li style={{ marginBottom: '0.5rem' }}>Contact us if you have any questions before subscribing</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Contact Us</h2>
            <p>
              For any questions regarding our Cancellation Policy, please contact us:
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

export default Refund;
