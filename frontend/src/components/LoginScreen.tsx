import React from 'react';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Ic } from './icons';

interface Props {
  onLogin: (name: string, email: string) => void;
  T: Theme; s: Strings;
}

export function LoginScreen({ onLogin, T, s }: Props) {
  const [tab, setTab] = React.useState<'login' | 'register'>('login');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [name, setName] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sk, setSk] = React.useState(0);
  const [fe, setFe] = React.useState(false);
  const [fp, setFp] = React.useState(false);
  const [fn, setFn] = React.useState(false);

  const validate = () => {
    if (!email.includes('@')) return s.errEmail;
    if (pwd.length < 6) return s.errPwd;
    if (tab === 'register' && name.trim().length < 2) return s.errName;
    return '';
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); setSk(k => k + 1); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(name || email.split('@')[0], email); }, 1100);
  };

  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: '100%', padding: '13px 14px 13px 44px',
    background: T.isDark ? T.bg3 : T.bg2,
    border: `1px solid ${focused ? T.accent : T.sep}`,
    borderRadius: 12, color: T.text, fontSize: 16,
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    outline: 'none', transition: 'border-color 0.18s',
  });

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="fade-up" style={{ width: '100%', maxWidth: 360, padding: '0 24px' }}>

        {/* App icon */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 76, height: 76, borderRadius: 20, background: '#007AFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 12px 32px rgba(0,122,255,0.38)',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: '-0.4px', marginBottom: 5 }}>
            {s.appName}
          </div>
          <div style={{ fontSize: 15, color: T.text2 }}>{s.appTagline}</div>
        </div>

        {/* Segment control */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2,
          background: T.isDark ? 'rgba(118,118,128,0.24)' : 'rgba(118,118,128,0.16)',
          borderRadius: 10, padding: 2, marginBottom: 24,
        }}>
          {(['login', 'register'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }} style={{
              padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 14, fontWeight: 600,
              background: tab === t ? (T.isDark ? '#2C2C2E' : '#FFFFFF') : 'transparent',
              color: tab === t ? T.text : T.text2,
              transition: 'all 0.18s',
              boxShadow: tab === t ? `0 1px 4px rgba(0,0,0,${T.isDark ? 0.4 : 0.12})` : 'none',
            }}>
              {t === 'login' ? s.signIn : s.signUp}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} key={`${sk}-${tab}`} className={error ? 'shake' : ''}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tab === 'register' && (
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: T.text3, display: 'flex', pointerEvents: 'none' }}><Ic.Profile /></div>
                <input type="text" placeholder={s.yourName} value={name} onChange={e => setName(e.target.value)} onFocus={() => setFn(true)} onBlur={() => setFn(false)} style={inputStyle(fn)} />
              </div>
            )}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: T.text3, display: 'flex', pointerEvents: 'none' }}><Ic.Mail /></div>
              <input type="email" placeholder={s.email} value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFe(true)} onBlur={() => setFe(false)} style={inputStyle(fe)} />
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: T.text3, display: 'flex', pointerEvents: 'none' }}><Ic.Lock /></div>
              <input type={showPwd ? 'text' : 'password'} placeholder={s.password} value={pwd} onChange={e => setPwd(e.target.value)} onFocus={() => setFp(true)} onBlur={() => setFp(false)} style={{ ...inputStyle(fp), paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPwd(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.text3, display: 'flex', padding: 4 }}>
                {showPwd ? <Ic.EyeOff /> : <Ic.Eye />}
              </button>
            </div>

            {error && (
              <div className="fade-in" style={{
                background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.25)',
                borderRadius: 10, padding: '9px 13px', fontSize: 13, color: '#FF3B30',
              }}>
                {error}
              </div>
            )}

            {tab === 'login' && (
              <div style={{ textAlign: 'right', marginTop: -2 }}>
                <button type="button" style={{ background: 'none', border: 'none', color: T.accent, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                  {s.forgotPwd}
                </button>
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '14px 0', border: 'none', borderRadius: 12, marginTop: 4,
              cursor: loading ? 'default' : 'pointer',
              background: loading ? T.bg3 : '#007AFF',
              color: loading ? T.text2 : '#FFFFFF',
              fontSize: 16, fontWeight: 600,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              transition: 'all 0.18s',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(0,122,255,0.38)',
            }}>
              {loading
                ? (tab === 'login' ? s.signingIn : s.creatingAccount)
                : (tab === 'login' ? s.signIn : s.register)}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: T.text2 }}>
          {tab === 'login' ? s.noAccount : s.hasAccount}{' '}
          <button onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setError(''); }} style={{ background: 'none', border: 'none', color: T.accent, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            {tab === 'login' ? s.register : s.signIn}
          </button>
        </div>
      </div>
    </div>
  );
}
