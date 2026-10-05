import React, { useState } from 'react';
import { Logo } from '../components/Logo';

interface AuthScreenProps {
  initialMode?: 'signin' | 'signup';
  onLoginSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'signin',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  
  // Sign in form state
  const [signInEmail, setSignInEmail] = useState('ahmed@wealthpulse.app');
  const [signInPassword, setSignInPassword] = useState('••••••••••••••••');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  // Sign up form state
  const [fullName, setFullName] = useState('Eleanor Sterling-Hayes');
  const [signUpEmail, setSignUpEmail] = useState('e.sterling@oxford-endowment.org');
  const [signUpPassword, setSignUpPassword] = useState('Thrive#Vault98');
  const [confirmPassword, setConfirmPassword] = useState('Thrive#Vault98');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const passwordsMatch = signUpPassword.length > 0 && signUpPassword === confirmPassword;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#151c27] flex flex-col justify-between selection:bg-[#ffdbc7] selection:text-[#502c12]">
      {/* Top Banner Navigation bar to switch mode or preview */}
      <div className="w-full max-w-6xl mx-auto px-4 pt-4 flex items-center justify-between">
        <Logo variant="wealthpulse" size="md" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('signin')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
              mode === 'signin'
                ? 'bg-[#6b4226] text-white'
                : 'text-[#51443d] hover:text-[#151c27] hover:bg-[#e7eefe]'
            }`}
          >
            Access Ledger (Sign In)
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
              mode === 'signup'
                ? 'bg-[#6b4226] text-white'
                : 'text-[#51443d] hover:text-[#151c27] hover:bg-[#e7eefe]'
            }`}
          >
            Create Ledger (Sign Up)
          </button>
        </div>
      </div>

      {/* Main Dual-Column Canvas */}
      <main className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="relative w-full max-w-6xl mx-auto my-auto py-4">
          {/* Ambient organic gradient background blobs */}
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-[#ffdbc7]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 right-8 w-80 h-80 bg-[#e7eefe]/70 rounded-full blur-2xl pointer-events-none" />

          {/* Elevated Surface Card */}
          <div className="relative w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-[#502c12]/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#e7eefe]">
            {mode === 'signup' ? (
              /* ================== SIGN UP VIEW ================== */
              <>
                {/* COLUMN 1: Registration Form Core (7 Columns) */}
                <section className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Header lockup */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#502c12] text-white shadow-xs">
                        <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                      </span>
                      <span className="text-[12px] font-bold text-[#83746c] uppercase tracking-wider">
                        Sovereign Wealth Tech
                      </span>
                    </div>

                    <h1 className="text-[26px] sm:text-[30px] font-bold text-[#151c27] tracking-tight">
                      Create Your Personal Ledger
                    </h1>
                    <p className="text-[13px] text-[#51443d] mt-1 max-w-xl">
                      Join over 40,000 users managing personal budgets with automated tracking and insights.
                    </p>

                    {/* Quick SSO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                      <button
                        onClick={onLoginSuccess}
                        type="button"
                        className="group flex items-center justify-center gap-2.5 py-2.5 px-4 bg-[#f0f3ff] hover:bg-[#e7eefe] text-[#151c27] text-[13px] font-medium rounded-lg border border-[#e7eefe] transition-all"
                      >
                        <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span>Sign up with Google</span>
                      </button>

                      <button
                        onClick={onLoginSuccess}
                        type="button"
                        className="group flex items-center justify-center gap-2.5 py-2.5 px-4 bg-[#f0f3ff] hover:bg-[#e7eefe] text-[#151c27] text-[13px] font-medium rounded-lg border border-[#e7eefe] transition-all"
                      >
                        <svg className="w-4 h-4 shrink-0 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.18.66-2.83 1.42-.57.66-.99 1.74-.86 2.8 1.11.09 2.09-.5 2.73-1.27z" />
                        </svg>
                        <span>Sign up with Apple</span>
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="relative flex items-center my-4">
                      <div className="flex-grow h-px bg-[#e7eefe]" />
                      <span className="flex-shrink mx-3 text-[11px] font-bold text-[#83746c] uppercase tracking-widest bg-white px-2">
                        Or register with email
                      </span>
                      <div className="flex-grow h-px bg-[#e7eefe]" />
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleSignUp} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="block text-[13px] font-medium text-[#151c27]">
                          Full Legal Name
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-[#83746c] text-[18px]">
                            person
                          </span>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Eleanor Sterling-Hayes"
                            className="w-full bg-[#f0f3ff] text-[#151c27] pl-10 pr-4 py-2.5 rounded-lg text-[13px] border border-[#e7eefe] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6b4226]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[13px] font-medium text-[#151c27]">
                          Institutional or Personal Email
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-[#83746c] text-[18px]">
                            mail
                          </span>
                          <input
                            type="email"
                            required
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            placeholder="e.sterling@oxford-endowment.org"
                            className="w-full bg-[#f0f3ff] text-[#151c27] pl-10 pr-4 py-2.5 rounded-lg text-[13px] border border-[#e7eefe] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6b4226]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1">
                          <label className="block text-[13px] font-medium text-[#151c27]">Passcode</label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-[#83746c] text-[18px]">
                              shield_lock
                            </span>
                            <input
                              type={showSignUpPassword ? 'text' : 'password'}
                              required
                              value={signUpPassword}
                              onChange={(e) => setSignUpPassword(e.target.value)}
                              className="w-full bg-[#f0f3ff] text-[#151c27] pl-10 pr-10 py-2.5 rounded-lg text-[13px] border border-[#e7eefe] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6b4226]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                              className="absolute right-3 text-[#83746c] hover:text-[#151c27]"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {showSignUpPassword ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="block text-[13px] font-medium text-[#151c27]">
                              Confirm Passcode
                            </label>
                            {passwordsMatch && (
                              <span className="text-[11px] font-bold text-[#00573a] flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px]">check</span> Match
                              </span>
                            )}
                          </div>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-[#83746c] text-[18px]">
                              verified_user
                            </span>
                            <input
                              type={showSignUpPassword ? 'text' : 'password'}
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full bg-[#f0f3ff] text-[#151c27] pl-10 pr-10 py-2.5 rounded-lg text-[13px] border border-[#e7eefe] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6b4226]"
                            />
                            {passwordsMatch && (
                              <span className="material-symbols-outlined absolute right-3 text-[#00573a] text-[18px]">
                                check_circle
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Passcode Entropy */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-medium text-[#83746c]">
                            Entropy &amp; Complexity Index
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00573a]/10 text-[#00573a] text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00573a] animate-pulse" />
                            Strong Passcode
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          <div className="h-1.5 rounded-full bg-[#00573a]" />
                          <div className="h-1.5 rounded-full bg-[#00573a]" />
                          <div className="h-1.5 rounded-full bg-[#00573a]" />
                          <div className="h-1.5 rounded-full bg-[#00573a]" />
                        </div>
                      </div>

                      {/* Agreement Checkbox */}
                      <div className="flex items-start gap-2.5 pt-1">
                        <input
                          id="termsCheck"
                          type="checkbox"
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          required
                          className="mt-1 w-4 h-4 rounded text-[#6b4226] accent-[#6b4226] cursor-pointer"
                        />
                        <label htmlFor="termsCheck" className="text-[12px] text-[#51443d] leading-snug cursor-pointer select-none">
                          I hereby accept the{' '}
                          <a href="#" className="font-semibold text-[#6b4226] underline underline-offset-2">
                            Master Account Service Terms
                          </a>
                          , and acknowledge the fiduciary data handling standards stipulated in the{' '}
                          <a href="#" className="font-semibold text-[#6b4226] underline underline-offset-2">
                            Privacy &amp; Security Charter
                          </a>.
                        </label>
                      </div>

                      {/* Primary Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#6b4226] text-white text-[13px] font-semibold rounded-lg shadow-md hover:bg-[#502c12] transition-all active:scale-[0.99]"
                        >
                          <span>Create Free Account</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="pt-4 text-center">
                    <p className="text-[13px] text-[#51443d]">
                      Already registered?{' '}
                      <button
                        onClick={() => setMode('signin')}
                        className="font-semibold text-[#6b4226] hover:underline ml-1"
                      >
                        Access existing account
                      </button>
                    </p>
                  </div>
                </section>

                {/* COLUMN 2: Feature Summary & Perks (5 Columns) */}
                <aside className="lg:col-span-5 bg-[#f0f3ff] p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#e7eefe] relative overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-white text-[#51443d] text-[11px] font-bold uppercase tracking-wider border border-[#e7eefe]">
                        Ledger Engine v4.2
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#00573a] text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[14px]">tune</span> Live Precision
                      </span>
                    </div>

                    <h2 className="text-[20px] font-bold text-[#151c27] tracking-tight mb-2">
                      Intelligent Wealth Orchestration
                    </h2>
                    <p className="text-[12px] text-[#51443d] leading-relaxed mb-6">
                      Purpose-built for executives, family offices, and disciplined accumulators requiring zero-friction clarity across fragmented capital.
                    </p>

                    <div className="space-y-3.5">
                      <div className="p-3.5 bg-white rounded-xl shadow-xs border border-[#e7eefe]">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#f0f3ff] flex items-center justify-center shrink-0 text-[#6b4226]">
                            <span className="material-symbols-outlined text-[20px]">pie_chart</span>
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-[#151c27] text-[14px]">Automated Category Tracking</h3>
                            <p className="text-[12px] text-[#83746c]">
                              Heuristic pattern parsing sorts line-items across merchant codes while preserving custom dynamic spend caps.
                            </p>
                            <div className="pt-1.5">
                              <div className="flex justify-between items-center text-[10px] text-[#83746c] mb-1">
                                <span>Operational Spend Threshold</span>
                                <span className="text-[#00573a] font-semibold">64% Utilized</span>
                              </div>
                              <div className="w-full h-1.5 bg-[#dce2f3] rounded-full overflow-hidden">
                                <div className="h-full bg-[#00573a] rounded-full w-[64%]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl shadow-xs border border-[#e7eefe]">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#f0f3ff] flex items-center justify-center shrink-0 text-[#6b4226]">
                            <span className="material-symbols-outlined text-[20px]">account_balance</span>
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-[#151c27] text-[14px]">Multi-Institution Sync</h3>
                            <p className="text-[12px] text-[#83746c]">
                              Synchronize real-time balances from over 11,000 depository, brokerage, and alternative custody partners.
                            </p>
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="px-2 py-0.5 rounded bg-[#f0f3ff] text-[10px] font-semibold text-[#51443d] border border-[#e7eefe]">
                                FedNow
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#f0f3ff] text-[10px] font-semibold text-[#51443d] border border-[#e7eefe]">
                                Plaid Link
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#f0f3ff] text-[10px] font-semibold text-[#51443d] border border-[#e7eefe]">
                                SWIFT Iso20022
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl shadow-xs border border-[#e7eefe]">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#f0f3ff] flex items-center justify-center shrink-0 text-[#6b4226]">
                            <span className="material-symbols-outlined text-[20px]">trending_up</span>
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-[#151c27] text-[14px]">Predictive Cash Flow Simulation</h3>
                            <p className="text-[12px] text-[#83746c]">
                              Simulate future liquidity trajectories based on scheduled obligations, tax events, and recurrent earnings.
                            </p>
                            <div className="pt-1.5 flex items-center gap-2">
                              <svg className="w-24 h-5 text-[#00573a]" fill="none" viewBox="0 0 100 24">
                                <path d="M0 18 Q 20 22, 35 12 T 70 8 T 100 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="100" cy="2" r="3" fill="currentColor" />
                              </svg>
                              <span className="text-[11px] text-[#00573a] font-bold">+18.4% Liquidity Buffer</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-3.5 bg-white/80 rounded-xl border border-[#e7eefe]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-[#6b4226] text-white flex items-center justify-center text-[10px] font-bold">
                        MA
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#151c27]">Marcus A. Vance</p>
                        <p className="text-[10px] text-[#83746c]">Managing Partner, Vance &amp; Co.</p>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#51443d] italic leading-snug">
                      “Replaced four fragmented spreadsheets within forty-eight hours. The visual discipline mirrors our firm's risk philosophy.”
                    </p>
                  </div>
                </aside>
              </>
            ) : (
              /* ================== SIGN IN VIEW ================== */
              <>
                {/* Left Panel: Authentication Workstation (7 Columns) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
                    {/* Micro Brand Insignia */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#6b4226] flex items-center justify-center text-white shadow-xs">
                        <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                      </div>
                      <span className="text-[12px] font-bold tracking-wider uppercase text-[#6b4226]">
                        Sovereign Financial
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 mb-6">
                      <h1 className="text-[26px] sm:text-[30px] font-bold text-[#151c27] tracking-tight">
                        Access Your Ledger
                      </h1>
                      <p className="text-[13px] text-[#51443d] leading-relaxed">
                        Enter your credentials to access your financial dashboard and real-time expense analytics.
                      </p>
                    </div>

                    {/* Quick SSO */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={onLoginSuccess}
                        type="button"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#f0f3ff] hover:bg-[#e7eefe] rounded-lg border border-[#e7eefe] text-[13px] font-medium text-[#151c27] transition-colors"
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span>Google</span>
                      </button>

                      <button
                        onClick={onLoginSuccess}
                        type="button"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#f0f3ff] hover:bg-[#e7eefe] rounded-lg border border-[#e7eefe] text-[13px] font-medium text-[#151c27] transition-colors"
                      >
                        <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.92-1 .04-2.16.67-2.83 1.45-.58.67-1.09 1.76-.95 2.82 1.11.09 2.21-.58 2.84-1.35z" />
                        </svg>
                        <span>Apple ID</span>
                      </button>
                    </div>

                    <div className="relative flex items-center justify-center my-4">
                      <div className="w-full h-px bg-[#e7eefe]" />
                      <span className="absolute px-2 bg-white text-[11px] font-bold uppercase tracking-wider text-[#83746c]">
                        Or sign in with email
                      </span>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider">
                          User Account Email
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-[#83746c] text-[18px]">
                            mail
                          </span>
                          <input
                            type="email"
                            required
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            placeholder="investor@sovereign-vault.com"
                            className="w-full h-11 pl-10 pr-4 bg-[#f0f3ff] rounded-lg text-[13px] text-[#151c27] border border-[#e7eefe] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6b4226]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider">
                          Master Passcode
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-[#83746c] text-[18px]">
                            key
                          </span>
                          <input
                            type={showSignInPassword ? 'text' : 'password'}
                            required
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            placeholder="••••••••••••••••"
                            className="w-full h-11 pl-10 pr-11 bg-[#f0f3ff] rounded-lg text-[13px] text-[#151c27] border border-[#e7eefe] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6b4226]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignInPassword(!showSignInPassword)}
                            className="absolute right-3 text-[#83746c] hover:text-[#151c27]"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {showSignInPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[12px] pt-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={rememberDevice}
                            onChange={(e) => setRememberDevice(e.target.checked)}
                            className="w-4 h-4 rounded text-[#6b4226] accent-[#6b4226] cursor-pointer"
                          />
                          <span className="text-[#51443d]">Remember device for 30 days</span>
                        </label>
                        <a href="#" className="font-semibold text-[#6b4226] hover:underline">
                          Forgot master passcode?
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-11 bg-[#6b4226] hover:bg-[#502c12] text-white font-semibold text-[13px] rounded-lg shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
                      >
                        <span>Access Dashboard</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </form>

                    <div className="mt-6 text-center text-[12px] text-[#51443d]">
                      New to Personal Finance Tracker?{' '}
                      <button
                        onClick={() => setMode('signup')}
                        className="font-semibold text-[#6b4226] hover:underline ml-1"
                      >
                        Create your account
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Visual Financial Intelligence & Telemetry (5 Columns) */}
                <div className="lg:col-span-5 bg-[#f0f3ff] p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#e7eefe] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffdbc7]/30 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00573a] animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#83746c]">
                        Ledger Live Sync
                      </span>
                    </div>
                    <span className="text-[11px] bg-white border border-[#e7eefe] px-2 py-0.5 rounded font-semibold text-[#51443d]">
                      v2.4.9
                    </span>
                  </div>

                  <div className="relative z-10 my-auto py-6 flex flex-col gap-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c] block">
                          Preview Snapshot
                        </span>
                        <h2 className="text-[18px] font-bold text-[#151c27]">Monthly Capital Flow</h2>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00573a]/10 text-[#00573a] text-[11px] font-bold">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        <span>+14.2% pacing</span>
                      </div>
                    </div>

                    {/* Glassmorphic Balance Card */}
                    <div className="bg-white/95 rounded-xl p-4 shadow-xs border border-[#e7eefe] flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[#83746c] text-[11px] font-semibold uppercase tracking-wider">
                        <span>UNRESTRICTED LIQUIDITY</span>
                        <span className="material-symbols-outlined text-[18px] text-[#00573a]">verified</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[32px] font-bold text-[#151c27] tabular-nums tracking-tight">
                          $8,450.00
                        </span>
                        <span className="text-[12px] text-[#83746c] font-semibold">USD</span>
                      </div>

                      {/* SVG Sparkline Track */}
                      <div className="w-full pt-1">
                        <div className="flex items-center justify-between text-[11px] font-medium text-[#83746c] mb-1">
                          <span>30-Day Trajectory</span>
                          <span className="font-semibold text-[#00573a]">Optimized Yield</span>
                        </div>
                        <svg className="w-full h-12 overflow-visible" fill="none" viewBox="0 0 280 48">
                          <defs>
                            <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#4edea3" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 38 C 40 38, 50 24, 90 28 C 130 32, 140 12, 190 18 C 230 22, 250 4, 280 6 L 280 48 L 0 48 Z"
                            fill="url(#flowGrad)"
                          />
                          <path
                            d="M0 38 C 40 38, 50 24, 90 28 C 130 32, 140 12, 190 18 C 230 22, 250 4, 280 6"
                            stroke="#00573a"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="280" cy="6" r="3.5" fill="#00573a" />
                        </svg>
                      </div>
                    </div>

                    {/* Safe-to-Spend Limit */}
                    <div className="bg-white rounded-xl p-3.5 flex items-center justify-between border border-[#e7eefe]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f0f3ff] flex items-center justify-center text-[#6b4226]">
                          <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#83746c] block">
                            Safe-To-Spend Limit
                          </span>
                          <span className="text-[17px] font-bold text-[#151c27] tabular-nums">$3,120.00</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#00573a] bg-[#00573a]/10 px-2.5 py-1 rounded-full">
                        63% Buffer
                      </span>
                    </div>

                    {/* Micro Quick-Insight Card */}
                    <div className="flex items-center gap-2.5 px-3 py-2 bg-white/70 rounded-lg border border-[#e7eefe]">
                      <span className="material-symbols-outlined text-[18px] text-[#6b4226]">lightbulb</span>
                      <p className="text-[12px] text-[#51443d]">
                        Recurring payments auto-balanced. Fixed costs covered through month end.
                      </p>
                    </div>
                  </div>

                  {/* Verification Badges */}
                  <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-2 text-[#51443d] border-t border-[#e7eefe]">
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e7eefe]">
                      <span className="material-symbols-outlined text-[15px] text-[#00573a]">lock</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">256-Bit TLS</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e7eefe]">
                      <span className="material-symbols-outlined text-[15px] text-[#00573a]">verified_user</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">SOC2 Type II</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e7eefe]">
                      <span className="material-symbols-outlined text-[15px] text-[#6b4226]">gavel</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Fiduciary Grade</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-white/70 backdrop-blur-md border-t border-[#e7eefe]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#83746c]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#00573a]">lock</span>
              <span>256-Bit Bank-Grade Encryption</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#00573a]">verified_user</span>
              <span>SOC2 Type II Certified</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#151c27]">Privacy Policy</a>
            <a href="#" className="hover:text-[#151c27]">Terms of Service</a>
            <span>© 2026 Sovereign Wealth Tech</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
