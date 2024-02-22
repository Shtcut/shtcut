import {
    MarketingSection,
    ShortenerSection,
    SurveySection,
    SocialSection
} from '@shtcut/components/ui/landing/section';
import { NavBar, LogoGrid, Stats, Hero, Testimonial, Footer } from '@shtcut/components/ui';

export const HomePage = () => {
    return (
        <main className="flex min-h-screen flex-col bg-cover bg-default-bg">
            <div className="relative">
                <div className="absolute inset-0 blur-xl h-[580px]" />
                <div className="relative">
                    <NavBar />
                    <Hero />
                    <LogoGrid />
                    <Stats />
                    <ShortenerSection />
                    <SurveySection />
                    <MarketingSection />
                    <SocialSection />
                    <Testimonial />
                    <Footer />
                </div>
            </div>
        </main>
    );
};
