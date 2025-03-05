import { setImage } from '@shtcut/redux/slices/selects';
import { useAppDispatch } from '@shtcut/redux/store';
import { useCreateMediaMutation } from '@shtcut/services/media';
import { LinkBioDataType } from '@shtcut/types/link';
import { useEffect, useState } from 'react';

export const useLinksManager = (defaultLinks: LinkBioDataType[] = []) => {
    const [uploadFile, { isLoading, error, data }] = useCreateMediaMutation();
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

    const handleLinkImageChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log('file:::url', file);
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                alert('Image size exceeds the allowed limit of 5 MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setLinks((prevLinks) => prevLinks.map((link) => (link.id === id ? { ...link, image: base64 } : link)));
            };
            reader.readAsDataURL(file);
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

        console.log('file', file);
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                setImgError('Image size exceeds the allowed limit of 2 MB');
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await uploadFile(formData).unwrap();
                console.log('File upload response:', response);
                // dispatch(setImage(response?.url));
            } catch (error) {
                console.error('Upload failed:', error);
                setImgError('Failed to upload image. Please try again.');
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                dispatch(setImage(base64Image));
            };
            reader.readAsDataURL(file);
        }
    };

    return {
        state: {
            links,
            showSections,
            imgError
        },
        actions: {
            addLink,
            removeLink,
            updateLink,
            handleLinkImageChange,
            toggleSection,
            handleImageChange
        }
    };
};
