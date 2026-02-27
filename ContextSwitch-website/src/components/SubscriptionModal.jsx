import { useState } from 'react';
import { createPortal } from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.context-switch.dev/api';
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_your_stripe_public_key';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// Plan pricing configuration
const PLAN_CONFIG = {
  Pro: {
    monthly: { price: '$9.99', priceId: 'pro_monthly' },
    yearly: { price: '$99.99', priceId: 'pro_yearly', savings: 'Save 17%' }
  },
  Enterprise: {
    monthly: { price: '$29.99', priceId: 'enterprise_monthly' },
    yearly: { price: '$299.99', priceId: 'enterprise_yearly', savings: 'Save 17%' }
  }
};

const SubscriptionModal = ({ isOpen, onClose, plan }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleCheckout = async () => {
    const token = localStorage.getItem('contextswitch_token');
    
    if (!token) {
      setStatus({ type: 'error', message: 'Please login first to subscribe' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const planConfig = PLAN_CONFIG[plan];
      const priceConfig = planConfig[billingCycle];

      const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          priceId: priceConfig.priceId,
          planType: plan.toLowerCase()
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to create checkout session' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to process. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const planConfig = PLAN_CONFIG[plan] || PLAN_CONFIG.Pro;
  const currentPrice = planConfig[billingCycle];

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'relative',
          background: '#1a1a1a',
          borderRadius: '1rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '450px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          margin: '1rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(200, 245, 66, 0.1)',
            border: '1px solid rgba(200, 245, 66, 0.3)',
            borderRadius: '9999px',
            marginBottom: '1rem',
          }}>
            <span style={{ color: '#c8f542', fontWeight: 600 }}>{plan} Plan</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
            Upgrade to {plan}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            Choose your billing cycle and proceed to checkout
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '0.5rem',
          padding: '0.25rem',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: billingCycle === 'monthly' ? '#c8f542' : 'transparent',
              color: billingCycle === 'monthly' ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: billingCycle === 'yearly' ? '#c8f542' : 'transparent',
              color: billingCycle === 'yearly' ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Yearly {planConfig.yearly.savings && <span style={{ fontSize: '0.75rem' }}>({planConfig.yearly.savings})</span>}
          </button>
        </div>

        {/* Price Display */}
        <div style={{ 
          textAlign: 'center', 
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>
            {currentPrice.price}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)' }}>
            per {billingCycle === 'monthly' ? 'month' : 'year'}
          </div>
        </div>

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
          {plan === 'Pro' ? (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                500 compressions/month
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100 saved contexts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
            </>
          ) : (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited compressions
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited saved contexts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 Priority support + API access
              </li>
            </>
          )}
        </ul>

        {status.message && (
          <div style={{
            padding: '0.875rem',
            background: status.type === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${status.type === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: '0.5rem',
            color: status.type === 'success' ? '#34d399' : '#ef4444',
            marginBottom: '1rem',
            fontSize: '0.875rem',
          }}>
            {status.message}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#c8f542',
            color: '#0a0a0a',
            fontWeight: 600,
            borderRadius: '0.5rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? 'Processing...' : (
            <>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Proceed to Checkout
            </>
          )}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
          Secure payment powered by Stripe. Cancel anytime.
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SubscriptionModal;
