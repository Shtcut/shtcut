'use client';

import { Button, Modal, Dict } from '@shtcut-ui/react';
import { LinkForm } from '@shtcut/components';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';

interface LinkContainer {}

export const LinkContainer = (props: LinkContainer) => {
    const [openLinkForm, setOpenLinkForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleVisibility = (open: boolean) => {
        setOpenLinkForm(open);
    };

    const handleSubmitForm = (payload: Dict) => {};

    const handleShowForm = () => {
        setShowCreateForm(true);
    };

    return (
        <DndContext>
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">Links</h1>
                <Button
                    onClick={() => handleVisibility(true)}
                    className="bg-blue-600 w-[231px] font-medium flex justify-center items-center h-10 px-8 rounded-md text-white hover:bg-blue-700"
                >
                    Create Link
                </Button>
            </div>
            <LinkForm linkProps={{ url: '' }} handleSubmitForm={handleSubmitForm} />
            <div className="flex-1 p-6">
                {/* <div className="flex justify-between items-center mb-6">
                    <div className="relative rounded-md">
                        <Input className="w-[300px]" placeholder="Search here..." />
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline">Filter</Button>
                        <Select>
                            <SelectTrigger id="sort">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LayoutGridIcon className="text-gray-400 h-6 w-6" />
                        <ListIcon className="text-blue-500 h-6 w-6" />
                    </div>
                </div> */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        {/* {dummyLinkHistory.map(({ id, ...link }) => (
                                <Fragment key={id}>
                                    <motion.div
                                        key={id}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <SortableContext
                                            items={dummyLinkHistory && dummyLinkHistory}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <LinkCard key={id} id={id} {...link} />
                                        </SortableContext>
                                    </motion.div>
                                </Fragment>
                            ))
                        }
                        {Array.from({ length: 5 }).map((_, i) => (
                            <LinkSkeleton key={i} />
                        ))} */}
                        {/* <div className="flex justify-center items-center flex-col border mb-4 p-6  rounded-lg text-center">
                            <div className="mt-4 w-[245px] h-auto flex flex-col mx-auto">
                                <Image
                                    className="object-cover"
                                    width="431"
                                    height="220"
                                    alt="not-found"
                                    src="/no-data-found.svg"
                                />
                            </div>
                            <p className="text-sm my-4">No Links Yet! Get started – create your unique link now</p>
                            <Button className="bg-blue-600" onClick={() => handleVisibility(true)}>
                                Create Link
                            </Button>
                        </div> */}
                        <p className="text-center text-sm text-gray-500 mt-4">Showing 0-0 of 0 links</p>
                    </div>
                    {/* <div className="p-6 border bg-white rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Domains</h2>
                            <ChevronDownIcon className="text-gray-400 h-5 w-5" />
                        </div>
                        <Input placeholder="Search tags" />
                        <div className="mt-4 space-y-2">
                            <Badge variant="secondary">Links</Badge>
                            <Badge variant="secondary">Analytics</Badge>
                            <Badge variant="secondary">Analytics</Badge>
                            <Badge variant="secondary">Analytics</Badge>
                        </div>
                    </div> */}
                </div>
            </div>

            <Modal
                showModel={openLinkForm}
                setShowModal={setOpenLinkForm}
                showCloseIcon={true}
                useDrawer={true}
                onClose={() => handleVisibility(false)}
                className="max-w-screen-xl"
            >
                <LinkForm linkProps={{ url: '' }} handleSubmitForm={handleSubmitForm} />
            </Modal>
        </DndContext>
    );
};
