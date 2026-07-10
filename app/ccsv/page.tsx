import { CcsvPage } from "../components/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "長者社區照顧服務券｜認可單位C0278",
  description: "家怡康是社署長者社區照顧服務券認可單位C0278，提供全港18區家居服務、共同付款估算及服務組合諮詢。",
  alternates: { canonical: "/ccsv", languages: { "zh-Hant-HK": "/ccsv" } },
};

export default function Page() {
  return <CcsvPage />;
}
