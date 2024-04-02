'use client';

import {
    Avatar,
    AvatarImage,
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Progress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components';
import { useParams, usePathname } from 'next/navigation';
import { Copy, MousePointerClickIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import { IconDownload } from '@tabler/icons-react';
import Link from 'next/link';
import { LineChart } from '@shtcut/components/_shared/Analytics/LineChart';
import { BarChart } from '@shtcut/components/_shared/Analytics/BarChart';
import { LabelledpieChart } from '@shtcut/components/_shared/Analytics/LabelledpieChart';

const Overview = () => {
    const params = useParams();
    const pathname = usePathname();

    return (
        <LayoutBody className="container">
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
                <nav className="flex justify-end my-6">
                    <Button variant="outline">Last 24 hours</Button>
                    <Button variant="outline">Last 24 hours</Button>
                </nav>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
                    <Card className="flex flex-1 flex-col gap-4 p-4 md:gap-8 ">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>
                                <span className="text-[#05004E] font-bold">Today’s Clicks</span>
                            </CardTitle>
                            <div className="flex justify-between my-6">
                                <Button variant="outline">
                                    <IconDownload size={15} className="mr-2" /> Export
                                </Button>
                            </div>
                        </CardHeader>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-normal font-bold">200 of 300</div>
                                    <p className="text-xs text-muted-foreground text-[#4079ED]">+8% from yesterday</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total QR Codes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-normal font-bold">3 of 300</div>
                                    <p className="text-xs text-muted-foreground text-[#4079ED]">+8% from yesterday</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-normal font-bold">500</div>
                                    <p className="text-xs text-muted-foreground text-[#4079ED]">+8% from yesterday</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-normal font-bold">200</div>
                                    <p className="text-xs text-muted-foreground text-[#4079ED]">+8% from yesterday</p>
                                </CardContent>
                            </Card>
                        </div>
                    </Card>
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Total Clicks + Scans</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BarChart className="w-full h-[300px]" />
                        </CardContent>
                    </Card>
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
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">#</TableHead>
                                        <TableHead>Original Link</TableHead>
                                        <TableHead>Short Link</TableHead>
                                        <TableHead className="w-[120px]">Clicks</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">01</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <TwitterIcon className="text-blue-400" />
                                                <span>Twitter Link</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Link href="#">shtcut.com/Bn41aCOInxj</Link>
                                                <Button variant="ghost">
                                                    <Copy size={15} color="grey" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <MousePointerClickIcon className="text-blue-500" />
                                                <span>5000</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">02</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <YoutubeIcon className="text-red-600" />
                                                <span>Youtube Link</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Link href="#">shtcut.com/Bn41aCOInxj</Link>
                                                <Button variant="ghost">
                                                    <Copy size={15} color="grey" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <MousePointerClickIcon className="text-blue-500" />
                                                <span>5000</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="text-xl font-semibold mb-4">
                            Clicks + Scans Mapping by Country
                        </CardHeader>
                        <CardContent>
                            <LineChart className="w-full h-[300px]" />
                        </CardContent>
                    </Card>
                </section>
            </div>
        </LayoutBody>
    );
};

export default Overview;
