import React from 'react';
import {
    FeatureSection,
    HeroSection,
    IntegrationSection,
    ManageSection,
    PlanSection,
    CreateSection
} from './url-shortner-url';
import { Testimonial } from '../testimonial';

const UrlShortenComponent = () => {
    return (
        <>
            <HeroSection />
            <FeatureSection />
            <ManageSection />
            <CreateSection/>
            <IntegrationSection />
            <PlanSection />
            <Testimonial />
        </>
    );
};

export default UrlShortenComponent;
