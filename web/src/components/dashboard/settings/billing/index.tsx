import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Separator } from '@shtcut-ui/react';
const BillingsScreen = () => {
    const headers = ['Invoice', 'Billing Date', 'Amount', 'Plan'];
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
                <Button className="text-xs bg-primary-0 h-9 rounded">Upgrade to Pro</Button>
            </section>
            <section className="flex justify-between gap-4 mt-6">
                <div className="w-1/2 border rounded">
                    <h1 className="text-sm rounded-b bg-[#F7F7F7] font-semibold border-b p-2">Monthly Usage</h1>
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
                    <h1 className="text-sm rounded-b bg-[#F7F7F7] font-semibold border-b p-2">Plan Limits</h1>
                    <div className="flex p-3 flex-col gap-4"></div>
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
                            <TableHead key={h} className="text-xs text-[#898384] "> {h}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 2, 3, 4, 5, 6].map((invoice, index) => (
                        <TableRow key={invoice}>
                            <TableCell className="font-medium text-xs ">Invoice 456t7</TableCell>
                            <TableCell className="font-medium text-xs text-[#5A5555]">Dec 1, 2024</TableCell>
                            <TableCell className="font-medium text-xs text-[#5A5555]">$20.00</TableCell>
                            <TableCell className="font-medium text-xs text-[#5A5555]">Pro plan</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BillingsScreen;
