import { useEffect, useState } from "react";
import { useRecentApplicants } from "../../hooks/useRecentApplicants";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const columns = [
  { key: "이름" as const, label: "이름" },
  { key: "연락처" as const, label: "연락처" },
  { key: "주소" as const, label: "주소" },
];

const ApplicantListSection = () => {
  const { data = [] } = useRecentApplicants();
  const [displayData, setDisplayData] = useState<typeof data>([]);

  const maskPhone = (phone: string) =>
    phone.replace(
      /(\d{3})-(\d{2,4})-(\d{4})/,
      (_match: string, p1: string, _p2: string, p3: string) =>
        `${p1}-****-${p3}`
    );

  useEffect(() => {
    if (data.length > 0) {
      setDisplayData([...data, ...data]);
    }
  }, [data]);

  const maskedRows = displayData.map((row) => ({
    ...row,
    연락처: maskPhone(row.연락처),
  }));

  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text mb-4">
            {useTypingEffect("실시간 ", 50)}<span className="text-v4-gold">{useTypingEffect("투자 상담 신청 현황", 50)}</span>
          </h2>
          <p className="text-lg md:text-xl text-v4-text-muted">
            {useTypingEffect("많은 분들이 다온스테이의 미래 가치를 알아보고 있습니다.", 30)}
          </p>
        </div>

        <div className="h-96 overflow-hidden relative rounded-xl border-2 border-black/10 bg-v4-surface shadow-lg overflow-x-auto">
          <div className="animate-marquee-vertical">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={String(col.key)} className="sticky top-0 p-4 bg-v4-surface text-v4-text-muted font-semibold z-10 border-b-2 border-black/10 animate-typing">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {maskedRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-white/10">
                    {columns.map((col) => (
                      <td key={String(col.key)} className="p-4 whitespace-nowrap text-v4-text animate-typing">
                        {row[col.key] as React.ReactNode}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-v4-surface to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-v4-surface to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default ApplicantListSection;
