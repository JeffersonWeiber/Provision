import { useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

/**
 * Component responsible for injecting marketing and tracking scripts
 * based on the settings saved in the database.
 */
const TrackingScripts = () => {
    const { data: config, isLoading } = useSettings();

    useEffect(() => {
        if (isLoading || !config) return;

        // 1. Google Analytics (GA4)
        if (config.google_analytics_id) {
            const gaScript1 = document.createElement('script');
            gaScript1.async = true;
            gaScript1.src = `https://www.googletagmanager.com/gtag/js?id=${config.google_analytics_id}`;
            document.head.appendChild(gaScript1);

            const gaScript2 = document.createElement('script');
            gaScript2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.google_analytics_id}');
            `;
            document.head.appendChild(gaScript2);
        }

        // 2. Google Tag Manager
        if (config.google_tag_manager_id) {
            const gtmScript = document.createElement('script');
            gtmScript.innerHTML = `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${config.google_tag_manager_id}');
            `;
            document.head.appendChild(gtmScript);
        }

        // 3. Meta Pixel
        if (config.meta_pixel_id) {
            const pixelScript = document.createElement('script');
            pixelScript.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${config.meta_pixel_id}');
                fbq('track', 'PageView');
            `;
            document.head.appendChild(pixelScript);
        }
    }, [config, isLoading]);

    return null; // This component doesn't render anything UI-wise
};

export default TrackingScripts;
