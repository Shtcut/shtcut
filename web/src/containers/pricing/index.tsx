import { FeatureTable, PricingHero, PricingList } from '@shtcut/components/ui/pricing-ui';

import React from 'react';

const PricingPageContainer = () => {
    return (
        <>
            <PricingHero />
            <PricingList />
            <FeatureTable/>
        </>
    );
};

export default PricingPageContainer;
