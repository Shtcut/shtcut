import { Button } from '@shtcut-ui/react';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import React, { createElement, useState } from 'react';
import { PiSortDescendingBold } from 'react-icons/pi';
import LinkListedComponent from '../link-listed-component';
import { HiUsers } from 'react-icons/hi';
import { LineChart as Chart } from 'lucide-react';
import { BiPieChartAlt } from 'react-icons/bi';
import ReferralComponent from '../referrals';
import CountriesComponent from '../countries';
import { LineChartComponent } from '@shtcut/components/_shared/Analytics/LineChart';
import SelectMonths from './select-months';
import BreadCrumb from '@shtcut/components/bread-crumb';

const SingleLinkPreviewComponent = () => {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    const handleSelect = (value: string) => {
        setSelectedMonth(value);
    };
    const analticsScore = [
        {
            id: '1',
            text: 'Click Counts',
            totalNumber: '40,689',
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
        <div className="my-[38px] ">
            <BreadCrumb currentRoute="Analytics" />
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-2xl">Analytics</h1>
                <div className="flex items-center gap-x-2">
                    <SearchInput />
                    <Button className="flex border  hover:bg-primary-0 hover:text-white shadow-none text-sm text-[#5A5555] items-center font-normal bg-white gap-x-2 border-[#CCCBCB]">
                        <PiSortDescendingBold size={20} /> Sort by
                    </Button>
                </div>
            </div>
            <div className="mt-8">
                <LinkListedComponent edit={true} />
            </div>

            <div className="mt-[22px] flex items-center w-full gap-8 ">
                {analticsScore.map((data, index) => (
                    <div
                        className="flex h-28 justify-between  gap-4 rounded-2xl w-full items-center bg-white border bg-card  px-4"
                        key={index}
                    >
                        <div>
                            <p className="text-[#636466] font-semibold">{data.text}</p>
                            <h1 className="text-2xl font-bold">{data.totalNumber}</h1>
                        </div>
                        <div
                            className={`${data.id === '1' ? 'bg-[#e5e4ff] text-[#8280FF]' : data.id === '2' ? 'bg-[#fff3d6] text-[#FEC53D]' : 'bg-[#d9f7e8] text-[#4AD991]'} w-12 h-12 flex justify-center items-center rounded-full  text-2xl`}
                        >
                            {createElement(data.icon)}
                        </div>
                    </div>
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
