'use client';

import {
    Badge,
    Button,
    Card,
    CardContent,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components';
import { CalendarDaysIcon, ChevronRightIcon, DotIcon, FilterIcon } from 'lucide-react';

const Domains = () => {
    return (
        <LayoutBody className="container">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">Domains</h1>
                <div className="flex items-center space-x-2">
                    <Button>Domains</Button>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="flex mt-8">
                    <div className="flex-grow space-y-6">
                        <div className="flex space-x-4 items-center">
                            <Input placeholder="Search here..." />
                            <Select>
                                <SelectTrigger id="sort">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="status">Status</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="flex items-center space-x-2" variant="outline">
                                <FilterIcon className="w-4 h-4" />
                                <span>Filter</span>
                            </Button>
                        </div>
                        <div className="bg-[#F9FAFB] p-4 rounded-lg">
                            <p className="text-sm">
                                Elevate your domain`s visibility by creating a QR code tailored just for you
                            </p>
                        </div>
                        <div className="space-y-4">
                            <Card className="bg-white shadow-sm rounded-lg">
                                <CardContent className="p-4">
                                    <div className="flex justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                                            <span className="text-sm text-gray-500">Jan 20, 2024</span>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                            <Badge variant="secondary">24 Clicks</Badge>
                                            <Button variant="ghost">
                                                <DotIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="mt-2 font-semibold">lizzy.com.ng</h3>
                                    <a className="text-sm text-blue-600 block mt-1" href="#">
                                        https://shtcut.link/dhSxuSS
                                    </a>
                                    <div className="flex space-x-2 items-center mt-2">
                                        <Badge variant="default">Invalid Configuration</Badge>
                                        <Badge variant="default">No redirect Configured</Badge>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm">
                                            To configure your apex domain
                                            <a className="text-blue-600" href="#">
                                                elxoe_difigama
                                            </a>
                                            , set the following A record on your DNS provider to continue:
                                            {'\n                              '}
                                        </p>
                                        <div className="bg-white rounded-lg shadow-sm p-4 mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold">Type</p>
                                                    <p className="text-sm">A</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">Name</p>
                                                    <p className="text-sm">@</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">Value</p>
                                                    <p className="text-sm">76.7.21.21</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">TTL</p>
                                                    <p className="text-sm">86400</p>
                                                </div>
                                            </div>
                                            <p className="text-sm mt-2">
                                                Note: For TTL, if 86400 is not available, set the highest value
                                                possible. Also, domain propagation can take anywhere between 1 hour to
                                                12 hours.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-sm rounded-lg">
                                <CardContent className="p-4">
                                    <div className="flex justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                                            <span className="text-sm text-gray-500">Jan 20, 2024</span>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                            <Badge variant="secondary">24 Clicks</Badge>
                                            <Button variant="ghost">
                                                <DotIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="mt-2 font-semibold">lizzy.com.ng</h3>
                                    <a className="text-sm text-blue-600 block mt-1" href="#">
                                        https://shtcut.link/dhSxuSS
                                    </a>
                                    <div className="flex space-x-2 items-center mt-2">
                                        <Badge variant="default">Invalid Configuration</Badge>
                                        <Badge variant="default">No redirect Configured</Badge>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm">
                                            To configure your apex domain
                                            <a className="text-blue-600" href="#">
                                                elxoe_difigama
                                            </a>
                                            , set the following A record on your DNS provider to continue:
                                            {'\n                              '}
                                        </p>
                                        <div className="bg-white rounded-lg shadow-sm p-4 mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold">Type</p>
                                                    <p className="text-sm">A</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">Name</p>
                                                    <p className="text-sm">@</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">Value</p>
                                                    <p className="text-sm">76.7.21.21</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">TTL</p>
                                                    <p className="text-sm">86400</p>
                                                </div>
                                            </div>
                                            <p className="text-sm mt-2">
                                                Note: For TTL, if 86400 is not available, set the highest value
                                                possible. Also, domain propagation can take anywhere between 1 hour to
                                                12 hours.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <p className="text-sm text-gray-500">Showing 4-8 of 8 links</p>
                        </div>
                    </div>
                    <div className="w-80 ml-8">
                        <Card className="bg-white shadow-sm rounded-lg">
                            <CardContent className="p-4">
                                <h3 className="font-semibold">Domains</h3>
                                <div className="flex items-center mt-4">
                                    <Input placeholder="Search tags" />
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <a className="text-sm text-blue-600" href="#">
                                            elizabetholoye.com
                                        </a>
                                        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <a className="text-sm text-blue-600" href="#">
                                            elizabethlloloye.com
                                        </a>
                                        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <a className="text-sm text-blue-600" href="#">
                                            elizabethlloloye.com
                                        </a>
                                        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="border-t mt-4 pt-4">
                                    <h4 className="font-semibold text-sm">Optional</h4>
                                    <div className="mt-2">
                                        <a className="text-sm text-blue-600" href="#">
                                            Links
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <a className="text-sm text-blue-600" href="#">
                                            Analytics
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <a className="text-sm text-blue-600" href="#">
                                            Analytics
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <a className="text-sm text-blue-600" href="#">
                                            Analytics
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LayoutBody>
    );
};

export default Domains;
