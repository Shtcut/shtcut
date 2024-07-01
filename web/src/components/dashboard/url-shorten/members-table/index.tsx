import React from 'react';
import { Search } from 'lucide-react';
import { Button, Input } from '@shtcut-ui/react';
import { ChevronDown } from 'lucide-react';
import { Filter } from 'lucide-react';
import { PiSortDescendingBold } from 'react-icons/pi';
import { FormatName } from '@shtcut/_shared/constant';
import { ActionsTable } from '../actions';

const MembersTable = ({
    onOpenRole,
    onOpenDelete,
    onOpenAdded
}: {
    onOpenRole: () => void;
    onOpenDelete: () => void;
    onOpenAdded: () => void;
}) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    const getColor = (id: number): string => {
        return colors[id % colors.length];
    };
    const users = [
        {
            id: 1,
            name: 'Neil Sims',
            email: 'neil.sims@flowbite.com',
            position: 'React Developer',
            status: 'Online',
            img: '/docs/images/people/profile-picture-1.jpg',
            date: '2/04/24'
        },
        {
            id: 2,
            name: 'Bonnie Green',
            email: 'bonnie@flowbite.com',
            position: 'Designer',
            status: 'Online',
            img: '/docs/images/people/profile-picture-3.jpg',
            date: '2/04/24'
        },
        {
            id: 3,
            name: 'Jese Leos',
            email: 'jese@flowbite.com',
            position: 'Vue JS Developer',
            status: 'Online',
            img: '/docs/images/people/profile-picture-2.jpg',
            date: '2/04/24'
        },
        {
            id: 4,
            name: 'Thomas Lean',
            email: 'thomes@flowbite.com',
            position: 'UI/UX Engineer',
            status: 'Online',
            img: '/docs/images/people/profile-picture-5.jpg',
            date: '2/04/24'
        },
        {
            id: 5,
            name: 'Leslie Livingston',
            email: 'leslie@flowbite.com',
            position: 'SEO Specialist',
            status: 'Offline',
            img: '/docs/images/people/profile-picture-4.jpg',
            date: '2/04/24'
        },
        {
            id: 6,
            name: 'Leslie Livingston',
            email: 'leslie@flowbite.com',
            position: 'SEO Specialist',
            status: 'Offline',
            img: '/docs/images/people/profile-picture-4.jpg',
            date: '2/04/24'
        },
        {
            id: 7,
            name: 'Leslie Livingston',
            email: 'leslie@flowbite.com',
            position: 'SEO Specialist',
            status: 'Offline',
            img: '/docs/images/people/profile-picture-4.jpg',
            date: '2/04/24'
        },
        {
            id: 8,
            name: 'Leslie Livingston',
            email: 'leslie@flowbite.com',
            position: 'SEO Specialist',
            status: 'Offline',
            img: '/docs/images/people/profile-picture-4.jpg',
            date: '2/04/24'
        }
    ];

    return (
        <div className="relative  overflow-x-auto  sm:rounded-[10px]">
            <div className="flex items-center justify-between flex-wrap md:flex-nowrap   pb-4 dark:bg-gray-900">
                <div>
                    <h1 className="text-[22px] font-semibold text-[#2B2829]">Members</h1>
                </div>

                <div className="flex items-center space-x-[12px]">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search size={18} />
                        </div>
                        <Input
                            className="bg-[#fafafa] pl-8 w-48 text-xs text-[#433E3F] border border-[#CCCBCB] "
                            placeholder="Enter email"
                        />
                    </div>
                    <Button className="flex  items-center gap-x-2  bg-primary-0" onClick={onOpenAdded}>
                        Invite as Member <ChevronDown />
                    </Button>
                    <Button className="flex border hover:bg-primary-0 hover:text-white shadow-none text-[#5A5555] items-center bg-[#fafafa] gap-x-2 ">
                        <Filter size={20} /> Filter
                    </Button>
                    <Button className="flex border  hover:bg-primary-0 hover:text-white shadow-none text-[#5A5555] items-center bg-[#fafafa] gap-x-2 ">
                        <PiSortDescendingBold size={20} /> Sort by
                    </Button>
                </div>
            </div>
            <section className="w-full border rounded-[10px] mt-4">
                <table className="w-full text-sm  rounded-[10px]  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className=" text-[#898384] font-normal   dark:bg-gray-700 dark:text-gray-400">
                        <tr className="font-normal  ">
                            <th scope="col" className="px-6 py-3 font-normal  ">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 font-normal  ">
                                Email
                            </th>
                            <th scope="col" className=" py-3 font-normal  ">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3 font-normal  ">
                                Last active
                            </th>
                            <th scope="col" className="px-6 py-3 font-normal  " />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#5A5555] "
                            >
                                <th
                                    scope="row"
                                    className="flex items-center text-[#5A5555] px-6 py-4 whitespace-nowrap gap-x-2 font-normal dark:text-white"
                                >
                                    <div
                                        className={`${getColor(
                                            user.id
                                        )} w-7 h-7 rounded-full flex justify-center items-center text-white text-xs`}
                                    >
                                        {FormatName(user.name)}
                                    </div>
                                    <p className="text-sm  text-[#5A5555]">{user.name}</p>
                                </th>
                                <td className="px-6 py-4 text-sm text-[#5A5555]">{user.email}</td>
                                <div className="font-normal text-sm text-[#5A5555]">{user.position}</div>

                                <td className="px-6 py-4 text-sm text-[#5A5555]">{user.date}</td>
                                <td className="px-6 py-4">
                                    <ActionsTable onOpenRole={onOpenRole} onOpenDelete={onOpenDelete} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default MembersTable;
