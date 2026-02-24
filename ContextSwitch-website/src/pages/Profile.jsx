import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('contextswitch_token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchProfile(token);
    fetchHistory(token);
  }, [navigate]);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (token) => {
    try {
      const response = await fetch(`${API_URL}/user/history?limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setHistory(data.data.contexts || []);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('contextswitch_token');
    localStorage.removeItem('contextswitch_user');
    navigate('/');
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
        <button onClick={() => navigate('/')} style={styles.backBtn}>Go Back</button>
      </div>
    );
  }

  const { user: userData, subscription, usage, limits } = user || {};

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Your Profile</h1>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>

        {/* Top Row - Profile + Stats */}
        <div style={styles.topRow}>
          {/* User Info Card */}
          <div style={{...styles.card, flex: '1'}}>
            <div style={styles.profileHeader}>
              <div style={styles.avatar}>
                {(userData?.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div style={{flex: 1}}>
                <h2 style={styles.userName}>{userData?.name || 'User'}</h2>
                <p style={styles.userEmail}>{userData?.email}</p>
                <span style={{
                  ...styles.planBadge,
                  background: subscription?.plan === 'pro' ? 'rgba(200, 245, 66, 0.15)' : 
                              subscription?.plan === 'enterprise' ? 'rgba(234, 179, 8, 0.15)' : 
                              'rgba(167, 139, 250, 0.15)',
                  color: subscription?.plan === 'pro' ? '#c8f542' : 
                         subscription?.plan === 'enterprise' ? '#eab308' : '#a78bfa'
                }}>
                  {(subscription?.plan || 'free').charAt(0).toUpperCase() + (subscription?.plan || 'free').slice(1)} Plan
                </span>
              </div>
            </div>
            
            {/* Plan Limits inside profile card */}
            <div style={styles.limitsSection}>
              <div style={styles.limitHeader}>
                <span style={styles.limitLabel}>Monthly Compressions</span>
                <span style={styles.limitValue}>
                  {usage?.monthlyCompressions || 0} / {limits?.maxCompressionsPerMonth || 50}
                </span>
              </div>
              <div style={styles.progressContainer}>
                <div 
                  style={{
                    ...styles.progressBar,
                    width: `${Math.min(100, ((usage?.monthlyCompressions || 0) / (limits?.maxCompressionsPerMonth || 50)) * 100)}%`
                  }}
                />
              </div>
            </div>
            
            {subscription?.plan === 'free' && (
              <button style={styles.upgradeBtn}>
                Upgrade to Pro
              </button>
            )}
          </div>

          {/* Usage Stats Card */}
          <div style={{...styles.card, flex: '1.5'}}>
            <h3 style={styles.cardTitle}>Usage Statistics</h3>
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <span style={styles.statValue}>{usage?.totalCompressions || 0}</span>
                <span style={styles.statLabel}>Total Compressions</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statValue}>{usage?.monthlyCompressions || 0}</span>
                <span style={styles.statLabel}>This Month</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statValue}>{formatNumber(usage?.totalTokensSaved || 0)}</span>
                <span style={styles.statLabel}>Tokens Saved</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statValue}>{usage?.totalContextsSaved || 0}</span>
                <span style={styles.statLabel}>Contexts Saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Recent Activity</h3>
          {history.length === 0 ? (
            <p style={styles.emptyText}>No compression history yet. Start compressing your AI conversations!</p>
          ) : (
            <div style={styles.historyList}>
              {history.map((item, index) => (
                <div key={index} style={styles.historyItem}>
                  <div style={styles.historyInfo}>
                    <span style={styles.historyName}>{item.projectName}</span>
                    <span style={styles.historyMeta}>
                      {item.platform} • {item.original?.messageCount || 0} messages • {item.compressed?.compressionRatio || 0}% compressed
                    </span>
                  </div>
                  <span style={styles.historyDate}>{formatDate(item.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p style={styles.memberSince}>
          Member since {userData?.createdAt ? formatDate(userData.createdAt) : 'N/A'}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    paddingTop: '100px',
    paddingBottom: '60px',
    background: '#0a0a0a',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 24px',
  },
  loading: {
    textAlign: 'center',
    color: '#a1a1aa',
    paddingTop: '100px',
    fontSize: '18px',
  },
  error: {
    textAlign: 'center',
    color: '#f87171',
    paddingTop: '100px',
    fontSize: '18px',
  },
  backBtn: {
    display: 'block',
    margin: '20px auto',
    padding: '12px 24px',
    background: 'rgba(167, 139, 250, 0.2)',
    color: '#a78bfa',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
  },
  logoutBtn: {
    padding: '10px 20px',
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  topRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    alignItems: 'stretch',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '24px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '600',
    color: 'white',
    flexShrink: 0,
  },
  userName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    margin: '0 0 4px 0',
  },
  userEmail: {
    fontSize: '13px',
    color: '#a1a1aa',
    margin: '0 0 10px 0',
  },
  planBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  limitsSection: {
    marginBottom: '16px',
  },
  limitHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  limitLabel: {
    fontSize: '13px',
    color: '#a1a1aa',
  },
  limitValue: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  statItem: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '20px 16px',
    textAlign: 'center',
  },
  statValue: {
    display: 'block',
    fontSize: '28px',
    fontWeight: '700',
    color: '#c8f542',
    marginBottom: '6px',
  },
  statLabel: {
    fontSize: '10px',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  progressContainer: {
    height: '6px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #c8f542 0%, #a3e635 100%)',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  upgradeBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #c8f542 0%, #a3e635 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#0a0a0a',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  historyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  historyInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  historyName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
  },
  historyMeta: {
    fontSize: '12px',
    color: '#71717a',
  },
  historyDate: {
    fontSize: '12px',
    color: '#52525b',
  },
  emptyText: {
    color: '#52525b',
    fontSize: '14px',
    textAlign: 'center',
    padding: '30px 0',
  },
  memberSince: {
    textAlign: 'center',
    color: '#3f3f46',
    fontSize: '12px',
    marginTop: '32px',
  },
};

export default Profile;
