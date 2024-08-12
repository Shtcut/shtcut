import React from 'react';
import HeroSection from './hero-section';
import LinkManagement from './link-management';
import QrCode from './qr-code';
import CustomerDomain from './custom-domain';
import LinkBio from './link-bio';
import Analytics from './analytics';

const ProUrlShortenerComponent = () => {
    return (
        <>
            <HeroSection />
            <LinkManagement />
            <QrCode />
            <CustomerDomain />
            <LinkBio />
            <Analytics/>
        </>
    );
};

export default ProUrlShortenerComponent;
