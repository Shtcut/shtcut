import React from 'react';
import { BsEnvelope, BsTelephoneFill } from 'react-icons/bs';
import { FaGlobeAfrica } from 'react-icons/fa';
import PhoneTemplate_1 from './phone-templates/template-1';
import PhoneTemplate_2 from './phone-templates/template-2';
import PhoneTemplate_3 from './phone-templates/template-3';
import useGeneralState from '@shtcut/hooks/general-state';
import { LinkBioDataType } from '@shtcut/types/link';
const GeneralTemplate = ({
    links,
    isUploadingMainImage
}: {
    links?: LinkBioDataType[];
    isUploadingMainImage?: boolean;
}) => {
    const { activeTemplateString, title, profileImage, bgColor, description, presetColorString, btnColorString } =
        useGeneralState();

    const contactActions = [
        {
            name: 'Phone',
            icon: <BsTelephoneFill size={14} />
        },
        {
            name: 'Email',
            icon: <BsEnvelope size={14} />
        },
        {
            name: 'Website',
            icon: <FaGlobeAfrica size={14} />
        }
    ];

    return (
        <div
            style={{ backgroundColor: activeTemplateString === 'template_3' ? '#092059' : `${bgColor}` }}
            className={`w-full  rounded-[32px] h-full`}
        >
            {activeTemplateString === 'template_1' && (
                <PhoneTemplate_1
                    contactActions={contactActions}
                    imageSelected={profileImage?.preview as string}
                    title={title as string}
                    linksBio={links}
                    description={String(description)}
                    presetColor={presetColorString}
                    btnColor={btnColorString}
                    isUploadingMainImage={isUploadingMainImage}
                />
            )}

            {activeTemplateString === 'template_2' && (
                <PhoneTemplate_2
                    contactActions={contactActions}
                    title={title as string}
                    linksBio={links}
                    description={String(description)}
                    imageSelected={profileImage?.preview as string}
                    presetColor={presetColorString}
                    btnColor={btnColorString}
                    isUploadingMainImage={isUploadingMainImage}
                />
            )}

            {activeTemplateString === 'template_3' && (
                <PhoneTemplate_3
                    contactActions={contactActions}
                    title={title as string}
                    linksBio={links}
                    description={String(description)}
                    imageSelected={profileImage?.preview as string}
                    presetColor={presetColorString}
                    btnColor={btnColorString}
                    isUploadingMainImage={isUploadingMainImage}
                />
            )}
        </div>
    );
};

export default GeneralTemplate;
