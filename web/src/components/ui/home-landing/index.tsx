import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import { Testimonial } from '../index';
import { Clients } from './section';
import HeroLanding from './section/hero-landing';
import ProductSection from './section/product-section';
import PlanCards from './section/product-section/plan-cards';

export const HomeLandingContainer = () => {
    const { width } = useWindowSize();
    const mobileWidth = width !== undefined && width <= 768;
    return (
        <>
            <HeroLanding />
            <div className={` ${mobileWidth ? '' : 'bottom-16  lg:bottom-0 relative'} `}>
                <Clients />
                <ProductSection />
                <Testimonial />
                <PlanCards />
            </div>
        </>
    );
};
