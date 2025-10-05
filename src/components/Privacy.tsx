export default function Privacy() {
  return (
    <section className="mt-8 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
      <h3 className="text-xl font-bold mb-4 text-white">개인정보 처리 안내</h3>
      <ul className="space-y-3 text-blue-100">
        <li className="flex items-start">
          <span className="font-semibold min-w-[100px] text-blue-200">수집 목적:</span>
          <span>상담, 과정 안내, 일정 조율</span>
        </li>
        <li className="flex items-start">
          <span className="font-semibold min-w-[100px] text-blue-200">수집 항목:</span>
          <span>이름, 이메일, 연락처</span>
        </li>
        <li className="flex items-start">
          <span className="font-semibold min-w-[100px] text-blue-200">보관 기간:</span>
          <span>신청 후 1년 (또는 삭제 요청 시 즉시)</span>
        </li>
        <li className="flex items-start">
          <span className="font-semibold min-w-[100px] text-blue-200">제3자 제공:</span>
          <span>없음</span>
        </li>
      </ul>
      <p className="mt-5 text-sm text-blue-200/80 italic">
        신청하시면 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
      </p>
    </section>
  );
}
