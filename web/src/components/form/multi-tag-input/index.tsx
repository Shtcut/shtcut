import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger } from '@shtcut-ui/react';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

interface MultiTagsInputProps {
    initialTags?: string[];
    onTagsChange?: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
    label?: string;
    selectOptions?: string[];
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
    selectOptions
}: MultiTagsInputProps) => {
    const [tags, setTags] = useState<{ text: string; color: string }[]>(
        initialTags.map((tag) => ({ text: tag, color: getRandomColor() }))
    );
    const [inputValue, setInputValue] = useState<string>('');

    const addTag = (tagText: string) => {
        const normalizedTagText = tagText.toLowerCase();
        if (!tags.some((tag) => tag.text.toLowerCase() === normalizedTagText)) {
            const newTag = { text: tagText, color: getRandomColor() };
            const newTags = [...tags, newTag];
            setTags(newTags);
            if (onTagsChange) {
                onTagsChange(newTags.map((tag) => tag.text));
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
        addTag(selectedValue);
    };

    const removeTag = (indexToRemove: number) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        if (onTagsChange) {
            onTagsChange(newTags.map((tag) => tag.text));
        }
    };

    const clearTags = () => {
        setTags([]);
        if (onTagsChange) {
            onTagsChange([]);
        }
    };

    return (
        <div className={`w-full relative rounded ${className}`}>
            <p className="text-sm mb-2 font-medium">{label}</p>
            <div className="border rounded">
                <div className="flex flex-wrap items-center px-2">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-2 border ${tag.color} text-white m-1 px-2 rounded`}
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
                        placeholder={placeholder}
                    />
                    {selectOptions && selectOptions.length > 0 && (
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="border-none  rounded-none h-10 w-1/3">
                                {/* <SelectValue placeholder="Select a tag" /> */}
                            </SelectTrigger>
                            <SelectContent className="border-none">
                                {selectOptions.map((option, index) => (
                                    <SelectItem key={index} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}{' '}
                </div>
            </div>
            <div className="flex justify-end">
                <Button variant={'unstyled'} className="text-xs m-0 p-0 text-primary-0 underline" onClick={clearTags}>
                    Clear All
                </Button>
            </div>
        </div>
    );
};

export default MultiTagsInput;
