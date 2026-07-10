import { EscortPage } from "../components/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "香港專業陪診服務｜收費、流程及醫療護送",
  description: "家怡康為長者及行動不便人士提供香港陪診服務，協助登記、候診、取藥、安全往返及家屬回報，陪診員1小時HK$280起。",
  alternates: { canonical: "/escort", languages: { "zh-Hant-HK": "/escort" } },
};

export default function Page() {
  return <EscortPage />;
}
