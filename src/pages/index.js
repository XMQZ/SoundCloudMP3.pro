import Link from "next/link";
import Downloader from "@/components/downloader";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { NextSeo } from "next-seo";
import AdsenseAd from '@/components/adsenseAd';
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
import lottieJson from "../../public/loxan.json";

export default function Home() {

  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <main>
      <NextSeo
      title={t('web-title')}
      description={t('web-description')}
      canonical={`https://soundcloudmp3.pro${router.locale !== 'en' ? `/${router.locale}` : ''}`}
      languageAlternates={[
          {
              "hrefLang": "x-default",
              "href": "https://soundcloudmp3.pro"
          },
          {
              "hrefLang": "en",
              "href": "https://soundcloudmp3.pro"
          },
          {
              "hrefLang": "zh-CN",
              "href": "https://soundcloudmp3.pro/zh-CN"
          },
          {
              "hrefLang": "es",
              "href": "https://soundcloudmp3.pro/es"
          },
          {
              "hrefLang": "ar",
              "href": "https://soundcloudmp3.pro/ar"
          },
          {
              "hrefLang": "hi",
              "href": "https://soundcloudmp3.pro/hi"
          },
          {
              "hrefLang": "fr",
              "href": "https://soundcloudmp3.pro/fr"
          },
          {
              "hrefLang": "ru",
              "href": "https://soundcloudmp3.pro/ru"
          },
          {
              "hrefLang": "pt",
              "href": "https://soundcloudmp3.pro/pt"
          },
          {
              "hrefLang": "de",
              "href": "https://soundcloudmp3.pro/de"
          },
          {
              "hrefLang": "ja",
              "href": "https://soundcloudmp3.pro/ja"
          },
          {
              "hrefLang": "ko",
              "href": "https://soundcloudmp3.pro/ko"
          },
          {
              "hrefLang": "vi",
              "href": "https://soundcloudmp3.pro/vi"
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
          <h2 className="text-4xl text-center">{t('howToDownloadTitle')}</h2>
          {t('howToDownloadSteps', { returnObjects: true }).map((step, index, arr) => (
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
                              <Trans i18nKey={`howToDownloadSteps.${index}.description`} components={ [<Link href="https://soundcloud.com" className="text-amber-400" key={0} />, <Link href="https://play.google.com/store/apps/details?id=com.soundcloud.android" className="text-amber-400" key={1} />, <Link href="/" className="text-amber-400" key={2} />] } />
                          </p>
                      </div>
                  </div>
              </div>
          ))}
      </section>

      <section className="max-w-6xl mx-auto px-3 py-3 mt-16 lg:rounded-xl bg-gradient-to-r from-red-500 to-yellow-400">
          <div className="flex items-center justify-center p-10">
              <div className="max-w-2xl">
                  <h2 className="text-2xl text-white">{t('downloadSectionTitle')}</h2>
                  <p className="text-slate-100 mt-2">
                      <Trans i18nKey="downloadSectionText" components={ [<Link href="/soundcloud-playlist-downloader" key={0}/>] } />
                  </p>
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
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.5.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.5.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.6.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.6.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.7.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.7.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.8.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.8.a')}
                </div>
            </div>
          </div>
          <div className='my-2' itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
            <div>
                <h3 itemProp="name" className='text-2xl'>
                  {t('faq.9.q')}
                </h3>
            </div>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="font-light">
                  {t('faq.9.a')}
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
        'common', 'header', 'downloader'
      ])),
      // Will be passed to the page component as props
    },
  }
}