import { useState, useEffect } from 'react';
import { Download, LogOut, Trash2, RefreshCw, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toCSV, downloadText } from '../utils/fileUtils';

const ADMIN_PASS = 'ai-admin-2025';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [eventDetails, setEventDetails] = useState({
    schedule: '',
    location: '',
    materials: '',
    cost: ''
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventSaving, setEventSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRows(data || []);
    } catch (err: any) {
      alert('데이터 로드 오류: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadEventDetails = async () => {
    setEventLoading(true);
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
    } catch (err: any) {
      alert('행사 정보 로드 오류: ' + err.message);
    } finally {
      setEventLoading(false);
    }
  };

  const saveEventDetails = async () => {
    setEventSaving(true);
    try {
      const { data: existing } = await supabase
        .from('event_details')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('event_details')
          .update({
            ...eventDetails,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('event_details')
          .insert([{
            ...eventDetails
          }]);

        if (error) throw error;
      }

      alert('행사 정보가 저장되었습니다.');
    } catch (err: any) {
      alert('저장 오류: ' + err.message);
    } finally {
      setEventSaving(false);
    }
  };

  useEffect(() => {
    if (authed) {
      refresh();
      loadEventDetails();
    }
  }, [authed]);

  if (!authed) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">관리자 로그인</h2>
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && pw === ADMIN_PASS && setAuthed(true)}
          className="border border-slate-300 p-3 w-full rounded-lg mb-3"
        />
        <button
          onClick={() => {
            if (pw === ADMIN_PASS) {
              setAuthed(true);
            } else {
              alert('비밀번호가 올바르지 않습니다.');
            }
          }}
          className="w-full bg-emerald-600 text-white rounded-lg px-4 py-3 hover:bg-emerald-700 transition-colors font-medium"
        >
          접속
        </button>
        <p className="text-sm text-slate-500 mt-3 text-center">
          데모 비밀번호: {ADMIN_PASS}
        </p>
      </div>
    );
  }

  const exportCSV = () => {
    if (!rows.length) {
      alert('데이터가 없습니다.');
      return;
    }
    const csv = toCSV(rows);
    const filename = `applicants_${new Date().toISOString().slice(0, 10)}.csv`;
    downloadText(filename, csv);
  };

  const remove = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('applicants')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRows(rows.filter(r => r.id !== id));
    } catch (err: any) {
      alert('삭제 오류: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">행사 정보 관리</h2>
        </div>

        {eventLoading ? (
          <div className="text-center py-8 text-slate-500">로딩 중...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                행사 일정
              </label>
              <input
                type="text"
                placeholder="예: 매주 토요일 오후 2-5시"
                value={eventDetails.schedule}
                onChange={(e) => setEventDetails({ ...eventDetails, schedule: e.target.value })}
                className="border border-slate-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                장소
              </label>
              <input
                type="text"
                placeholder="예: 온라인 ZOOM"
                value={eventDetails.location}
                onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                className="border border-slate-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                준비물
              </label>
              <textarea
                placeholder="예: 노트북 또는 스마트폰, 필기도구"
                value={eventDetails.materials}
                onChange={(e) => setEventDetails({ ...eventDetails, materials: e.target.value })}
                rows={3}
                className="border border-slate-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                비용
              </label>
              <input
                type="text"
                placeholder="예: 30만원 (조기등록 시 20% 할인)"
                value={eventDetails.cost}
                onChange={(e) => setEventDetails({ ...eventDetails, cost: e.target.value })}
                className="border border-slate-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <button
              onClick={saveEventDetails}
              disabled={eventSaving}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
            >
              <Save size={18} />
              {eventSaving ? '저장 중...' : '행사 정보 저장'}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">신청자 관리</h2>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors"
          >
            <LogOut size={18} /> 로그아웃
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            새로고침
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} /> CSV 다운로드
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-300 px-4 py-2 text-left">이름</th>
                <th className="border border-slate-300 px-4 py-2 text-left">이메일</th>
                <th className="border border-slate-300 px-4 py-2 text-left">연락처</th>
                <th className="border border-slate-300 px-4 py-2 text-left">접수일</th>
                <th className="border border-slate-300 px-4 py-2 text-center">삭제</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">{r.name}</td>
                  <td className="border border-slate-300 px-4 py-2">{r.email}</td>
                  <td className="border border-slate-300 px-4 py-2">{r.phone}</td>
                  <td className="border border-slate-300 px-4 py-2">
                    {new Date(r.created_at).toLocaleString('ko-KR')}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-center">
                    <button
                      onClick={() => remove(r.id)}
                      className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-slate-300 text-center text-slate-500 py-8"
                  >
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          총 {rows.length}명의 신청자
        </div>
      </div>
    </div>
  );
}
