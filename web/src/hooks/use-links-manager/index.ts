import { setImage } from '@shtcut/redux/slices/selects';
import { useAppDispatch } from '@shtcut/redux/store';
import { useCreateMediaMutation } from '@shtcut/services/media';
import { LinkBioDataType } from '@shtcut/types/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth';

export const useLinksManager = (defaultLinks: LinkBioDataType[] = []) => {
    const { updateUser } = useAuth();
    const [uploadFile] = useCreateMediaMutation();
    const [isUploadingMainImage, setIsUploadingMainImage] = useState(false);
    const [linkUploadingState, setLinkUploadingState] = useState<Record<number, boolean>>({});

    const dispatch = useAppDispatch();
    const [links, setLinks] = useState<LinkBioDataType[]>([{ id: 1, label: '', url: '', image: null }]);
    const initialShowSections = defaultLinks.reduce(
        (acc, link) => {
            acc[link.id] = true;
            return acc;
        },
        {} as Record<number, boolean>
    );
    useEffect(() => {
        if (defaultLinks.length > 0) {
            setLinks(defaultLinks);
        }
    }, [defaultLinks]);

    const [imgError, setImgError] = useState('');

    const [showSections, setShowSections] = useState<Record<number, boolean>>(initialShowSections);

    const addLink = () => {
        const newId = setLinks.length + 1;
        setLinks((prevLinks) => [...prevLinks, { id: newId, label: '', url: '', image: null }]);
        setShowSections((prev) => ({ ...prev, [newId]: true }));
    };

    const removeLink = (id: number) => {
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
        setShowSections((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    const updateLink = (id, field, value) => {
        setLinks((prevLinks) => prevLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)));
    };

    const handleLinkImageChange = async (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                alert('Image size exceeds the allowed limit of 2 MB');
                return;
            }

            const formData = new FormData();
            formData.append('files', file);

            setLinkUploadingState((prev) => ({ ...prev, [id]: true }));

            try {
                const response = await uploadFile(formData).unwrap();
                setLinks((prevLinks) =>
                    prevLinks.map((link) =>
                        link.id === id
                            ? {
                                  ...link,
                                  image: { id: response?.data?.[0]?.id, preview: response?.data?.[0]?.file?.url }
                              }
                            : link
                    )
                );
                setLinkUploadingState((prev) => ({ ...prev, [id]: false }));
            } catch (error) {
                alert('Failed to upload image. Please try again.');

                // Clear loading state even on error
                setLinkUploadingState((prev) => ({ ...prev, [id]: false }));
            }
        }
    };

    const toggleSection = (id: number) => {
        setShowSections((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                setImgError('Image size exceeds the allowed limit of 2 MB');
                return;
            }
            const formData = new FormData();
            formData.append('files', file);
            setIsUploadingMainImage(true);
            try {
                const response = await uploadFile(formData).unwrap();
                dispatch(setImage({ id: response?.data?.[0]?.id, preview: response?.data?.[0]?.file?.url }));
            } catch (error) {
                setImgError('Failed to upload image. Please try again.');
            } finally {
                setIsUploadingMainImage(false);
            }
        }
    };

    const handleAvatarImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                setImgError('Image size exceeds the allowed limit of 2 MB');
                return;
            }
            const formData = new FormData();
            formData.append('files', file);
            setIsUploadingMainImage(true);
            try {
                const response = await uploadFile(formData).unwrap();
                dispatch(setImage({ id: response?.data?.[0]?.id, preview: response?.data?.[0]?.file?.url }));
                await updateUser({
                    payload: { avatar: response?.data?.[0]?.id },
                    options: {
                        successMessage: 'Avatar updated successfully',
                        errorMessage: 'Failed to update avatar'
                    }
                });
            } catch (error) {
                setImgError('Failed to upload image. Please try again.');
            } finally {
                setIsUploadingMainImage(false);
            }
        }
    };

    return {
        state: {
            links,
            showSections,
            imgError,
            isUploadingMainImage,
            linkUploadingState
        },
        actions: {
            addLink,
            removeLink,
            updateLink,
            handleLinkImageChange,
            toggleSection,
            handleImageChange,
            handleAvatarImageChange
        }
    };
};
