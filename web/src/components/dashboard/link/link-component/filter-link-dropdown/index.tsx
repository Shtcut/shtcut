import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Label } from '@shtcut-ui/react';
import { Filter } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@shtcut-ui/react';
import { FilterOptions, LinkFilters, UpdateFilter } from '@shtcut/types/link';

const FilterLinkDropDown = ({
    filters,
    updateFilter,
    filterOptions
}: {
    filters: LinkFilters;
    filterOptions: FilterOptions;
    updateFilter: UpdateFilter;
}) => {
    const handleAliasSelect = (value: string) => {
        updateFilter('isCustomAlias', value === 'all' ? null : value === 'true');
    };

    const handleWithTagsSelect = (value: string) => {
        updateFilter('withTags', value === 'all' ? null : value === 'true');
    };

    // const handleStandardSelect = (type: 'creator', value: string) => {
    //     updateFilter(type, value === 'all' ? null : value);
    // };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex border hover:bg-primary-0 rounded-md justify-center hover:text-white shadow-none font-normal w-11 h-9 text-[#5A5555] cursor-pointer items-center bg-white gap-x-2">
                        <Filter size={18} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 right-6 relative cursor-pointer">
                    <section className="p-2">
                        <p className="text-sm text-[#71717A]">Filter by</p>
                        <section className="flex flex-col gap-y-3 mt-3">
                            <section>
                                <Label className="text-sm">Alias</Label>
                                <Select
                                    value={filters?.isCustomAlias === null ? 'all' : filters?.isCustomAlias?.toString()}
                                    onValueChange={handleAliasSelect}
                                >
                                    <SelectTrigger className="text-sm text-[#2B3034] shadow-none mt-2">
                                        <SelectValue placeholder="Alias" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions?.aliasOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="text-sm text-[#2B3034]"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section>

                            <section>
                                <Label className="text-sm">Tags</Label>
                                <Select
                                    value={filters?.withTags === null ? 'all' : filters?.withTags?.toString()}
                                    onValueChange={handleWithTagsSelect}
                                >
                                    <SelectTrigger className="text-sm text-[#2B3034] shadow-none mt-2">
                                        <SelectValue placeholder="Tags" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions?.tagsOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="text-sm text-[#2B3034]"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section>

                            {/* <section>
                                <Label className="text-sm">Creator</Label>
                                <Select
                                    value={filters.creator || 'all'}
                                    onValueChange={(value) => handleStandardSelect('creator', value)}
                                >
                                    <SelectTrigger className="text-sm text-[#2B3034] shadow-none mt-2">
                                        <SelectValue placeholder="Creator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions?.tagsOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="text-sm text-[#2B3034]"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section> */}
                        </section>
                    </section>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default FilterLinkDropDown;
