'use client';

import { Button, Card } from '@shtcut-ui/react';
import React, { createElement, useState } from 'react';
import { SearchInput } from '../../../dashboard/nav-component';
import { PiSortDescendingBold } from 'react-icons/pi';
import AnalyticsCard from './analytics-card';
import Image from 'next/image';
import { HiUsers } from 'react-icons/hi';
import { BiPieChartAlt } from 'react-icons/bi';
import { LineChart as Chart } from 'lucide-react';
import SelectMonths from '@shtcut/components/select-months';
import { LineChartComponent } from '@shtcut/components/_shared/Analytics/LineChart';
import ReferralComponent from '@shtcut/components/referrals';
import CountriesComponent from '@shtcut/components/countries';

const AnalyticsComponent = () => {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    const handleSelect = (value: string) => {
        setSelectedMonth(value);
    };
    const data = [1];
    const [selectedAnalytics, setSelectedAnalytics] = useState<number[]>([]);
    const handleCheckboxChange = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedAnalytics((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedAnalytics((prevSelected) => prevSelected.filter((qrId) => qrId !== id));
        }
    };
    const handleDelete = () => {
        setSelectedAnalytics([]);
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
        <section>
            {selectedAnalytics.length > 0 && (
                <div className="flex justify-end mt-4">
                    <Button className="bg-red-500 text-xs h-8 rounded  text-white" onClick={handleDelete}>
                        Delete Selected
                    </Button>
                </div>
            )}
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Analytics</h1>

                <div className="flex items-center gap-3">
                    <SearchInput />
                    <Button className="flex border border-[#CCCBCB]  hover:bg-primary-0 hover:text-white shadow-none font-normal text-[#5A5555] text-xs items-center bg-white gap-x-2 ">
                        <PiSortDescendingBold size={20} /> Sort by
                    </Button>
                </div>
            </div>
            {data.length > 0 ? (
                data.map((id) => (
                    <div key={id} className="mt-[22px]">
                        <AnalyticsCard id={id} handleCheckboxChange={handleCheckboxChange} />
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center rounded-[10px] bg-white h-[500px]  justify-center gap-4 mt-10">
                    <Image src="/images/qrcode-data.png" width={232} height={172} alt="No Data" />
                    <p className="text-center  text-lg font-medium  ">No QR Code found for this workspace</p>
                </div>
            )}

            <div className="mt-[22px] flex items-center w-full gap-6 ">
                {analticsScore.map((data) => (
                    <Card
                        className="w-full flex cursor-pointer border border-gray-200 justify-between  items-center   h-28 shadow-sm  rounded-[10px]  px-4  gap-4"
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
                    <h1 className="text-lg font-bold text-[#202224]">Scans </h1>
                    <SelectMonths selectedMonth={selectedMonth} handleSelect={handleSelect} />
                </div>
                <LineChartComponent />
            </div>
            <section className="flex items-center gap-8 my-[22px] pb-12">
                <ReferralComponent />
                <CountriesComponent />
            </section>
        </section>
    );
};

export default AnalyticsComponent;
