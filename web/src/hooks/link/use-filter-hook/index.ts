import { FilterOption, LinkFilters } from '@shtcut/types/link';
import { useState } from 'react';

export const useLinkFilters = (initialFilters?: Partial<LinkFilters>) => {
    const [filters, setFilters] = useState<LinkFilters>({
        isCustomAlias: null, // default to 'All'
        withTags: null,
        creator: null,
        ...initialFilters
    });

    const aliasOptions: FilterOption[] = [
        { label: 'With Alias', value: 'true' },
        { label: 'Without Alias', value: 'false' },
        { label: 'All', value: 'all' }
    ];

    const tagsOptions: FilterOption[] = [
        { label: 'With Tags', value: 'true' },
        { label: 'Without Tags', value: 'false' },
        { label: 'All', value: 'all' }
    ];

    const updateFilter = <K extends keyof LinkFilters>(key: K, value: LinkFilters[K]) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            isCustomAlias: null,
            withTags: null,
            creator: null
        });
    };

    return {
        filters,
        updateFilter,
        resetFilters,
        filterOptions: {
            aliasOptions,
            tagsOptions
        }
    };
};
