import { NextSeo } from "next-seo";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function PrivacyPolicyPage() {
    return(
    <main className="max-w-6xl mx-auto text-slate-300">
        <NextSeo
            title="Privacy Policy"
            description="Read our Privacy Policy to learn how we collect, use, and protect your personal information. Your privacy and data security are our top priorities."
            />
        <section class="max-w-6xl mx-auto px-6 py-10">
    <h1 class="text-4xl font-extrabold text-center text-gray-900">Privacy Policy</h1>
    <p class="text-center text-gray-700 mt-3 max-w-2xl mx-auto">Last Updated: 2025.02.19</p>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">1. Introduction</h2>
        <p class="text-gray-700 mt-2">
            Welcome to <strong>SoundCloudMP3</strong>. Your privacy is important to us, and we are committed to protecting your personal information while you use our website and services.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
        <p class="text-gray-700 mt-2">
            We do not require users to create an account or provide personal information to use our services. However, we may collect non-personal data to enhance website functionality and improve user experience.
        </p>
        <h3 class="font-semibold text-gray-900 mt-4">Data We May Collect:</h3>
        <ul class="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Cookies and Usage Data</strong> – We use cookies and analytics tools to understand how visitors interact with our website.</li>
            <li><strong>Log Data</strong> – Our servers may automatically record non-identifiable information, such as IP addresses, browser types, and timestamps.</li>
            <li><strong>Third-Party Services</strong> – We may use services like Google Analytics to track user activity and improve website performance.</li>
        </ul>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">3. How We Use Cookies</h2>
        <p class="text-gray-700 mt-2">
            Cookies are small files stored on your browser that help improve your browsing experience. We use session and persistent cookies to:
        </p>
        <ul class="list-disc list-inside text-gray-700 mt-2">
            <li>Enhance website performance.</li>
            <li>Remember user preferences.</li>
            <li>Analyze website traffic using third-party analytics tools.</li>
        </ul>
        <p class="text-gray-700 mt-2">
            You can adjust your browser settings to block or delete cookies at any time. However, disabling cookies may affect website functionality.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">4. Third-Party Services & External Links</h2>
        <p class="text-gray-700 mt-2">
            Our website may contain links to third-party websites or advertisements. These external sites have their own privacy policies, and we are not responsible for their data collection practices.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">5. Data Security</h2>
        <p class="text-gray-700 mt-2">
            We take reasonable precautions to protect any data collected on our website. However, no online platform can guarantee 100% security due to the nature of the internet.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">6. Children’s Privacy</h2>
        <p class="text-gray-700 mt-2">
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal data from minors. If you believe a child has provided personal information, please contact us for removal.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">7. Legal Disclaimer</h2>
        <p class="text-gray-700 mt-2">
            <strong>SoundCloudMP3</strong> is not affiliated with SoundCloud. We do not host copyrighted content. Users are responsible for compliance with SoundCloud’s terms and copyright laws when using our downloader.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">8. Changes to This Privacy Policy</h2>
        <p class="text-gray-700 mt-2">
            We reserve the right to update this Privacy Policy at any time. Changes will be posted here, and we encourage users to review this page periodically.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">9. Contact Us</h2>
        <p class="text-gray-700 mt-2">
            If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p class="text-lg font-bold text-red-500 text-center mt-3">support@soundcloudmp3.com</p>
    </div>

    <div class="mt-10 text-center bg-gradient-to-r from-red-500 to-yellow-400 text-white py-6 px-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold">Your Privacy Matters to Us</h2>
        <p class="mt-2 text-lg">
            We are committed to keeping <strong>SoundCloudMP3</strong> a safe and secure platform. By using our website, you agree to the terms outlined in this Privacy Policy.
        </p>
    </div>
</section>

    </main>
    );
}

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
           'header'
        ])),
        // Will be passed to the page component as props
      },
    }
  }