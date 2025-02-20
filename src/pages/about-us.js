import Link from "next/link";
import Downloader from "@/components/downloader";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { NextSeo } from "next-seo";
import AdsenseAd from '@/components/adsenseAd';

export default function AboutUSPage() {

    const { t } = useTranslation('about');
    const router = useRouter();

    return(
        <main>
            <NextSeo
            title={t('web-title')}
            description={t('web-description')}
            canonical={`https://soundcloudmp3.pro/${router.locale !== 'en' ? router.locale : ''}/about-us`}
            languageAlternates={[
                {
                    "hrefLang": "x-default",
                    "href": "https://soundcloudmp3.pro/about-us"
                },
                {
                    "hrefLang": "en",
                    "href": "https://soundcloudmp3.pro/about-us"
                },
                {
                    "hrefLang": "es",
                    "href": "https://soundcloudmp3.pro/es/about-us"
                },
                {
                    "hrefLang": "zh-CN",
                    "href": "https://soundcloudmp3.pro/zh-cn/about-us"
                },
                {
                    "hrefLang": "zh-TW",
                    "href": "https://soundcloudmp3.pro/zh-tw/about-us"
                },
                {
                    "hrefLang": "hi",
                    "href": "https://soundcloudmp3.pro/hi/about-us"
                },
                {
                    "hrefLang": "ar",
                    "href": "https://soundcloudmp3.pro/ar/about-us"
                },
                {
                    "hrefLang": "fr",
                    "href": "https://soundcloudmp3.pro/fr/about-us"
                },
                {
                    "hrefLang": "pt",
                    "href": "https://soundcloudmp3.pro/pt/about-us"
                },
                {
                    "hrefLang": "bn",
                    "href": "https://soundcloudmp3.pro/bn/about-us"
                },
                {
                    "hrefLang": "ru",
                    "href": "https://soundcloudmp3.pro/ru/about-us"
                },
                {
                    "hrefLang": "de",
                    "href": "https://soundcloudmp3.pro/de/about-us"
                },
                {
                    "hrefLang": "ja",
                    "href": "https://soundcloudmp3.pro/ja/about-us"
                },
                {
                    "hrefLang": "ko",
                    "href": "https://soundcloudmp3.pro/ko/about-us"
                },
                {
                    "hrefLang": "it",
                    "href": "https://soundcloudmp3.pro/it/about-us"
                },
                {
                    "hrefLang": "tr",
                    "href": "https://soundcloudmp3.pro/tr/about-us"
                },
                {
                    "hrefLang": "ur",
                    "href": "https://soundcloudmp3.pro/ur/about-us"
                },
                {
                    "hrefLang": "th",
                    "href": "https://soundcloudmp3.pro/th/about-us"
                },
                {
                    "hrefLang": "sw",
                    "href": "https://soundcloudmp3.pro/sw/about-us"
                },
                {
                    "hrefLang": "fa",
                    "href": "https://soundcloudmp3.pro/fa/about-us"
                },
                {
                    "hrefLang": "vi",
                    "href": "https://soundcloudmp3.pro/vi/about-us"
                }
              ]}
            />
            <section className="max-w-6xl mx-auto px-3 py-3 my-10">
    <h1 className="text-4xl font-extrabold text-center text-gray-900">{t('aboutTitle', { ns: 'about' })}</h1>
    <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">{t('aboutSubtitle', { ns: 'about' })}</p>

    <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('whoWeAreTitle', { ns: 'about' })}</h2>
        <p className="text-gray-700 mt-2">
            <Trans i18nKey="whoWeAreText" ns="about" components={{ strong: <strong /> }} />
        </p>
    </div>

    <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('missionTitle', { ns: 'about' })}</h2>
        <p className="text-gray-700 mt-2">
            <Trans i18nKey="missionText" ns="about" components={{ strong: <strong /> }} />
        </p>
    </div>

    <img src="/abt.webp" className="max-w-3xl mx-auto rounded-xl my-10" alt="About SoundCloudMP3" />

    <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('whyChooseTitle', { ns: 'about' })}</h2>
        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
            {t('whyChooseFeatures', { ns: 'about', returnObjects: true }).map((feature, index) => (
                <li key={index}>
                    <Trans i18nKey={`whyChooseFeatures.${index}`} ns="about" components={{ strong: <strong /> }} />
                </li>
            ))}
        </ul>
    </div>

    <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('howItWorksTitle', { ns: 'about' })}</h2>
        <ol className="mt-3 space-y-2 list-decimal list-inside text-gray-700">
            {t('howItWorksSteps', { ns: 'about', returnObjects: true }).map((step, index) => (
                <li key={index}>
                    <Trans i18nKey={`howItWorksSteps.${index}`} ns="about" components={{ strong: <strong /> }} />
                </li>
            ))}
        </ol>
    </div>

    <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('commitmentTitle', { ns: 'about' })}</h2>
        <p className="text-gray-700 mt-2">
            <Trans i18nKey="commitmentText" ns="about" components={{ strong: <strong /> }} />
        </p>
    </div>

    <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('joinUsersTitle', { ns: 'about' })}</h2>
        <p className="text-gray-700 mt-2">
            <Trans i18nKey="joinUsersText" ns="about" components={{ strong: <strong /> }} />
        </p>
    </div>

    <div className="mt-10 text-center bg-gradient-to-r from-red-500 to-yellow-400 text-white py-6 px-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold">{t('ctaTitle', { ns: 'about' })}</h2>
        <p className="mt-2 text-lg">
            <Trans i18nKey="ctaText" ns="about" components={{ strong: <strong /> }} />
        </p>
        <Link href="/" className="mt-4 inline-block bg-white text-amber-500 font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-gray-100">
            {t('ctaButton', { ns: 'about' })}
        </Link>
    </div>
</section>

        </main>
    );

}

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'about', 'header', 'downloader'
        ])),
        // Will be passed to the page component as props
      },
    }
  }