import AnimatedContainer from '@shtcut/components/framer/animate-div';
import React from 'react';

const featuresData = [
    {
        id: 1,
        name: 'Total User',
        numbers: [5, 100, 'Unlimited']
    },
    {
        id: 2,
        name: 'Custom domains'
    },
    {
        id: 3,
        name: 'Branded links total'
    },
    {
        id: 4,
        name: 'Link automation'
    },
    {
        id: 5,
        name: 'Redirects'
    }
];

const FeatureTable = () => {
    const renderMarkIcon = () => (
        <svg
            className="w-3 h-3 text-tertiary-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917L5.724 10.5 15 1.5"
            />
        </svg>
    );

    const renderContent = (product) => {
        if (product.name === 'Total User') {
            return product.numbers.map((number, index) => (
                <p key={index} className="font-medium">
                    {number}
                </p>
            ));
        } else {
            return (
                <>
                    <div>{renderMarkIcon()}</div>
                    <div>{renderMarkIcon()}</div>
                    <div>{renderMarkIcon()}</div>
                </>
            );
        }
    };

    return (
        <AnimatedContainer className="max-w-screen-xl mx-auto mt-4 px-4 pb-20">
            <div id="detailed-pricing" className="w-full overflow-x-auto">
                <div className="overflow-hidden min-w-max">
                    <div className="flex justify-between rounded-[10px] p-4 text-sm font-medium text-white bg-primary-0 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        <div className="flex items-center text-2xl font-bold">Compare features</div>
                        <div className="flex items-center gap-x-32 pr-[92px]">
                            <div className="font-bold">
                                Free <p className="font-medium">Join Free</p>
                            </div>
                            <div className="font-bold">
                                Professional<p className="font-medium">Start free trial</p>
                            </div>
                            <div className="font-bold">
                                Enterprise <p className="font-medium">Start free</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 bg-[#F5F5F5] rounded py-2 mt-[10px]">
                        <div className="text-tertiary-400 font-bold">Core</div>
                    </div>
                    {featuresData.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex justify-between px-4  text-sm text-gray-700 gap-x-16 dark:border-gray-700"
                        >
                            <p
                                className={`text-tertiary-400 text-base py-4 font-medium  ${index !== featuresData.length - 1 ? 'border-b border-[#EEEEEE]' : ''} w-full`}
                            >
                                {product.name}
                            </p>
                            <div
                                className={`flex    ${
                                    product.name === 'Total User' ? 'pr-[70px] gap-x-48' : 'pr-[98px] gap-x-52'
                                } items-center ${index !== featuresData.length - 1 ? 'border-b border-[#EEEEEE]' : ''}  `}
                            >
                                {renderContent(product)}
                            </div>
                        </div>
                    ))}
                    <div className="px-4 bg-[#F5F5F5] rounded py-2 ">
                        <div className="text-tertiary-400 font-bold">Features</div>
                    </div>
                    {featuresData.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex justify-between px-4  text-sm text-gray-700 gap-x-16 dark:border-gray-700"
                        >
                            <p
                                className={`text-tertiary-400 text-base py-4 font-medium  ${index !== featuresData.length - 1 ? 'border-b border-[#EEEEEE]' : ''} w-full`}
                            >
                                {product.name}
                            </p>
                            <div
                                className={`flex  ${
                                    product.name === 'Total User' ? 'pr-[70px] gap-x-48' : 'pr-[98px] gap-x-52'
                                } items-center  ${index !== featuresData.length - 1 ? 'border-b border-[#EEEEEE]' : ''} `}
                            >
                                {renderContent(product)}
                            </div>
                        </div>
                    ))}
                    <div className="px-4 bg-[#F5F5F5] rounded py-2 ">
                        <div className="text-tertiary-400 font-bold">Essentials</div>
                    </div>
                    {featuresData.map((product) => (
                        <div
                            key={product.id}
                            className="flex justify-between px-4  text-sm text-gray-700 gap-x-16 dark:border-gray-700"
                        >
                            <p
                                className={
                                    'text-tertiary-400 text-base py-4 font-medium border-b border-[#EEEEEE] w-full'
                                }
                            >
                                {product.name}
                            </p>
                            <div
                                className={`flex border-b border-[#EEEEEE]   ${
                                    product.name === 'Total User' ? 'pr-[70px] gap-x-48 ' : 'pr-[98px] gap-x-52'
                                } items-center  `}
                            >
                                {renderContent(product)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default FeatureTable;
