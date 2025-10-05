import { useState, useEffect } from 'react';
import { BookOpen, Users, FileText, Heart, Briefcase, Sparkles, ChevronDown, Calendar, MapPin, Package, DollarSign } from 'lucide-react';
import LeadForm from './LeadForm';
import { supabase } from '../lib/supabase';

const sessions = [
  {
    number: 1,
    title: 'AI 이해와 활용 실습',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    goal: 'AI 기본 개념을 이해하고, 자서전 코치 GPT 활용법을 익힌다.',
    topics: [
      'AI의 정의와 생활 속 활용',
      'GPT의 역할: 기억을 꺼내주는 동반자',
      'GPT 대화법(프롬프트 작성, 질문 활용법)',
      '개인정보·저작권 기본 원칙'
    ],
    outcome: '자기소개 200자 글 + AI 활용 체크리스트'
  },
  {
    number: 2,
    title: '자기 탐색과 자서전의 의미',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    goal: '내가 자서전을 쓰는 이유와 방향을 찾는다.',
    topics: [
      '자서전 목적(후손, 치유·회복, 미래 설계, 신앙 고백 등)',
      '자아 선택(가족/직업/신앙/배움)',
      'GPT 질문: 가족에게 남기고 싶은 이야기'
    ],
    outcome: '자서전 목적 선언문(Why)'
  },
  {
    number: 3,
    title: '삶의 전환점 기록하기',
    icon: FileText,
    color: 'from-cyan-500 to-cyan-600',
    goal: '내 인생의 주요 전환점을 정리한다.',
    topics: [
      '인생 연대표 작성',
      '전환점에서 얻은 교훈 찾기',
      'GPT 질문: 당신의 인생을 바꾼 순간'
    ],
    outcome: '전환점 중심 글 초안 3~5개'
  },
  {
    number: 4,
    title: '가족과 관계 이야기',
    icon: Users,
    color: 'from-green-500 to-green-600',
    goal: '가족사와 관계 속에서 형성된 나를 기록한다.',
    topics: [
      '집안 전통·가훈·부모님/자녀와의 기억 정리',
      '사진·문서 자료 정리 및 설명문 작성',
      'GPT 질문: 가족이 당신에게 어떤 힘이 되었나요?'
    ],
    outcome: '가족사 챕터 초안 + 사진 설명문'
  },
  {
    number: 5,
    title: '가치관, 직업, 신앙 이야기',
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
    goal: '나의 핵심 가치와 삶의 의미 기록.',
    topics: [
      '직업/신앙/배움 중 1~2개 집중',
      '일과 의미 혹은 믿음과 삶 연결',
      'GPT 질문: 당신의 일이 세상에 남긴 가치'
    ],
    outcome: '가치관 중심 글 초안'
  },
  {
    number: 6,
    title: '글다듬기와 출판·공유',
    icon: Heart,
    color: 'from-pink-500 to-pink-600',
    goal: '글을 완성하고 출판·공유할 준비를 한다.',
    topics: [
      '글 다듬기(시점·톤·중복 점검)',
      '출판 경로 안내(PDF, POD, 웹북, 오디오북)',
      '가족·공동체 공유 방법(발표·영상·홈페이지 확장)'
    ],
    outcome: '자서전 완성본 + 발표용 요약문'
  }
];

export default function Curriculum() {
  const [showDetails, setShowDetails] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    schedule: '',
    location: '',
    materials: '',
    cost: ''
  });
  const [eventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('event_details')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setEventDetails({
            schedule: data.schedule || '',
            location: data.location || '',
            materials: data.materials || '',
            cost: data.cost || ''
          });
        }
      } catch (err) {
        console.error('행사 정보 로드 오류:', err);
      } finally {
        setEventLoading(false);
      }
    };

    loadEventDetails();
  }, []);

  return (
    <section className="mb-12">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">6차시 교육 프로그램</h2>
            <p className="text-xl text-blue-100 mb-2">
              <span className="font-semibold">AI와 함께 쓰는 나의 자서전</span>
            </p>
            <p className="text-blue-200">
              1차시: AI 기초+활용법 | 2~6차시: 자서전 쓰기 절차
            </p>
          </div>
          <img src="/image.png" alt="한국교육연구소" className="h-16" />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                <th className="px-6 py-4 text-left text-white font-bold border-r border-white/20">차시</th>
                <th className="px-6 py-4 text-left text-white font-bold border-r border-white/20">주제</th>
                <th className="px-6 py-4 text-left text-white font-bold border-r border-white/20">목표</th>
                <th className="px-6 py-4 text-left text-white font-bold border-r border-white/20">내용</th>
                <th className="px-6 py-4 text-left text-white font-bold">성과물</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, idx) => (
                <tr
                  key={session.number}
                  className={`${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'} hover:bg-white/15 transition-colors`}
                >
                  <td className="px-6 py-4 border-r border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${session.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-lg">{session.number}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-white/10">
                    <p className="text-white font-semibold">{session.title}</p>
                  </td>
                  <td className="px-6 py-4 border-r border-white/10">
                    <p className="text-blue-100 text-sm">{session.goal}</p>
                  </td>
                  <td className="px-6 py-4 border-r border-white/10">
                    <ul className="space-y-1">
                      {session.topics.map((topic, idx) => (
                        <li key={idx} className="text-blue-100 text-xs flex items-start">
                          <span className="mr-2 text-blue-400">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-2 backdrop-blur-sm">
                      <p className="text-green-100 text-xs">{session.outcome}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full mb-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
      >
        <span>{showDetails ? '상세 교육과정 접기' : '더 자세히 알아보기'}</span>
        <ChevronDown
          size={24}
          className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
        />
      </button>

      {showDetails && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 shadow-xl border border-white/20 mb-5">
            <h3 className="text-2xl font-bold text-white mb-6">행사 안내</h3>
            {eventLoading ? (
              <div className="text-center py-4 text-white/70">로딩 중...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {eventDetails.schedule && (
                  <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <Calendar className="text-teal-200 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-teal-100 text-sm font-semibold mb-1">일정</p>
                      <p className="text-white">{eventDetails.schedule}</p>
                    </div>
                  </div>
                )}
                {eventDetails.location && (
                  <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <MapPin className="text-teal-200 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-teal-100 text-sm font-semibold mb-1">장소</p>
                      <p className="text-white">{eventDetails.location}</p>
                    </div>
                  </div>
                )}
                {eventDetails.materials && (
                  <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <Package className="text-teal-200 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-teal-100 text-sm font-semibold mb-1">준비물</p>
                      <p className="text-white">{eventDetails.materials}</p>
                    </div>
                  </div>
                )}
                {eventDetails.cost && (
                  <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <DollarSign className="text-teal-200 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-teal-100 text-sm font-semibold mb-1">비용</p>
                      <p className="text-white">{eventDetails.cost}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {sessions.map((session) => {
            const Icon = session.icon;
            return (
              <div
                key={session.number}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${session.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white" size={32} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-blue-200 text-xs font-semibold mb-2">
                          {session.number}차시
                        </span>
                        <h3 className="text-2xl font-bold text-white">
                          {session.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                      <span className="text-sm font-semibold text-blue-300">목표:</span>
                      <p className="text-white/90 mt-1">{session.goal}</p>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-semibold text-blue-300 mb-2 block">내용:</span>
                      <div className="grid md:grid-cols-2 gap-2">
                        {session.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start bg-white/5 rounded-lg p-3">
                            <span className="mr-2 text-blue-400 mt-0.5">•</span>
                            <span className="text-blue-100 text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-300 text-lg">🎯</span>
                        <span className="text-sm font-semibold text-green-300">성과물</span>
                      </div>
                      <p className="text-green-100 font-medium">{session.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="flex items-center gap-3 mb-5">
          <img src="/image.png" alt="한국교육연구소" className="h-12" />
          <h3 className="text-2xl font-bold text-white">최종 성과</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start text-white bg-white/10 rounded-xl p-4">
            <span className="mr-3 text-yellow-300 text-xl">✓</span>
            <span><strong>AI 활용 역량 습득</strong><br /><span className="text-blue-100 text-sm">프롬프트, 질문 활용, 자료 업로드</span></span>
          </div>
          <div className="flex items-start text-white bg-white/10 rounded-xl p-4">
            <span className="mr-3 text-yellow-300 text-xl">✓</span>
            <span><strong>자서전 초안 완성</strong><br /><span className="text-blue-100 text-sm">목적 선언 → 전환점 → 가족사 → 가치관</span></span>
          </div>
          <div className="flex items-start text-white bg-white/10 rounded-xl p-4">
            <span className="mr-3 text-yellow-300 text-xl">✓</span>
            <span><strong>출판·공유 가능</strong><br /><span className="text-blue-100 text-sm">PDF, POD, 웹북 등</span></span>
          </div>
          <div className="flex items-start text-white bg-white/10 rounded-xl p-4">
            <span className="mr-3 text-yellow-300 text-xl">✓</span>
            <span><strong>치유·회복과 세대 계승 실현</strong><br /><span className="text-blue-100 text-sm">유산으로 남기는 인생 이야기</span></span>
          </div>
        </div>
      </div>

      <LeadForm />
    </section>
  );
}
