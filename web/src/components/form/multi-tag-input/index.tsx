import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, toast } from '@shtcut-ui/react';
import { handleError } from '@shtcut/_shared';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { useTags } from '@shtcut/hooks/tags';
import { TagResponse } from '@shtcut/types/tags';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

interface MultiTagsInputProps {
    initialTags?: TagResponse[] | undefined;
    onTagsChange?: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
    label?: string;
    selectOptions?: string[];
    watchLink: string;
    singleLink?: LinkNameSpace.Link | undefined;
}

const colors = [
    'border-blue-500 bg-blue-100 text-blue-800',
    'bg-red-100 border-red-800  text-red-800',
    'bg-green-100 text-green-800 border-green-800 ',
    'bg-yellow-100 text-yellow-800 border-yellow-800',
    'bg-purple-100 text-purple-800 border-purple-800',
    'bg-pink-100 text-pink-800 border-pink-800',
    'bg-teal-100 text-teal-800 border-teal-800',
    'bg-indigo-100 text-indigo-800 border-indigo-800'
];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const MultiTagsInput = ({
    initialTags = [],
    onTagsChange,
    placeholder = 'Type and press enter',
    className = '',
    label,
    watchLink,
    singleLink
}: MultiTagsInputProps) => {
    const { createTags, isLoadingState, setLoadingState } = useTags({ call: true });
    const isEdit = !!singleLink;
    const [tags, setTags] = useState<{ _id: string; text: string; color: string }[]>(
        isEdit ? singleLink?.tags?.map((tag) => ({ _id: tag?._id, text: tag.name, color: getRandomColor() })) : []
    );

    const [selectedIds, setSelectedIds] = useState<string[]>(
        isEdit ? singleLink?.tags?.map((tag) => tag?._id) || [] : []
    );
    const [inputValue, setInputValue] = useState<string>('');
    const MAX_TAGS = 5;
    const isMaxReached = tags.length >= MAX_TAGS;

    const addTag = async (tagText: string) => {
        const normalizedTagText = tagText.toLowerCase();

        // Prevent duplicate tags
        if (!tags.some((tag) => tag.text.toLowerCase() === normalizedTagText)) {
            setLoadingState('creating', true);
            try {
                const color = getRandomColor();
                const response = await createTags({ name: tagText, color });
                const newTag = { _id: response?.data?.id, text: tagText, color };
                const newTags = [...tags, newTag];
                const newIds = [...selectedIds, response?.data?.id];
                setTags(newTags);
                setSelectedIds(newIds);

                if (onTagsChange) {
                    onTagsChange(newIds);
                }
            } catch (error) {
                handleError({ error });
            } finally {
                setLoadingState('creating', false);
            }
        }

        setInputValue('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            addTag(inputValue.trim());
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleSelectChange = (selectedValue: string) => {
        const selectedTag = initialTags?.find((tag) => tag.name === selectedValue);
        if (selectedTag) {
            if (!selectedIds.includes(selectedTag.id)) {
                const color = getRandomColor();
                const newTag = { _id: selectedTag.id, text: selectedTag.name, color };
                const newTags = [...tags, newTag];
                const newIds = [...selectedIds, selectedTag.id];
                setTags(newTags);
                setSelectedIds(newIds);
                if (onTagsChange) {
                    onTagsChange(newIds);
                }
            }
        }
    };

    const removeTag = (indexToRemove: number) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        const newIds = selectedIds.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        setSelectedIds(newIds);
        if (onTagsChange) {
            onTagsChange(newIds);
        }
    };

    const clearTags = () => {
        setTags([]);
        setSelectedIds([]);
        if (onTagsChange) {
            onTagsChange([]);
        }
    };

    React.useEffect(() => {
        if (isEdit && singleLink?.tags?.length) {
            const mappedTags = singleLink.tags.map((tag) => ({
                _id: tag._id,
                text: tag.name,
                color: getRandomColor()
            }));
            const ids = singleLink.tags.map((tag) => tag._id);
            setTags(mappedTags);
            setSelectedIds(ids);
            if (onTagsChange) {
                onTagsChange(ids);
            }
        }
    }, [isEdit, singleLink]);

    return (
        <div className={`w-full relative rounded ${className}`}>
            <p className="text-sm mb-2 font-medium">{label}</p>
            <div className="border rounded">
                <div className="flex flex-wrap items-center px-2">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-2 border ${tag.color}  m-1 px-2 rounded`}
                        >
                            <span className="text-xs">{tag.text}</span>
                            <button
                                type="button"
                                className="text-black relative bottom-[3px]"
                                onClick={() => removeTag(index)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex w-full">
                    <Input
                        type="text"
                        className="border-none outline-none focus:border-none rounded-none h-10  shadow-none w-full focus-visible:ring-0 "
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={isMaxReached ? 'Max 5 tags allowed' : placeholder}
                        disabled={!watchLink || isLoadingState || isMaxReached}
                    />
                    {initialTags && initialTags.length > 0 && (
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger
                                disabled={!watchLink || isMaxReached}
                                className="border-none  rounded-none h-10 w-1/3"
                            >
                                {/* <SelectValue placeholder="Select a tag" /> */}
                            </SelectTrigger>
                            <SelectContent className="border-none">
                                {initialTags &&
                                    initialTags?.map((option, index) => (
                                        <SelectItem
                                            disabled={!watchLink || selectedIds.includes(option._id) || isMaxReached}
                                            key={index}
                                            value={option?.name}
                                        >
                                            {option?.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    )}{' '}
                </div>
            </div>
            <div className="flex justify-between">
                {isMaxReached && <p className="text-red-500 text-xs mt-1">You can only add up to 5 tags.</p>}

                <Button
                    variant={'unstyled'}
                    className="text-xs m-0 p-0 text-primary-0 underline flex-1 flex justify-end"
                    onClick={clearTags}
                >
                    Clear All
                </Button>
            </div>
        </div>
    );
};

export default MultiTagsInput;
