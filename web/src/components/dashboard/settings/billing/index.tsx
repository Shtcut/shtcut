import React, { useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Separator,
    Modal
} from '@shtcut-ui/react';
import { PlanLimit, PropPlan } from '@shtcut/_shared/data';
import { Check } from 'lucide-react';

import { ConfettiStars } from '@shtcut/hooks/useCanvasConfetti/useCanvasStar';
const BillingsScreen = () => {
    const { handleClickCanvasStar } = ConfettiStars();
    const [showPlan, setShowPlan] = useState(false);
    const headers = ['Invoice', 'Billing Date', 'Amount', 'Plan'];
    const handleCloseUpgradeModal = () => {
        handleClickCanvasStar();
        setShowPlan(false);
    };
    const ReusableCard = ({ title, text }: { title: string; text: string }) => {
        return (
            <section className="flex items-center justify-between">
                <h1 className="font-semibold text-sm">{title}</h1>
                <p className="text-[#726C6C] text-xs">{text}</p>
            </section>
        );
    };
    return (
        <div>
            <section className="flex items-center justify-between border h-[83px] px-4 rounded bg-white border-[#e3e3e3]">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className=" font-semibold">Free Plan</h2>
                        <div className="bg-[#EDF2FF] w-16 h-6 flex items-center justify-center rounded-full">
                            <p className="text-xs text-primary-0 font-semibold">Active</p>
                        </div>
                    </div>
                    <p className="text-xs mt-2">Popular plan for individuals</p>
                </div>
                <div>
                    <h1 className="text-3xl font-semibold">
                        $0.00 <span className="text-xs">Per month</span>{' '}
                    </h1>
                </div>
            </section>
            <section className="flex items-center justify-between border h-[54px] px-4 rounded bg-white border-[#e3e3e3]">
                <p className="text-xs mt-2">For higher limits upgrade to the Pro plan.</p>
                <Button className="text-xs bg-primary-0 h-9 rounded" onClick={() => setShowPlan(true)}>
                    Upgrade to Pro
                </Button>
            </section>
            <section className="flex justify-between gap-4 mt-6">
                <div className="w-1/2 border rounded">
                    <h1 className="text-sm rounded-b bg-[#F7F7F7] font-semibold border-b p-3">Monthly Usage</h1>
                    <div className="flex p-3 flex-col gap-4">
                        <ReusableCard text="2 Of 10 Created" title="Created Links" />
                        <Separator />
                        <ReusableCard text="2 Of 10 Created" title="Custom Domains" />
                        <Separator />
                        <ReusableCard text="2 Of 10 Created" title="Tags" />
                        <Separator />
                        <ReusableCard text="2 Of 10 Created" title="QR Codes" />
                    </div>
                </div>
                <div className="w-1/2 border rounded">
                    <h1 className="text-sm rounded-b bg-[#F7F7F7] font-semibold border-b p-3">Plan Limits</h1>
                    <div className="flex p-3 flex-col gap-3">
                        {PlanLimit.map((plan) => (
                            <section className="flex items-center gap-3" key={plan}>
                                <div className="w-6 h-6 rounded-full bg-[#E8EDFB] flex justify-center items-center font-semibold text-white relative top-0.5">
                                    <Check size={'12px'} className="font-bold text-primary-0" />
                                </div>
                                <p className="text-xs font-medium">{plan}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </section>
            <section className="h-10 mt-6 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                <h3 className="font-semibold text-sm">Billing History</h3>
            </section>
            <Table className="mt-4  border rounded-md border-[#E3E3E3]">
                {/* <TableCaption>A list of your recent bookings.</TableCaption> */}
                <TableHeader className="">
                    <TableRow className="  ">
                        {headers.map((h) => (
                            <TableHead key={h} className="text-xs text-[#898384] ">
                                {' '}
                                {h}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 2, 3, 4, 5, 6].map((invoice) => (
                        <TableRow key={invoice}>
                            <TableCell className="font-medium text-xs ">Invoice 456t7</TableCell>
                            <TableCell className="font-medium text-xs text-[#5A5555]">Dec 1, 2024</TableCell>
                            <TableCell className="font-medium text-xs text-[#5A5555]">$20.00</TableCell>
                            <TableCell className="font-medium text-xs text-[#5A5555]">Pro plan</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal showModel={showPlan} setShowModal={setShowPlan} onClose={() => setShowPlan(false)}>
                <div className="p-4">
                    <h1 className="text-sm font-semibold">Upgrade to Professional</h1>
                    <p className="text-xs text-[#898384] mt-1">Upgrade your plan to benefit </p>
                    <div className="flex items-center mt-6 gap-6">
                        <h1 className="text-sm font-semibold">Professional</h1>
                        <Button variant={'outline'}>
                            <p className="text-lg font-medium">
                                $20 <span className="text-xs">per month</span>
                            </p>
                        </Button>
                    </div>
                    <section className="flex flex-col gap-2 mt-6">
                        {PropPlan.map((plan) => (
                            <section key={plan} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#E8EDFB] flex justify-center items-center font-semibold text-white relative top-0.5">
                                    <Check size={'12px'} className="font-bold text-primary-0" />
                                </div>
                                <p className="text-xs font-medium">{plan}</p>
                            </section>
                        ))}
                    </section>
                    <Button onClick={handleCloseUpgradeModal} className="text-xs w-full mt-6 bg-primary-0">
                        Upgrade to Pro
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default BillingsScreen;
