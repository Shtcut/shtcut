/** @format */

import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';
import { countries } from '@shtcut/_shared/data/countries';
import { CountryType } from '@shtcut/types/types';
import React, { useEffect, useState } from 'react';

interface CountriesInputProps {
    value: string;
    onChange: (value: string) => void;
    includePlusPrefix?: boolean;
    classNames?: string;
    showDivider?: boolean;
    showFlag?: boolean;
    required?: boolean;
    noRadius?: boolean;
    inputClassName?: string;
    selectClassName?: string;
}

const CountriesInput: React.FC<CountriesInputProps> = ({
    value,
    onChange,
    includePlusPrefix = false,
    classNames,
    showDivider = true,
    showFlag = true,
    required = true,
    inputClassName,
    selectClassName
}) => {
    const [selectedCountry, setSelectedCountry] = useState<CountryType>(
        countries.find((country) => country.code === 'NG') || countries[0]
    );
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const formattedPhoneNumber = `${includePlusPrefix ? '+' : ''}${selectedCountry.phone}${phoneNumber}`;
        onChange(formattedPhoneNumber);
    }, [selectedCountry, phoneNumber, onChange, includePlusPrefix]);

    const handleCountryChange = (value: string) => {
        const country = countries.find((c) => c.code === value);
        if (country) {
            setSelectedCountry(country);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phone = event.target.value.replace(/\D/g, '');
        setPhoneNumber(phone);
    };

    return (
        <div className={`flex border w-full rounded-full items-center h-10 ${classNames}`}>
            <Select value={selectedCountry.code} onValueChange={handleCountryChange}>
                <SelectTrigger
                    className={` ${includePlusPrefix ? 'w-40' : !showFlag ? 'w-20' : 'w-[130px]'}  ${
                        selectClassName ? selectClassName : 'border-none  rounded-l-full border-r-2'
                    }    `}
                >
                    <SelectValue>
                        <div className="flex items-center ">
                            {showFlag && (
                                <img
                                    loading="lazy"
                                    width="24"
                                    srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                    alt={selectedCountry.label}
                                    className="mr-2"
                                />
                            )}
                            <span className="flex items-center">{selectedCountry.code}</span>
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {countries.map((country: CountryType) => (
                        <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center">
                                <img
                                    loading="lazy"
                                    width="24"
                                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    alt={country.label}
                                    className="mr-2"
                                />
                                <span>{country.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                type="tel"
                value={value.replace(`${includePlusPrefix ? '+' : ''}${selectedCountry.phone}`, '')}
                onChange={handleInputChange}
                placeholder="URL"
                className={`border-0 ${showDivider ? 'border-l rounded-l-none' : ''} px-2 h-10 ${inputClassName} `}
                required={required}
            />
        </div>
    );
};

export default CountriesInput;
