import { BUILDING_SCALE, PROJECT_INFO } from "./constant";

const InfoItem = ({ label, value }: { label: string; value: string; }) => (
  <div className="py-4 border-b border-black/10 flex justify-between items-center">
    <dt className="text-base font-medium text-v4-text-muted">{label}</dt>
    <dd className="text-base text-v4-text">{value}</dd>
  </div>
);

const ProjectOverviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text-muted mb-6">
              프로젝트 <span className="text-v4-gold">개요</span>
            </h2>
            <p className="text-lg md:text-xl text-v4-text-muted mb-8">
              최고의 입지 조건과 프리미엄 설계로 투자 가치를 극대화했습니다.
            </p>
            <div className="bg-v4-surface p-6 rounded-2xl shadow-2xl border border-black/10">
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