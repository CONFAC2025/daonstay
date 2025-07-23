import { useQuery } from "@tanstack/react-query";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHHET_ID!;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY!;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME!;

export interface SheetRow {
  이름: string;
  연락처: string;
  주소: string;
}

export function useRecentApplicants() {
  return useQuery<SheetRow[], Error>({
    queryKey: ["recentApplicants"],
    queryFn: async () => {
      const doc = new GoogleSpreadsheet(SHEET_ID, { apiKey: API_KEY });
      await doc.loadInfo();

      const sheet = doc.sheetsByTitle[SHEET_NAME];
      if (!sheet) throw new Error("시트를 찾을 수 없습니다.");

      await sheet.loadHeaderRow(1);
      const allRows: GoogleSpreadsheetRow[] = await sheet.getRows();

      // 최신순 정렬 후 상위 10개만
      return allRows
        .reverse()
        .slice(0, 10)
        .map((r) => ({
          이름: r.get("이름") || "",
          연락처: r.get("연락처") || "",
          주소: r.get("주소") || "",
        }));
    },
    staleTime: 0,
    refetchInterval: 60 * 1000, // 1분마다 자동 갱신
  });
}
