import { Button, Separator, Textarea } from '@shtcut-ui/react';
import { Image as ImageIcon, Folder, Smile, Video, Hash, X } from 'lucide-react';
import { FaUnsplash } from 'react-icons/fa';

import React, { useEffect, useRef, useState } from 'react';
import { PostContentProps } from '@shtcut/types/types';
import Image from 'next/image';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
const PostContent = ({
    handleTextChange,
    postText,
    selectedImages = [],
    setSelectedImages,
    handleOpen = () => {},
    setPostText = () => {}
}: PostContentProps) => {
    const [error, setError] = useState<string | null>(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);
    const emojiIconRef = useRef<HTMLDivElement | null>(null);
    const handleEmojiSelect = (emoji: any) => {
        setPostText(postText + emoji.native);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const validImages = Array.from(files).filter((file) => file.type.startsWith('image/'));
            if (validImages.length !== files.length) {
                setError('Please select only image files.');
                return;
            }
            setError(null);
            if (setSelectedImages) {
                setSelectedImages([...selectedImages, ...validImages]);
            }
        }
    };
    const removeImage = (index: number) => {
        const updatedImages = selectedImages?.filter((_, i) => i !== index);
        if (setSelectedImages) {
            setSelectedImages(updatedImages);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target as Node) &&
            !emojiIconRef.current?.contains(event.target as Node)
        ) {
            setShowEmoji(false);
        }
    };

    useEffect(() => {
        if (showEmoji) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmoji]);

    return (
        <section className="py-4">
            <div className="px-8  w-full">
                <section className="bg-white border rounded-md">
                    <section className=" pb-4">
                        <Textarea
                            value={postText}
                            className="resize-none  h-[97px] shadow-none border-none focus-visible:ring-0 "
                            placeholder="What’s happening?"
                            onChange={handleTextChange}
                        />
                    </section>
                    <Separator orientation="horizontal" />
                    <section className="flex items-center py-1 justify-between px-4">
                        <section className="flex items-center gap-4 cursor-pointer text-primary-0">
                            <label htmlFor="imageUpload">
                                <ImageIcon size={18} />
                                <input
                                    id="imageUpload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <FaUnsplash size={18} onClick={() => handleOpen(true, 'gallery')} />
                            <Folder size={18} />
                            <div
                                className={`z-40 fixed bottom-[81px]`}
                                style={{
                                    display: showEmoji ? 'inline' : 'none'
                                }}
                                ref={emojiPickerRef}
                            >
                                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                            </div>
                            <div ref={emojiIconRef} onClick={() => setShowEmoji(!showEmoji)}>
                                <Smile className="cursor-pointer" size={18} />
                            </div>
                            <Video size={18} />
                            <Hash size={18} onClick={() => handleOpen(true, 'hash')} />
                        </section>
                        <Button
                            variant={'unstyled'}
                            className="text-xs text-primary-0 p-0"
                            onClick={() => handleOpen(true, 'add-labels')}
                        >
                            Add Labels
                        </Button>
                    </section>
                </section>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <section className="flex items-center w-full overflow-x-auto px-8 pt-4 gap-4 ">
                {selectedImages?.map((image, index) => (
                    <section key={index} className="relative flex-shrink-0 ">
                        <Image
                            src={URL.createObjectURL(image)}
                            height={300}
                            width={200}
                            alt="Preview"
                            className="w-[200px] h-[200px] rounded-md"
                        />
                        <div
                            className="bg-black absolute top-[-10px] right-[-10px] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
                            onClick={() => removeImage(index)}
                        >
                            <X size={16} className="text-white" />
                        </div>
                    </section>
                ))}
            </section>
        </section>
    );
};

export default PostContent;
