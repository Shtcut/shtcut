'use client';
import React, { useEffect } from 'react';
import HeroSection from './hero-section';
import LinkManagement from './link-management';
import QrCode from './qr-code';
import CustomerDomain from './custom-domain';
import LinkBio from './link-bio';
import Analytics from './analytics';

const ProUrlShortenerComponent = () => {
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('[id]');
            let currentSection = '';

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = section.id;
                }
            });

            if (currentSection) {
                const hash = `#${currentSection}`;
                if (window.location.hash !== hash) {
                    history.replaceState(null, '', hash);
                }
            } else {
                if (window.location.hash) {
                    history.replaceState(null, '', window.location.pathname);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <>
            <HeroSection />
            <LinkManagement id="link-management" />
            <QrCode id="qr-code" />
            <CustomerDomain id="customer-domain" />
            <LinkBio id="bio-link" />
            <Analytics id="analytics" />
        </>
    );
};

export default ProUrlShortenerComponent;
