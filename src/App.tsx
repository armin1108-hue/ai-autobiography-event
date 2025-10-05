import { useState } from 'react';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import Admin from './components/Admin';
import { Shield } from 'lucide-react';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <img src="/자서전 AI 로고 디자인.png" alt="자서전 AI" className="w-16 h-16" />
            <h1 className="text-3xl font-bold text-white">자서전 AI</h1>
          </div>
          <button
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all flex items-center gap-2 font-medium text-white border border-white/20"
            onClick={() => setShowAdmin((s) => !s)}
          >
            <Shield size={18} />
            {showAdmin ? '사용자 보기' : '관리자'}
          </button>
        </header>

        {!showAdmin && (
          <>
            <Hero />
            <Curriculum />
            <footer className="mt-16 text-center text-white/60 py-8 border-t border-white/10">
              <p className="text-sm">2025 자서전 AI · 한국교육연구소 인증 커리큘럼</p>
            </footer>
          </>
        )}

        {showAdmin && <Admin />}
      </div>
    </div>
  );
}
