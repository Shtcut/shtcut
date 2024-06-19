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
    FormDescription
} from '@shtcut-ui/react';
const TeamForm = ({ form }: { form: any }) => {
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
                        <FormDescription className='absolute'>You can change this later</FormDescription>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-[#0F172A]">Number of users</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue>{field.value || ' Number of users'}</SelectValue>
                                </SelectTrigger>
                                <SelectContent className="">
                                    <SelectItem value="1-5">1-5</SelectItem>
                                    <SelectItem value="5-10">5-10</SelectItem>
                                    <SelectItem value="10-50">10-50</SelectItem>{' '}
                                    <SelectItem value="50-100">50-100</SelectItem>
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
