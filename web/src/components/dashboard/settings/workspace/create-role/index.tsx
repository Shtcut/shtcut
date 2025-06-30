import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Checkbox,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Label,
    toast
} from '@shtcut-ui/react';
import { handleError } from '@shtcut/_shared';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import { createRoleSchema, updateRoleSchema } from '@shtcut/components/form/auth/sign-up-form/validation';
import StarLoader from '@shtcut/components/loader/star-loader';
import { useCurrentWorkSpace } from '@shtcut/hooks/current-workspace';
import { usePermission } from '@shtcut/hooks/permissions';
import { useRole } from '@shtcut/hooks/roles';
import { RolesDataResponse } from '@shtcut/types/workspace';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateRoleFormValues = z.infer<typeof createRoleSchema>;

const CreateRole = ({
    onClose,
    singleRole,
    handleRefreshRoles
}: {
    onClose: () => void;
    handleRefreshRoles: () => void;
    singleRole: RolesDataResponse | null;
}) => {
    const currentWorkspace = useCurrentWorkSpace();
    const { createRole, setLoadingState, isLoadingState, createRoleResponse, updateRole, updateRoleResponse } = useRole(
        {
            callRoles: true
        }
    );
    const { permissionsData, isLoading } = usePermission({ callPermissions: true });
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const form = useForm<CreateRoleFormValues>({
        resolver: zodResolver(singleRole ? updateRoleSchema : createRoleSchema),
        defaultValues: {
            title: singleRole?.title || '',
            permissions: []
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const handleCheckboxChange = async (role: string) => {
        const updatedRoles = selectedRoles.includes(role)
            ? selectedRoles.filter((item) => item !== role)
            : [...selectedRoles, role];

        setSelectedRoles(updatedRoles);
        form.setValue('permissions', updatedRoles, { shouldValidate: true });
    };

    const onSubmit = async (values: CreateRoleFormValues) => {
        setLoadingState(singleRole ? 'updating' : 'creating', true);

        const createPayload = {
            ...values,
            workspace: currentWorkspace?._id,
            permissions: selectedRoles
        };

        const updatePayload = {
            ...values
        };

        try {
            if (singleRole) {
                await updateRole({ id: singleRole._id, payload: updatePayload }).unwrap();
                const successMessage = updateRoleResponse?.meta?.message || 'Role updated successfully.';
                toast({
                    variant: 'default',
                    title: 'Role Updated',
                    description: successMessage
                });
            } else {
                await createRole(createPayload).unwrap();
                const successMessage = createRoleResponse?.meta?.message || 'Role created successfully.';
                toast({
                    variant: 'default',
                    title: 'Role Created',
                    description: successMessage
                });
            }
            handleRefreshRoles();
            onClose();
        } catch (error) {
            handleError({ error });
        } finally {
            setLoadingState(singleRole ? 'updating' : 'creating', false);
        }
    };

    return (
        <div className="">
            <div className="flex items-center justify-between border-b pt-2 pb-4">
                <h1 className="font-medium"> {singleRole ? '  Update Role' : '  Create Role'}</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <section className="mt-4 border-b pb-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label className="text-sm">Role Name</Label>
                                    <FormControl>
                                        <Input placeholder="role" className="h-10" {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                    {!singleRole && (
                        <div className=" border-b pb-6 flex flex-col pt-4 gap-4">
                            <FormField
                                control={form.control}
                                name="permissions"
                                render={({ field, fieldState }) => (
                                    <FormItem className="mt-0 pt-0">
                                        <FormControl>
                                            <Input
                                                className="mt-0 pt-0"
                                                type="hidden"
                                                {...field}
                                                value={selectedRoles}
                                            />
                                        </FormControl>
                                        {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />
                            {isLoading ? (
                                <div>
                                    <StarLoader />
                                </div>
                            ) : permissionsData && permissionsData?.data?.length > 0 ? (
                                permissionsData.data.map((per, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <Checkbox
                                            id={per?._id}
                                            checked={selectedRoles.includes(per?._id)}
                                            onCheckedChange={() => handleCheckboxChange(per?._id)}
                                        />
                                        <Label htmlFor={per?._id} className="ml-2 text-xs text-[#464748] font-medium">
                                            {per?.title}
                                        </Label>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-gray-500">No permissions available.</div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-6">
                        <Button variant={'outline'} className="w-full h-9 text-xs" onClick={onClose}>
                            Cancel
                        </Button>
                        <LoadingButton
                            type="submit"
                            loading={isLoadingState}
                            className="w-full h-9 text-xs bg-primary-0"
                        >
                            {singleRole ? '  Update Role' : '  Create Role'}
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateRole;
