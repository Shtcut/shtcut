import { Input } from '@shtcut-ui/react';
import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = () => {
    return (
        <div className="relative">
            <Input
                className="bg-[#fafafa] pl-8 w-48 text-xs text-[#433E3F] border border-[#CCCBCB] "
                placeholder="Search"
            />
            <div className="absolute top-2 left-2">
                <Search size={18} />
            </div>
        </div>
    );
};

export default SearchInput;
