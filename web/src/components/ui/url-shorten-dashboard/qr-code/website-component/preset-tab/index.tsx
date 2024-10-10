import { cn } from '@shtcut-ui/react';
import React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    selectedTabIndex: number;
    onTabClick: (index: number, id: string) => void;
    classNames?: string;
    onChange?: (tabId: string) => void;
    activeClassName?: string;
    activeTextClassName?: string;
    textClassName?: string;
}

const PresetTab: React.FC<TabsProps> = ({
    tabs,
    selectedTabIndex,
    onTabClick,
    classNames,
    onChange,
    activeClassName,
    activeTextClassName,
    textClassName
}) => {
    return (
        <div className={`w-full ${classNames} rounded-full`}>
            <div
                className="relative h-full border-[0.5px] border-custom-border-200 rounded bg-custom-background-80 grid"
                role="tablist"
                aria-orientation="horizontal"
                style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
            >
                <div
                    className={`absolute top-1/2 left-[2px] bg-primary-0  rounded transition-all duration-500 ease-in-out shadow-[2px_0_8px_rgba(167,169,174,0.15)] ${activeClassName}`}
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
                                'text-white ': selectedTabIndex === index && !activeTextClassName,
                                [activeTextClassName || 'text-custom-text-400']: selectedTabIndex === index,
                                'text-custom-text-400 hover:text-custom-text-300': selectedTabIndex !== index
                            }
                        )}
                        id={`tab-${index}`}
                        role="tab"
                        type="button"
                        aria-selected={selectedTabIndex === index}
                        tabIndex={selectedTabIndex === index ? 0 : -1}
                        onClick={() => onTabClick(index, tab.id)}
                    >
                        <span className={`scale-110 ${textClassName}`}>{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PresetTab;
