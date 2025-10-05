import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Privacy from './Privacy';

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone) {
      setError('이름, 이메일, 연락처는 필수입니다.');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('applicants')
        .insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone
          }
        ]);

      if (insertError) throw insertError;

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '' });
    } catch (err: any) {
      setError(err.message || '신청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 rounded-2xl backdrop-blur-md">
        <h3 className="text-2xl font-bold text-white mb-3">접수 완료!</h3>
        <p className="text-green-100 text-lg">담당자가 확인 후 연락드리겠습니다.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium"
        >
          다시 신청하기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-5 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-white mb-2">사전 신청</h3>

        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">
            이름 <span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            placeholder="홍길동"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-white/10 border border-white/20 text-white placeholder-blue-200/50 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">
            이메일 <span className="text-red-300">*</span>
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-white/10 border border-white/20 text-white placeholder-blue-200/50 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-2">
            연락처 <span className="text-red-300">*</span>
          </label>
          <input
            type="tel"
            placeholder="010-1234-5678"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="bg-white/10 border border-white/20 text-white placeholder-blue-200/50 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-100 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '신청 중...' : '신청하기'}
        </button>

        <button
          type="button"
          onClick={() => setShowPrivacy(!showPrivacy)}
          className="w-full text-blue-200 text-sm hover:text-blue-100 transition-colors underline"
        >
          {showPrivacy ? '개인정보 처리 안내 접기' : '개인정보 처리 안내 보기'}
        </button>
      </form>

      {showPrivacy && <Privacy />}
    </div>
  );
}
