import { MAP_MARKERS } from "../TourInfraMapSection/constant";

const Card = ({ image, title, description, style }: { image: string; title: string; description: string; style?: React.CSSProperties }) => (
  <div className="bg-v4-bg rounded-xl overflow-hidden shadow-lg border border-black/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up-slow" style={style}>
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-v4-text-muted mb-2">{title}</h3>
      <p className="text-v4-text-muted">{description}</p>
    </div>
  </div>
);

const GrowthPotentialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text-muted mb-4">
            <span className="text-v4-gold">풍부한 관광 인프라</span>는
            <br />
            안정적인 수익을 보장합니다
          </h2>
          <p className="text-lg md:text-xl text-v4-text-muted">
            다온스테이 주변에는 사계절 내내 관광객을 유치할 수 있는 다양한 명소들이 있습니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAP_MARKERS.map((marker, index) => (
            <Card key={marker.id} image={marker.image} title={marker.name} description={marker.description} style={{ animationDelay: `${index * 0.1}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthPotentialSection;
