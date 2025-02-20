import Link from "next/link";
import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from "next/router";
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from "next-i18next";
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Header() {

    const { t } = useTranslation('header');

    const languages = [
      {"value": "en", "label": "English"},
      {"value": "es", "label": "Español"},
      {"value": "zh-CN", "label": "简体中文"},
      {"value": "zh-TW", "label": "繁體中文"},
      {"value": "hi", "label": "हिन्दी"},
      {"value": "ar", "label": "العربية"},
      {"value": "fr", "label": "Français"},
      {"value": "pt", "label": "Português"},
      {"value": "bn", "label": "বাংলা"},
      {"value": "ru", "label": "Русский"},
      {"value": "de", "label": "Deutsch"},
      {"value": "ja", "label": "日本語"},
      {"value": "ko", "label": "한국어"},
      {"value": "it", "label": "Italiano"},
      {"value": "tr", "label": "Türkçe"},
      {"value": "ur", "label": "اردو"},
      {"value": "th", "label": "ไทย"},
      {"value": "sw", "label": "Kiswahili"},
      {"value": "fa", "label": "فارسی"},
      {"value": "vi", "label": "Tiếng Việt"}
   ];
    const router = useRouter();
    const [isMenuShown, setMenu] = useState(false);

    useEffect(() => {
        router.events.on('routeChangeStart', (url, { shallow }) => {
            setMenu(false);
        });
    }, []);

    return(
      <header className="fjord py-1" style={{ 'background': 'linear-gradient(to right, #f12711, #f5af19)' }}>
         <nav
            className="mx-auto flex max-w-6xl items-center justify-between p-3 lg:px-4"
            aria-label="Global"
         >
            <div className="flex lg:flex-1">
               <Link href="/" className="lexend text-white text-lg -m-1.5 p-1.5">
               SoundCloudMP3
               </Link>
            </div>
            <div className="flex lg:hidden">
               <button
               type="button"
               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
               onClick={() => setMenu(!isMenuShown)}
               >
               <span className="sr-only">Open main menu</span>
               <svg
                  className="size-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
               </svg>
               </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
               <Link href="/soundcloud-playlist-downloader" className="text-white">
               {t('playlist')}
               </Link>
               <Link href="/soundcloud-albumcover-downloader" className="text-white">
               {t('artwork')}
               </Link>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
               {
                  !(router.asPath.includes('/terms-of-service') || router.asPath.includes('/privacy-policy') || router.asPath.includes('/contact')) ? 
                  <Menu as="div" className="relative inline-block text-left font-sans">
               <div>
                  <Menu.Button className="text-sm inline-flex items-center w-full justify-center gap-x-1 rounded-md text-white py-2 ">
                     {languages.find((language) => language.value === router.locale)
                     ? languages.find((language) => language.value === router.locale)
                           .label
                     : ""}
                     <ChevronDownIcon
                     className="h-5 w-5 text-white mt-0.5"
                     aria-hidden="true"
                     />
                  </Menu.Button>
               </div>

               <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
               >
                  <Menu.Items className="always-show-scrollbar overflow-y-scroll max-h-[542px] py-1 grid grid-cols-2 gap-2 absolute left-0 lg:left-auto lg:right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                     {languages.map((language, index) => {
                     return (
                        <Menu.Item key={index}>
                           <Link
                           key={language.value}
                           locale={language.value}
                           href={router.asPath}
                           className={`px-2 py-1 text-sm text-start items-center inline-flex hover:bg-gray-200 ${
                              index % 2 === 0 ? "rounded-r" : "rounded-l"
                           }`}
                           role="menuitem"
                           >
                           <span className="truncate">{language.label}</span>
                           </Link>
                        </Menu.Item>
                     );
                     })}
                  </Menu.Items>
               </Transition>
               </Menu> : null
               }
            </div>
         </nav>
         <div className="lg:hidden" role="dialog" aria-modal="true">
            <div
               className={`${
               isMenuShown ? "block" : "hidden"
               } fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
            >
               <div className="flex items-center justify-between">
               <Link href="/" className="lexend text-black text-lg -m-1.5 p-1.5">
               SoundCloudMP3
               </Link>
               <button
                  onClick={() => setMenu(!isMenuShown)}
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
               >
                  <span className="sr-only">Close menu</span>
                  <svg
                     className="size-6"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="currentColor"
                     aria-hidden="true"
                     data-slot="icon"
                  >
                     <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M6 18 18 6M6 6l12 12"
                     />
                  </svg>
               </button>
               </div>
               <div className="mt-6 flow-root">
               <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                     <Link
                     href="/soundcloud-playlist-downloader"
                     className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                     >
                     {t('playlist')}
                     </Link>
                     <Link
                     href="/soundcloud-albumcover-downloader"
                     className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                     >
                     {t('artwork')}
                     </Link>
                  </div>
                  <div className="py-6">
                     <Menu as="div" className="relative inline-block text-left font-sans">
                     <div>
                        <Menu.Button className="text-sm inline-flex w-full justify-center gap-x-1 rounded-md text-slate-700 py-2 ">
                           {languages.find(
                           (language) => language.value === router.locale
                           )
                           ? languages.find(
                                 (language) => language.value === router.locale
                              ).label
                           : ""}
                           <ChevronDownIcon
                           className="h-5 w-5 text-slate-700 mt-0.5"
                           aria-hidden="true"
                           />
                        </Menu.Button>
                     </div>

                     <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                     >
                        <Menu.Items className="always-show-scrollbar overflow-y-scroll max-h-[542px] py-1 grid grid-cols-2 gap-2 absolute left-0 lg:left-auto lg:right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                           {languages.map((language, index) => {
                           return (
                              <Menu.Item key={index}>
                                 <Link
                                 key={language.value}
                                 locale={language.value}
                                 href={router.asPath}
                                 className={`px-2 py-1 text-sm text-start items-center inline-flex hover:bg-gray-200 ${
                                    index % 2 === 0 ? "rounded-r" : "rounded-l"
                                 }`}
                                 role="menuitem"
                                 >
                                 <span className="truncate">{language.label}</span>
                                 </Link>
                              </Menu.Item>
                           );
                           })}
                        </Menu.Items>
                     </Transition>
                     </Menu>
                  </div>
               </div>
               </div>
            </div>
         </div>
         </header>
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