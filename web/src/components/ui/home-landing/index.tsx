import { Testimonial } from '../index';
import { Clients } from './section';
import HeroLanding from './section/hero-landing';
import ProductSection from './section/product-section';
import PlanCards from './section/product-section/plan-cards';

export const HomeLandingContainer = () => {
    return (
        <>
            <HeroLanding />
            <div className=" relative bottom-16 lg:bottom-0">
                <Clients />
                <ProductSection />
                <Testimonial />
                <PlanCards />
            </div>
        </>
    );
};
