import { MAP_MARKERS } from "../TourInfraMapSection/constant";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const Card = ({ image, title, description, style }: { image: string; title: string; description: string; style?: React.CSSProperties }) => (
  <div className="bg-v4-surface rounded-xl overflow-hidden shadow-lg border border-black/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col" style={style}>
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-v4-blue mb-2">{title}</h3>
      <p className="text-v4-text-muted flex-grow">{description}</p>
    </div>
  </div>
);

const GrowthPotentialSection = () => {
  return (
    <section className="section-padding bg-v4-bg">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text mb-4">
            <span className="text-v4-gold">{useTypingEffect("풍부한 관광 인프라는", 50)}</span><br />{useTypingEffect("안정적인 수익을 보장합니다", 50)}
          </h2>
          <p className="text-lg md:text-xl text-v4-text max-w-3xl mx-auto">
            {useTypingEffect("다온스테이 주변에는 사계절 내내 관광객을 유치할 수 있는 다양한 명소들이 있습니다.", 30)}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAP_MARKERS.map((marker, index) => (
            <Card key={marker.id} image={marker.image} title={marker.name} description={marker.description} style={{ animationDelay: `${index * 0.1}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthPotentialSection;
