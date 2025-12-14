"use client";
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { FaInstagram, FaTiktok, FaLinkedin, FaCopy, FaCheck, FaLock, FaStar, FaUserFriends, FaBolt, FaMagic, FaBars } from "react-icons/fa";
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

      {/* --- NAVBAR I PLOTË --- */}
      <nav className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-blue-500/30 shadow-lg">
              <FaBolt className="text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ViralShqip<span className="text-blue-600">.ai</span></span>
          </div>
          
          {/* Menuja e Mesit (për Desktop) */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition duration-200">Si funksionon</a>
            <a href="#" className="hover:text-blue-600 transition duration-200">Çmimet</a>
            <a href="#" className="hover:text-blue-600 transition duration-200">Shembuj</a>
            <a href="#" className="hover:text-blue-600 transition duration-200">Blog</a>
          </div>

          {/* Butonat Djathtas */}
          <div className="flex gap-3 items-center">
             <button className="hidden md:block text-slate-600 font-medium text-sm hover:text-blue-600 px-3 py-2 transition">Hyr</button>
             <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-900/20">Provo Falas</button>
             <button className="md:hidden text-slate-600 text-xl ml-2"><FaBars /></button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex-grow flex flex-col items-center pt-12 pb-20 px-4 bg-gradient-to-b from-blue-50/50 via-white to-white">
        
        <div className="text-center mb-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider shadow-sm animate-fade-in-up">
            <FaStar className="text-yellow-500" />
            Besuar nga 2,000+ Krijues Shqiptarë
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Gjenero Postime Virale për <br />
            <span className="text-blue-600 inline-block min-w-[200px]">
              <TypeAnimation
                sequence={[
                  'TikTok 🎵',
                  2000, 
                  'Instagram 📸',
                  2000,
                  'LinkedIn 💼',
                  2000,
                  'Facebook 👍',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            AI më i avancuar për tregun shqiptar. Shkruaj temën dhe merr 
            skripte, përshkrime dhe hashtags në <span className="font-bold text-slate-800">2 sekonda.</span>
          </p>
        </div>

        {/* --- THE TOOL (Kutia Kryesore) --- */}
        <div className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <FaMagic className="text-blue-500" />
                Për çfarë do të flasësh?
              </label>
              <input
                type="text"
                required
                placeholder="P.sh: Marketing Dixhital, Këshilla për Dobësim, Bitcoin..."
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition bg-slate-50 font-medium text-lg placeholder:text-slate-400"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Platforma</label>
                <div className="relative">
                  <select 
                    className="w-full p-3 pl-10 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500 font-medium appearance-none"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                  <div className="absolute left-3 top-3.5 text-slate-400 text-lg">
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
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 rounded-xl transition duration-200 shadow-xl shadow-slate-900/10 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? "Duke analizuar..." : <span>Gjenero Magjinë ✨</span>}
            </button>
            
            <div className="flex justify-center items-center gap-2 text-xs text-slate-400 mt-2">
                <FaLock className="text-green-500" />
                <span>100% Private & Pa Pagesë</span>
            </div>
          </form>

          {/* RESULTS */}
          {result && (
            <div className="mt-10 pt-8 border-t border-slate-100 space-y-8 animate-pulse-once">
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100/50">
                <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
                  🪝 Hooks (Për të kapur vëmendjen)
                </h3>
                <ul className="space-y-3">
                  {result.hooks.map((hook, index) => (
                      <li key={index} className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition group cursor-pointer" onClick={() => copyToClipboard(hook)}>
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0">{index + 1}</span>
                          <span className="text-slate-800 font-medium">{hook}</span>
                        </div>
                        <FaCopy className="text-slate-300 group-hover:text-blue-600 transition" />
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg text-slate-800">📝 Përshkrimi (Caption)</h3>
                  <button onClick={() => copyToClipboard(result.caption)} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"><FaCopy /> KOPJO</button>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 whitespace-pre-line border border-slate-200 font-medium text-sm leading-relaxed shadow-inner">
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

        {/* --- TRUST BADGES --- */}
        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-12 text-center max-w-4xl opacity-80">
            <div className="flex flex-col items-center">
                <FaBolt className="text-2xl text-blue-600 mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">Shpejtësi Rrufe</h4>
                <p className="text-xs text-slate-400 hidden md:block mt-1">Gjenerim nën 2 sekonda</p>
            </div>
            <div className="flex flex-col items-center">
                <FaUserFriends className="text-2xl text-blue-600 mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">500+ Përdorues</h4>
                <p className="text-xs text-slate-400 hidden md:block mt-1">I preferuari i krijuesve</p>
            </div>
            <div className="flex flex-col items-center">
                <FaLock className="text-2xl text-blue-600 mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">Siguri 100%</h4>
                <p className="text-xs text-slate-400 hidden md:block mt-1">Të dhëna të enkriptuara</p>
            </div>
        </div>
      </main>

      {/* --- FOOTER I PLOTË --- */}
      <footer className="bg-white border-t border-slate-100 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-blue-600 text-white p-1 rounded">
                            <FaBolt className="text-sm" />
                        </div>
                        <span className="font-bold text-slate-900">ViralShqip.ai</span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-xs">
                        Ndihmojmë krijuesit shqiptarë të kursejnë kohë dhe të rrisin audiencën e tyre me fuqinë e AI.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm">Produkti</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-blue-600">Si funksionon</a></li>
                            <li><a href="#" className="hover:text-blue-600">Çmimet</a></li>
                            <li><a href="#" className="hover:text-blue-600">Për Biznese</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm">Ligjore</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-blue-600">Privatësia</a></li>
                            <li><a href="#" className="hover:text-blue-600">Termat</a></li>
                            <li><a href="#" className="hover:text-blue-600">Na Kontaktoni</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                <p>&copy; 2024 ViralShqip AI. Të gjitha të drejtat e rezervuara.</p>
                <div className="flex gap-4">
                    <FaInstagram className="hover:text-pink-600 cursor-pointer text-lg" />
                    <FaTiktok className="hover:text-black cursor-pointer text-lg" />
                    <FaLinkedin className="hover:text-blue-700 cursor-pointer text-lg" />
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}