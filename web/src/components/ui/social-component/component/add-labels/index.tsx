import { Button, Checkbox } from '@shtcut-ui/react';
import { initialLabels, labelColors } from '@shtcut/_shared/data';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import React, { useState } from 'react';

const AddLabels = ({
    handleClose,
    handleOpen
}: {
    handleClose: () => void;
    handleOpen: (open: boolean, modalType: string) => void;
}) => {
    const [labels, setLabels] = useState(initialLabels);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredLabels = labels.filter((label) => label.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCheckboxToggle = (id: string) => {
        setSelectedLabels((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((labelId) => labelId !== id) : [...prevSelected, id]
        );
    };

    const handleCreateLabel = () => {
        handleOpen(true, 'create-labels');
    };

    return (
        <div>
            <section className="flex border-b pb-2 items-center justify-between">
                <p className="text-sm font-semibold">Labels</p>
                <p
                    className="border-b border-b-primary-0 text-xs cursor-pointer font-medium text-primary-0"
                    onClick={() => handleOpen(true, 'create-labels')}
                >
                    Add New Labels
                </p>
            </section>
            <section className="w-full mt-4">
                <SearchInput
                    className="w-full"
                    removeIcon={true}
                    placeholder="Search or create Label"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <section className="flex mt-4 gap-4 flex-col">
                    {filteredLabels.length > 0 ? (
                        filteredLabels.map((label, index) => (
                            <section key={label.id} className="flex items-center gap-x-2">
                                <Checkbox
                                    className="float-left w-3.5 h-3.5 mt-0.5"
                                    checked={selectedLabels.includes(label.id)}
                                    onCheckedChange={() => handleCheckboxToggle(label.id)}
                                />
                                <section
                                    className="w-16 h-6 rounded-[8px] flex items-center justify-center"
                                    style={{
                                        backgroundColor: labelColors[index % labelColors.length]
                                            .replace('bg-[', '')
                                            .replace(']', '')
                                    }}
                                >
                                    <p className="text-[10px] font-medium text-white">{label.name}</p>
                                </section>
                            </section>
                        ))
                    ) : (
                        <p className="text-xs text-gray-500">
                            No results found for &ldquo;{searchTerm || 'announcement'}&ldquo;, click the button on the
                            top right to{' '}
                            <span onClick={handleCreateLabel} className="font-semibold cursor-pointer">
                                add a new label.
                            </span>
                        </p>
                    )}
                </section>
                <section className="flex items-center mt-6 gap-x-4 w-full">
                    <Button variant={'outline'} className="w-full text-xs" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="w-full text-xs bg-primary-0">Done</Button>
                </section>
            </section>
        </div>
    );
};

export default AddLabels;
