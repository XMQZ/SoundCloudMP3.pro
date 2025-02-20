import Link from "next/link";
import Downloader from "@/components/downloader";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { NextSeo } from "next-seo";
import AdsenseAd from '@/components/adsenseAd';
import Lottie from "react-lottie-player";
import lottieJson from "../../public/loxan.json";

export default function SoundCloudPlaylistDownloaderPage() {

  const { t } = useTranslation('playlist');
  const router = useRouter();

  return (
    <main>
      <NextSeo
      title={t('web-title')}
      description={t('web-description')}
      canonical={`https://soundcloudmp3.pro/${router.locale !== 'en' ? router.locale : ''}/soundcloud-playlist-downloader`}
      languageAlternates={[
        {
            "hrefLang": "x-default",
            "href": "https://soundcloudmp3.pro/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "en",
            "href": "https://soundcloudmp3.pro/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "es",
            "href": "https://soundcloudmp3.pro/es/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "zh-CN",
            "href": "https://soundcloudmp3.pro/zh-cn/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "zh-TW",
            "href": "https://soundcloudmp3.pro/zh-tw/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "hi",
            "href": "https://soundcloudmp3.pro/hi/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "ar",
            "href": "https://soundcloudmp3.pro/ar/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "fr",
            "href": "https://soundcloudmp3.pro/fr/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "pt",
            "href": "https://soundcloudmp3.pro/pt/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "bn",
            "href": "https://soundcloudmp3.pro/bn/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "ru",
            "href": "https://soundcloudmp3.pro/ru/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "de",
            "href": "https://soundcloudmp3.pro/de/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "ja",
            "href": "https://soundcloudmp3.pro/ja/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "ko",
            "href": "https://soundcloudmp3.pro/ko/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "it",
            "href": "https://soundcloudmp3.pro/it/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "tr",
            "href": "https://soundcloudmp3.pro/tr/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "ur",
            "href": "https://soundcloudmp3.pro/ur/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "th",
            "href": "https://soundcloudmp3.pro/th/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "sw",
            "href": "https://soundcloudmp3.pro/sw/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "fa",
            "href": "https://soundcloudmp3.pro/fa/soundcloud-playlist-downloader"
        },
        {
            "hrefLang": "vi",
            "href": "https://soundcloudmp3.pro/vi/soundcloud-playlist-downloader"
        }
      ]}
      />
      <section style={{ 'background': 'linear-gradient(to right, #f12711, #f5af19)', 'border-bottom-right-radius': '3rem', 'border-bottom-left-radius': '3rem' }}>
        <section className="max-w-4xl mx-auto px-3 py-8">
          <Downloader title={t('downloader-title')} description={t('downloader-description')}/>
        </section>
      </section>

      <section className="fjord max-w-6xl mx-auto px-3 py-3 mt-16">
            <h2 className="text-4xl text-center">{t('featuresTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-8">
                {t('features', { returnObjects: true }).map((feature, index) => (
                    <div key={index} className="flex flex-col items-center font-sans">
                        <img src={`/f${index + 1}.svg`} className="w-[312px] h-[160px]" alt={feature.title} />
                        <h3 className="text-slate-900 font-sans font-semibold text-2xl mt-4">{feature.title}</h3>
                        <p className="text-center mt-2 text-gray-700 font-light">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="fjord max-w-6xl mx-auto px-3 py-3 mt-16">
            <h2 className="text-4xl text-center">{t('howToConvertTitle')}</h2>
            {t('howToConvertSteps', { returnObjects: true }).map((step, index, arr) => (
                <div 
                    key={index} 
                    className={`flex md:flex-col mt-12 pt-3 pb-12 ${index !== arr.length - 1 ? 'border-dashed border-b-2 border-amber-400' : ''}`}
                >
                    <div className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col justify-center items-center px-10`}>
                        <div className="flex justify-center">
                            <img src={`/s${index + 1}.svg`} className="w-[228px] h-[232px]" alt={step.title} />
                        </div>
                        <div className={`font-sans mt-10 ${index % 2 === 0 ? 'md:ml-10' : 'md:mr-10'}`}>
                            <h3 className="text-3xl font-bold">{step.title}</h3>
                            <p className="mt-4 max-w-xl font-light text-lg md:text-2xl text-gray-700">
                                {step.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </section>

        <section className="max-w-6xl mx-auto px-3 py-3 mt-16 lg:rounded-xl bg-gradient-to-r from-red-500 to-yellow-400" >
            <div className="flex items-center justify-center p-10">
                <div className="max-w-2xl">
                    <h2 className="text-2xl text-white">{t('downloadSectionTitle')}</h2>
                    <p className="text-slate-100 mt-2">{t('downloadSectionText')}</p>
                    <p className="text-slate-100 mt-4">{t('downloadSectionExtra')}</p>
                </div>
                <Lottie className="hidden lg:block w-72 ml-6" loop animationData={lottieJson} play />
            </div>
        </section>

      <section className='flex flex-col px-3 max-w-6xl lg:mx-auto bg-white text-gray-700 mt-12' itemScope itemType="https://schema.org/FAQPage">
          <h3 className='fjord text-4xl text-gray-900 text-center my-6'>
          {t('faqTitle')}
          </h3>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.0.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.0.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.1.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.1.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.2.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.2.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.3.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.3.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.4.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.4.a')}
                </div>
            </div>
          </div>
      </section>
    </main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'playlist', 'header', 'downloader'
      ])),
      // Will be passed to the page component as props
    },
  }
}