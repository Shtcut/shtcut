import React, { useState } from 'react';
import { Button, FormControl, FormField, FormItem, Input } from '@shtcut-ui/react';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';

const InviteForm = ({ form }: { form: any }) => {
    const [inputs, setInputs] = useState(['', '', '']);

    const addInput = () => {
        if (inputs.length < 10) {
            setInputs([...inputs, '']);
        }
    };

    const removeInput = () => {
        setInputs(inputs.slice(0, -1));
    };
    const shouldApplyMaxHeight = inputs.length > 4;

    return (
        <div className={`flex flex-col gap-y-2 relative ${shouldApplyMaxHeight ? 'max-h-[200px] overflow-y-auto' : ''}`}>
            {inputs.map((value, index) => (
                <div key={index} className="relative">
                    <FormField
                        key={index}
                        control={form.control}
                        name={`email${index}`}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="user@email.com" className="" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-x-3 relative top-2 items-center">
                        {index === inputs.length - 1 && inputs.length < 10 && (
                            <div onClick={addInput} className="cursor-pointer  flex justify-end">
                                <Plus />
                            </div>
                        )}
                        {index === inputs.length - 1 && index >= 3 && (
                            <div onClick={removeInput} className="cursor-pointer   ">
                                <Minus className="text-red-500 text-sm" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div className="flex justify-end ">
                <Button className="text-primary-0" variant={'ghost'}>
                    + Get a shareable link
                </Button>
            </div>
        </div>
    );
};

export default InviteForm;
