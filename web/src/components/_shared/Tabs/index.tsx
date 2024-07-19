import { cn } from '@shtcut-ui/react';
import React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    selectedTabIndex: number;
    onTabClick: (index: number) => void;
    classNames?: string;
    onChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTabIndex, onTabClick, classNames, onChange }) => {
    return (
        <div className={`w-full ${classNames}`}>
            <div
                className="relative border-[0.5px] border-custom-border-200 rounded bg-custom-background-80 p-[1px] grid"
                role="tablist"
                aria-orientation="horizontal"
                style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
            >
                <div
                    className="absolute top-1/2 left-[1px] bg-primary-0  rounded-[3px] transition-all duration-500 ease-in-out shadow-[2px_0_8px_rgba(167,169,174,0.15)]"
                    style={{
                        height: 'calc(100% - 2px)',
                        width: `calc(100% / ${tabs.length} - 1px)`,
                        transform: `translate(${selectedTabIndex * 100}%, -50%)`
                    }}
                ></div>
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        className={cn(
                            'relative z-[1] font-semibold text-xs rounded-[3px] py-1.5 focus:outline-none transition duration-500',
                            {
                                'text-white': selectedTabIndex === index,
                                'text-custom-text-400 hover:text-custom-text-300': selectedTabIndex !== index
                            }
                        )}
                        id={`tab-${index}`}
                        role="tab"
                        type="button"
                        aria-selected={selectedTabIndex === index}
                        tabIndex={selectedTabIndex === index ? 0 : -1}
                        onClick={() => {
                            onTabClick(index);
                            if (onChange) onChange(tab.id);
                        }}
                    >
                        <span className="scale-110">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
