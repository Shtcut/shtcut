import Footer from '../footer';
import LogoGrid from '../logo-grid';
import NavBar from '../navbar';
import Stats from '../stats';
import Testimonial from '../testimonial';
import Hero from './hero';
import MarketingSection from './section/marketing';
import ShortenerSection from './section/shortener';
import SocialSection from './section/social';
import SurveySection from './section/survey';

const LandingPage = (props?) => {
    return (
        <main className="flex min-h-screen flex-col bg-cover bg-[url('/background.svg')]">
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

export default LandingPage;
