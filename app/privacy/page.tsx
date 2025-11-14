// Bạn có thể đặt tên Page, ví dụ PrivacyPolicyPage
export default function PrivacyPolicyPage() {
    return (
        <main className="arial-nova bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto p-8 md:p-12 bg-white shadow-xl rounded-none text-gray-800">
                <p className="text-sm text-[#BC9750] text-right mb-10">
                    Last updated: 11/14/2025
                </p>


                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center trajan-pro text-gray-900">
                    Privacy Policy for LSJ Tax
                </h1>

                {/* 1. Introduction */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">1. Introduction</h2>
                    <p className="mb-4 leading-relaxed">
                        Welcome to LSJ Tax. We are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, store, and disclose your information when you visit our website [website link] (the &quot;Site&quot;) or use our advisory services.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        Our services are focused on providing international tax advice to high-net-worth individuals and corporations, particularly within the UK and European Union. Our data practices are designed to be compliant with applicable data protection laws, including the UK Data Protection Act 2018 and the EU General Data Protection Regulation (GDPR).
                    </p>
                </section>

                {/* 2. Information We Collect */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">2. Information We Collect</h2>
                    <p className="mb-4 leading-relaxed">
                        We may collect both &quot;Personal Information&quot; and &quot;Non-Personal Information&quot; about you.
                    </p>

                    <h3 className="text-xl font-semibold mb-3 trajan-pro">Personal Information:</h3>
                    <p className="mb-4 leading-relaxed">
                        This is information that can be used to identify you directly. We collect this when you voluntarily provide it, such as by:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                        <li>Filling out our &quot;Contact Us&quot; or &quot;Become a Client&quot; forms (e.g., your name, email address, phone number, country of residence, and details about your financial challenge or goals).</li>
                        <li>Scheduling a consultation (e.g., information required by our scheduling provider, such as Calendly).</li>
                        <li>Subscribing to our newsletter or insights.</li>
                        <li>Engaging us for advisory services (e.g., billing information, address, and information pertinent to your tax situation).</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-3 trajan-pro">Non-Personal Information:</h3>
                    <p className="mb-4 leading-relaxed">
                        This is information that does not directly identify you. We collect this automatically as you navigate the Site:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                        <li><strong>Log Data:</strong> Your IP address, browser type, operating system, pages visited, and timestamps of your visit.</li>
                        <li><strong>Cookies & Analytics:</strong> We use cookies and similar tracking technologies to analyze site usage, improve performance, and understand user behavior.</li>
                    </ul>
                </section>

                {/* 3. How We Use Your Information */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">3. How We Use Your Information</h2>
                    <p className="mb-4 leading-relaxed">
                        We use the information we collect for the following purposes:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                        <li><strong>To Provide Services:</strong> To respond to your inquiries, schedule consultations, and deliver the bespoke tax advisory services you have engaged us for.</li>
                        <li><strong>To Communicate:</strong> To send you administrative information, updates about our services, and marketing communications (such as our newsletter), which you can opt-out of at any time.</li>
                        <li><strong>To Improve Our Site:</strong> To analyze how users interact with our Site, helping us improve its functionality, content, and user experience.</li>
                        <li><strong>For Legal & Compliance:</strong> To comply with our legal and professional obligations as Chartered Accountants, process transactions, and protect our legal rights.</li>
                    </ul>
                </section>

                {/* 4. How We Share Your Information */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">4. How We Share Your Information</h2>
                    <p className="mb-4 leading-relaxed">
                        We do not sell, rent, or trade your Personal Information to any third parties for their marketing purposes. We may share your information in the following limited circumstances:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                        <li><strong>Third-Party Service Providers:</strong> With trusted vendors who perform services on our behalf, such as payment processors, email marketing providers, scheduling tools (e.g., Calendly), and website hosting. These providers are given access only to the information necessary to perform their functions and are contractually obligated to protect your data.</li>
                        <li><strong>Legal Requirements:</strong> If required by law, subpoena, or other legal process, or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your Personal Information may be transferred as part of that transaction.</li>
                    </ul>
                </section>

                {/* 5. Cookies and Tracking */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">5. Cookies and Tracking Technologies</h2>
                    <p className="mb-4 leading-relaxed">
                        We use cookies to operate and personalize the Site. Cookies help us understand user behavior and measure the effectiveness of our content. You can control the use of cookies at the individual browser level. If you reject cookies, you may still use our Site, but your ability to use some features may be limited.
                    </p>
                </section>

                {/* 6. Data Security */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">6. Data Security</h2>
                    <p className="mb-4 leading-relaxed">
                        We implement appropriate technical and organizational security measures designed to protect your Personal Information from unauthorized access, use, alteration, or disclosure. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                    </p>
                </section>

                {/* 7. Your Rights and Choices */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">7. Your Rights and Choices (GDPR & UK Data Protection)</h2>
                    <p className="mb-4 leading-relaxed">
                        If you are a resident of the United Kingdom or the European Economic Area (EEA), you have specific rights regarding your personal data.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        <strong>Data Controller:</strong> LSJ Tax is the data controller for your Personal Information.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        <strong>Lawful Basis:</strong> We process your data on the following bases: Consent (for newsletters), Contract (when you engage our services), and Legitimate Interest (for responding to inquiries and analyzing site usage).
                    </p>

                    <h3 className="text-xl font-semibold mb-3 trajan-pro">Your Rights:</h3>
                    <p className="mb-4 leading-relaxed">You have the right to:</p>
                    <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                        <li>Access the Personal Information we hold about you.</li>
                        <li>Rectify any inaccurate or incomplete information.</li>
                        <li>Erasure (&quot;right to be forgotten&quot;) of your Personal Information.</li>
                        <li>Restrict the processing of your data.</li>
                        <li>Data Portability of your information.</li>
                        <li>Object to our processing of your data.</li>
                        <li>Withdraw Consent at any time where we rely on consent to process your data.</li>
                    </ul>
                    <p className="mb-4 leading-relaxed">
                        To exercise any of these rights, please contact us at
                        <a href="mailto:info@lsjtax.com" className="text-blue-600 hover:underline"> [info@lsjtax.com]</a>.
                        You also have the right to lodge a complaint with a supervisory authority, such as the UK&apos;s Information Commissioner&apos;s Office (ICO).
                    </p>
                </section>

                {/* 8. International Data Transfers */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">8. International Data Transfers</h2>
                    <p className="mb-4 leading-relaxed">
                        Your information may be stored and processed in countries outside of your country of residence, including the United States, where our third-party service providers (e.g., web hosting, email providers) may be located. We ensure such transfers are lawful and that your data is protected by appropriate safeguards, such as Standard Contractual Clauses.
                    </p>
                </section>

                {/* 9. Children's Privacy */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">9. Children&apos;s Privacy</h2>
                    <p className="mb-4 leading-relaxed">
                        Our services are not directed to individuals under the age of 18. We do not knowingly collect Personal Information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
                    </p>
                </section>

                {/* 10. Third-Party Links */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">10. Third-Party Links</h2>
                    <p className="mb-4 leading-relaxed">
                        Our Site may contain links to other websites. This Privacy Policy does not apply to those third-party sites. We are not responsible for their privacy practices, and we encourage you to read their policies.
                    </p>
                </section>

                {/* 11. Changes to This Privacy Policy */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">11. Changes to This Privacy Policy</h2>
                    <p className="mb-4 leading-relaxed">
                        We may update this Privacy Policy from time to time. The &quot;Last Updated&quot; date at the top of this page will indicate when it was last revised. We encourage you to review this page periodically.
                    </p>
                </section>

                {/* 12. Contact Us */}
                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4 trajan-pro">12. Contact Us</h2>
                    <p className="mb-4 leading-relaxed">
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <ul className="list-none mb-4 space-y-2">
                        <li><strong>Email:</strong> </li>
                        <li><strong>Address:</strong> </li>
                        <li><strong>Phone Number:</strong> </li>
                    </ul>
                </section>

            </div>
        </main>
    );
}