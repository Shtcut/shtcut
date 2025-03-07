import { Card, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useAppDispatch } from '@shtcut/redux/store';
import useGeneralState from '@shtcut/hooks/general-state';
import { updateContactField } from '@shtcut/redux/slices/selects';
import { useCountryStateSelectors } from '@shtcut/components/country-select/country';

const ContactInfo = ({
    isVisible,
    toggleVisibility,
    showOthers
}: {
    isVisible: boolean;
    showOthers?: boolean;
    toggleVisibility: () => void;
}) => {
    const dispatch = useAppDispatch();
    const [isEditingCountry, setIsEditingCountry] = React.useState(false);
    const { contactInfo } = useGeneralState();
    const { countryOptions, stateOptions, selectedCountry, selectedState, setSelectedCountry, setSelectedState } =
        useCountryStateSelectors({
            defaultCountry: contactInfo?.country,
            defaultState: contactInfo?.state
        });

    const onCountryChange = (value: string) => {
        const selected = countryOptions.find((option) => option.value === value) || null;
        setSelectedCountry(selected);
        dispatch(updateContactField({ key: 'country', value: selected?.label ?? '' }));
    };

    const onStateChange = (value: string) => {
        const selected = stateOptions.find((option) => option.value === value) || null;
        setSelectedState(selected);
        dispatch(updateContactField({ key: 'state', value: selected?.label ?? '' }));
    };

    const [open, setOpen] = React.useState(false);

    const handleEditCountry = () => {
        setIsEditingCountry(true);
        setOpen(true);
    };

    const handleCountryChange = (value: string) => {
        onCountryChange(value);
        setIsEditingCountry(false);
    };

    return (
        <Card
            className={`mt-4 py-4 ${showOthers ? 'shadow-none border-none' : 'px-6 shadow-sm border border-gray-100'}`}
        >
            <section className="flex justify-between">
                <section className="flex flex-col gap-2">
                    <Label>Contact Information&apos;s</Label>
                    <p className="text-sm text-[#5A5555]">Enter details</p>
                </section>
                {!showOthers &&
                    (isVisible ? (
                        <Minus onClick={toggleVisibility} className="cursor-pointer" />
                    ) : (
                        <Plus onClick={toggleVisibility} className="cursor-pointer" />
                    ))}
            </section>
            {isVisible && (
                <section className="mt-4">
                    <section className="border-b pb-3 flex flex-col w-full gap-3">
                        <Input
                            placeholder="Phone Number"
                            value={contactInfo?.phoneNumber ?? ''}
                            onChange={(e) =>
                                dispatch(updateContactField({ key: 'phoneNumber', value: e.target.value }))
                            }
                            type="text"
                        />
                        <Input
                            placeholder="Email Address"
                            type="email"
                            value={contactInfo?.email ?? ''}
                            onChange={(e) => dispatch(updateContactField({ key: 'email', value: e.target.value }))}
                        />
                        <Input
                            placeholder="Website URL"
                            value={contactInfo.websiteUrl}
                            onChange={(e) => dispatch(updateContactField({ key: 'websiteUrl', value: e.target.value }))}
                            type="url"
                        />
                    </section>
                    <section className="mt-4">
                        <Label>Address</Label>
                        <section className="flex flex-col gap-3 mt-4">
                            <Input
                                placeholder="Street Address"
                                value={contactInfo.streetAddress}
                                onChange={(e) =>
                                    dispatch(updateContactField({ key: 'streetAddress', value: e.target.value }))
                                }
                            />
                            <section className="flex items-center gap-2">
                                <section className="flex items-center gap-2 w-full">
                                    {isEditingCountry || !contactInfo.country ? (
                                        <Select
                                            value={selectedCountry?.value ?? ''}
                                            onValueChange={handleCountryChange}
                                            open={open}
                                            onOpenChange={setOpen}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Country" className="text-sm" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countryOptions.map((country) => (
                                                    <SelectItem key={country.value} value={country.value}>
                                                        {country.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            placeholder="Country"
                                            value={contactInfo.country}
                                            readOnly
                                            onClick={handleEditCountry}
                                        />
                                    )}
                                </section>
                                {stateOptions.length > 0 ? (
                                    <Select value={selectedState?.value ?? ''} onValueChange={onStateChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder="State"
                                                className="placeholder:text-muted-foreground"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {stateOptions.map((state) => (
                                                <SelectItem key={state.value} value={state.value}>
                                                    {state.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input
                                        placeholder="State"
                                        value={contactInfo.state}
                                        onChange={(e) =>
                                            dispatch(updateContactField({ key: 'state', value: e.target.value }))
                                        }
                                    />
                                )}
                                <Input
                                    placeholder="Zip Code"
                                    value={contactInfo.zipCode}
                                    onChange={(e) =>
                                        dispatch(updateContactField({ key: 'zipCode', value: e.target.value }))
                                    }
                                    type="number"
                                />
                            </section>
                            <Input
                                placeholder="City"
                                value={contactInfo.city}
                                onChange={(e) => dispatch(updateContactField({ key: 'city', value: e.target.value }))}
                            />
                        </section>
                    </section>
                </section>
            )}
        </Card>
    );
};

export default ContactInfo;
