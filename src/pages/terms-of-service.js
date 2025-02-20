import { NextSeo } from "next-seo";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function TermsOfServicePage() {
    return(
    <main className="max-w-6xl mx-auto text-slate-300">
        <NextSeo
        title="Terms of Service"
        description="Review our Terms of Service to understand the rules, conditions, and policies for using our website and services. Your access and use are subject to these terms."
        />
        <section class="max-w-6xl mx-auto px-6 py-10">
    <h1 class="text-4xl font-extrabold text-center text-gray-900">Terms of Service</h1>
    <p class="text-center text-gray-700 mt-3 max-w-2xl mx-auto">Last Updated: 2025.02.19</p>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
        <p class="text-gray-700 mt-2">
            By accessing <strong>SoundCloudMP3</strong>, you acknowledge that you have read, understood, and agreed to these Terms of Service. Your continued use of the website constitutes acceptance of these terms.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">2. Description of Service</h2>
        <p class="text-gray-700 mt-2">
            <strong>SoundCloudMP3</strong> is an online tool that allows users to convert and download audio content from SoundCloud into MP3 and other formats. We do not host, store, or distribute copyrighted content. Users are solely responsible for how they use our services.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">3. User Responsibilities</h2>
        <ul class="list-disc list-inside text-gray-700 mt-2">
            <li>Use our services <strong>only for personal and non-commercial purposes</strong>.</li>
            <li>Not use <strong>SoundCloudMP3</strong> to download copyrighted material without permission.</li>
            <li>Comply with all <strong>applicable laws and SoundCloud’s Terms of Service</strong>.</li>
            <li>Not attempt to modify, distribute, sell, or exploit our service for unlawful purposes.</li>
        </ul>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">4. Copyright & Intellectual Property</h2>
        <ul class="list-disc list-inside text-gray-700 mt-2">
            <li>We <strong>do not host or store</strong> copyrighted content.</li>
            <li>Our tool <strong>does not bypass</strong> any security measures put in place by SoundCloud.</li>
            <li>Users must <strong>obtain permission</strong> from copyright holders before downloading, sharing, or distributing audio files.</li>
            <li>If you are a copyright owner and believe your content has been misused, contact us at <strong>support@soundcloudmp3.com</strong>.</li>
        </ul>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">5. Prohibited Activities</h2>
        <ul class="list-disc list-inside text-gray-700 mt-2">
            <li>Violating <strong>SoundCloud’s Terms of Service</strong>.</li>
            <li>Using automated scripts, bots, or other tools to <strong>scrape or extract data</strong>.</li>
            <li>Distributing, reproducing, or exploiting <strong>any content</strong> downloaded via SoundCloudMP3 without authorization.</li>
            <li>Attempting to <strong>reverse-engineer</strong> or modify any part of our service.</li>
        </ul>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">6. Limitation of Liability</h2>
        <ul class="list-disc list-inside text-gray-700 mt-2">
            <li><strong>SoundCloudMP3</strong> is provided on an "AS IS" and "AS AVAILABLE" basis.</li>
            <li>We <strong>do not guarantee</strong> that the service will be error-free or uninterrupted.</li>
            <li>Users assume <strong>full responsibility</strong> for their use of the service.</li>
        </ul>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">7. Third-Party Links & Services</h2>
        <p class="text-gray-700 mt-2">
            Our website may contain third-party advertisements or links. Clicking on these links will redirect you to external sites governed by their own privacy policies and terms of service.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">8. Termination of Service</h2>
        <p class="text-gray-700 mt-2">
            We reserve the right to <strong>suspend or terminate</strong> user access if:
        </p>
        <ul class="list-disc list-inside text-gray-700 mt-2">
            <li>A user violates these <strong>Terms of Service</strong>.</li>
            <li>The service is used in an <strong>illegal or unauthorized</strong> manner.</li>
            <li>The website is undergoing <strong>maintenance or discontinued</strong>.</li>
        </ul>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">9. Changes to These Terms</h2>
        <p class="text-gray-700 mt-2">
            We reserve the right to update these Terms of Service at any time. Continued use of <strong>SoundCloudMP3</strong> after any changes means you accept the updated terms.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">10. Governing Law</h2>
        <p class="text-gray-700 mt-2">
            These Terms of Service are governed by the laws of <strong>Commonwealth of The Bahamas</strong>, without regard to conflict of law principles.
        </p>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900">11. Contact Information</h2>
        <p class="text-gray-700 mt-2">
            If you have any questions regarding these Terms of Service, contact us at:
        </p>
        <p class="text-lg font-bold text-red-500 text-center mt-3">support@soundcloudmp3.com</p>
    </div>

    <div class="mt-10 text-center bg-gradient-to-r from-red-500 to-yellow-400 text-white py-6 px-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold">Your Agreement Matters</h2>
        <p class="mt-2 text-lg">
            By using <strong>SoundCloudMP3</strong>, you agree to abide by these Terms of Service. If you do not agree, please discontinue use of the service.
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