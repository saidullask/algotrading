import { useEffect } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import logo from "../../assets/prime_logo_ctechalgo.png";
import Footer from "../../components/Footer";
function Button({ className = "", ...props }) {

  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-2xl border border-emerald-600 bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 " +
        className
      }
      {...props}
    />
  );
}

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });
  const policyText = `
        Effective Date: 16th January 2025

        Welcome to CTechAlgo, an algorithmic trading platform that facilitates automated trading strategies. This Privacy Policy is designed to inform you about how we collect, use, disclose, and protect your personal information when you access or use our platform and services.

        By using our platform, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms outlined in this policy, please do not use our services.

        1. Information We Collect
        We collect both personal and non-personal information to provide and improve our services. The types of information we collect include:
        Personal Identification Information: This may include your name, email address, phone number, physical address, date of birth, and other similar details you provide during account creation, registration, or when you interact with us.
        Financial Information: To enable trading and investment, we may collect details related to your financial accounts, including bank account details, payment information, and transaction history.
        Trading Data: We may collect information about your trading activity, including but not limited to trades executed, strategies used, portfolio information, and performance data.
        Device and Usage Information: We collect data about your device, browser type, IP address, operating system, browsing activity on our platform, and the features or tools you interact with.
        Cookies and Tracking Technologies: We use cookies, web beacons, and other tracking technologies to analyze trends, track user behavior, and enhance your experience. You can control cookies through your browser settings.

        2. How We Use Your Information
        We use the information we collect for various purposes, including:
        Providing Services: To facilitate and process your use of our algorithmic trading platform, including account management, executing trades, and customizing your trading experience.
        Customer Support: To respond to your inquiries, provide technical support, resolve issues, and improve customer service.
        Personalization: To personalize and enhance your experience on the platform, including recommending trading strategies and improving the performance of your automated trading.
        Security and Fraud Prevention: To monitor for suspicious activity and protect against fraud or unauthorized access to your account.
        Compliance with Legal Obligations: To comply with applicable laws, regulations, and legal processes, including regulatory reporting and internal audits.
        Marketing and Communication: With your consent, we may use your information to send you newsletters, promotional offers, or other marketing communications.

        3. Sharing Your Information
        We may share your information in the following situations:
        Service Providers: We may engage third-party companies and individuals to perform services on our behalf, such as hosting, payment processing, and analytics. These third parties will have access to your personal information to the extent necessary to perform these services but are obligated not to disclose or use it for any other purpose.
        Legal and Regulatory Requirements: We may disclose your information to comply with legal obligations, such as responding to subpoenas, regulatory inquiries, or requests from law enforcement.
        Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
        Third-Party Partners: If you opt-in, we may share your information with partners or affiliates for marketing or promotional purposes.

        4. Data Retention
        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. After this period, we will delete or anonymize your information.

        5. Data Security
        We take the security of your personal information seriously and implement industry-standard security measures to protect it from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.

        6. Your Rights and Choices
        Depending on your location and applicable laws, you may have certain rights regarding your personal information. These rights may include:
        Access: You can request access to the personal information we hold about you.
        Correction: You can request that we correct or update any inaccurate information.
        Deletion: You may request the deletion of your personal data under certain conditions.
        Opt-out of Marketing: You can opt out of receiving marketing communications by following the unsubscribe instructions in the communication or contacting us directly.
        To exercise your rights, please contact us at ctechalgo.in.

        7. International Transfers
        If you are located outside the country where our platform operates, please be aware that your information may be transferred to and processed in countries with different data protection laws. By using our services, you consent to the transfer and processing of your data in accordance with this Privacy Policy.

        8. Children’s Privacy
        Our platform is not intended for individuals under the age of 18, and we do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected information from a child under 18, we will take steps to delete that information.

        9. Changes to This Privacy Policy
        We may update this Privacy Policy from time to time. When we make significant changes, we will notify you by email or through our platform. We encourage you to review this policy periodically for the latest information.

        10. Contact Us
        If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
        Calcutta Technologies Private Limited
        ctechalgo.in

        This Privacy Policy is intended to provide transparency into how we collect, use, and protect your data while using our algorithmic trading platform. Please ensure that you review the terms before using our services.
  `.trim();
  const downloadPdf = async () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const marginX = 48;
    const marginTop = 64;
    const lineGap = 16;
    const maxWidth = pageWidth - marginX * 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("C-Tech Algo — Privacy Policy", marginX, marginTop);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(90);
    doc.text("Effective Date: 16th January 2025", marginX, marginTop + 20);
    doc.setTextColor(20);

    doc.setFontSize(11);

    const paragraphs = policyText.split("\n\n");
    let cursorY = marginTop + 50;

    const addFooter = () => {
      const pageNumber = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(
        `© ${new Date().getFullYear()} C-Tech Algo`,
        marginX,
        pageHeight - 24
      );
      doc.text(String(pageNumber), pageWidth - marginX, pageHeight - 24, {
        align: "right",
      });
      doc.setTextColor(20);
    };

    paragraphs.forEach((p, idx) => {
      const isHeading = /^[0-9]+\.\s/.test(p);

      if (isHeading) {
        const [title, ...rest] = p.split("\n");
        const titleLines = doc.splitTextToSize(title, maxWidth);
        if (cursorY + titleLines.length * 14 > pageHeight - 48) {
          addFooter();
          doc.addPage();
          cursorY = marginTop;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(titleLines, marginX, cursorY);
        cursorY += titleLines.length * 14 + 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const body = rest.join("\n");
        if (body.trim()) {
          bodyLines.forEach((line) => {
            if (cursorY > pageHeight - 60) {
              addFooter();
              doc.addPage();
              cursorY = marginTop;
            }
            doc.text(line, marginX, cursorY);
            cursorY += 14;
          });
          cursorY += lineGap / 2;
        } else {
          cursorY += lineGap / 2;
        }
      } else {
        const lines = doc.splitTextToSize(p, maxWidth);
        lines.forEach((line) => {
          if (cursorY > pageHeight - 60) {
            addFooter();
            doc.addPage();
            cursorY = marginTop;
          }
          doc.text(line, marginX, cursorY);
          cursorY += 14;
        });
        cursorY += lineGap;
      }

      if (idx === paragraphs.length - 1) {
        addFooter();
      }
    });

    doc.save("CTechAlgo-Privacy-Policy.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="C-Tech Algo"
              className="h-14 md:h-16 w-auto object-contain shrink-0 select-none
                                filter brightness-[1.05] contrast-[1.05] saturate-[1.05]
                                [filter:drop-shadow(0_1px_8px_rgba(56,189,248,0.22))]"
            />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919876543210?text=Hello%20C-Tech%20Algo%20Team"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600">
                Connect With Us
              </Button>
            </a>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-slate-400">Effective Date: 16th January 2025</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={downloadPdf}>Download</Button>
            <button
              onClick={() => window.print()}
              className="rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 hover:text-white"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4">
        <article className="prose prose-invert prose-slate max-w-none rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:p-10">
          {policyText.split("\n\n").map((block, i) => {
            const isHeading = /^[0-9]+\.\s/.test(block);
            if (block.startsWith("Welcome to CTechAlgo")) {
              return (
                <p key={i} className="text-slate-300 leading-relaxed">
                  {block}
                </p>
              );
            }
            if (block.startsWith("By using our platform")) {
              return (
                <p key={i} className="text-slate-300 leading-relaxed">
                  {block}
                </p>
              );
            }
            if (isHeading) {
              const [title, ...rest] = block.split("\n");
              return (
                <section key={i} className="mt-6">
                  <h2 className="mb-2 text-xl font-semibold text-white">{title}</h2>
                  <p className="text-slate-300 leading-relaxed">
                    {rest.join("\n") || ""}
                  </p>
                </section>
              );
            }
            return (
              <p key={i} className="text-slate-300 leading-relaxed">
                {block}
              </p>
            );
          })}
        </article>

       <Footer/>
      </main>
    </div>
  );
}
