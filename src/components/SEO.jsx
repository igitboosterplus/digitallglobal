import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path, type = 'website' }) => {
    const siteName = 'Digitall Global';
    const fullTitle = `${title} | ${siteName}`;
    const url = `https://digitall-global.com${path || ''}`;
    const image = 'https://digitall-global.com/logo-digitall.png'; // Image par défaut pour le partage

    return (
        <Helmet>
            {/* Balises standards */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
