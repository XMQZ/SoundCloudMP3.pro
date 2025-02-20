import { useState, useEffect, useRef } from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid';

const LazyImage = ({ src, alt, placeholder, data, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState(null);
  const [previewDuration, setPreviewDuration] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const isClosingRef = useRef(false);
  const previewRef = useRef();
  const imgRef = useRef();

  const open = () => {
    if(isOpen) return;
    const mobileCheck = () => {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    if (mobileCheck) {
      setIsOpen(true);
    }
    setPreviewDuration(Date.now());
    window.gtag('event', 'preview_open');
  }

  const close = () => {
    if (!isClosingRef.current) {
      isClosingRef.current = true;
      setIsOpen(false)
      isClosingRef.current = false;
    }
  }

  const modalClick = (e) => {
    if(previewRef.current && !previewRef.current.contains(e.target)) {
      close();
    } else {
      open()
    }
  }

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientY;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
        return;
    }

    const currentTouch = e.touches[0].clientY;
    const diff = touchDown - currentTouch;

    if (Math.abs(diff) > 50) { // Threshold for swipe action
      close();
    }
  }

  useEffect(()=>{
    async function setImageData() {
      if (isVisible) {
        let blob = await fetch(src).then(r => r.blob());
        let objectURL = URL.createObjectURL(blob);
        setImageBlobUrl(objectURL);
        setLoaded(true);
      }
    }
    setImageData();
  }, [isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the element is intersecting
        if (entries[0].isIntersecting) {
            setIsVisible(true);
            observer.unobserve(imgRef.current);
        }
      },
      {
        rootMargin: '100px', // Loads the image 100px before it comes into view
      }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

    if (loaded) {
        return (
          <div>
            <div ref={imgRef} onClick={open}>
              <img src={imageBlobUrl} alt={alt} {...props} />
            </div>
          <Transition appear show={isOpen}>
            <Dialog as="div" className="relative focus:outline-none" onClose={close}>
              <div className="fixed inset-0 z-[99] w-screen overflow-y-auto">
                <div className="flex h-[calc(100dvh)] items-center justify-center">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove} onClick={modalClick} className="w-full h-full md:h-fit md:py-3 md:rounded-2xl max-w-2xl px-3 backdrop-blur-lg">
                      <div className='my-4 flex items-center justify-between w-full'>
                        <DialogTitle as='h3' className='text-2xl text-white font-extrabold'>Preview</DialogTitle>
                        <button onClick={close} className='p-2 text-white bg-[#1a1a1a] rounded-full'>
                          <XMarkIcon className='w-6 h-6'/>
                        </button>
                      </div>
                     <div ref={previewRef} className='mx-auto rounded-xl h-[75%]'>
                      {
                        data.mediaType == 'video' ? 
                        <video id='previewvid' controls className='object-contain rounded-xl w-full h-full md:max-h-[600px]' poster={imageBlobUrl} src={data.media}/>
                        :  <img src={imageBlobUrl} className='object-contain rounded-xl w-full h-full md:max-h-[600px]'/>
                      }
                      {
                        // <img src={imageBlobUrl} className='object-cover'/>
                        // 
                      }
                     </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
          </div>
        )
    } else {
        return(
            <div ref={imgRef} role="status" className="animate-pulse h-[485px] md:h-[568px]">
                <div className="flex items-center justify-center w-full h-full rounded bg-gray-700">
                    <svg className="w-10 h-10 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
};

export default LazyImage;