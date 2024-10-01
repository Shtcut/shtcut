'use client';
import { Button, Card, Modal } from '@shtcut-ui/react';
import { unsplash } from '@shtcut/_shared/constant';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ManageMedia from './component/manage-media';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import Tabs from '@shtcut/components/_shared/Tabs';
import { FolderFileCard, PhotoCardComponent, VideoCard } from './component';
import { useSelector } from 'react-redux';
import { RootState } from '@shtcut/redux/store';
import EditModal from './component/edit-img';

const MediaComponent = () => {
    const selectedPhoto = useSelector((state: RootState) => state.img.selectedPhoto);
    const [photos, setPhotos] = useState<any[]>([]);
    const [modal, setModal] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [edit, setEdit] = useState(false);

    const [loadingPhotos, setLoadingPhotos] = useState<string[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'images', label: 'Images' },
        { id: 'videos', label: 'Videos' },
        { id: 'files', label: 'Files' },
        { id: 'folder', label: 'Folders' }
    ];

    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
    };
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

    console.log('selectedPhoto', selectedPhoto);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-[#2B2829] text-xl">Media Library</h1>
                <div className="flex items-center gap-4">
                    <Button variant={'outline'} className="h-9 border border-[#4D4D4D] bg-white text-xs rounded">
                        Create Folder
                    </Button>

                    <ManageMedia />
                </div>
            </div>
            <section className="flex items-center justify-between my-6">
                <section className="w-1/2">
                    <Tabs tabs={tabs} selectedTabIndex={selectedTabIndex} onTabClick={handleTabChange} />
                </section>
                <SearchInput />
            </section>
            {selectedTabIndex === 0 && (
                <div className="grid grid-cols-4 mt-6 gap-4">
                    {photos.map((photo) => (
                        <PhotoCardComponent
                            key={photo}
                            photo={photo}
                            handleSelectImage={handleSelectImage}
                            selectedPhotos={selectedPhotos}
                            loadingPhotos={loadingPhotos}
                            handleImageLoadStart={handleImageLoadStart}
                            handleImageLoadComplete={handleImageLoadComplete}
                            handleShowModal={() => setModal(true)}
                        />
                    ))}
                </div>
            )}
            {selectedTabIndex === 1 && (
                <div className="grid grid-cols-4 mt-6 gap-4">
                    {photos.map((photo) => (
                        <PhotoCardComponent
                            key={photo}
                            photo={photo}
                            handleSelectImage={handleSelectImage}
                            selectedPhotos={selectedPhotos}
                            loadingPhotos={loadingPhotos}
                            handleImageLoadStart={handleImageLoadStart}
                            handleImageLoadComplete={handleImageLoadComplete}
                        />
                    ))}
                </div>
            )}
            {selectedTabIndex === 2 && (
                <div className="grid grid-cols-4 mt-6 gap-4">
                    {photos.map((video) => (
                        <VideoCard key={video.id} photo={video} />
                    ))}
                </div>
            )}
            {selectedTabIndex === 3 && (
                <div className="grid grid-cols-4 mt-6 gap-4">
                    {[...Array(40)].map((file) => (
                        <FolderFileCard key={file} type="file" />
                    ))}
                </div>
            )}
            {selectedTabIndex === 4 && (
                <div className="grid grid-cols-4 mt-6 gap-4">
                    {[...Array(40)].map((folder) => (
                        <FolderFileCard key={folder} type="folder" />
                    ))}
                </div>
            )}

            <Modal
                showModel={modal}
                setShowModal={setModal}
                onClose={() => {
                    setModal(false);
                    setEdit(false);
                }}
                className="bg-white relative max-w-[436px] h-fit"
            >
                <section className="flex items-center border-b py-2 px-4 justify-between">
                    <h2 className="font-medium">Media</h2>
                    <X onClick={() => setModal(false)} size={16} className="cursor-pointer" />
                </section>
                {edit ? (
                    <section className="p-4">
                        <EditModal />
                    </section>
                ) : (
                    <section className="p-4">
                        <div style={{ width: '100%', height: 287, position: 'relative' }}>
                            <Image
                                src={selectedPhoto?.urls.small as string}
                                alt={selectedPhoto?.alt_description || 'Unsplash Image'}
                                layout="fill"
                                className="object-cover rounded-xl w-full h-80"
                            />
                        </div>
                        <section className="flex  justify-between mt-3">
                            <div>
                                <p className="text-sm font-semibold ">
                                    {selectedPhoto?.user?.first_name} {selectedPhoto?.user?.name}
                                </p>
                                <p className="text-xs mt-2 text-[#726C6C]">128MB</p>
                            </div>
                            <Button
                                variant={'outline'}
                                className="text-xs rounded border-primary-0  text-primary-0"
                                onClick={() => setEdit(true)}
                            >
                                Edit Image
                            </Button>
                        </section>
                        <section className="w-full flex items-center gap-x-4 mt-6">
                            <Button variant={'outline'} className="text-xs w-full rounded ">
                                Return
                            </Button>
                            <Button className="text-xs w-full rounded bg-primary-0">Done</Button>
                        </section>
                    </section>
                )}
            </Modal>
        </div>
    );
};

export default MediaComponent;
