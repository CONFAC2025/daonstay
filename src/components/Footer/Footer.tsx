import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const Footer = () => {
  return (
    <footer className="bg-v4-surface text-v4-text-muted py-8 border-t border-white/10">
      <div className="max-w-container mx-auto px-6 sm:px-8 text-center text-sm">
        
        <p className="mb-4">
          상담문의: <a href="tel:1811-1854" className="font-extrabold text-v4-gold text-3xl md:text-4xl">{useTypingEffect("1811-1854", 50)}</a>
        </p>
        <p className="text-xs">
          본 사이트의 모든 이미지와 내용은 소비자의 이해를 돕기 위한 것으로, 실제와 다를 수 있습니다.
        </p>
        <p className="text-sm mt-2 text-v4-text">
          본 페이지의 수익률 표시는 가정치이며 실제 시장상황에 따라 달라질 수 있습니다.
        </p>
        <p className="text-xs mt-2">
          온라인 마케팅: <span className="font-bold text-v4-text">(주)콘텐츠팩토리</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;