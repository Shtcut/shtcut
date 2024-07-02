import { Input } from '@shtcut-ui/react';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';

interface MultiTagsInputProps {
    initialTags?: string[];
    onTagsChange?: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
}

const colors = [
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500'
];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const MultiTagsInput: React.FC<MultiTagsInputProps> = ({
    initialTags = [],
    onTagsChange,
    placeholder = 'Type and press enter',
    className = ''
}) => {
    const [tags, setTags] = useState<{ text: string; color: string }[]>(
        initialTags.map((tag) => ({ text: tag, color: getRandomColor() }))
    );
    const [inputValue, setInputValue] = useState<string>('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            const newTag = { text: inputValue.trim(), color: getRandomColor() };
            const newTags = [...tags, newTag];
            setTags(newTags);
            setInputValue('');
            if (onTagsChange) {
                onTagsChange(newTags.map((tag) => tag.text));
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
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
        <div className={`w-full relative  ${className}`}>
            <div className="flex flex-wrap items-center border p-4 rounded">
                {tags.map((tag, index) => (
                    <div key={index} className={`flex items-center space-x-2 ${tag.color} text-white m-1 px-2  rounded`}>
                        <span className="text-xs">{tag.text}</span>
                        <button type="button" className=" text-white relative bottom-[3px]" onClick={() => removeTag(index)}>
                            &times;
                        </button>
                    </div>
                ))}
                <Input
                    type="text"
                    className="border-none outline-none focus:border-none shadow-none focus-visible:ring-0"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                />
            </div>
            <div onClick={clearTags} className="absolute top-6 right-4">
                <X />
            </div>
        </div>
    );
};

export default MultiTagsInput;
