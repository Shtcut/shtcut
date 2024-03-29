import {  Stats, Testimonial } from '../index';
import { MarketingSection, ShortenerSection, SocialSection, SurveySection, Clients, Hero } from './section';

export const HomeLandingContainer = () => {
    return (
        <>
            <Hero />
            <Clients />
            <Stats />
            <ShortenerSection />
            <SurveySection />
            <MarketingSection />
            <SocialSection />
            <Testimonial />
        </>
    );
};
