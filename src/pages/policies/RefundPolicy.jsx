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

export default function RefundPolicy() {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    const policyText = `
            Effective Date: 16th January 2025

            At CTechAlgo, we are committed to provide high-quality services and ensuring that our users have a positive experience. Below is our Refund Policy that outlines the terms and conditions for obtaining a refund for our algorithmic trading platform services:

            1. Eligibility for Refunds
            Subscription Cancellations: We do not offer refunds for subscriptions once the billing cycle has started. If you cancel your subscription before the next billing date, you will continue to have access to the platform until the end of the current billing period, but no refunds will be provided for unused services during the current cycle.
            Service Availability Issues: If there are significant technical issues or disruptions with our platform that prevent you from using the service for more than 10 consecutive days, you may be eligible for a refund for the affected period. In such cases, please contact our support team to review the issue.
            Billing Errors: If you believe that you were billed incorrectly or charged for services you did not receive, please contact our support team within 14 days of the charge. We will investigate the matter and, if confirmed, we will issue a refund for the affected charge.
            Trial Period: If you subscribed during a free trial period and you cancel before the end of the trial, you will not be charged, and no refund will be necessary. If you cancel after the trial period ends and are charged, the refund conditions outlined below will apply.

            2. Refund Process
            How to Request a Refund: To request a refund, please contact our support team at mail@bbsc.co.in with the following information:
            Your account details (email address, username, etc.)
            Date of the charge you are disputing
            A description of the reason for the refund request
            Refund Response Time: Refund requests will be reviewed within 7 business days. If your request is approved, a refund will be processed and credited to the original payment method. Please allow up to 10 business days for the refund to appear on your account, depending on your bank or payment provider.

            3. Non-Refundable Charges
            Transaction Fees: Any fees associated with financial transactions, such as payments for trades, will not be refundable.
            Third-Party Services: If you purchased third-party services or integrations (e.g., data feeds, external API services) through the platform, these services are non-refundable unless otherwise specified by the third-party provider.

            4. Refund Limitations
            Time Frame: Refund requests must be made within 30 days of the charge. After 30 days, refunds will not be issued unless required by law.
            Refund Limitations: We reserve the right to deny refunds if we determine that the request is fraudulent, unreasonable, or in violation of our Terms of Service, Privacy policy.

            5. Excessive Refund Requests
            We monitor refund requests and may suspend or terminate your account if we notice an unusual pattern of refund requests. This policy is intended to prevent misuse of our services and ensure fairness to all customers.

            6. Account Suspension and Termination
            If your account is suspended or terminated due to a breach of our Terms of Service, no refunds will be issued for any remaining service time.

            7. Changes to the Refund Policy
            CTechAlgo reserves the right to modify this refund policy at any time. Any changes will be communicated to users via email or a notice on the platform. Users are encouraged to review the refund policy regularly to stay informed of any updates.

            8. Contact Us
            If you have any questions or concerns regarding your refund request, please contact our support team at mail@bbsc.co.in. We are here to help!
            Thank you for using CTechAlgo. We appreciate your trust in our platform and strive to continuously improve your trading experience.

            This refund policy is designed to ensure that users understand their rights and the circumstances under which refunds will be granted. It is clear and balanced, taking into consideration both the service provider's and the user's needs.`.trim();

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
                    const bodyLines = doc.splitTextToSize(body, maxWidth);
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

        doc.save("CTechAlgo-Refund-Policy.pdf");
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
                        Refund Policy
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
