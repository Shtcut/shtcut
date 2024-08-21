import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    FormLabel,
    SelectTrigger,
    Select,
    SelectValue,
    SelectContent,
    SelectItem,
    FormDescription,
    Dict
} from '@shtcut-ui/react';
import { capacities } from '@shtcut/_shared/data';

const TeamForm = ({ form }: { form: Dict }) => {
    return (
        <div className="flex gap-x-3 items-center w-full relative">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-[#0F172A]">Provide a name for your team</FormLabel>
                        <FormControl>
                            <Input placeholder="" className="" {...field} />
                        </FormControl>
                        <FormDescription className="absolute">You can change this later</FormDescription>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-[#0F172A]">Number of users</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue>{field.value || 'Number of users'}</SelectValue>
                                </SelectTrigger>
                                <SelectContent className="">
                                    {capacities.map((capacity, idx) => (
                                        <SelectItem key={`${capacity}-${idx}`} value={capacity}>
                                            {capacity}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default TeamForm;
