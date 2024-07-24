import RoundedTab from '@shtcut/components/_shared/Tabs/rounded-tab';
import React, { useState, useEffect, useRef } from 'react';
import UrlShortener from './url-shorten';
import SurveySectionTab from './survey-section';
import EmailMarketing from './email-marketing';
import SocialMedia from './social-media';

const ProductSection = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const tabs = [
        { id: 'url-shorten', label: 'URL Shorten' },
        { id: 'survey-creation', label: 'Survey Creation' },
        { id: 'email-marketing', label: 'Email Marketing' },
        { id: 'social-media', label: 'Social Media Management' }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleTabClick = (index: number, id: string) => {
        setSelectedTabIndex(index);
        scrollToSection(id);
        window.history.replaceState({}, '', `/landing?section=${id}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sectionIds = tabs.map((tab) => tab.id);
            let newIndex = -1;
            let shouldUpdateUrl = false;

            for (let i = 0; i < sectionIds.length; i++) {
                const element = document.getElementById(sectionIds[i]);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        if (newIndex !== i) {
                            newIndex = i;
                            shouldUpdateUrl = true;
                        }
                        break;
                    }
                }
            }

            if (newIndex !== -1 && shouldUpdateUrl) {
                setSelectedTabIndex(newIndex);
                window.history.replaceState({}, '', `/landing?section=${tabs[newIndex].id}`);
            } else if (newIndex === -1) {
                window.history.replaceState({}, '', '/landing');
            }
        };

        const handleScrollDebounced = () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(handleScroll, 100);
        };

        window.addEventListener('scroll', handleScrollDebounced);
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            window.removeEventListener('scroll', handleScrollDebounced);
        };
    }, [selectedTabIndex, tabs]);

    return (
        <div className=" md:mt-14 ">
            <div className="md:flex flex-col">
                <div className="sticky top-0 z-50 bg-white/75 backdrop-blur-xl dark:bg-black/75 transition-all inset-x-0 ">
                    <div className=" px-1 sm:px-4 max-w-screen-custom mx-auto">
                        <div className="flex items-center py-4">
                            <div className="w-2/3  md:block hidden ">
                                <h2 className=" lg:text-xl">Elevate your digital strategy starting today! →</h2>
                            </div>
                            <div className="w-full">
                                <RoundedTab
                                    tabs={tabs}
                                    selectedTabIndex={selectedTabIndex}
                                    onTabClick={handleTabClick}
                                    activeTextClassName="text-white h-10"
                                    textClassName='sm:text-xs text-[10px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:mt-10 flex flex-col px-4 max-w-screen-custom mx-auto gap-y-8 lg:gap-y-16 sm:w-3/4 md:w-full ">
                    <UrlShortener />
                    <SurveySectionTab />
                    <EmailMarketing />
                    <SocialMedia />
                </div>
            </div>
        </div>
    );
};

export default ProductSection;
