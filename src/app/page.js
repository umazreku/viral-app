"use client";
import { useState } from "react";
import { FaInstagram, FaTiktok, FaLinkedin, FaCopy, FaCheck, FaLock, FaStar, FaUserFriends, FaBolt } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Viral");
  const [language, setLanguage] = useState("Albanian");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, platform, tone, language }),
      });

      const data = await response.json();
      setResult(data);
      toast.success("Përmbajtja u gjenerua me sukses!");
    } catch (error) {
      toast.error("Ndodhi një gabim. Provo sërish.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("U kopjua në clipboard!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      <Toaster position="top-center" />

      {/* --- NAVBAR (Koka e faqes) --- */}
      <nav className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <FaBolt className="text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ViralShqip<span className="text-blue-600">.ai</span></span>
          </div>
          
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition">Si funksionon</a>
            <a href="#" className="hover:text-blue-600 transition">Çmimet</a>
            <a href="#" className="hover:text-blue-600 transition">Shembuj</a>
          </div>

          <div className="flex gap-3">
             <button className="text-slate-600 font-medium text-sm hover:text-blue-600 px-3 py-2">Hyr</button>
             <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition">Provo Falas</button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex-grow flex flex-col items-center pt-12 pb-20 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        
        <div className="text-center mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            <FaStar className="text-yellow-500" />
            Besuar nga 2,000+ Krijues Shqiptarë
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Krijo Postime <span className="text-blue-600">Virale</span> <br/> me Inteligjencë Artificiale.
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
            Ndaloni së humburi kohë duke menduar. Gjenero Hooks, Përshkrime dhe Hashtags për Instagram & TikTok në sekonda.
          </p>
        </div>

        {/* --- THE TOOL (Kutia Kryesore) --- */}
        <div className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-slate-200/60 relative overflow-hidden">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Për çfarë do të flasësh?
              </label>
              <input
                type="text"
                required
                placeholder="P.sh: Marketing Dixhital, Këshilla për Dobësim, Bitcoin..."
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition bg-slate-50 font-medium"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Platforma</label>
                <div className="relative">
                  <select 
                    className="w-full p-3 pl-10 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500 font-medium"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                  <div className="absolute left-3 top-3.5 text-slate-400">
                    {platform === "Instagram" && <FaInstagram />}
                    {platform === "TikTok" && <FaTiktok />}
                    {platform === "LinkedIn" && <FaLinkedin />}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Toni</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500 font-medium"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Viral">🔥 Viral</option>
                  <option value="Professional">👔 Profesional</option>
                  <option value="Funny">😂 Qesharak</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gjuha</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500 font-medium"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="Albanian">🇦🇱 Shqip</option>
                  <option value="English">🇺🇸 English</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl transition duration-200 shadow-lg shadow-blue-600/20 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? "Duke analizuar trendet..." : "Gjenero Tani ✨"}
            </button>
            
            {/* Security Badge */}
            <div className="flex justify-center items-center gap-2 text-xs text-slate-400 mt-2">
                <FaLock className="text-green-500" />
                <span>Të dhënat tuaja nuk ruhen. 100% Private.</span>
            </div>
          </form>

          {/* RESULTS */}
          {result && (
            <div className="mt-10 pt-8 border-t border-slate-100 space-y-8 animate-pulse-once">
              
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
                  🪝 Hooks (Për të kapur vëmendjen)
                </h3>
                <ul className="space-y-3">
                  {result.hooks.map((hook, index) => (
                      <li key={index} className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-blue-50 shadow-sm hover:border-blue-200 transition group">
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0">{index + 1}</span>
                          <span className="text-slate-800 font-medium">{hook}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(hook)}
                          className="text-slate-300 hover:text-blue-600 p-2"
                        >
                          <FaCopy />
                        </button>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg text-slate-800">📝 Përshkrimi (Caption)</h3>
                  <button onClick={() => copyToClipboard(result.caption)} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"><FaCopy /> KOPJO</button>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl text-slate-700 whitespace-pre-line border border-slate-200 font-medium text-sm leading-relaxed">
                  {result.caption}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">#️⃣ Hashtags</h3>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 text-blue-600 font-medium flex flex-wrap gap-2">
                  {result.hashtags.map((tag, i) => (
                    <span key={i} onClick={() => copyToClipboard(tag)} className="bg-blue-50 hover:bg-blue-100 cursor-pointer px-3 py-1.5 rounded-full text-xs transition border border-blue-100">{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* --- TRUST BADGES (Poshtë kutisë) --- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl opacity-80">
            <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-blue-600"><FaBolt /></div>
                <h4 className="font-bold text-slate-800">Shpejtësi Rrufe</h4>
                <p className="text-sm text-slate-500">Gjenerim nën 2 sekonda</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-blue-600"><FaUserFriends /></div>
                <h4 className="font-bold text-slate-800">500+ Përdorues Ditorë</h4>
                <p className="text-sm text-slate-500">I preferuari i influencuesve</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-blue-600"><FaLock /></div>
                <h4 className="font-bold text-slate-800">Siguri Maksimale</h4>
                <p className="text-sm text-slate-500">Të dhëna të enkriptuara</p>
            </div>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-400 text-sm">
                &copy; 2024 ViralShqip AI. Të gjitha të drejtat e rezervuara.
            </div>
            <div className="flex gap-6 text-sm font-medium text-slate-500">
                <a href="#" className="hover:text-slate-900">Termat e Përdorimit</a>
                <a href="#" className="hover:text-slate-900">Privatësia</a>
                <a href="#" className="hover:text-slate-900">Na Kontaktoni</a>
            </div>
        </div>
      </footer>
    </div>
  );
}