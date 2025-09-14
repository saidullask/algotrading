import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import logo from "../../assets/prime_logo_ctechalgo.png";
import { useEffect } from "react";
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

export default function TermCondition() {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    const policyText = `Last Updated: 16th January 2025
            1. Acceptance of Terms
            By accessing or using the Platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these Terms, you must not use the Platform. We may update these Terms from time to time, and you should periodically review them.

            2. Eligibility
            To use the Platform, you must:
            Be at least 18 years old or the legal age in your jurisdiction to form a binding contract;
            Have the necessary knowledge, experience, and resources to engage in algorithmic trading;
            Comply with all applicable laws, including financial and securities regulations in your jurisdiction.
            By using the Platform, you represent and warrant that you meet these eligibility requirements.

            3. Account Registration
            Creating an Account: To use the Platform, you must create an account by providing accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials.
            Account Security: You are responsible for all activities under your account. If you suspect unauthorized access or misuse, you must notify us immediately.
            Termination of Account: We reserve the right to suspend or terminate your account if we detect fraudulent activities, breaches of these Terms, or any unlawful conduct.

            4. Platform Usage
            License Grant: Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use the Platform solely for your personal or business purposes.
            Trading Algorithms: You may subscribe to automated trading algorithms ("Algorithms") for use on the Platform. You are responsible for the performance, legality, and risk associated with the Algorithms you use.
            Compliance: You agree to comply with all applicable local, national, and international regulations concerning algorithmic trading, including any licensing or registration requirements.

            5. Fees and Payments
            Subscription Fees: You may be required to pay fees to access certain services or features on the Platform. These fees will be outlined in the Platform’s pricing section.
            Payment Terms: Payments must be made in accordance with the Platform's payment terms. You are responsible for any taxes or other charges imposed by your jurisdiction.
            Fee Changes: We reserve the right to change fees at any time. If changes occur, we will notify you and give you an opportunity to review and accept the new fees.

            6. Risk Disclosure
            Trading Risk: Algorithmic trading carries significant risk, including the potential for large financial losses due to market volatility, latency, and algorithm errors. You acknowledge that you are solely responsible for the outcome of all trades executed via the Platform.
            No Profit Guarantee: The Platform does not guarantee any profits or returns from using the Platform. Algorithmic trading involves high-risk activity, and past performance is not indicative of future results.
            Market Conditions: The Platform is not responsible for any loss due to market conditions, regulatory changes, or external factors beyond its control.

            7. Intellectual Property
            Platform Ownership: The Platform and all associated intellectual property rights, including software, algorithms, documentation, and trademarks, are owned by Calcutta Technologies Private Limited or its licensors.
            User Content: You retain ownership of any content you upload on the Platform. By uploading or using these, you grant us a non-exclusive, royalty-free, worldwide license to use, modify, and display your content as necessary to provide the services.

            8. Data and Privacy
            Data Collection: We collect data about your account, trading activity, and other interactions with the Platform. This data is used to operate, improve, and personalize the Platform.
            Privacy Policy: Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy for further details.
            Data Security: We take reasonable measures to protect your data, but no system can guarantee 100% security. You are responsible for securing your account credentials and personal information.

            9. Limitations of Liability
            No Liability for Losses: To the maximum extent permitted by law, Calcutta Technologies Private Limited is not liable for any direct, indirect, incidental, consequential, or special damages, including loss of profits, data, or reputation, arising from the use or inability to use the Platform or its services.
            Platform Availability: We do not guarantee that the Platform will be available without interruption, delay, or error. We are not responsible for any system outages, downtime, or issues caused by external factors such as internet connectivity.

            10. Indemnity
            You agree to indemnify, defend, and hold harmless [Calcutta Technologies Private Limited] and its affiliates, employees, directors, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising out of your use of the Platform, your violation of these Terms, or any third-party claims arising from your activities.

            11. Termination
            Termination by You: You may terminate your account at any time by notifying us. Upon termination, you must stop using the Platform and any associated services.
            Termination by Us: We reserve the right to suspend or terminate your access to the Platform at our discretion, including if we believe you have violated these Terms or engaged in fraudulent activity.
            Effect of Termination: Upon termination, all licenses and rights granted to you will immediately cease. You will not have access to any data or content stored on the Platform.

            12. Dispute Resolution
            Arbitration: Any dispute arising from or in connection with this Agreement will be resolved by binding arbitration under the rules of Calcutta Technologies Private Limited in Hooghly, West Bengal, India.
            Governing Law: These Terms will be governed by and construed in accordance with the laws of Hooghly Jurisdiction, West Bengal, India, without regard to its conflict of laws principles.

            13. Modifications to Terms
            We may update these Terms at any time, and the revised Terms will become effective as of the date they are posted on the Platform. You will be notified of any material changes. Your continued use of the Platform after any modifications constitutes your acceptance of the revised Terms.

            14. Miscellaneous
            Severability: If any provision of these Terms is deemed unenforceable, the remainder of these Terms will continue in full force and effect.
            Entire Agreement: These Terms, along with the Privacy Policy and any other applicable agreements, constitute the entire agreement between you and us concerning the Platform and supersede all prior agreements or understandings.

            15. Contact Information
            For any questions regarding these Terms and Conditions, please contact us at:

            Calcutta Technologies Private Limited
            ctechalgo.in`.trim();

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
                        TermCondition
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
