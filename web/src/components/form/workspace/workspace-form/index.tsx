'use client';

import {
    Button,
    Card,
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    cn
} from '@shtcut-ui/react';
import { workspaceValidationSchema } from './validation';
import { AppButton } from '@shtcut/components/_shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, HTMLAttributes, useMemo, useState } from 'react';
import z from 'zod';
import { IconBrush, IconHeading, IconHelp } from '@tabler/icons-react';
import { GRADIENTS, IMAGES } from '@shtcut/_shared/constant';
import slugify from 'react-slugify';
import { TooltipWrapper } from '@shtcut/components/_shared/TooltipWrapper';

interface WorkspaceFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleWorkspaceSubmit: (payload: Dict) => void;
    error?: string;
}

export const WorkspaceForm = (props: WorkspaceFormProps) => {
    const { isLoading, handleWorkspaceSubmit, error, className } = props;
    const [background, setBackground] = useState('');

    const form = useForm<z.infer<typeof workspaceValidationSchema>>({
        resolver: zodResolver(workspaceValidationSchema),
        defaultValues: {
            name: '',
            slug: ''
        }
    });

    const defaultTab = useMemo(() => {
        if (background.includes('url')) return 'image';
        if (background.includes('gradient')) return 'gradient';
        return 'solid';
    }, [background]);

    const handleFormSubmit = (values: z.infer<typeof workspaceValidationSchema>) => {
        const payload = {
            ...values,
            logo: background
        };
        handleWorkspaceSubmit(payload);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        form.setValue('name', e.target.value);
        form.setValue('slug', slugify(e.target.value));
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-2">
                        <div className="mt-1">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field: { onChange, ...rest } }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex gap-1">
                                            <div>
                                                <FormLabel>Workspace name</FormLabel>
                                            </div>
                                            <div>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <IconHelp size={15} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <Label className="font-light">
                                                                This is the name of your workspace on shtcut.app.
                                                            </Label>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input
                                                className="h-11"
                                                placeholder="Facebook Inc"
                                                onChange={handleOnChange}
                                                {...rest}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-2">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <FormLabel>Workspace Slug</FormLabel>
                                            </div>
                                            <div>
                                                <TooltipProvider>
                                                    
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <IconHelp size={15} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <Label className="font-light">
                                                                This is your workspace`s unique slug on shtcut.
                                                            </Label>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>

                                        <FormControl>
                                            <div className="flex items-center text-gray-400 border rounded-md">
                                                <div className="px-3 py-2.5 rounded-l-md text-gray-400 bg-gray-50 border-r">
                                                    shtcut.app
                                                </div>
                                                <Input className="h-11" placeholder="facebook-inc" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>{' '}
                        <div className="mt-2">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <FormLabel>Workspace logo</FormLabel>
                                            </div>
                                            <div>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <IconHelp size={15} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <Label className="font-light">
                                                                This is your workspace`s unique slug on shtcut.
                                                            </Label>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>

                                        <FormControl>
                                            <div className="flex items-center text-gray-400 border rounded-md">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'w-[320px] justify-start text-left font-normal'
                                                            )}
                                                        >
                                                            <div className="flex w-full items-center gap-2">
                                                                {background ? (
                                                                    <div
                                                                        className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                                                                        style={{ background }}
                                                                    ></div>
                                                                ) : (
                                                                    <IconBrush className="h-4 w-4" />
                                                                )}
                                                                <div className="flex-1 truncate">
                                                                    {background ? background : 'Pick a color or image'}
                                                                </div>
                                                            </div>
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <Tabs defaultValue={defaultTab}>
                                                            <TabsList className="mb-4 w-full">
                                                                <TabsTrigger className="flex-1" value="gradient">
                                                                    Gradient
                                                                </TabsTrigger>
                                                                <TabsTrigger className="flex-1" value="image">
                                                                    Image
                                                                </TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="gradient" className="mt-0">
                                                                <div className="mb-2 flex flex-wrap gap-1">
                                                                    {GRADIENTS.map((s) => (
                                                                        <div
                                                                            key={s}
                                                                            style={{ background: s }}
                                                                            className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                                                                            onClick={() => setBackground(s)}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="image" className="mt-0">
                                                                <div className="mb-2 grid grid-cols-2 gap-1">
                                                                    {IMAGES.map((s) => (
                                                                        <div
                                                                            key={s}
                                                                            style={{ backgroundImage: s }}
                                                                            className="h-12 w-full cursor-pointer rounded-md bg-cover bg-center active:scale-105"
                                                                            onClick={() => setBackground(s)}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <AppButton
                            className="mt-5 h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                            loading={isLoading}
                        >
                            Create workspace
                        </AppButton>
                    </div>
                </form>
            </Form>
        </div>
    );
};
