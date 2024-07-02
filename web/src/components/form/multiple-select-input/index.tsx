import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shtcut-ui/react';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Tag } from 'lucide-react'; // Example icon, replace with your desired icon

interface MultiTagsInputProps {
    initialTags?: string[];
    onTagsChange?: (tags: string[]) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
    className?: string;
}

const MultiTagsSelectInput: React.FC<MultiTagsInputProps> = ({
    initialTags = [],
    onTagsChange,
    options,
    placeholder = 'Select and press enter',
    className = ''
}) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

    const handleSelect = (value: string) => {
        if (!selectedTags.includes(value)) {
            const newTags = [...selectedTags, value];
            setSelectedTags(newTags);
            if (onTagsChange) {
                onTagsChange(newTags);
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = selectedTags.filter((tag) => tag !== tagToRemove);
        setSelectedTags(newTags);
        if (onTagsChange) {
            onTagsChange(newTags);
        }
    };

    return (
        <div className={`w-full relative ${className}`}>
            <div className="flex flex-wrap items-center border p-4 rounded">
                {selectedTags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-blue-500 text-white m-1 px-2 rounded">
                        <span className="text-xs">{tag}</span>
                        <button
                            type="button"
                            className="text-white relative bottom-[3px]"
                            onClick={() => removeTag(tag)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <Select onValueChange={handleSelect}>
                    <SelectTrigger
                        id="select-tags"
                        className="border-none outline-none focus:border-none shadow-none focus-visible:ring-0 flex items-center"
                    >
                        {selectedTags.length === 0 ? (
                            <div className="flex items-center gap-x-1 text-gray-500 ">
                                <Tag className="h-4 w-4" />
                                <span> {placeholder}</span>
                            </div>
                        ) : (
                            <SelectValue />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default MultiTagsSelectInput;
