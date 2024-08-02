import { cn } from '@shtcut-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    selectedTabIndex: number;
    onTabClick: (index: number) => void;
    classNames?: string;
    onChange?: (tabId: string) => void;
    navigationOptions?: any;
}

const NavTabs: React.FC<TabsProps> = ({ selectedTabIndex, onTabClick, classNames, onChange, navigationOptions }) => {
    const router = useRouter();
    return (
        <div className={`w-full ${classNames}`}>
            <div
                className="relative   bg-custom-background-80  grid"
                role="tablist"
                aria-orientation="horizontal"
                style={{ gridTemplateColumns: `repeat(${navigationOptions.length}, 1fr)` }}
            >
                <div
                    className="absolute top-1/2 left-[2px] border-b border-primary-0  transition-all duration-500 ease-in-out "
                    style={{
                        height: 'calc(100% - 2px)',
                        width: `calc(100% / ${navigationOptions.length} - 1px)`,
                        transform: `translate(${selectedTabIndex * 100}%, -50%)`
                    }}
                ></div>
                {navigationOptions.map((tab: any, index: any) => (
                    <button
                        key={tab.id}
                        className={cn('relative z-[1]  text-xs py-[25px] focus:outline-none transition duration-500', {
                            'text-primary-0': selectedTabIndex === index,
                            'text-[#433E3F] hover:text-primary-0': selectedTabIndex !== index
                        })}
                        id={`tab-${index}`}
                        role="tab"
                        type="button"
                        aria-selected={selectedTabIndex === index}
                        tabIndex={selectedTabIndex === index ? 0 : -1}
                        onClick={() => {
                            onTabClick(index);
                            router.push(tab.href);
                            if (onChange) onChange(tab.id);
                        }}
                    >
                        <span className="scale-110 text-xs">{tab.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NavTabs;
