import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const VideoSection = () => {
  return (
    <section className="py-16 md:py-24 bg-v4-surface">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text mb-4">
            <span className="text-v4-gold">{useTypingEffect("따라올 수 없는", 50)}</span><br />{useTypingEffect("투자수익을 만나보세요", 50)}
          </h2>
          <p className="text-lg md:text-xl text-v4-text-muted">
            {useTypingEffect("다온스테이가 그려나갈 미래를 직접 확인하세요.", 30)}
          </p>
        </div>
        <div className="aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-black/10">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/RLPYl4UMmbc?rel=0&modestbranding=1&controls=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
