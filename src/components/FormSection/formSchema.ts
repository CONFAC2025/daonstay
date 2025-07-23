import * as yup from "yup";

export const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length > 11) return value;
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
};

/**
 * @see https://script.google.com
 * @description 위의 링크에서 스크립트 생성 후 배포하면 나오는 웹 앱 url입니다.
 */
export const GOOGLE_SHEET_SCRIPT_URL = import.meta.env
  .VITE_GOOGLE_SHEET_SCRIPT_URL!;

export const GoogleSheetFormSchema = yup.object({
  이름: yup.string().required("이름을 입력해주세요."),
  연락처: yup
    .string()
    .matches(/^01[016789]-?\d{3,4}-?\d{4}$/, "유효한 연락처 형식이 아닙니다.")
    .required("연락처를 입력해주세요."),
  주소: yup.string().required("주소를 입력해주세요."),
});

export type GoogleSheetFormValues = yup.InferType<typeof GoogleSheetFormSchema>;
