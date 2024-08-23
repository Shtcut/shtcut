import { Input } from '@shtcut-ui/react';
import React from 'react';
import { Search } from 'lucide-react';
interface SearchInputProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput = ({ placeholder, className, value, onChange }: SearchInputProps) => {
    return (
        <div className="relative">
            <Input
                className="border-[#CCCBCB] pl-10 w-48 text-xs text-[#433E3F] font-medium border bg-white "
                placeholder="Search "
                value={value}
                onChange={onChange}
            />
            <div className="absolute top-2 left-[15px]">
                <Search size={18} />
            </div>
        </div>
    );
};

export default SearchInput;
