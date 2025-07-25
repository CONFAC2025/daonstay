import { STATS_DATA } from "./constant";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const Icon = ({ type }: { type: string }) => {
  return <span className="text-6xl">{type}</span>;
};

const StatCard = ({ icon, title, value, unit, description, style }: { icon: string; title: string; value: number; unit: string; description: string; style?: React.CSSProperties }) => {
  const animatedTitle = useTypingEffect(title, 30);
  const animatedDescription = useTypingEffect(description, 20);

  return (
    <div className="bg-v4-bg rounded-xl shadow-2xl border border-black/10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full" style={style}>
      <div className="text-v4-gold mb-4">
        <Icon type={icon} />
      </div>
      <h3 className="text-xl font-bold text-v4-text-muted mb-2">
        {animatedTitle}
      </h3>
      <p className="text-4xl font-bold text-v4-gold mb-4 animate-typing">
        {value > 0 ? (
          <>
            <span>{value.toLocaleString()}</span>
            <span className="text-2xl ml-1">{unit}</span>
          </>
        ) : (
          unit
        )}
      </p>
      <p className="text-v4-text-muted text-base flex-grow">
        {animatedDescription}
      </p>
    </div>
  );
};

const TouristStatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text-muted mb-4">
            <span className="text-v4-gold">{useTypingEffect("동해시 관광객으로 넘쳐나는", 50)}</span><br />{useTypingEffect("숙박수요를 기대하세요!", 50)}
          </h2>
          <p className="text-lg md:text-xl text-v4-text">
            {useTypingEffect("안정적인 투자 수익을 위한 핵심 지표를 확인하세요.", 30)}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS_DATA.map((stat, index) => (
            <StatCard key={stat.title} {...stat} style={{ animationDelay: `${index * 0.1}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TouristStatsSection;
