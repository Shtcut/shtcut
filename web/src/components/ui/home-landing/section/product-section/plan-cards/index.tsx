import { PlanCardsData } from '@shtcut/_shared/data';
import RoundedTab from '@shtcut/components/_shared/Tabs/rounded-tab';
import React, { useState } from 'react';
import PlanDetails from './plan-details';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import useCanvasConfetti from '@shtcut/hooks/useCanvasConfetti';

const PlanCards = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const { handleClickCanvas } = useCanvasConfetti();
    const tabs = [
        { id: 'yearly', label: 'Yearly' },
        { id: 'monthly', label: 'Monthly' }
    ];
    const handleTabClick = (index: number, id: string) => {
        setSelectedTabIndex(index);
        if (id === 'monthly') {
            handleClickCanvas();
        }
    };
    return (
        <AnimatedContainer className="bg-[#FAFAFA] py-12">
            <section className="px-4 max-w-screen-custom mx-auto">
                <div>
                    <h1 className="text-2xl md:text-[32px] font-medium text-center">
                        <span className="text-primary-0">Powerful</span> features on all plans for you
                    </h1>
                    <div className="sm:w-80 my-6 mx-auto">
                        <RoundedTab
                            tabs={tabs}
                            classNames="bg-[#ededed] h-10  "
                            activeClassName="bg-white "
                            activeTextClassName="text-black"
                            selectedTabIndex={selectedTabIndex}
                            onTabClick={handleTabClick}
                        />
                    </div>
                    <div className="flex md:flex-row flex-col items-center w-full gap-4">
                        {PlanCardsData.map((plan, index) => (
                            <PlanDetails plan={plan} key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedContainer>
    );
};

export default PlanCards;
