import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRecentApplicants } from "../../hooks/useRecentApplicants";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";
import {
  formatPhoneNumber,
  GOOGLE_SHEET_SCRIPT_URL,
  GoogleSheetFormSchema,
  type GoogleSheetFormValues,
} from "./formSchema";

const FormSection = () => {
  const { refetch } = useRecentApplicants();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<GoogleSheetFormValues>({
    resolver: yupResolver(GoogleSheetFormSchema),
  });

  const onSubmit = async (data: GoogleSheetFormValues) => {
    const formData = new FormData();
    formData.append("이름", data.이름);
    formData.append("연락처", data.연락처);
    formData.append("주소", data.주소);

    try {
      await fetch(GOOGLE_SHEET_SCRIPT_URL, { method: "POST", body: formData });
      alert("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      reset();
      await refetch();
    } catch (err) {
      console.error("제출 오류:", err);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section id="form-section" className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text mb-4">
            {useTypingEffect("지금 바로 ", 50)}<span className="text-v4-gold">{useTypingEffect("투자 상담 신청", 50)}</span>
          </h2>
          <p className="text-lg md:text-xl text-v4-text-muted animate-heartbeat">
            {useTypingEffect("전문가의 상세한 상담을 통해 확신을 얻으세요.", 30)}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-v4-surface p-6 md:p-8 rounded-2xl shadow-2xl border border-black/10">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <InputField
              label="이름"
              name="이름"
              placeholder="성함을 입력하세요"
              register={register("이름")}
              error={errors.이름?.message}
            />
            <InputField
              label="연락처"
              name="연락처"
              type="tel"
              placeholder="010-1234-5678"
              register={{
                ...register("연락처"),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  e.target.value = formatted;
                  register("연락처").onChange(e);
                },
              }}
              error={errors.연락처?.message}
              maxLength={13}
            />
            <InputField
              label="주소"
              name="주소"
              placeholder="거주하시는 지역을 입력하세요 (예: 서울시 강남구)"
              register={register("주소")}
              error={errors.주소?.message}
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full btn-v4 text-white"
              >
                {isSubmitting ? "제출 중..." : "상담 신청하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;

interface InputFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "password" | "number";
  placeholder?: string;
  error?: string;
  register?: any;
  maxLength?: number;
}

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  maxLength,
}: InputFieldProps) => {
  return (
    <fieldset>
      <label htmlFor={name} className="block text-sm font-medium text-v4-text-muted mb-2 animate-typing">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 border-2 bg-v4-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-v4-gold text-v4-text ${
          error ? "border-red-500" : "border-white/10"
        }`}
        {...register}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </fieldset>
  );
};
