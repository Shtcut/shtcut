import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import RollingLoader from '@shtcut/components/loader/rolling-loader';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import RelevantAction from './relevant';
import OrientationAction from './orientation';
import { unsplash } from '@shtcut/_shared/constant';

const GalleryPreview = ({ handleClose }: { handleClose: () => void }) => {
    const [photos, setPhotos] = useState<any[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [loadingPhotos, setLoadingPhotos] = useState<string[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = (searchQuery = '') => {
        setIsFetching(true);
        const apiCall = searchQuery
            ? unsplash.search.getPhotos({ query: searchQuery, page: 1, perPage: 100 })
            : unsplash.photos.list({ page: 1, perPage: 100 });

        apiCall.then((result) => {
            setPhotos(result.response?.results || []);
            setIsFetching(false);
        });
    };
    console.log('Selecde', photos);

    const handleSelectImage = (id: string) => {
        setSelectedPhotos((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((photoId) => photoId !== id) : [...prevSelected, id]
        );
    };

    const handleImageLoadStart = (id: string) => {
        setLoadingPhotos((prevLoading) => [...prevLoading, id]);
    };

    const handleImageLoadComplete = (id: string) => {
        setLoadingPhotos((prevLoading) => prevLoading.filter((loadingId) => loadingId !== id));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            fetchPhotos(searchTerm);
        } else {
            fetchPhotos();
        }
    };

    return (
        <section className="">
            <section className="flex border-b pb-2 items-center justify-between">
                <p className="text-sm font-semibold">Unsplash </p>
                <X size={18} onClick={handleClose} />
            </section>

            {/* Search Bar */}
            <section className="w-full my-6">
                <form onSubmit={handleSearch}>
                    <SearchInput
                        className="w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Unsplash..."
                    />
                </form>
            </section>

            <section className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-[#F0F0F0] w-20 h-6 flex items-center justify-center rounded">
                        <p className="text-xs font-semibold">Photos 10k</p>
                    </div>
                    <p className="text-xs font-medium">Illustrations</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <RelevantAction />
                    <OrientationAction />
                    <RelevantAction />
                </div>
            </section>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 mt-6 gap-4 max-h-[600px] overflow-y-auto">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative w-full ">
                        <button
                            className={`absolute top-2 left-2 w-5 h-5 rounded-full border flex items-center justify-center transition-opacity duration-200 ${
                                selectedPhotos.includes(photo.id)
                                    ? 'bg-primary-0 border-white'
                                    : 'bg-[#D3DBE4] border-white'
                            }`}
                            onClick={() => handleSelectImage(photo.id)}
                        >
                            {selectedPhotos.includes(photo.id) && <Check size={12} className="text-white" />}
                        </button>

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
                            className="object-cover w-full h-80"
                            onLoadStart={() => handleImageLoadStart(photo.id)}
                            onLoadingComplete={() => handleImageLoadComplete(photo.id)}
                            loading="eager"
                        />
                        <p className="text-xs font-medium border-b w-fit border-black">
                            {photo.user.first_name} {photo.user.last_name}
                        </p>
                    </div>
                ))}
            </div>

            {/* Loader */}
            {isFetching && (
                <div className="text-center flex justify-center my-4">
                    <RollingLoader />
                </div>
            )}
        </section>
    );
};

export default GalleryPreview;
