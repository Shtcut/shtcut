import { Stats, Testimonial } from '../index';
import { ShortenerSection, SocialSection, SurveySection, Clients, Hero, OSS } from './section';
import HeroLanding from './section/hero-landing';

export const HomeLandingContainer = () => {
    return (
        <>
            <HeroLanding />
            <div>
                <Hero />
            </div>
        </>
    );
};
