import { useRef } from "react";
import useCountUp from "../../hooks/useCountUp";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const StatCard = ({ label, value, unit }: { label: string; value: string; unit: string; }) => {
  const valueRef = useRef<HTMLSpanElement>(null);
  const animatedValue = useCountUp(valueRef, parseInt(value.replace(/,/g, '')), 2000);

  return (
    <div className="bg-v4-surface/80 backdrop-blur-sm p-4 rounded-lg text-center border border-white/10 transition-all duration-300 hover:bg-v4-surface hover:-translate-y-1 shadow-lg hover:shadow-xl">
      <p className="text-v4-text-muted text-sm md:text-base">{label}</p>
      <p className="text-v4-gold text-3xl md:text-5xl font-bold font-['Montserrat']">
        <span ref={valueRef} className="text-2xl md:text-4xl">{animatedValue.toLocaleString()}</span><br />
        <span className="text-xl md:text-3xl ml-1">{unit}</span>
      </p>
    </div>
  );
};

const HeroSection = () => {
  const titleTextPart1_1 = "수익으로 증명하는";
  const titleTextPart1_2 = "단 하나의 수익형 펜션!";
  const titleTextPart2_1 = "POOL VILLA 펜션";
  const titleTextPart2_2 = "동해 다온스테이";
  const descriptionText = "동해 바다 위 프리미엄 펜션에서 시작되는 성공적인 투자.";

  const animatedTitlePart1_1 = useTypingEffect(titleTextPart1_1, 50);
  const animatedTitlePart1_2 = useTypingEffect(titleTextPart1_2, 50);
  const animatedTitlePart2_1 = useTypingEffect(titleTextPart2_1, 50);
  const animatedTitlePart2_2 = useTypingEffect(titleTextPart2_2, 50);
  const animatedDescription = useTypingEffect(descriptionText, 30);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <img src="/images/image-2.jpg" alt="동해 바다와 풀빌라" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-white/30"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-v4-text pt-[60px]">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg text-black">
          {animatedTitlePart1_1}<br />
          {animatedTitlePart1_2}<br />
          <span className="text-white">{animatedTitlePart2_1}</span><br />
          <span className="text-v4-gold">{animatedTitlePart2_2}</span>
        </h1>
        <p className="text-base md:text-2xl text-black mb-8 md:mb-12 max-w-prose">
          {animatedDescription}
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12 w-full px-4 sm:px-0">
          <StatCard label="예상 연간 순수익" value="5,211" unit="만원" />
          <StatCard label="예상 투자 수익률" value="33" unit="%" />
          <StatCard label="예상 실투자금" value="15,800" unit="만원" />
        </div>
        <a href="#form-section" className="btn-v4 text-2xl px-12 py-6 mt-8 bg-v4-gold text-black shadow-xl hover:shadow-2xl font-bold">
          지금 바로 투자 상담 신청!
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
