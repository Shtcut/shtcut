'use client';

import { handleError } from '@shtcut/_shared';
import { LinkArchiveComponent } from '@shtcut/components/dashboard';
import { useLink } from '@shtcut/hooks/link';
import React, { useState } from 'react';

const LinkArchiveContainer = () => {
    const [archived, setArchived] = useState<string[]>([]);
    const {
        findAllLinksResponse,
        isLoading,
        updateLinkResponse,
        isLoadingState,
        updateLink,
        setLoadingState,
        findAllLinks,
        archivedManyLinks,
        params
    } = useLink({
        callLinks: true,
        filter: {
            archived: true,
            all: true
        }
    });
    const doFind = () => {
        findAllLinks({
            ...params
        });
    };

    const handleArchivedMany = async () => {
        if (archived) {
            setLoadingState('updating', true);
            try {
                await archivedManyLinks({
                    payload: archived,
                    options: {
                        successMessage: `Successfully archived all`
                    }
                });
                doFind();
                setArchived([]);
            } catch (error) {
                handleError({ error });
            } finally {
                setLoadingState('updating', false);
            }
        }
    };

    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        if (isChecked) {
            setArchived((prevSelected) => [...prevSelected, id]);
        } else {
            setArchived((prevSelected) => prevSelected.filter((qrId) => qrId !== id));
        }
    };

    return (
        <LinkArchiveComponent
            isLoading={isLoading}
            findAllLinksResponse={findAllLinksResponse}
            updateLinkResponse={updateLinkResponse}
            isLoadingState={isLoadingState}
            updateLink={updateLink}
            setLoadingState={setLoadingState}
            findAllLinks={findAllLinks}
            archived={archived}
            handleCheckboxChange={handleCheckboxChange}
            handleArchivedMany={handleArchivedMany}
        />
    );
};

export default LinkArchiveContainer;
