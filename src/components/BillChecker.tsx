import React, { useState, useEffect } from 'react';
import { Search, Loader2, Info, CheckCircle2, ArrowRight, Copy, Check, ExternalLink, ClipboardPaste, MousePointer2 } from 'lucide-react';
import { getAllDiscos } from '../content/discoData';

interface BillCheckerProps {
  initialDisco?: string;
}

export default function BillChecker({ initialDisco = "iesco" }: BillCheckerProps) {
  const [provider, setProvider] = useState(initialDisco);
  const [refNumber, setRefNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResultBtn, setShowResultBtn] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [portalOpened, setPortalOpened] = useState(false);
  const [activePulse, setActivePulse] = useState(false);

  useEffect(() => {
    setShowResultBtn(false);
    setPortalOpened(false);
  }, [provider, refNumber]);

  useEffect(() => {
    if (portalOpened) {
      const t = setTimeout(() => setActivePulse(true), 600);
      return () => clearTimeout(t);
    } else {
      setActivePulse(false);
    }
  }, [portalOpened]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResultBtn(false);
    setPortalOpened(false);
    setError("");

    if (refNumber.length > 0) {
      const cleanRef = refNumber.replace(/\D/g, "");
      if (cleanRef.length !== 14) {
        setError("Reference number must be exactly 14 digits.");
        return;
      }
    } else {
      setError("Please enter your 14-digit reference number.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResultBtn(true);
    }, 1500);
  };

  const currentDisco = getAllDiscos().find(d => d.id === provider);
  const cleanRef = refNumber.replace(/\D/g, "");
  const targetUrl = currentDisco ? currentDisco.urlPrefix : `https://bill.pitc.com.pk/${provider}bill`;

  const handleOpenPortal = () => {
    navigator.clipboard.writeText(cleanRef).catch(() => {});
    window.open(targetUrl, 'pitc_portal', 'width=960,height=720,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no');
    setPortalOpened(true);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyAgain = () => {
    navigator.clipboard.writeText(cleanRef).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 md:p-10 flex flex-col gap-6 md:gap-8">

        {!portalOpened ? (
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                Check Your <span className="text-emerald-600">Electricity Bill</span> Online.
              </h2>
              <p className="text-slate-500 text-sm md:text-base max-w-md">
                Select your provider and add your 14-digit reference number below to instantly retrieve your bill.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row items-end gap-4">

                <div className="w-full md:w-1/3 space-y-1">
                  <label htmlFor="provider" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Select Provider
                  </label>
                  <div className="relative">
                    <select
                      id="provider"
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-slate-900"
                    >
                      {getAllDiscos().map((disco) => (
                        <option key={disco.id} value={disco.id}>
                          {disco.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3 space-y-1">
                  <label htmlFor="refNumber" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
                    <span>Reference Number</span>
                    <span className="text-[10px] tracking-widest text-slate-400 font-semibold">14 DIGITS</span>
                  </label>
                  <input
                    id="refNumber"
                    type="text"
                    inputMode="numeric"
                    maxLength={14}
                    placeholder="14 Digits (No spaces)"
                    value={refNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setRefNumber(val);
                    }}
                    className={`w-full bg-slate-50 border ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500'} rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 transition-colors text-slate-900 tracking-widest placeholder:tracking-normal placeholder:font-normal`}
                  />
                </div>
              </div>

              {error && <p className="text-xs font-bold text-red-500 mt-2 flex items-center gap-1"><Info className="w-3.5 h-3.5"/> {error}</p>}

              <div className="pt-2">
                {!showResultBtn ? (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-[14px] px-8 rounded-xl shadow-lg shadow-slate-900/20 flex justify-center items-center gap-2 text-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:active:scale-100"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</>
                    ) : (
                      <>Get Bill <Search className="w-5 h-5 ml-1" strokeWidth={2.5} /></>
                    )}
                  </button>
                ) : (
                  <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="bg-slate-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Your Reference No.</span>
                        <span className="text-base font-mono font-bold text-slate-800 tracking-widest">{cleanRef}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(cleanRef).then(() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          });
                        }}
                        className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                      >
                        {copied ? "Copied ✓" : "Copy"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenPortal}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-[14px] px-8 rounded-xl shadow-lg shadow-emerald-600/20 flex justify-center items-center gap-2 text-lg transition-all active:scale-[0.98]"
                    >
                      Open Bill Portal <ExternalLink className="w-5 h-5 ml-1" strokeWidth={2.5} />
                    </button>

                    <p className="text-center text-xs text-slate-500 font-medium">
                      A portal window will open — your reference number is <strong>auto-copied</strong> so you can paste it instantly.
                    </p>
                  </div>
                )}
              </div>
            </form>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4 mt-2 text-slate-500">
              <Info strokeWidth={2.5} className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-xs leading-relaxed font-medium">
                Your reference number can be found on the top left of your old paper bill. It is a 14-digit numeric code required for all online inquiries. You will be redirected to the secure official PITC billing portal.
              </p>
            </div>
          </>
        ) : (
          /* ── Portal Guide View ── */
          <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                Almost There! <span className="text-emerald-600">Follow These Steps</span>
              </h2>
              <p className="text-slate-500 text-sm">The PITC portal opened in a new window. Complete these 3 quick steps to see your bill.</p>
            </div>

            {/* Ref number display */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Reference Number (Copied)</span>
                <span className="text-xl font-mono font-black text-slate-900 tracking-[0.2em]">{cleanRef}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyAgain}
                className={`shrink-0 flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${copied ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-600'}`}
              >
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Again</>}
              </button>
            </div>

            {/* Step list */}
            <div className="flex flex-col gap-3">
              {/* Step 1 — done */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Portal window opened</p>
                  <p className="text-xs text-slate-500">The PITC bill portal is now open in a separate window.</p>
                </div>
              </div>

              {/* Step 2 — done */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Reference number copied to clipboard</p>
                  <p className="text-xs text-slate-500">Your 14-digit reference number is ready to paste.</p>
                </div>
              </div>

              {/* Step 3 — active */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border-2 border-emerald-400 shadow-sm shadow-emerald-100">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-sm font-black">3</span>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Switch to the portal window &amp; paste</p>
                    <p className="text-xs text-slate-500 mt-0.5">Click the PITC window in your taskbar, then paste your reference number in the field shown below.</p>
                  </div>

                  {/* PITC search box mockup */}
                  <div className="relative bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-col gap-2 overflow-hidden">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">PITC Search Field (paste here)</p>
                    <div className="relative">
                      <div className={`w-full bg-white border-2 rounded-lg px-4 py-2.5 font-mono text-sm tracking-widest text-slate-400 flex items-center gap-2 transition-all duration-500 ${activePulse ? 'border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]' : 'border-slate-300'}`}>
                        <ClipboardPaste className={`w-4 h-4 shrink-0 transition-colors duration-500 ${activePulse ? 'text-emerald-500' : 'text-slate-300'}`} />
                        <span className={`transition-colors duration-500 ${activePulse ? 'text-slate-700' : 'text-slate-300'}`}>
                          {activePulse ? cleanRef : 'Enter Reference No. here...'}
                        </span>
                      </div>

                      {/* Animated pointer */}
                      <div className={`absolute -right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-all duration-700 ${activePulse ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <div className="flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap">
                          <MousePointer2 className="w-3 h-3" />
                          Paste here (Ctrl+V)
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-1">
                      <div className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all duration-500 ${activePulse ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-300 text-slate-500'}`}>
                        Search →
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1">
                      <kbd className="font-mono font-black text-slate-700">Ctrl</kbd>
                      <span>+</span>
                      <kbd className="font-mono font-black text-slate-700">V</kbd>
                      <span>to paste</span>
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1">then click <strong>Search</strong></span>
                    <span className="flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1">your bill loads instantly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Re-open / start over actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleOpenPortal}
                className="flex-1 flex items-center justify-center gap-2 text-sm font-bold px-5 py-3 rounded-xl border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Re-open Portal Window
              </button>
              <button
                type="button"
                onClick={() => { setPortalOpened(false); setShowResultBtn(false); setRefNumber(""); }}
                className="flex-1 flex items-center justify-center gap-2 text-sm font-bold px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Check Another Bill
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
