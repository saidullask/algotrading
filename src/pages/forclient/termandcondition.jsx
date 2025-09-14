import React, { useMemo, useRef } from "react";
import {
  FileDown,
  ShieldCheck,
  LineChart,
  Landmark,
  Lock,
  Coins,
  Zap,
  Scale,
  FolderLock,
  Hammer,
  ScrollText,
  Gavel,
  BookOpenText,
  CircleDot,
} from "lucide-react";

/* Local page styles that complement your dark trading theme */
const LocalStyles = () => (
  <style>{`
    .tc-shell {
      --bg0: #0b1220;
      --bg1: #0d1425;
      --ink0: #e5e7eb;
      --ink1: #cbd5e1;
      --bd: #1f2937;
      --glow: 0 20px 60px rgba(16,185,129,.08), inset 0 1px 0 rgba(255,255,255,.03);
    }
    .tc-card {
      background: radial-gradient(1200px 500px at 10% -10%, rgba(34,197,94,.08), transparent 45%),
                  radial-gradient(900px 400px at 110% 10%, rgba(56,189,248,.08), transparent 45%),
                  linear-gradient(180deg, var(--bg1), var(--bg0));
      border: 1px solid rgba(51,65,85,.65);
      border-radius: 18px;
      box-shadow: var(--glow);
    }
    .tc-hero {
      border: 1px solid rgba(51,65,85,.65);
      border-radius: 22px;
      background:
        radial-gradient(800px 220px at 0% 0%, rgba(16,185,129,.12), transparent 60%),
        radial-gradient(800px 220px at 100% 0%, rgba(56,189,248,.10), transparent 60%),
        linear-gradient(180deg, #0a1324, #091020);
      box-shadow: var(--glow);
      overflow: hidden;
      position: relative;
    }
    .tc-hero::after {
      content: "";
      position: absolute; inset: 0;
      background:
        linear-gradient(120deg, transparent 0 35%, rgba(148,163,184,.06) 35% 36%, transparent 36% 64%, rgba(148,163,184,.06) 64% 65%, transparent 65% 100%),
        radial-gradient(650px 200px at 50% 120%, rgba(16,185,129,.12), transparent 60%);
      pointer-events: none;
    }
    .tc-section {
      border: 1px solid rgba(51,65,85,.55);
      border-radius: 16px;
      background: linear-gradient(180deg, #0c1629, #0a1324);
      box-shadow: var(--glow);
    }
    .tc-chip {
      display: inline-flex; align-items: center; gap: .45rem;
      border-radius: 999px;
      padding: .35rem .7rem;
      font-weight: 700; letter-spacing: .25px;
      background: rgba(16,185,129,.12);
      color: #86efac;
      border: 1px solid rgba(16,185,129,.35);
    }
    .toc {
      position: sticky; top: 1rem;
      border: 1px solid rgba(51,65,85,.55);
      border-radius: 14px;
      background: linear-gradient(180deg, #0d172b, #0a1324);
      box-shadow: var(--glow);
    }
    .toc a {
      color: #cbd5e1; text-decoration: none;
    }
    .toc a:hover { color: #fff; }
    .num-dot {
      display:inline-grid; place-items:center;
      height: 26px; width: 26px; border-radius: 999px;
      background: linear-gradient(180deg, #10b981, #0ea5e9);
      color: #0b1220; font-weight: 900; font-size: 12px;
      box-shadow: 0 0 0 3px rgba(16,185,129,.2);
    }
    @media print {
      .no-print { display: none !important; }
      body { background: white; }
    }
  `}</style>
);

function SectionCard({ id, num, icon: Icon, title, children }) {
  return (
    <section id={id} className="tc-section p-5 md:p-6">
      <div className="flex items-start gap-3">
        <span className="num-dot">{num}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="h-4.5 w-4.5 text-emerald-300" /> : <CircleDot className="h-4.5 w-4.5 text-emerald-300" />}
            <h2 className="text-xl md:text-[22px] font-extrabold tracking-tight text-slate-100">
              {title}
            </h2>
          </div>
          <div className="mt-3 text-[15px] leading-7 text-slate-300">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function TermCondition() {
  const printableRef = useRef(null);

  // Table of contents model (id must match section id)
  const toc = useMemo(
    () => [
      { id: "acceptance", label: "Acceptance of Terms" },
      { id: "eligibility", label: "Eligibility" },
      { id: "account", label: "Account Registration" },
      { id: "usage", label: "Platform Usage" },
      { id: "fees", label: "Fees & Payments" },
      { id: "risk", label: "Risk Disclosure" },
      { id: "ip", label: "Intellectual Property" },
      { id: "privacy", label: "Data & Privacy" },
      { id: "liability", label: "Limitations of Liability" },
      { id: "indemnity", label: "Indemnity" },
      { id: "termination", label: "Termination" },
      { id: "dispute", label: "Dispute Resolution" },
      { id: "modifications", label: "Modifications to Terms" },
      { id: "misc", label: "Miscellaneous" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const downloadPdf = () => {
    if (!printableRef.current) return;
    const html = printableRef.current.innerHTML;
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return;

    w.document.write(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Terms & Conditions</title>
          <style>
            @page { margin: 18mm; }
            body { font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji"; color:#0f172a; line-height:1.6; }
            h1 { font-size: 28px; margin: 0 0 18px; }
            h2 { font-size: 18px; margin: 18px 0 8px; }
            p { margin: 8px 0; }
            ul { margin: 6px 0 6px 20px; }
            li { margin: 4px 0; }
            .chip { display:inline-block; padding:6px 10px; border-radius:999px; background:#e8fff7; color:#065f46; font-weight:700; font-size:12px; border:1px solid #b7f7df; }
            .hr { height:1px; background:#e2e8f0; margin:12px 0 16px; }
            .block { border:1px solid #e5e7eb; border-radius:10px; padding:14px 16px; margin:6px 0; }
          </style>
        </head>
        <body>
          ${html}
          <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 200); };</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  return (
    <div className="tc-shell min-h-screen bg-slate-950 text-slate-100">
      <LocalStyles />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="tc-hero relative">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative px-6 md:px-10 py-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 hidden sm:block">
                  <LineChart className="h-10 w-10 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold">
                    Terms & Conditions
                  </h1>
                  <p className="mt-1 text-slate-300">
                    Legal framework for using our algorithmic trading platform.
                  </p>
                  <div className="mt-3">
                    <span className="tc-chip">
                      <ShieldCheck className="h-4 w-4" />
                      Last Updated: 16th January 2025
                    </span>
                  </div>
                </div>
              </div>

              <div className="no-print flex items-center gap-3">
                <button
                  onClick={downloadPdf}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold px-4 py-2.5 hover:bg-emerald-400 transition border border-emerald-300/30"
                >
                  <FileDown className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TOC */}
          <aside className="no-print lg:col-span-4 xl:col-span-3">
            <div className="toc p-4">
              <div className="font-extrabold text-slate-200 text-sm tracking-wide">
                On this page
              </div>
              <div className="mt-3 space-y-2">
                {toc.map((t) => (
                  <div key={t.id}>
                    <a href={`#${t.id}`} className="text-sm flex items-center gap-2">
                      <span className="h-[6px] w-[6px] rounded-full bg-emerald-400/80" />
                      {t.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Content (print area) */}
          <main className="lg:col-span-8 xl:col-span-9">
            <div ref={printableRef}>
              {/* Title + date for print */}
              <div className="hidden print:block">
                <h1>Terms & Conditions</h1>
                <div className="chip">Last Updated: 16th January 2025</div>
                <div className="hr" />
              </div>

              <div className="space-y-5">
                <SectionCard id="acceptance" num="1" icon={ScrollText} title="Acceptance of Terms">
                  By accessing or using the Platform, you agree to comply with and be bound
                  by these Terms and Conditions. If you do not agree with any part of these
                  Terms, you must not use the Platform. We may update these Terms from time
                  to time, and you should periodically review them.
                </SectionCard>

                <SectionCard id="eligibility" num="2" icon={Scale} title="Eligibility">
                  <p>To use the Platform, you must:</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Be at least 18 years old or the legal age in your jurisdiction to form a binding contract;</li>
                    <li>Have the necessary knowledge, experience, and resources to engage in algorithmic trading;</li>
                    <li>Comply with all applicable laws, including financial and securities regulations in your jurisdiction.</li>
                  </ul>
                  <p className="mt-2">
                    By using the Platform, you represent and warrant that you meet these
                    eligibility requirements.
                  </p>
                </SectionCard>

                <SectionCard id="account" num="3" icon={FolderLock} title="Account Registration">
                  <p><b>Creating an Account:</b> To use the Platform, you must create an account by providing accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials.</p>
                  <p className="mt-2"><b>Account Security:</b> You are responsible for all activities under your account. If you suspect unauthorized access or misuse, you must notify us immediately.</p>
                  <p className="mt-2"><b>Termination of Account:</b> We reserve the right to suspend or terminate your account if we detect fraudulent activities, breaches of these Terms, or any unlawful conduct.</p>
                </SectionCard>

                <SectionCard id="usage" num="4" icon={Landmark} title="Platform Usage">
                  <p><b>License Grant:</b> Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use the Platform solely for your personal or business purposes.</p>
                  <p className="mt-2"><b>Trading Algorithms:</b> You may subscribe to automated trading algorithms ("Algorithms") for use on the Platform. You are responsible for the performance, legality, and risk associated with the Algorithms you use.</p>
                  <p className="mt-2"><b>Compliance:</b> You agree to comply with all applicable local, national, and international regulations concerning algorithmic trading, including any licensing or registration requirements.</p>
                </SectionCard>

                <SectionCard id="fees" num="5" icon={Coins} title="Fees and Payments">
                  <p><b>Subscription Fees:</b> You may be required to pay fees to access certain services or features on the Platform. These fees will be outlined in the Platform’s pricing section.</p>
                  <p className="mt-2"><b>Payment Terms:</b> Payments must be made in accordance with the Platform's payment terms. You are responsible for any taxes or other charges imposed by your jurisdiction.</p>
                  <p className="mt-2"><b>Fee Changes:</b> We reserve the right to change fees at any time. If changes occur, we will notify you and give you an opportunity to review and accept the new fees.</p>
                </SectionCard>

                <SectionCard id="risk" num="6" icon={Zap} title="Risk Disclosure">
                  <p><b>Trading Risk:</b> Algorithmic trading carries significant risk, including the potential for large financial losses due to market volatility, latency, and algorithm errors. You acknowledge that you are solely responsible for the outcome of all trades executed via the Platform.</p>
                  <p className="mt-2"><b>No Profit Guarantee:</b> The Platform does not guarantee any profits or returns from using the Platform. Algorithmic trading involves high-risk activity, and past performance is not indicative of future results.</p>
                  <p className="mt-2"><b>Market Conditions:</b> The Platform is not responsible for any loss due to market conditions, regulatory changes, or external factors beyond its control.</p>
                </SectionCard>

                <SectionCard id="ip" num="7" icon={BookOpenText} title="Intellectual Property">
                  <p><b>Platform Ownership:</b> The Platform and all associated intellectual property rights, including software, algorithms, documentation, and trademarks, are owned by Calcutta Technologies Private Limited or its licensors.</p>
                  <p className="mt-2"><b>User Content:</b> You retain ownership of any content you upload on the Platform. By uploading or using these, you grant us a non-exclusive, royalty-free, worldwide license to use, modify, and display your content as necessary to provide the services.</p>
                </SectionCard>

                <SectionCard id="privacy" num="8" icon={Lock} title="Data and Privacy">
                  <p><b>Data Collection:</b> We collect data about your account, trading activity, and other interactions with the Platform. This data is used to operate, improve, and personalize the Platform.</p>
                  <p className="mt-2"><b>Privacy Policy:</b> Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy for further details.</p>
                  <p className="mt-2"><b>Data Security:</b> We take reasonable measures to protect your data, but no system can guarantee 100% security. You are responsible for securing your account credentials and personal information.</p>
                </SectionCard>

                <SectionCard id="liability" num="9" icon={Scale} title="Limitations of Liability">
                  <p><b>No Liability for Losses:</b> To the maximum extent permitted by law, Calcutta Technologies Private Limited is not liable for any direct, indirect, incidental, consequential, or special damages, including loss of profits, data, or reputation, arising from the use or inability to use the Platform or its services.</p>
                  <p className="mt-2"><b>Platform Availability:</b> We do not guarantee that the Platform will be available without interruption, delay, or error. We are not responsible for any system outages, downtime, or issues caused by external factors such as internet connectivity.</p>
                </SectionCard>

                <SectionCard id="indemnity" num="10" icon={Hammer} title="Indemnity">
                  You agree to indemnify, defend, and hold harmless Calcutta Technologies Private
                  Limited and its affiliates, employees, directors, and agents from any claims,
                  losses, damages, liabilities, and expenses (including legal fees) arising out of
                  your use of the Platform, your violation of these Terms, or any third-party
                  claims arising from your activities.
                </SectionCard>

                <SectionCard id="termination" num="11" icon={Gavel} title="Termination">
                  <p><b>Termination by You:</b> You may terminate your account at any time by notifying us. Upon termination, you must stop using the Platform and any associated services.</p>
                  <p className="mt-2"><b>Termination by Us:</b> We reserve the right to suspend or terminate your access to the Platform at our discretion, including if we believe you have violated these Terms or engaged in fraudulent activity.</p>
                  <p className="mt-2"><b>Effect of Termination:</b> Upon termination, all licenses and rights granted to you will immediately cease. You will not have access to any data or content stored on the Platform.</p>
                </SectionCard>

                <SectionCard id="dispute" num="12" icon={Landmark} title="Dispute Resolution">
                  <p><b>Arbitration:</b> Any dispute arising from or in connection with this Agreement will be resolved by binding arbitration under the rules of Calcutta Technologies Private Limited in Hooghly, West Bengal, India.</p>
                  <p className="mt-2"><b>Governing Law:</b> These Terms will be governed by and construed in accordance with the laws of Hooghly Jurisdiction, West Bengal, India, without regard to its conflict of laws principles.</p>
                </SectionCard>

                <SectionCard id="modifications" num="13" icon={ScrollText} title="Modifications to Terms">
                  We may update these Terms at any time, and the revised Terms will become effective
                  as of the date they are posted on the Platform. You will be notified of any
                  material changes. Your continued use of the Platform after any modifications
                  constitutes your acceptance of the revised Terms.
                </SectionCard>

                <SectionCard id="misc" num="14" icon={Scale} title="Miscellaneous">
                  <p><b>Severability:</b> If any provision of these Terms is deemed unenforceable, the remainder of these Terms will continue in full force and effect.</p>
                  <p className="mt-2"><b>Entire Agreement:</b> These Terms, along with the Privacy Policy and any other applicable agreements, constitute the entire agreement between you and us concerning the Platform and supersede all prior agreements or understandings.</p>
                </SectionCard>

                <SectionCard id="contact" num="15" icon={BookOpenText} title="Contact Information">
                  <p>For any questions regarding these Terms and Conditions, please contact us at:</p>
                  <p className="mt-2"><b>Calcutta Technologies Private Limited</b><br />ctechalgo.in</p>
                </SectionCard>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
