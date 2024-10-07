'use client';
import { BarChart, MoveUpRight, Search } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import SocialMediaDropdown from '../component/social-media-dropdown';
import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator } from '@shtcut-ui/react';
import BasicLine from '../component/barchart-line';
import { FaUsers } from 'react-icons/fa';
import { MdInsertChart } from 'react-icons/md';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { HiThumbUp } from 'react-icons/hi';

const AnalyticsSocialComponent = () => {
    const [timeframe, setTimeframe] = useState<string>('weekly');
    const [selectSocial, setSelectSocial] = useState<string>('');
    const handleSelect = (value: string) => {
        setSelectSocial(value);
    };
    const handleTimeframeChange = (value: string) => {
        setTimeframe(value);
    };
    const timeframes = ['Daily', 'Weekly', 'Monthly'];

    const ReusableComponent = ({
        borderRight,
        headerTitle,
        icon
    }: {
        borderRight?: boolean;
        headerTitle: string;
        icon?: ReactNode;
    }) => {
        return (
            <section className={` px-6 ${borderRight ? 'border-r ' : ''}`}>
                <div className="flex items-center gap-x-2">
                    <div className="bg-[#F0F0F0] w-6 h-6 rounded-sm flex justify-center items-center">{icon}</div>

                    <p className="text-[#202224] font-medium  text-sm">{headerTitle}</p>
                </div>
                <h1 className="font-semibold text-3xl mt-4">420K</h1>
                <div className="flex text-[#06B217] items-center gap-x-2 mt-1">
                    <p className="text-[#131417]">This week</p>
                    <MoveUpRight size={12} />
                    <p className="font-medium">12%</p>
                </div>
            </section>
        );
    };

    return (
        <main>
            <section className="flex justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Analytics</h1>
                <div className="flex items-center gap-x-2">
                    <section className="flex items-center justify-center cursor-pointer w-11 h-9 rounded-sm bg-background border">
                        <Search size={16} />
                    </section>
                    <SocialMediaDropdown handleSelect={handleSelect} />
                </div>
            </section>
            <Card className="mt-6 shadow-sm">
                <div className="grid p-6 border-b  grid-cols-4 my-2 w-full">
                    <ReusableComponent icon={<MdInsertChart />} headerTitle="Posts" borderRight />

                    <ReusableComponent headerTitle="Posts impressions" borderRight icon={<IoDocumentTextSharp />} />

                    <ReusableComponent headerTitle="Engaged Users" borderRight />

                    <ReusableComponent headerTitle="Reactions" icon={<HiThumbUp/>} />
                </div>
                <div className="grid p-6  grid-cols-4 my-2 w-full">
                    <ReusableComponent headerTitle="Saved" borderRight />

                    <ReusableComponent headerTitle="Followers" borderRight icon={<FaUsers />} />
                    <ReusableComponent headerTitle="Accounts reached" borderRight />
                    <ReusableComponent headerTitle="Clicks" />
                </div>
            </Card>
            <Card className="mt-6 shadow-sm p-4 ">
                <section className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#2B2829] ">Performance</h1>
                    <div>
                        <Select onValueChange={handleTimeframeChange}>
                            <SelectTrigger
                                id="select-timeframe"
                                className="text-xs text-[#2B3034] shadow-none font-semibold  w-28"
                            >
                                <SelectValue className="text-xs font-medium" placeholder="Weekly" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeframes.map((timeframeOption, index) => (
                                    <SelectItem
                                        key={index}
                                        value={timeframeOption.toLowerCase()}
                                        className="text-xs text-[#2B3034]"
                                    >
                                        {timeframeOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </section>

                <section className="grid mt-6 grid-cols-2 gap-4 w-full">
                    <BasicLine headerTitle="Followers" />
                    <BasicLine headerTitle="Posts Impressions" />
                    <BasicLine headerTitle="Engaged users" />
                    <BasicLine headerTitle="Clicks" />
                </section>
            </Card>
        </main>
    );
};

export default AnalyticsSocialComponent;
