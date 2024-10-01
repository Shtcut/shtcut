import { Input } from '@shtcut-ui/react';
import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeIcon?: boolean;
}

const SearchInput = ({ placeholder, className = '', value, onChange, removeIcon = false }: SearchInputProps) => {
    return (
        <div className={`relative ${className || 'w-48'} `}>
            <Input
                className={`${removeIcon ? 'pl-4' : 'pl-10 '} text-xs text-[#433E3F] font-medium border border-[#CCCBCB] bg-white w-full`}
                placeholder={placeholder || 'Search'}
                value={value}
                onChange={onChange}
            />
            {!removeIcon && (
                <div className="absolute top-2 left-[15px]">
                    <Search size={18} />
                </div>
            )}
        </div>
    );
};

export default SearchInput;
