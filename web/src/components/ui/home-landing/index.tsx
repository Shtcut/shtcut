import {  Stats, Testimonial } from '../index';
import {  ShortenerSection, SocialSection, SurveySection, Clients, Hero, OSS } from './section';


export const HomeLandingContainer = () => {
    return (
        <>
            <Hero />
            <Clients />
            <Stats />
            <ShortenerSection />
            <SurveySection />
            <SocialSection />
            <Testimonial />
            <OSS />
        </>
    );
};
