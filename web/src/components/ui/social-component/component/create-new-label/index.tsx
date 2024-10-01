import { Input, Button, Card } from '@shtcut-ui/react';
import React, { useState } from 'react';

const colorOptions = [
    { id: 1, color: '#D58080' },
    { id: 2, color: '#FFDD55' },
    { id: 3, color: '#C837AB' },
    { id: 4, color: '#06B217' },
    { id: 5, color: '#8789F3' },
    { id: 6, color: '#454CEE' },
    { id: 7, color: '#141414' }
];

const CreateNewLabel = ({ handleClose }: { handleClose: () => void }) => {
    const [labelName, setLabelName] = useState('');
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const handleCreateLabel = () => {
        if (labelName && selectedColor) {
            console.log(`Label: ${labelName}, Color: ${selectedColor}`);
            handleClose();
        } else {
            alert('Please enter a label name and select a color.');
        }
    };

    return (
        <div>
            <section className="border-b pb-2">
                <p className="text-sm font-semibold">Add New Label</p>
            </section>

            <div className="mt-4 relative">
                <Input placeholder="Label Name" value={labelName} onChange={(e) => setLabelName(e.target.value)} />
                <section className="flex absolute right-2 justify-end">
                    {labelName && selectedColor && (
                        <section className="mt-4 flex items-center justify-center">
                            <div
                                className="w-16 h-6 rounded-[8px] flex items-center justify-center"
                                style={{ backgroundColor: selectedColor }}
                            >
                                <p className="text-xs font-medium text-white">{labelName}</p>
                            </div>
                        </section>
                    )}
                </section>
            </div>

            <section className="mt-8">
                <p className="text-sm font-medium text-[#2B2829]">Select a color</p>
                <div className="flex gap-2 mt-2">
                    {colorOptions.map((option) => (
                        <Card
                            key={option.id}
                            className={`w-8 h-8 rounded-full cursor-pointer border ${selectedColor === option.color ? 'border-black' : 'border-transparent'}`}
                            style={{ backgroundColor: option.color }}
                            onClick={() => setSelectedColor(option.color)}
                        />
                    ))}
                </div>
            </section>

            <section className="flex items-center mt-6 gap-x-4 w-full">
                <Button variant={'outline'} className="w-full text-xs" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="w-full text-xs bg-primary-0" onClick={handleCreateLabel}>
                    Done
                </Button>
            </section>
        </div>
    );
};

export default CreateNewLabel;
