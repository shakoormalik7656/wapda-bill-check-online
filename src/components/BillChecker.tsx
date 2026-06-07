import React, { useState, useEffect } from 'react';
import { Search, Loader2, Info, CheckCircle2, ArrowRight } from 'lucide-react';
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

  // Whenever provider or refNumber changes, hide the result button so they can re-fetch
  useEffect(() => {
    setShowResultBtn(false);
  }, [provider, refNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResultBtn(false);
    setError("");

    // Validate 14 digits strictly if provided, or allow empty if the user just wants the portal.
    // Assuming we want to force them to provide 14 digits based on "will add refrence number"
    if (refNumber.length > 0) {
      const cleanRef = refNumber.replace(/\D/g, "");
      if (cleanRef.length !== 14) {
        setError("Reference number must be exactly 14 digits.");
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate a small loading phase
    setTimeout(() => {
      setIsLoading(false);
      setShowResultBtn(true);
    }, 1500);
  };

  const currentDisco = getAllDiscos().find(d => d.id === provider);
  const cleanRef = refNumber.replace(/\D/g, "");

  const PROXY = 'https://wapda-bill-checker.malikshakoor7656.workers.dev';
  const targetUrl = currentDisco
    ? (cleanRef.length >= 10
        ? `${PROXY}?disco=${currentDisco.id}&refno=${cleanRef}`
        : currentDisco.urlPrefix)
    : `https://bill.pitc.com.pk/${provider}bill`;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Search Widget Component */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 md:p-10 flex flex-col gap-6 md:gap-8">
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
            
            {/* DISCO Provider Select */}
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

            {/* Reference Number Input */}
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
                  const val = e.target.value.replace(/\D/g, ""); // strip non-digits
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
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    Get Bill <Search className="w-5 h-5 ml-1" strokeWidth={2.5} />
                  </>
                )}
              </button>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-center gap-2 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Ready! Click below to view your duplicate bill.
                </div>
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-[14px] px-8 rounded-xl shadow-lg shadow-emerald-600/20 flex justify-center items-center gap-2 text-lg transition-all active:scale-[0.98]"
                >
                  Click to get bill <ArrowRight className="w-5 h-5 ml-1" strokeWidth={2.5} />
                </a>
              </div>
            )}
          </div>
        </form>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4 mt-2 text-slate-500">
           <Info strokeWidth={2.5} className="w-5 h-5 mt-0.5 shrink-0" />
           <p className="text-xs leading-relaxed font-medum">
             Your reference number can be found on the top left of your old paper bill. It is a 14-digit numeric code required for all online inquiries. You will be redirected to the secure official PITC billing portal.
           </p>
        </div>
      </div>
    </div>
  );
}
