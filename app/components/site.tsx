"use client";
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import { FormEvent, ReactNode, useMemo, useState } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const PHONE = "+852 2838 3913";
const WHATSAPP = "85293808873";

function track(event: string, details: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Brand() {
  return (
    <a className="brand" href="/" aria-label="家怡康主頁">
      <img src="/images/sucare-logo.png" alt="家怡康 Supreme Care" />
      <span>
        <strong>家怡康</strong>
        <small>SUPREME CARE</small>
      </span>
    </a>
  );
}

function Header({ active = "home" }: { active?: "home" | "escort" | "ccsv" }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button
          className="menu-toggle"
          aria-label="開啟網站選單"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav className={open ? "nav open" : "nav"} aria-label="主要導覽">
          <a className={active === "home" ? "active" : ""} href="/#services">服務</a>
          <a className={active === "ccsv" ? "active" : ""} href="/ccsv">社區券</a>
          <a href="/#pricing">收費</a>
          <a href="/#guides">照顧指南</a>
          <a href="/#about">關於家怡康</a>
        </nav>
        <a
          className="button button-wa header-cta"
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("你好，我想了解家怡康的上門護理評估。")}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { position: "header", page: active })}
        >
          WhatsApp 護理評估 <Arrow />
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer-main">
        <div>
          <Brand />
          <p>專業走進家中，安心留在生活裡。</p>
          <div className="swd-stamp">社署認可服務單位 · C0278</div>
        </div>
        <div>
          <strong>核心服務</strong>
          <a href="/#services">出院照顧</a>
          <a href="/escort">陪診及醫療護送</a>
          <a href="/#services">上門護理與復康</a>
        </div>
        <div>
          <strong>社區券</strong>
          <a href="/ccsv">資格與申請</a>
          <a href="/ccsv#calculator">共同付款估算</a>
          <a href="https://www.elderlyinfo.swd.gov.hk/tc/content/supreme-care-limited" target="_blank" rel="noreferrer">社署資料核實 <Arrow /></a>
        </div>
        <div>
          <strong>聯絡我們</strong>
          <a href="tel:+85228383913" onClick={() => track("phone_click", { position: "footer" })}>{PHONE}</a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp +852 9380 8873</a>
          <a href="mailto:info@sucare.com.hk">info@sucare.com.hk</a>
          <span>西營盤德輔道西246號東慈商業中心18樓1803室</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Supreme Care Limited 家怡康有限公司</span>
        <span>私隱政策 · 網站條款</span>
      </div>
    </footer>
  );
}

function FloatingActions({ page }: { page: string }) {
  return (
    <div className="floating-actions" aria-label="快速聯絡">
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("你好，我想進行護理評估。")}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("whatsapp_click", { position: "floating", page })}
      >
        <span>WhatsApp</span>
        <b>即時查詢</b>
      </a>
    </div>
  );
}

function PageFrame({ children, active, page }: { children: ReactNode; active?: "home" | "escort" | "ccsv"; page: string }) {
  return (
    <>
      <Header active={active} />
      <main>{children}</main>
      <Footer />
      <FloatingActions page={page} />
    </>
  );
}

const situations = [
  { id: "discharge", number: "01", title: "剛出院，需要有人接手", copy: "從出院前準備，到回家首週護理與持續復康。", service: "出院照顧計劃" },
  { id: "daily", number: "02", title: "家人需要日常照顧", copy: "起居、餵食、扶抱、如廁、夜間或全日看護。", service: "私家看護" },
  { id: "rehab", number: "03", title: "中風或術後要復康", copy: "物理、職業與言語治療，按家居環境訓練。", service: "上門復康" },
  { id: "escort", number: "04", title: "明天要覆診，家人未能陪同", copy: "出門、登記、候診、取藥、回家與家屬回報。", service: "專業陪診" },
  { id: "ccsv", number: "05", title: "想使用社區券", copy: "了解資格、共同付款與可選服務組合。", service: "社區券服務" },
];

const districts = ["中西區", "灣仔區", "東區", "南區", "油尖旺區", "深水埗區", "九龍城區", "黃大仙區", "觀塘區", "葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"];

function ServiceFinder() {
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState("");
  const [time, setTime] = useState("");
  const [district, setDistrict] = useState("");
  const selected = situations.find((item) => item.id === need);
  const complete = Boolean(need && time && district);

  function finish() {
    if (!complete) return;
    setStep(3);
    track("service_finder_complete", { recommended_service: selected?.service, district, need_time: time });
  }

  return (
    <section className="finder section-shell" id="finder">
      <div className="section-heading row-heading">
        <div>
          <span className="eyebrow">30秒服務配對</span>
          <h2>不用先懂護理，<br />只要告訴我們你正面對什麼。</h2>
        </div>
        <div className="step-indicator" aria-label={`步驟 ${step}，共3步`}>
          {[1, 2, 3].map((item) => <span key={item} className={step >= item ? "on" : ""}>{item}</span>)}
        </div>
      </div>
      <div className="finder-panel">
        <div className="finder-question">
          {step === 1 && (
            <>
              <h3>你最需要解決的是？</h3>
              <div className="choice-grid">
                {situations.map((item) => (
                  <button key={item.id} className={need === item.id ? "choice selected" : "choice"} onClick={() => setNeed(item.id)}>
                    <span>{item.number}</span><b>{item.title}</b>
                  </button>
                ))}
              </div>
              <button className="button button-dark" disabled={!need} onClick={() => setStep(2)}>下一步：時間與地區 <Arrow /></button>
            </>
          )}
          {step === 2 && (
            <>
              <h3>服務需要何時開始？</h3>
              <div className="choice-grid three">
                {["24小時內", "3日內", "一週內", "先了解安排"].map((item) => (
                  <button key={item} className={time === item ? "choice selected" : "choice"} onClick={() => setTime(item)}><b>{item}</b></button>
                ))}
              </div>
              <label className="field-label">服務地區
                <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                  <option value="">選擇香港地區</option>
                  {districts.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <div className="button-row">
                <button className="button button-ghost" onClick={() => setStep(1)}>返回</button>
                <button className="button button-dark" disabled={!complete} onClick={finish}>查看建議 <Arrow /></button>
              </div>
            </>
          )}
          {step === 3 && selected && (
            <div className="result-card">
              <span className="result-kicker">根據你的選擇</span>
              <h3>建議先了解：{selected.service}</h3>
              <p>{selected.copy}家怡康會再由專人核對病況、時數與所需專業級別，避免配錯服務。</p>
              <div className="result-meta"><span>{district}</span><span>{time}</span><span>全港18區支援</span></div>
              <a
                className="button button-wa"
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`你好，我在網站完成服務配對。需要：${selected.service}；地區：${district}；時間：${time}。`)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp_click", { position: "finder_result", service: selected.service })}
              >把結果帶到 WhatsApp <Arrow /></a>
              <button className="text-button" onClick={() => setStep(1)}>重新選擇</button>
            </div>
          )}
        </div>
        <aside className="finder-aside">
          <span>你會得到</span>
          <strong>合適服務類型</strong>
          <strong>建議專業人員</strong>
          <strong>下一步評估方式</strong>
          <p>不會要求你在網上填寫敏感病歷。</p>
        </aside>
      </div>
    </section>
  );
}

function LeadForm({ defaultService = "", title = "告訴我們需要，今天開始安排。", source = "general" }: { defaultService?: string; title?: string; source?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  function start() {
    if (!started) {
      setStarted(true);
      track("lead_form_start", { source });
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    track("lead_form_submit", {
      source,
      service: data.get("service"),
      district: data.get("district"),
      urgency: data.get("urgency"),
    });
    setSubmitted(true);
  }

  return (
    <section className="lead-section section-shell" id="contact">
      <div className="lead-copy">
        <span className="eyebrow light">專人跟進</span>
        <h2>{title}</h2>
        <p>留下最基本資料即可。護理團隊會先了解情況，再建議人員與服務安排。</p>
        <div className="privacy-note">✓ 資料只用作服務評估　✓ 不需上載病歷</div>
      </div>
      {submitted ? (
        <div className="thank-you" role="status">
          <span>已收到</span>
          <h3>謝謝，你已完成初步查詢。</h3>
          <p>這個示範版本已記錄提交事件。正式接入CRM後，團隊會按你選擇的時段跟進。</p>
          <a className="button button-light" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">如屬緊急，轉到 WhatsApp <Arrow /></a>
        </div>
      ) : (
        <form className="lead-form" onSubmit={submit} onFocus={start}>
          <label>需要哪類服務？
            <select name="service" defaultValue={defaultService} required>
              <option value="">請選擇</option>
              <option>出院照顧</option><option>上門護理</option><option>私家看護</option><option>上門復康</option><option>陪診服務</option><option>社區券服務</option><option>未確定，需要建議</option>
            </select>
          </label>
          <div className="form-row">
            <label>服務地區
              <select name="district" required><option value="">請選擇</option>{districts.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label>何時需要？
              <select name="urgency" required><option value="">請選擇</option><option>24小時內</option><option>3日內</option><option>一週內</option><option>先了解</option></select>
            </label>
          </div>
          <div className="form-row">
            <label>聯絡人姓名<input name="name" autoComplete="name" required /></label>
            <label>電話或 WhatsApp<input name="phone" inputMode="tel" autoComplete="tel" required /></label>
          </div>
          <label>想補充的情況（選填）<textarea name="message" rows={3} /></label>
          <button className="button button-light" type="submit">提交初步查詢 <Arrow /></button>
        </form>
      )}
    </section>
  );
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="faq section-shell">
      <div className="section-heading"><span className="eyebrow">常見問題</span><h2>先把家人最關心的事，<br />說清楚。</h2></div>
      <div className="faq-list">
        {items.map((item, index) => (
          <details key={item.q} open={index === 0}>
            <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<b>＋</b></summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  const homeFaq = [
    { q: "我不知道要找護士、保健員還是照顧員，怎麼辦？", a: "不需要你先判斷。家怡康會先了解病況、日常能力、所需時數及家庭支援，再建議合適的人員級別和服務組合。" },
    { q: "服務是否覆蓋全香港？", a: "家怡康的家居為本社區券服務覆蓋全港18區；自費服務會按地區、人員和時間確認實際安排。" },
    { q: "最快多久可以安排？", a: "視乎服務類別、地點和專業人員檔期。緊急需要可直接 WhatsApp 提供日期、地區及患者基本情況，團隊會優先評估可行安排。" },
    { q: "網站上的價錢是否就是最終收費？", a: "公開價目讓家庭先建立預算；最終會按服務時數、所需專業人員、交通及照顧複雜程度確認。社區券服務則依社署核准項目與共同付款級別計算。" },
  ];

  return (
    <PageFrame active="home" page="home">
      <section className="hero home-hero">
        <div className="hero-copy">
          <div className="trust-pill"><span>✓</span> 社署認可服務單位 C0278</div>
          <h1><span className="no-wrap">讓家人安心回家，</span><br /><em className="no-wrap">專業護理與復康</em><br />上門支援。</h1>
          <p>由護士、物理治療師、職業治療師及照顧團隊，按需要安排出院護理、日常照顧、陪診及社區券服務，覆蓋全港18區。</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#finder" onClick={() => track("lead_form_start", { source: "home_hero_finder" })}>立即進行護理評估 <Arrow /></a>
            <a className="button button-ghost" href="#pricing" onClick={() => track("pricing_view", { source: "home_hero" })}>查看服務與收費</a>
          </div>
          <div className="hero-facts">
            <span><b>18區</b>全港覆蓋</span><span><b>7天</b>週一至日服務</span><span><b>多專業</b>護士與治療團隊</span>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/images/home-hero.webp" alt="家怡康護士到訪香港家庭，與長者及家屬溝通護理安排" />
          <div className="image-note"><span>今日可開始評估</span><b>先了解，再配對。</b></div>
        </div>
      </section>

      <section className="trust-band" aria-label="家怡康服務信任資料">
        <div><span>01</span><b>社署認可</b><small>C0278</small></div>
        <div><span>02</span><b>全港18區</b><small>家居為本服務</small></div>
        <div><span>03</span><b>星期一至日</b><small>08:00—18:00</small></div>
        <div><span>04</span><b>專業配對</b><small>按需要選人員</small></div>
      </section>

      <section className="situation-section section-shell">
        <div className="section-heading row-heading">
          <div><span className="eyebrow">從處境開始</span><h2>你現在，<br />正面對什麼？</h2></div>
          <p>不是先把服務名稱背熟，而是從家人此刻的需要出發。選擇最接近的情況，我們會帶你到下一步。</p>
        </div>
        <div className="situation-list">
          {situations.map((item) => (
            <a key={item.id} href={item.id === "escort" ? "/escort" : item.id === "ccsv" ? "/ccsv" : "#finder"}>
              <span>{item.number}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><b>↗</b>
            </a>
          ))}
        </div>
      </section>

      <ServiceFinder />

      <section className="services section-shell" id="services">
        <div className="section-heading row-heading">
          <div><span className="eyebrow">六項核心服務</span><h2>一個家庭，<br />一套連續照顧。</h2></div>
          <p>將日常照顧、專業護理、復康及外出支援連成一條路，減少家人在不同供應者之間反覆交代。</p>
        </div>
        <div className="service-grid">
          {[
            ["01", "出院照顧", "出院前準備、回家首週、持續復康", "護理＋復康"],
            ["02", "上門護理", "傷口、喉管、注射與生命表徵", "護士執行"],
            ["03", "私家看護", "起居、夜間與24小時日常照顧", "彈性時數"],
            ["04", "上門復康", "物理、職業、言語治療與家居訓練", "治療師到戶"],
            ["05", "陪診護送", "登記、候診、取藥、安全回家與回報", "本地／海外"],
            ["06", "家居安全", "跌倒風險、浴室、睡房、動線與輔具", "治療師評估"],
          ].map(([no, title, copy, tag]) => (
            <article key={no}>
              <span>{no}</span><small>{tag}</small><h3>{title}</h3><p>{copy}</p><a href={no === "05" ? "/escort" : "#contact"}>了解服務 <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-shell">
        <div className="process-intro"><span className="eyebrow light">服務流程</span><h2>先看見需要，<br />再安排人。</h2><p>每個個案都由了解開始，不用在第一次查詢時就做出所有決定。</p></div>
        <ol>
          <li><span>01</span><div><b>初步了解</b><p>日期、地區、病況與家庭最擔心的事</p></div></li>
          <li><span>02</span><div><b>專業評估</b><p>確認照顧複雜度、時數與人員級別</p></div></li>
          <li><span>03</span><div><b>人員配對</b><p>服務前介紹合適的護士、治療師或照顧員</p></div></li>
          <li><span>04</span><div><b>服務與檢視</b><p>按進度回報，定期調整照顧計劃</p></div></li>
        </ol>
      </section>

      <section className="pricing section-shell" id="pricing">
        <div className="section-heading row-heading">
          <div><span className="eyebrow">收費先透明</span><h2>先建立預算，<br />再決定服務。</h2></div>
          <p>以下為現有自費公開價目摘要。最終安排會按時間、地區、服務複雜度及人員級別確認。</p>
        </div>
        <div className="pricing-grid">
          <article className="price-card featured"><span>專業護理</span><h3>註冊護士</h3><div className="price"><small>1小時</small><b>HK$891</b></div><div className="price"><small>4小時</small><b>HK$1,236</b></div><p>適合傷口、喉管、注射及需護士判斷的護理。</p><a href="#contact">查詢護理安排 <Arrow /></a></article>
          <article className="price-card"><span>日常支援</span><h3>保健員／照顧員</h3><div className="price"><small>1小時</small><b>HK$420</b></div><div className="price"><small>4小時</small><b>HK$650</b></div><p>適合起居、餵食、扶抱與個人照顧。</p><a href="#contact">查詢看護安排 <Arrow /></a></article>
          <article className="price-card"><span>外出支援</span><h3>專業陪診員</h3><div className="price"><small>1小時</small><b>HK$280</b></div><div className="price"><small>4小時</small><b>HK$480</b></div><p>交通與特殊支援另按實際安排確認。</p><a href="/escort">查看陪診服務 <Arrow /></a></article>
          <article className="price-card ccsv-card"><span>社區券</span><h3>共同付款 5%—40%</h3><div className="price"><small>2026—27每月券值</small><b>HK$4,526—10,824</b></div><p>政府支付餘額；實際級別按社署審查結果。</p><a href="/ccsv#calculator">估算共同付款 <Arrow /></a></article>
        </div>
        <p className="price-note">價目資料只供初步參考，≥5小時可另行查詢長時數安排。社區券核准服務收費及共同付款按社署最新資料為準。</p>
      </section>

      <section className="care-story section-shell" id="guides">
        <div className="story-image"><img src="/images/home-hero.webp" alt="家怡康照顧團隊與香港家庭共同檢視長者照顧計劃" /></div>
        <div className="story-copy"><span className="eyebrow">不是替家人做決定</span><h2>是讓每一次照顧，<br />都有清楚的下一步。</h2><blockquote>「爸爸中風出院時，我最怕的是自己不懂照顧。有人把首週要做什麼逐項說清楚，焦慮才真正放下來。」</blockquote><p>— 客戶故事整理，基於現有服務個案</p><a className="text-link" href="#contact">了解出院照顧計劃 <Arrow /></a></div>
      </section>

      <Faq items={homeFaq} />
      <LeadForm source="home" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "HomeHealthCareService", name: "家怡康有限公司 Supreme Care Limited", url: "https://www.sucare.com.hk/", telephone: "+852-2838-3913", email: "info@sucare.com.hk", areaServed: "Hong Kong", address: { "@type": "PostalAddress", streetAddress: "德輔道西246號東慈商業中心18樓1803室", addressLocality: "香港" }, availableService: situations.map((item) => item.service) }) }} />
    </PageFrame>
  );
}

export function EscortPage() {
  const faq = [
    { q: "陪診員會做哪些事情？", a: "可按需要協助出門、乘車、登記、輪候、院內移動、覆診溝通、取藥及安全回家，並向家人簡單回報覆診重點。" },
    { q: "陪診是否包括交通費？", a: "公開價目為陪診人員服務時數，交通、輪椅車或特殊支援會按實際安排另行確認。" },
    { q: "可以安排註冊護士陪同嗎？", a: "可以。若患者需要醫療觀察、用藥或飛行醫療支援，團隊會評估是否需要由註冊護士或其他專業人員執行。" },
    { q: "海外醫療護送如何安排？", a: "需先取得患者醫療及行程資料，由團隊評估適航性、所需專業人員、醫療物資及交接安排後提供方案。" },
  ];
  return (
    <PageFrame active="escort" page="escort">
      <section className="sub-hero escort-hero">
        <div className="sub-hero-copy"><a className="breadcrumb" href="/">首頁 / 服務中心 / 陪診</a><span className="eyebrow">香港本地及海外醫療護送</span><h1>覆診路上，<br />有人照顧每一步。</h1><p>從家門、登記、候診、取藥到安全回家，家怡康按患者身體狀況安排合適陪診員，並向家人回報重要事項。</p><div className="hero-actions"><a className="button button-primary" href="#escort-contact">查詢可安排時段 <Arrow /></a><a className="button button-ghost" href="#escort-pricing">查看陪診收費</a></div><div className="inline-trust"><span>✓ 受訓陪診員</span><span>✓ 可升級護士護送</span><span>✓ 家屬回報</span></div></div>
        <div className="sub-hero-image"><img src="/images/escort-hero.webp" alt="家怡康陪診員陪同長者在香港醫院登記" /><div className="availability-card"><small>公開價目</small><strong>HK$280</strong><span>1小時陪診員服務</span></div></div>
      </section>

      <section className="service-summary section-shell">
        <div><span>適合</span><b>長者覆診</b><b>中風／術後患者</b><b>行動不便人士</b><b>家人未能陪同</b></div>
        <div><span>可協助</span><b>登記與輪候</b><b>院內移動</b><b>取藥與提醒</b><b>安全往返</b></div>
        <div><span>完成後</span><b>覆診重點</b><b>下次日期</b><b>用藥提醒</b><b>家人回報</b></div>
      </section>

      <section className="escort-journey section-shell">
        <div className="section-heading row-heading"><div><span className="eyebrow">完整流程</span><h2>不只是陪到醫院，<br />是陪完一趟覆診。</h2></div><p>把容易遺漏的環節逐一接住，讓患者少一點慌張，也讓未能同行的家人保持知情。</p></div>
        <div className="journey-line">
          {[["01", "出門前", "確認證件、覆診紙與所需物品"], ["02", "安全往返", "協助上落車及按需要使用輔具"], ["03", "院內流程", "登記、輪候、檢查與覆診陪同"], ["04", "取藥跟進", "協助取藥並留意醫護指示"], ["05", "回家回報", "安全到家並向家人交代重點"]].map(([no, title, copy]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="split-service section-shell">
        <article><span className="eyebrow">香港本地陪診</span><h2>公立醫院、私家醫院及診所</h2><p>適合定期覆診、檢查、取藥、復康覆診與日間醫療程序。按行動能力和醫療需要安排陪診員、保健員或護士。</p><ul><li>提供日期、時間及醫院／診所</li><li>說明患者行動能力與溝通需要</li><li>確認集合地點、交通與家人回報方式</li></ul><a className="text-link" href="#escort-contact">查詢本地陪診 <Arrow /></a></article>
        <article className="dark"><span className="eyebrow light">Medical Escort</span><h2>跨境及海外醫療護送</h2><p>由香港家居或醫療地點護送至指定目的地，按病況規劃醫療準備、飛行期間觀察及目的地交接。</p><ul><li>醫療報告與適航評估</li><li>護士、藥物與醫療物資準備</li><li>機場、航空公司及目的地醫療隊交接</li></ul><a className="text-link light" href="#escort-contact">諮詢海外護送 <Arrow /></a></article>
      </section>

      <section className="escort-pricing section-shell" id="escort-pricing">
        <div className="section-heading"><span className="eyebrow">陪診員公開價目</span><h2>按所需時數，<br />先看清基本預算。</h2></div>
        <div className="hour-prices">{[["1小時", "HK$280"], ["2小時", "HK$320"], ["3小時", "HK$360"], ["4小時", "HK$480"], ["5小時或以上", "查詢長時數安排"]].map(([hour, price]) => <div key={hour}><span>{hour}</span><b>{price}</b></div>)}</div>
        <p className="price-note">交通費、輪椅車、非一般服務時間、護士級別或海外行程不包含在上述陪診員基本價目，將按個案另行報價。</p>
      </section>

      <Faq items={faq} />
      <div id="escort-contact"><LeadForm defaultService="陪診服務" title="把覆診日期告訴我們，先確認可安排時段。" source="escort" /></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "香港專業陪診服務", provider: { "@type": "Organization", name: "家怡康有限公司" }, areaServed: "Hong Kong", offers: { "@type": "Offer", priceCurrency: "HKD", price: "280", description: "陪診員1小時公開價目" } }) }} />
    </PageFrame>
  );
}

function CcsvCalculator() {
  const [value, setValue] = useState(4526);
  const [rate, setRate] = useState(5);
  const copay = useMemo(() => Math.round(value * rate) / 100, [value, rate]);
  const subsidy = value - copay;
  return (
    <section className="calculator section-shell" id="calculator">
      <div className="calculator-copy"><span className="eyebrow light">2026—27共同付款估算</span><h2>先知道每月大概需要支付多少。</h2><p>社區券採用「能者多付」原則。選擇社署批出的每月券值及共同付款級別，即時查看長者與政府各自承擔的金額。</p><div className="official-note">此工具只作預算參考，不會收集收入或病歷。正式金額以社署批核為準。</div></div>
      <div className="calculator-panel">
        <label><span>每月社區券服務組合價值</span><b>HK${value.toLocaleString()}</b><input type="range" min="4526" max="10824" step="1" value={value} onChange={(e) => setValue(Number(e.target.value))} /></label>
        <div className="range-labels"><span>最低 HK$4,526</span><span>最高 HK$10,824</span></div>
        <fieldset><legend>共同付款級別</legend><div className="rate-options">{[5, 8, 12, 16, 25, 40].map((item) => <button type="button" key={item} className={rate === item ? "selected" : ""} onClick={() => { setRate(item); track("ccsv_calculator_complete", { voucher_value: value, copay_rate: item }); }}>{item}%</button>)}</div></fieldset>
        <div className="calculation-result"><div><span>長者每月支付</span><strong>HK${copay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div><div><span>政府資助餘額</span><strong>HK${subsidy.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div></div>
        <a className="button button-light" href="#ccsv-contact">按此結果諮詢服務組合 <Arrow /></a>
      </div>
    </section>
  );
}

export function CcsvPage() {
  const faq = [
    { q: "誰可以申請長者社區照顧服務券？", a: "需要在安老服務統一評估機制下被評定適合社區或院舍照顧，正在資助長期護理服務中央輪候冊，並尚未接受院舍照顧或資助社區照顧服務。" },
    { q: "社區券是否已經恆常化？", a: "是。計劃已由試驗階段轉為恆常化。2026—27年度每月社區券價值範圍為HK$4,526至HK$10,824，資料以社署最新公布為準。" },
    { q: "共同付款怎樣計算？", a: "社署按長者及同住家人的收入審查，批出5%、8%、12%、16%、25%或40%其中一級。長者支付相應百分比，政府支付餘額。" },
    { q: "家怡康可以提供哪些社區券服務？", a: "包括由專業人員或輔助人員提供的護理、復康、個人照顧、護送、到戶看顧、照顧者培訓及家居環境安全評估等，實際組合按需要與可用時段安排。" },
  ];
  return (
    <PageFrame active="ccsv" page="ccsv">
      <section className="sub-hero ccsv-hero">
        <div className="sub-hero-copy"><a className="breadcrumb" href="/">首頁 / 社區券</a><div className="trust-pill"><span>✓</span> 社署認可服務單位 C0278</div><h1>社區券不只是津貼，<br />是把合適照顧帶回家。</h1><p>家怡康提供全港18區家居為本社區照顧服務，協助家庭理解資格、共同付款、可選項目與服務組合。</p><div className="hero-actions"><a className="button button-primary" href="#calculator">估算共同付款 <Arrow /></a><a className="button button-ghost" href="#ccsv-services">查看核准服務</a></div></div>
        <div className="sub-hero-image"><img src="/images/ccsv-hero.webp" alt="家怡康顧問向香港長者及女兒解釋社區券服務組合" /><div className="ccsv-seal"><small>認可檔號</small><strong>C0278</strong><span>全港18區</span></div></div>
      </section>

      <section className="ccsv-facts section-shell">
        <div><span>服務時間</span><b>星期一至日</b><small>08:00—18:00</small></div><div><span>2026—27每月券值</span><b>HK$4,526—10,824</b><small>可按需要選服務組合</small></div><div><span>共同付款</span><b>5%—40%</b><small>共六個級別</small></div><div><span>服務模式</span><b>家居為本</b><small>覆蓋全港18區</small></div>
      </section>

      <CcsvCalculator />

      <section className="ccsv-services section-shell" id="ccsv-services">
        <div className="section-heading row-heading"><div><span className="eyebrow">社署核准項目</span><h2>可用在哪些<br />家居照顧服務？</h2></div><p>以下為社署長者資訊網列出的家怡康核准收費。實際服務組合、時數及人員安排需按評估確認。</p></div>
        <div className="rate-table" role="table" aria-label="家怡康社區券核准服務收費">
          <div className="rate-head" role="row"><span>服務項目</span><span>提供人員</span><span>核准收費</span></div>
          {[
            ["復康運動", "物理／職業治療師", "HK$997／小時"],
            ["復康運動", "輔助人員", "HK$252／小時"],
            ["護理服務", "登記／註冊護士", "HK$959／小時"],
            ["護理／個人照顧", "輔助人員", "HK$252／小時"],
            ["護送服務", "按需要安排", "HK$152／小時"],
            ["到戶看顧／照顧者培訓", "專業人員", "HK$959／小時"],
            ["家居安全評估", "物理／職業治療師", "HK$997／小時"],
          ].map((row) => <div className="rate-row" role="row" key={`${row[0]}${row[1]}`}><span>{row[0]}</span><span>{row[1]}</span><b>{row[2]}</b></div>)}
        </div>
        <div className="source-box"><span>資料核實</span><p>核准收費、服務容量及空缺會更新。網站最後核對社署資料日期：2026年4月16日。</p><a href="https://www.elderlyinfo.swd.gov.hk/tc/content/supreme-care-limited" target="_blank" rel="noreferrer">到社署長者資訊網核實 <Arrow /></a></div>
      </section>

      <section className="application-steps section-shell">
        <div className="section-heading"><span className="eyebrow">資格與申請</span><h2>從輪候冊到服務組合，<br />四步看懂。</h2></div>
        <ol>{[["01", "完成統一評估", "被評定適合社區或院舍照顧服務，並在中央輪候冊。"], ["02", "收到社署邀請", "社署按申請日期發信邀請合資格長者參與。"], ["03", "提交申請及審查", "可郵寄、交回或經VISE系統提交；一般約四星期完成審批。"], ["04", "選擇認可單位", "持券人可按需要選服務單位、服務項目及服務量。"]].map(([no, title, copy]) => <li key={no}><span>{no}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
        <div className="official-links"><a href="https://www.swd.gov.hk/tc/pubsvc/elderly/cat_commcare/psccsv/" target="_blank" rel="noreferrer">社署計劃詳情 <Arrow /></a><a href="https://vise.swd.gov.hk/" target="_blank" rel="noreferrer">VISE長者服務券資訊系統 <Arrow /></a></div>
      </section>

      <Faq items={faq} />
      <div id="ccsv-contact"><LeadForm defaultService="社區券服務" title="把批出的社區券情況告訴我們，一起組合合適服務。" source="ccsv" /></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "長者社區照顧服務券家居服務", provider: { "@type": "Organization", name: "家怡康有限公司", identifier: "C0278" }, areaServed: "Hong Kong", serviceType: "Home-based community care service" }) }} />
    </PageFrame>
  );
}
