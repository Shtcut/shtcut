import { Button, Card, Input, Label } from '@shtcut-ui/react';
import StarLoader from '@shtcut/components/loader/star-loader';
import { LinkBioDataType } from '@shtcut/types/link';
import { Image as LucideImage, Minus, Plus } from 'lucide-react';
import React from 'react';

type LinksSectionProps = {
    isVisible: boolean;
    toggleVisibility: () => void;
    linkImage?: string | null;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onUpdateLink?: (field: string, value: string) => void;
    onRemove?: () => void;
    addLinkSection?: () => void;
    index?: number;
    link?: LinkBioDataType;
    linkUploadingState?: boolean;
};

const LinksSection = ({
    isVisible,
    toggleVisibility,
    linkImage,
    handleImageChange,
    onRemove,
    onUpdateLink,
    addLinkSection,
    index,
    link,
    linkUploadingState
}: LinksSectionProps) => {
    const imageInputId = `image-upload-link-${index}`;

    return (
        <Card className="shadow-sm mt-4 py-4 px-6 border border-gray-100">
            <section className={`flex ${isVisible ? 'pb-3' : ''} justify-between items-center`}>
                <section className="flex flex-col gap-2">
                    <Label>Links</Label>
                    {!isVisible && <p className="text-sm text-[#5A5555]">Enter Title and description</p>}
                </section>
                {isVisible ? (
                    <Minus onClick={toggleVisibility} className="cursor-pointer" />
                ) : (
                    <Plus onClick={toggleVisibility} className="cursor-pointer" />
                )}
            </section>
            {isVisible && (
                <section className="border-t pt-3">
                    {index && (
                        <section>
                            <Label>Link {index}</Label>
                        </section>
                    )}
                    <section className="mt-4 flex flex-col gap-4 border-b pb-4">
                        <Input
                            placeholder="Enter Link Title"
                            onChange={(e) => onUpdateLink?.('label', e.target.value)}
                            value={link?.label}
                        />
                        <Input
                            placeholder="Enter URL"
                            type="url"
                            onChange={(e) => onUpdateLink?.('url', e.target.value)}
                            value={link?.url}
                        />
                    </section>
                    <section className="flex flex-col gap-2 pt-4">
                        <Label>Image (optional)</Label>
                        <p className="text-sm text-[#5A5555]">Add image using the + button.</p>
                        <section className="relative bg-[#FAFAFA] mt-2 w-20">
                            <section className="h-20 w-20 rounded-md border flex justify-center items-center">
                                {linkUploadingState ? (
                                    <StarLoader />
                                ) : linkImage ? (
                                    <img
                                        src={linkImage}
                                        alt="Preview"
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                ) : (
                                    <LucideImage color="#B5B3B3" size={40} />
                                )}
                            </section>
                            <label
                                htmlFor={imageInputId}
                                className="absolute top-0 right-0 bg-black w-6 h-6 flex justify-center items-center cursor-pointer rounded-full"
                            >
                                <Plus color="white" size={16} />
                            </label>
                            <input
                                id={imageInputId}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </section>
                        <section className="flex items-center justify-between">
                            <Button onClick={addLinkSection} variant="outline" className="h-9 w-28 mt-2">
                                Add Link
                            </Button>
                            {index && index > 1 && (
                                <Button onClick={onRemove} variant="destructive" className="h-9 w-28 mt-2">
                                    Delete
                                </Button>
                            )}
                        </section>
                    </section>
                </section>
            )}
        </Card>
    );
};

export default LinksSection;
