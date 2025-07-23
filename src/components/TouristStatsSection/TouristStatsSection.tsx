import { STATS_DATA } from "./constant";

const Icon = ({ type }: { type: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    groups: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM15.75 9.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" clipRule="evenodd" /></svg>,
    family_restroom: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" /></svg>,
    calendar_month: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /><path fillRule="evenodd" d="M18.75 10.5a.75.75 0 00-.75.75v.75H4.5v-.75a.75.75 0 00-.75-.75H2.25a.75.75 0 00-.75.75v9a.75.75 0 00.75.75h19.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75H18.75zm-12 0V7.5A2.25 2.25 0 018.25 5.25h7.5A2.25 2.25 0 0118 7.5v3H6.75z" clipRule="evenodd" /></svg>,
  };
  return icons[type] || null;
};

const StatCard = ({ icon, title, value, unit, description, style }: { icon: string; title: string; value: number; unit: string; description: string; style?: React.CSSProperties }) => {
  return (
    <div className="bg-v4-bg rounded-xl shadow-2xl border border-black/10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full animate-fade-in-up-slow" style={style}>
      <div className="text-v4-gold mb-4">
        <Icon type={icon} />
      </div>
      <h3 className="text-xl font-bold text-v4-text-muted mb-2">{title}</h3>
      <p className="text-4xl font-bold text-v4-gold mb-4">
        {value > 0 ? (
          <>
            <span>{value.toLocaleString()}</span>
            <span className="text-2xl ml-1">{unit}</span>
          </>
        ) : (
          unit
        )}
      </p>
      <p className="text-v4-text-muted text-base flex-grow">{description}</p>
    </div>
  );
};

const TouristStatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text-muted mb-4">
            <span className="text-v4-gold">동해시 관광객</span>으로 넘쳐나는
            <br />
            숙박수요를 기대하세요!
          </h2>
          <p className="text-lg md:text-xl text-v4-text-muted">
            안정적인 투자 수익을 위한 핵심 지표를 확인하세요.
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