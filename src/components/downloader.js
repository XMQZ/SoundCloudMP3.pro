import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "next-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowPathIcon , ArrowDownTrayIcon, LinkIcon } from '@heroicons/react/24/outline';
import { ClipboardIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import AdsenseAd from '@/components/adsenseAd';
import JSZip from "jszip";

export default function Downloader(props) {

    const { t } = useTranslation('downloader');

    const router = useRouter();

    const [url, setUrl] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const [DlData, setDlData] = useState(null);
    const [downloadCount, setDownloadCount] = useState(0);
    const [isAdPopupVisible, setAdPopupVisible] = useState(false);
    const [playlistDownloadPercentage, setPlaylistDownloadPercentage] = useState(0);
    const [isDownloadingAudio, setIsDownloadingAudio] = useState(false);

    useEffect(()=>{
        const q = router.query.q;
        if(q && isValidSoundcloudLink(q)) {
            handleDownload(q);
        }
    }, [router.query]);

    async function waitForGrecaptcha() {
        return new Promise((resolve) => {
          const checkGrecaptcha = () => {
            if (typeof grecaptcha !== 'undefined') {
              resolve(grecaptcha); // Resolve the promise with grecaptcha
            } else {
              setTimeout(checkGrecaptcha, 100); // Check again in 100 milliseconds
            }
          };
      
          checkGrecaptcha(); // Start checking for grecaptcha
        });
    }

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setUrl(clipboardText);
            document.querySelector('#urlinput').value = clipboardText
        } catch (e) {
            console.log(e);
        }
    };

    const isValidSoundcloudLink = (url) => {
        return true
    };
    

    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    const downloadReset = () => {
        setUrl('');
        setDlData(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.gtag('event', 'download_reset');
    };

    const toastError = (message) => {
        toast.error(message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored'
        });
    }

    const handleDownload = async (target) => {

    	if (target === '' || isDownloading) return;

    	if (!isValidSoundcloudLink(target)) {
    		toastError('URL is not valid');
    		clearInput();
            window.gtag('event', 'link_submit', {
                'url': target,
                'valid_url': false
            });
    		return;
    	}

        setIsDownloading(true);

        window.gtag('event', 'link_submit', {
    		'url': target,
            'valid_url': true
    	});
        
    	await waitForGrecaptcha();
    	const token = await executeRecaptcha();

        const dlStartTime = Date.now()

    	try {
            const data = await fetchFacebookData(target, token);
            const elapsed = (Date.now() - dlStartTime) / 1000;

            if (data.error) {
                switch(data.error) {
                    case "VideoNotFound":
                        handleDownloadFail(target, elapsed, 'Media Not Found in the Tweet.')
                        break;
                    case "InvalidRecaptcha":
                        handleDownloadFail(target, elapsed, 'Your request was blocked as bot traffic. If you are using a VPN, please disable it and try again.')
                        break;
                    case "InvalidTarget":
                        handleDownloadFail(target, elapsed, 'Link is not valid.')
                        break;
                }
                return;
            } else {
                setDlData(data);
                setIsDownloading(false);
                window.gtag('event', 'download_success', {
                    'target': target,
                    'elapsed': elapsed,
                    'is_first_download': ((downloadCount === 1) ? false : true)
                });
                setDownloadCount(downloadCount + 1);
            }

    	} catch (e) {
    		handleDownloadError(e);
    	}
    }

    const executeRecaptcha = () => {
    	return new Promise((resolve, reject) => {
    		grecaptcha.ready(() => {
    			grecaptcha.execute('6LcY4WApAAAAAIr_KoT9zLdiiKU0DSzLmUsj68HY', {
    					action: 'submit'
    				})
    				.then(resolve)
    				.catch(reject);
    		});
    	})
    };

    const clearInput = () => {
    	document.querySelector('#urlinput').value = null;
    };

    const fetchFacebookData = async (url, token) => {
    	const response = await fetch('https://api.snapfirecdn.com/soundcloud', {
    		method: 'POST',
    		headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
    		},
    		body: JSON.stringify({
    			target: url.trim(),
    			gsc: token
    		}),
    	});

    	if (!response.ok) {
    		throw new Error('Network response was not OK');
    	}

    	const data = await response.json();

        return data;
    };

    const handleDownloadFail = (target, elapsed, reason) => {
        window.gtag('event', 'download_fail', {
            'target': target,
            'elapsed': elapsed,
            'description': reason
        });
    	toastError(reason);
    	setIsDownloading(false);
    };

    const handleDownloadError = (error) => {
    	window.gtag('event', 'exception', {
    		'description': error + '#URL: ' + url,
    		'fatal': false,
    	});
    	toastError(error);
    	setIsDownloading(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onKeyUp = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleDownload(url);
        }
    }

    const downloadFullPlaylist = async () => {
        const zip = new JSZip();
        const zipFileName = `SoundCloud.app_${DlData.metadata.title}`
        const folder = zip.folder(zipFileName);

        setPlaylistDownloadPercentage(10);

        const playlist = DlData.playlist;

        for (let i = 0; i < playlist.length; i++) {
            const track = playlist[i];
            let blob;
            if (!!track.progressive_url) {
                blob = await DownloadFromProgressiveUrl(track.progressive_url);
            } else if (!!track.hls_url) {
                blob = await DownloadFromHlsUrl(track.hls_url);
            } else {
                continue;
            }
            folder.file(`${track.title}.mp3`, blob);

            const percentage = Math.round(((i + 1) / playlist.length) * 100);
            if (percentage < 10) {
                setPlaylistDownloadPercentage(10);
            } else {
                setPlaylistDownloadPercentage(percentage);
            }
        }

        setPlaylistDownloadPercentage(0);

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = window.URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${zipFileName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setAdPopupVisible(true)
    }

    const DownloadFromHlsUrl = async (media) => {
        try {
            const response = await fetch(`https://api.snapfirecdn.com/soundcloud-get-dl?target=${media}`);
            const data = await response.json();
            const downloadUrl = data.url;
            const playlistResponse = await fetch(downloadUrl);
            const playlistText = await playlistResponse.text();
    
            const lines = playlistText.trim().split('\n');
            const segmentUrls = lines.filter(line => !line.startsWith('#')).map(line => line.trim());
    
            const segmentResponses = await Promise.all(segmentUrls.map(segmentUrl => fetch(new URL(segmentUrl, downloadUrl))));
    
            const allBuffers = await Promise.all(segmentResponses.map(response => response.arrayBuffer()));
            const concatenatedBuffer = new Uint8Array(allBuffers.reduce((acc, buffer) => [...acc, ...new Uint8Array(buffer)], []));
    
            return new Blob([concatenatedBuffer], { type: 'audio/mp3' });
        } catch (error) {
            console.error('Error fetching and concatenating audio:', error);
            throw error; // Rethrow the error for handling in DownloadAudio if needed
        }
    };
      
      const DownloadFromProgressiveUrl = async (media) => {
        try {
            const response = await fetch(`https://api.snapfirecdn.com/soundcloud-get-dl?target=${media}`);
            const data = await response.json();
            const downloadUrl = data.url;
    
            const mediaResponse = await fetch(downloadUrl);
            const blob = await mediaResponse.blob();
    
            return blob;
        } catch (error) {
            console.error('Error downloading media:', error);
            throw error; // Rethrow the error for handling in DownloadAudio if needed
        }
    };
      
    async function DownloadAudio(soundData, filename = '') {
        try {

            setIsDownloadingAudio(true);

            let blob;
            if (!!soundData.progressive_url) {
                blob = await DownloadFromProgressiveUrl(soundData.progressive_url);
            } else if (!!soundData.hls_url) {
                blob = await DownloadFromHlsUrl(soundData.hls_url);
            } else {
                console.error('No valid URL provided');
                return;
            }
    
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
    
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setAdPopupVisible(true)
        } catch (error) {
            console.error('Error downloading audio:', error);
        } finally {
            setIsDownloadingAudio(false);
        }
    }
    

    const DownloadFromBlob = async (media, filename='') => {
        const response = await fetch(media);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        link.setAttribute('download', filename);
        
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const renderDownloadSuccess = () => {
        return (
            <div className='max-w-3xl mt-0 md:mt-4 mb-10 mx-auto flex bg-white text-white flex-col w-full md:flex-row rounded-xl overflow-hidden'>
                <div className='flex px-4 py-3 bg-cover bg-center w-full min-h-[240px] sm:min-h-[280px] md:w-1/2' style={{ 'backgroundImage': `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7) ),url(${DlData.metadata.artwork_url})` }}>
                    <div className='mt-auto flex items-center'>
                        <div><img alt="" className='rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16' src={DlData.metadata.profile_picture_url} /></div>
                        <div className='ml-3'>
                            <div className='font-bold text-xl '>{DlData.metadata.username}</div>
                            <div className='text-slate-300 text-sm '>{DlData.metadata.userid}</div>
                        </div>
                    </div>
                </div>
                <div className='px-4 py-4 flex flex-col mx-auto w-full md:w-1/2 '>
                    <div className='text-black font-bold text-xl mb-7'>{DlData.metadata.title}</div>
                    <div className='mt-auto space-y-2'>
                        {
                            DlData.playlist && 
                            <div>
                                <span className='text-black font-bold text-sm'>{t('selectfromplaylist')}</span>
                                <select id="tracklist" className="bg-white border text-black mt-2 mb-4 block w-full pl-3 pr-10 h-10 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md">
                                    {DlData.playlist.map((data, idx)=>{
                                        return <option key={idx} value={idx}>🎶 {idx + 1} - {data.title}</option>
                                    })}
                                </select>
                                <a onClick={()=>{
                                    let trackIndex = document.getElementById("tracklist").value;
                                    DownloadAudio(DlData.playlist[trackIndex], 'soundcloudaud.com_' + DlData.playlist[trackIndex].title + '.mp3')
                                }}
                                    type="button" className="text-white cursor-pointer flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center">
                                        {
                                            !isDownloadingAudio ?
                                            <><ArrowDownTrayIcon className="w-5 h-5 mr-2"/>{t('downloads.singlemp3')}</>
                                            :
                                            <svg className="animate-spin ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        }
                                </a>
                            </div>
                        }
                        {
                            DlData.sound && <div>
                            <a onClick={()=>{
                                DownloadAudio(DlData.sound, `soundcloudaud.com_${DlData.metadata.title}.mp3`)
                            }}
                            type="button" className="text-white cursor-pointer relative flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center">
                                {
                                    !isDownloadingAudio ?
                                    <><ArrowDownTrayIcon className="w-5 h-5 mr-2"/>Download MP3 Audio</>
                                    :
                                    <svg className="animate-spin ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                            </a>
                                </div>
                        }
                        {
                            DlData.playlist && <a 
                            onClick={downloadFullPlaylist}
                            type="button" 
                            className="text-white overflow-hidden relative cursor-pointer flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center">
                                <div className='absolute left-0 h-full transition duration-1000 ease-in-out' style={{ 'width': playlistDownloadPercentage + '%', 'background': 'rgba(0,0,0,0.15)' }}/>
                                <ArrowDownTrayIcon className="w-5 h-5 mr-2"/>
                                {t('downloads.entireplaylist')}
                            </a>
                        }
                        <a onClick={()=>{
                            DownloadFromBlob(DlData.metadata.artwork_url, `X2SoundCloud_${DlData.metadata.title}_albumcover`)
                            setAdPopupVisible(true)
                        }}
                            type="button" className="text-white cursor-pointer flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center">
                                <ArrowDownTrayIcon className="w-5 h-5 mr-2"/>
                                {t('downloads.albumcover')}
                        </a>
                        <a onClick={()=>{
                            DownloadFromBlob(DlData.metadata.profile_picture_url, `X2SoundCloud_${DlData.metadata.username}`)
                            setAdPopupVisible(true)
                        }}
                            type="button" className="text-white cursor-pointer flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center">
                                <ArrowDownTrayIcon className="w-5 h-5 mr-2"/>
                                {t('downloads.dp')}
                        </a>
                        
                        <button type="button" onClick={downloadReset} className="text-white flex items-center justify-center w-full bg-gray-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mt-3"><ArrowPathIcon className="w-5 h-5 mr-2"/>{t('downloads.more')}</button>
                    </div>
                    {
                    isAdPopupVisible ? 
                    <div onClick={()=>{setAdPopupVisible(false)}} className={'flex z-50 fixed left-0 top-0 bottom-0 right-0 w-full h-full items-center justify-center'} style={{ 'backgroundColor': 'rgba(0,0,0,.4)' }}>
                        <div onClick={e => e.stopPropagation()} className='admodal w-full px-2.5 py-2.5 md:px-4 md:py-4 mx-4 my-4 bg-white relative md:max-w-7xl rounded-md overflow-hidden flex flex-col'>
                            <div className='min-h-[250px] w-full'>
                                <AdsenseAd className="adsbygoogle block"
                                data-ad-client="ca-pub-2234703663073578"
                                data-ad-slot="6308511257"
                                data-ad-format="auto"
                                data-full-width-responsive="true"/>
                            </div>
                            <div onClick={()=>{setAdPopupVisible(false)}} className='bg-gray-500 text-white flex justify-center py-2 mt-2.5 md:mt-4 rounded-md cursor-pointer'>
                                Close
                            </div>
                        </div>
                    </div> : null
                    }
                </div>
            </div>
        );
    }


    const renderDownloadForm = () => {
        return (
            <section className="fjord mx-auto w-full max-w-4xl flex flex-col items-center my-4">
                <>
                    <h1 className='text-4xl font-bold text-center text-white'>{props.title}</h1> 
                    <h2 className='mt-2 mb-5 text-gray-100 text-center whitespace-pre-line'>{props.description}</h2>
                    {
                        /*
                        <AdsenseAd className="adsbygoogle block mb-2 w-full"
                    data-ad-client="ca-pub-2234703663073578"
                    data-ad-slot="3832852730"
                    data-ad-format="auto"
                    data-full-width-responsive="true"/>
                        */
                    }
                    <form onSubmit={onSubmit} className='flex w-full my-2 flex-col md:flex-row' action={`/${router.locale}`} method='GET'>
                        <div style={{ 'background': isDownloading ? '#ededed' : '#ffffff'  }} className='flex backdrop-blur-lg pl-3 py-2 pr-2 w-full border border-black mr-0 md:mr-3'>
                            <input disabled={isDownloading} inputMode="verbatim" autoCapitalize="off" autoCorrect="off" spellCheck="false" autoComplete="off" name="q" id='urlinput' placeholder={t('placeholder')} className='data-hj-allow w-full outline-none font-semibold text-gray-800 bg-transparent' onChange={handleInputChange} onKeyUp={onKeyUp}/>
                            <div onClick={handlePaste} className='flex cursor-pointer justify-center items-center rounded-lg px-3 py-2.5' style={{ 'background': '#ebf1ff' }}>
                                <ClipboardIcon className='w-4 h-4' style={{ 'color': '#2e4aff' }}/>
                                <span className='hidden md:block whitespace-nowrap text-sm font-semibold ml-1' style={{ 'color': '#2e4aff' }}>{t('paste')}</span>
                            </div>
                        </div>
                        <button onClick={()=>{handleDownload(url)}} type="button" className="
                        text-white whitespace-nowrap bg-gradient-to-r bg-black
                        py-3 font-bold
                        mt-3 md:mt-0
                         px-7 text-lg text-center
                        transform transition duration-150 ease-in-out active:scale-95 md:active:scale-100
                        ">
                            {
                                !isDownloading ? 
                                <span>{t('download')}</span> : 
                                <span className='flex items-center justify-center relative'>
                                    <span className=''>Downloading...</span>
                                    <svg className="md:hidden absolute right-0 animate-spin ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            }
                        </button>
                    </form>
                </>
                <ToastContainer/>
            </section>
        );
    }
    
    if (DlData && !isDownloading) {
        return renderDownloadSuccess();
    } else if(!props.isSourceMode) {
        return renderDownloadForm();
    } else if(props.isSourceMode) {
        return RenderDownloadFormSourceMode();
    }
}