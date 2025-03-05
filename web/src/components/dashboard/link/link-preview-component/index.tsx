'use client';
import { Button, Card, Dict } from '@shtcut-ui/react';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import React, { createElement, useState } from 'react';
import { PiSortDescendingBold } from 'react-icons/pi';
import LinkListedComponent from '../link-listed-component';
import { HiUsers } from 'react-icons/hi';
import { LineChart as Chart } from 'lucide-react';
import { BiPieChartAlt } from 'react-icons/bi';
import ReferralComponent from '../../../referrals';
import CountriesComponent from '../../../countries';
import { LineChartComponent } from '@shtcut/components/_shared/Analytics/LineChart';
import SelectMonths from '../../../select-months';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import BackButton from '@shtcut/components/back-btn';

const SingleLinkPreviewComponent = ({ getLinkResponse }: { getLinkResponse: LinkNameSpace.Link }) => {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    const handleSelect = (value: string) => {
        setSelectedMonth(value);
    };
    const analticsScore = [
        {
            id: '1',
            text: 'Click Counts',
            totalNumber: getLinkResponse?.clicks,
            icon: HiUsers
        },
        {
            id: '2',
            text: 'Last 7 days',
            totalNumber: '200',
            icon: Chart
        },
        {
            id: '3',
            text: 'Weekly Change',
            totalNumber: '10%',
            icon: BiPieChartAlt
        }
    ];
    return (
        <div className=" ">
            <BackButton />
            <div className="flex pt-6 justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Analytics</h1>
                <div className="flex items-center gap-x-2">
                    <SearchInput />
                    <Button className="flex border  hover:bg-primary-0 hover:text-white shadow-none text-sm text-[#5A5555] items-center font-normal bg-white gap-x-2 border-[#CCCBCB]">
                        <PiSortDescendingBold size={20} /> Sort by
                    </Button>
                </div>
            </div>
            <div className="mt-8">
                <LinkListedComponent data={getLinkResponse} edit={true} />
            </div>

            <div className="mt-[22px] flex items-center w-full gap-6 ">
                {analticsScore.map((data) => (
                    <Card
                        className="w-full flex cursor-pointer border border-gray-100 justify-between  items-center   h-28 shadow-sm  rounded-[10px]  px-4  gap-4"
                        key={data.id}
                    >
                        <div>
                            <p className="text-[#636466] font-semibold text-sm">{data.text}</p>
                            <h1 className="text-2xl font-bold">{data.totalNumber}</h1>
                        </div>
                        <div
                            className={`${data.id === '1' ? 'bg-[#e5e4ff] text-[#8280FF]' : data.id === '2' ? 'bg-[#fff3d6] text-[#FEC53D]' : 'bg-[#d9f7e8] text-[#4AD991]'} w-12 h-12 flex justify-center items-center rounded-full  text-2xl`}
                        >
                            {createElement(data.icon)}
                        </div>
                    </Card>
                ))}
            </div>
            <div className="mt-[22px] p-8 border bg-card rounded-[10px]">
                <div className="flex justify-between mb-4 items-center">
                    <h1 className="text-lg font-bold text-[#202224]">Engagements </h1>
                    <SelectMonths selectedMonth={selectedMonth} handleSelect={handleSelect} />
                </div>
                <LineChartComponent />
            </div>

            <section className="flex items-center gap-8 mt-[22px]">
                <ReferralComponent />
                <CountriesComponent />
            </section>
        </div>
    );
};

export default SingleLinkPreviewComponent;
