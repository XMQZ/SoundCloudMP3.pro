import { useEffect } from "react";

export default function AdsenseAd(props) {
    useEffect(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.log(err);
        }
      }, []);

    return(
        <ins {...props}/>
    );
}