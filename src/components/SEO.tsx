import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterHandle?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage,
    twitterHandle = '@provision',
}) => {
    const siteName = 'Provision - Gestão Pública Municipal';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = 'Soluções técnicas para uma gestão pública segura e eficiente. Especialistas em planejamento orçamentário e prestação de contas.';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:site" content={twitterHandle} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Helmet>
    );
};

export default SEO;
