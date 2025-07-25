import { BUILDING_SCALE, PROJECT_INFO } from "./constant";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const InfoItem = ({ label, value }: { label: string; value: string; }) => (
  <div className="py-4 border-b border-black/10 flex justify-between items-center">
    <dt className="text-base font-medium text-v4-text-muted animate-typing">{label}</dt>
    <dd className="text-base text-v4-text animate-typing">{value}</dd>
  </div>
);

const ProjectOverviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-v4-text-muted mb-6">
              {useTypingEffect("프로젝트 ", 50)}<span className="text-v4-gold">{useTypingEffect("개요", 50)}</span>
            </h2>
            <p className="text-lg md:text-xl text-v4-text-muted mb-8 animate-typing">
              {useTypingEffect("최고의 입지 조건과 프리미엄 설계로 투자 가치를 극대화했습니다.", 30)}
            </p>
            <div className="bg-v4-surface p-6 rounded-2xl shadow-2xl border border-white/10">
              <dl>
                {PROJECT_INFO.map((item) => (
                  <InfoItem key={item.label} {...item} />
                ))}
                {BUILDING_SCALE.map((item) => (
                  <InfoItem key={item.label} {...item} />
                ))}
              </dl>
            </div>
          </div>
          {/* 건축 규모 섹션 삭제 */}
        </div>
      </div>
    </section>
  );
};

export default ProjectOverviewSection;