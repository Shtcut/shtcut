'use client';

import {
    Avatar,
    AvatarImage,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Progress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components';
import { BarChartStats } from '@shtcut/components/_shared/Analytics/BarChartStats';
import { DeviceStats } from '@shtcut/components/_shared/Analytics/DeviceStats';
import { useParams } from 'next/navigation';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

const Overview = () => {
    const params = useParams();

    const analytics = [
        { device: 'desktop', visits: 2 },
        { device: 'mobile-android', visits: 1 }
    ];
    return (
        <LayoutBody className=" bg-white w-full h-full">
            <div className="bg-white p-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Analytics</h1>
                    <div className="flex items-center space-x-4">
                        <Button className="bg-blue-500 text-white" variant="secondary">
                            Upgrade
                        </Button>
                        <Avatar>
                            <AvatarImage alt="User profile" src="/placeholder.svg?height=40&width=40" />
                        </Avatar>
                    </div>
                </header>
                <nav className="flex justify-between my-6">
                    <div className="flex space-x-4">
                        <Button variant="ghost">History</Button>
                        <Button variant="ghost">Analytics</Button>
                        <Button variant="ghost">Domains</Button>
                        <Button variant="ghost">Settings</Button>
                    </div>
                    <Button variant="outline">Last 24 hours</Button>
                </nav>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
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
                    </div>
                    <div className="col-span-1">
                        <Card>
                            <CardContent>
                                <BarChart className="w-full h-[300px]" />
                            </CardContent>
                        </Card>
                    </div>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
                    <Card>
                        <CardHeader className="text-xl font-semibold mb-4">
                            Top Hits (Clicks + scans by location)
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Popularity</TableHead>
                                        <TableHead>Clicks</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">01</TableCell>
                                        <TableCell>Nigeria</TableCell>
                                        <TableCell>
                                            <Progress className="w-[60%]" value={45} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="default">45%</Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">02</TableCell>
                                        <TableCell>USA</TableCell>
                                        <TableCell>
                                            <Progress className="w-[60%]" value={29} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">29%</Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">03</TableCell>
                                        <TableCell>Australia</TableCell>
                                        <TableCell>
                                            <Progress className="w-[60%]" value={18} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-[#8a4dff] text-white">18%</Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">04</TableCell>
                                        <TableCell>United Kingdom</TableCell>
                                        <TableCell>
                                            <Progress className="w-[60%]" value={25} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-[#ff9f0a] text-white">25%</Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="text-xl font-semibold mb-4">Devices</CardHeader>
                        <CardContent>
                            <LabelledpieChart className="w-full h-[300px]" />
                        </CardContent>
                    </Card>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader className="text-xl font-semibold mb-4">Top Links</CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Twitter Link</TableCell>
                                        <TableCell>http://shcut.com/aBnloCinQl</TableCell>
                                        <TableCell>5000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Youtube Link</TableCell>
                                        <TableCell>http://shcut.com/bAnloCinQl</TableCell>
                                        <TableCell>6000</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Clicks + Scans Mapping by Country</h2>
                        <LineChart className="w-full h-[300px]" />
                    </div>
                </section>
            </div>
        </LayoutBody>
    );
};

function BarChart(props) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={[
                    { name: 'Jan', count: 111 },
                    { name: 'Feb', count: 157 },
                    { name: 'Mar', count: 129 },
                    { name: 'Apr', count: 150 },
                    { name: 'May', count: 119 },
                    { name: 'Jun', count: 72 }
                ]}
                keys={['count']}
                indexBy="name"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={['#2563eb']}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 4,
                    tickPadding: 16
                }}
                gridYValues={4}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: '9999px'
                        },
                        container: {
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            borderRadius: '6px'
                        }
                    },
                    grid: {
                        line: {
                            stroke: '#f3f4f6'
                        }
                    }
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing data"
            />
        </div>
    );
}

function LabelledpieChart(props) {
    return (
        <div {...props}>
            <ResponsivePie
                data={[
                    { id: 'Jan', value: 111 },
                    { id: 'Feb', value: 157 },
                    { id: 'Mar', value: 129 },
                    { id: 'Apr', value: 150 },
                    { id: 'May', value: 119 },
                    { id: 'Jun', value: 72 }
                ]}
                sortByValue
                margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={3}
                activeOuterRadiusOffset={2}
                borderWidth={1}
                arcLinkLabelsThickness={1}
                enableArcLabels={false}
                colors={['#2563eb']}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: '9999px'
                        },
                        container: {
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            borderRadius: '6px'
                        }
                    }
                }}
                role="application"
            />
        </div>
    );
}

function LineChart(props) {
    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: 'Desktop',
                        data: [
                            { x: 'Jan', y: 43 },
                            { x: 'Feb', y: 137 },
                            { x: 'Mar', y: 61 },
                            { x: 'Apr', y: 145 },
                            { x: 'May', y: 26 },
                            { x: 'Jun', y: 154 }
                        ]
                    },
                    {
                        id: 'Mobile',
                        data: [
                            { x: 'Jan', y: 60 },
                            { x: 'Feb', y: 48 },
                            { x: 'Mar', y: 177 },
                            { x: 'Apr', y: 78 },
                            { x: 'May', y: 96 },
                            { x: 'Jun', y: 204 }
                        ]
                    }
                ]}
                margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                xScale={{
                    type: 'point'
                }}
                yScale={{
                    type: 'linear'
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16
                }}
                colors={['#2563eb', '#e11d48']}
                pointSize={6}
                useMesh={true}
                gridYValues={6}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: '9999px'
                        },
                        container: {
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            borderRadius: '6px'
                        }
                    },
                    grid: {
                        line: {
                            stroke: '#f3f4f6'
                        }
                    }
                }}
                role="application"
            />
        </div>
    );
}

export default Overview;
