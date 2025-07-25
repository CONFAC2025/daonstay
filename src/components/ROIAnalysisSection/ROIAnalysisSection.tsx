import { useRef } from "react";
import useCountUp from "../../hooks/useCountUp";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";
import { Table } from "../common/Table";
import {
  details,
  ROI_ANALYSIS_COLUMNS,
} from "./constant";

const ROIAnalysisSection = () => {
  const incomeRef1 = useRef<HTMLElement>(null);
  const roiRef1 = useRef<HTMLElement>(null);
  const incomeRef2 = useRef<HTMLElement>(null);
  const roiRef2 = useRef<HTMLElement>(null);

  const incomeCount1 = useCountUp(incomeRef1, 5211, 2000);
  const roiCount1 = useCountUp(roiRef1, 33, 2000);
  const incomeCount2 = useCountUp(incomeRef2, 3171, 2000);
  const roiCount2 = useCountUp(roiRef2, 20, 2000);

  const h2Text = "수익률 시뮬레이션";
  const pText = "투명하고 안정적인 수익률을 숫자로 확인하세요.";
  

  const animatedH2 = useTypingEffect(h2Text, 50);
  const animatedP = useTypingEffect(pText, 30);

  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold text-v4-text-muted mb-4">
            <span className="text-v4-gold">{animatedH2}</span>
          </h2>
          <p className="text-lg md:text-xl text-v4-text-muted">
            {animatedP}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* ALT 1 */}
          <div className="bg-v4-surface p-8 rounded-2xl shadow-2xl border-4 border-v4-gold/50 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-v4-gold/40 hover:-translate-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-v4-gold mb-4 text-center shadow-text-light">
              {useTypingEffect("ALT.1 시나리오", 50)}
            </h3>
            <div className="w-full flex justify-around items-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-v4-gold mb-1">연간 순수익</p>
                <p className="font-['Montserrat'] text-5xl md:text-7xl font-extrabold text-v4-gold text-stroke-gold-dark">
                  <span ref={incomeRef1}>{incomeCount1.toLocaleString()}</span>
                  <span className="text-3xl md:text-4xl ml-2">만원</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-v4-gold mb-1">투자 수익률</p>
                <p className="font-['Montserrat'] text-5xl md:text-7xl font-extrabold text-v4-gold text-stroke-gold-dark">
                  <span ref={roiRef1}>{roiCount1}</span>
                  <span className="text-3xl md:text-4xl">%</span>
                </p>
              </div>
            </div>
          </div>
          {/* ALT 2 */}
          <div className="bg-v4-surface p-8 rounded-2xl shadow-2xl border-4 border-v4-text/50 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-v4-text/40 hover:-translate-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-v4-gold mb-4 text-center shadow-text-light">
              {useTypingEffect("ALT.2 시나리오", 50)}
            </h3>
            <div className="w-full flex justify-around items-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-v4-gold mb-1">연간 순수익</p>
                <p className="font-['Montserrat'] text-5xl md:text-7xl font-extrabold text-v4-gold text-stroke-slate-light">
                  <span ref={incomeRef2}>{incomeCount2.toLocaleString()}</span>
                  <span className="text-3xl md:text-4xl ml-2">만원</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-v4-gold mb-1">투자 수익률</p>
                <p className="font-['Montserrat'] text-5xl md:text-7xl font-extrabold text-v4-gold text-stroke-slate-light">
                  <span ref={roiRef2}>{roiCount2}</span>
                  <span className="text-3xl md:text-4xl">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-v4-surface p-4 md:p-8 rounded-xl shadow-lg border border-black/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <h4 className="text-2xl font-bold text-center mb-6 text-v4-gold">
            {useTypingEffect("수익률 상세 분석", 50)}<br />{useTypingEffect("가동률 조건 시나리오", 50)}
          </h4>
          <div className="overflow-x-auto">
            <Table
              columns={ROI_ANALYSIS_COLUMNS}
              rows={details}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIAnalysisSection;
