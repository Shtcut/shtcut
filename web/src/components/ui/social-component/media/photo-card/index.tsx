import { Button, Card } from '@shtcut-ui/react';
import { formatDate } from '@shtcut/_shared';
import { setSelectedPhoto } from '@shtcut/redux/slices/media';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';

const PhotoCardComponent = ({
    photo,
    handleSelectImage,
    selectedPhotos,
    loadingPhotos,
    handleImageLoadComplete,
    handleImageLoadStart,
    handleShowModal
}: {
    photo: any;
    handleSelectImage: (val: string) => void;
    selectedPhotos: any;
    loadingPhotos: string[];
    handleImageLoadStart: (val: string) => void;
    handleImageLoadComplete: (val: string) => void;
    handleShowModal?: () => void;
}) => {
    const dispatch = useDispatch();

    const handleSelectImg = () => {
        dispatch(setSelectedPhoto(photo));
        handleShowModal?.();
    };

    return (
        <Card key={photo.id} className="relative w-full cursor-pointer " onClick={handleSelectImg}>
            <Button
                variant={'unstyled'}
                className={`absolute p-0 top-2 left-2 w-5 h-5 rounded-full border flex items-center justify-center transition-opacity duration-200 ${
                    selectedPhotos.includes(photo.id) ? 'bg-primary-0 border-white' : 'bg-[#D3DBE4] border-white'
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleSelectImage(photo.id);
                }}
            >
                {selectedPhotos.includes(photo.id) && <Check size={12} className="text-white" />}
            </Button>

            {loadingPhotos.includes(photo.id) && (
                <div
                    className="absolute top-0 left-0  bg-gray-200 animate-pulse"
                    style={{ width: photo.width, height: photo.height }}
                />
            )}

            <Image
                src={photo.urls.small}
                alt={photo.alt_description || 'Unsplash Image'}
                width={photo.width}
                height={photo.height}
                className="object-cover rounded-t-xl w-full h-28"
                onLoadStart={() => handleImageLoadStart(photo.id)}
                onLoadingComplete={() => handleImageLoadComplete(photo.id)}
                loading="eager"
            />
            <div className="p-4 flex flex-col gap-y-1">
                <section className="flex items-center justify-between">
                    <p className="text-sm font-semibold ">
                        {photo.user.first_name} {photo.user.last_name}
                    </p>
                    <p className="text-xs text-[#726C6C]">128MB</p>
                </section>
                <p className="text-xs mb-1 text-[#433E3F]">{formatDate(photo.created_at)}</p>

                <section className="bg-[#EAEEF9] w-14 h-6 rounded flex items-center justify-center ">
                    <p className="text-xs text-primary-0 font-medium">{photo.asset_type}</p>
                </section>
            </div>
        </Card>
    );
};

export default PhotoCardComponent;
