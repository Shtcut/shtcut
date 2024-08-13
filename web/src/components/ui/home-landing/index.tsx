import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import { Testimonial } from '../index';
import { Clients, HeroLanding, PlanCards, ProductSection, StatsSection } from './section';



export const HomeLandingContainer = () => {
    const { width } = useWindowSize();
    const mobileWidth = width !== undefined && width <= 768;
    return (
        <>
            <HeroLanding />
            <div className={` ${mobileWidth ? '' : 'bottom-16  lg:bottom-0 relative'} `}>
                <StatsSection />
                <Clients />
                <ProductSection />
                <Testimonial />
                <PlanCards />
            </div>
        </>
    );
};
