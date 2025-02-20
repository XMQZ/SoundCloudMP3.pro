import "@/styles/globals.css";
import Layout from "@/components/layout";
import { appWithTranslation, useTranslation } from 'next-i18next'
import Head from "next/head";
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import Script from 'next/script';

function App({ Component, pageProps }) {

  const router = useRouter();
  const { i18n } = useTranslation();

  useEffect(() => {
    const direction = ['ar', 'he', 'fa'].includes(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
  }, [i18n.language]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-TEST', {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
    <DefaultSeo
      additionalMetaTags={[{
        name: 'application-name',
        content: 'SoundcloudAud'
      }]}
      openGraph={{
        images: [
          {
            url: 'https://soundcloudmp3.pro/ogpreview.png?love=me'
          }
        ]
      }}
      additionalLinkTags={[
        {
          rel: 'manifest',
          href: '/manifest.json'
        },
        {
          rel: 'icon',
          href: '/xm/favicon.ico?v=x',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/apple-touch-icon.png',
          sizes: '180x180'
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/favicon-32x32.png',
          sizes: '32x32'
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/favicon-16x16.png',
          sizes: '16x16'
        }
      ]} />
      <Head>
      <script
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-TEST');
        `
      }}
      />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-TEST`}
      />
    <Script
        src="https://www.google.com/recaptcha/api.js?render=6LcY4WApAAAAAIr_KoT9zLdiiKU0DSzLmUsj68HY"
      />
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2234703663073578"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Fjord+One&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@700&display=swap&text=SoundCloudMP3" rel="stylesheet"/>
    <Layout>
      <Component classN {...pageProps} />
    </Layout>
    </>
  )
}

export default appWithTranslation(App);