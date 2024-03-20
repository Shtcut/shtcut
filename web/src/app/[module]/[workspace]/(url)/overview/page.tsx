'use client';

import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components';
import { BarChartStats } from '@shtcut/components/_shared/Analytics/BarChartStats';
import { DeviceStats } from '@shtcut/components/_shared/Analytics/DeviceStats';

const Overview = () => {
    const analytics = [
        { device: 'desktop', visits: 2 },
        { device: 'mobile-android', visits: 1 }
    ];
    return (
        <LayoutBody className="space-y-4 bg-white w-full h-full">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Overview</h1>
                <div className="flex items-center space-x-2">
                    <Button>Download</Button>
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                        <Card className="col-span-1 lg:col-span-4">
                            <CardHeader>
                                <CardTitle>
                                    <h3 className="text-[#2F64E9]">Today’s Clicks</h3>
                                    <p className="font-normal mt-5">Clicks Summary</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-normal font-bold">200 of 300</div>
                                            <p className="text-xs text-muted-foreground text-[#4079ED]">
                                                +8% from yesterday
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total QR Codes</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-normal font-bold">3 of 300</div>
                                            <p className="text-xs text-muted-foreground text-[#4079ED]">
                                                +8% from yesterday
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-normal font-bold">500</div>
                                            <p className="text-xs text-muted-foreground text-[#4079ED]">
                                                +8% from yesterday
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-normal font-bold">200</div>
                                            <p className="text-xs text-muted-foreground text-[#4079ED]">
                                                +8% from yesterday
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 lg:col-span-3">
                        <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                                <CardDescription>You made 265 sales this month.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BarChartStats />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                        <Card className="col-span-1 lg:col-span-4">
                        <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                                <CardDescription>You made 265 sales this month.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BarChartStats />
                            </CardContent>
                        </Card>
                        <div className="col-span-1 lg:col-span-3">
                            <div className="col-span-1 lg:col-span-4">
                                <DeviceStats analytics={analytics} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutBody>
    );
};

export default Overview;
