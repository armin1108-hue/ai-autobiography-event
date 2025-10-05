import { Sparkles, BookOpen, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-10 shadow-2xl text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-300" size={24} />
            <span className="text-yellow-300 font-semibold">한국교육연구소 인증 커리큘럼</span>
          </div>

          <h2 className="text-4xl font-bold mb-4">AI 자서전 쓰기 챌린지 과정</h2>

          <p className="text-xl text-blue-100 leading-relaxed mb-6">
            AI 기초부터 자서전 완성까지 6차시 완성 과정 <br />
            기억을 꺼내는 AI 동반자와 함께 나의 이야기를 책으로 만듭니다
          </p>

          <div className="flex items-center gap-2 text-blue-100">
            <Sparkles size={20} />
            <span className="text-lg">당신의 인생 이야기가 세대를 잇는 유산이 됩니다</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/15 transition-all group">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">AI 활용 역량 습득</h3>
          <p className="text-blue-200">프롬프트 작성부터 GPT 대화법까지</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/15 transition-all group">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">자서전 초안 완성</h3>
          <p className="text-blue-200">목적 선언부터 가치관까지 체계적 기록</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/15 transition-all group">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Award className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">출판·공유 준비</h3>
          <p className="text-blue-200">PDF, 웹북, POD 등 다양한 형태로</p>
        </div>
      </div>
    </section>
  );
}
