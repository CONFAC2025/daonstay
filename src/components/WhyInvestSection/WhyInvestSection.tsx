import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const INVESTMENT_POINTS = [
  {
    icon: "📍",
    title: "압도적인 입지",
    description: "동해안의 중심, KTX 동해역과 동해 IC 인근에 위치하여 전국 어디서든 접근이 용이합니다. 주변 관광지와 인프라를 모두 누릴 수 있는 최적의 입지입니다. 동해안권 경제자유구역 망상지구 개발의 최대 수혜지로, 미래 가치가 더욱 기대됩니다.",
  },
  {
    icon: "📈",
    title: "높은 수익률",
    description: "주변 숙박 시설의 높은 가동률과 동해시의 지속적인 관광객 증가 추세는 안정적이고 높은 투자 수익률을 보장합니다. 예상 수익률 최대 33%! 전문 위탁 운영 시스템을 통해 안정적인 임대 수익과 시세 차익을 동시에 기대할 수 있습니다.",
  },
  {
    icon: "💡",
    title: "미래 가치",
    description: "동해안권 경제자유구역 개발의 중심에 위치하여, 단순한 숙박 시설을 넘어 미래 가치가 보장된 부동산 자산으로서의 가치를 지닙니다. 동해항 국제여객터미널 확장, 북방경제권 거점항만 육성 등 다양한 개발 호재가 예정되어 있습니다.",
  },
];

const Card = ({ icon, title, description, style }: { icon: string; title: string; description: string; style?: React.CSSProperties }) => (
  <div className="bg-v4-surface p-6 rounded-xl shadow-lg border border-black/10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full" style={style}>
    <div className="text-v4-gold mb-4 text-5xl">{icon}</div>
    <h3 className="text-3xl font-bold text-v4-gold mb-2 animate-typing">{useTypingEffect(title, 30)}</h3>
    <p className="text-v4-text-muted text-base flex-grow animate-typing">{description}</p>
  </div>
);

const WhyInvestSection = () => {
  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text-muted mb-4 animate-typing">
            {useTypingEffect("동해 ", 50)}<span className="text-v4-gold">{useTypingEffect("다온스테이의", 50)}</span><br />{useTypingEffect("핵심 투자 포인트", 50)}
          </h2>
          <p className="text-lg md:text-xl text-v4-text animate-typing">
            {useTypingEffect("안정적인 수익과 미래 가치를 모두 잡을 수 있는 기회입니다.", 30)}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INVESTMENT_POINTS.map((point, index) => (
            <Card key={point.title} {...point} style={{ animationDelay: `${index * 0.1}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyInvestSection;
