'use client';

import { Button, Input } from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { QRCodeForm } from '@shtcut/components/form/qr-code';
import { IconCopy } from '@tabler/icons-react';
import {
    BarChart3Icon,
    BarChart4Icon,
    Clock5Icon,
    Clock6Icon,
    Code2Icon,
    FacebookIcon,
    InstagramIcon,
    MailIcon,
    MessageCircleIcon,
    PaperclipIcon,
    Repeat1Icon,
    UploadIcon,
    YoutubeIcon
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

const QrCode = () => {
    const [isRemoveLogo, setIsRemoveLogo] = useState(false);

    return (
        <LayoutBody className="container">
            <QRCodeForm />
        </LayoutBody>
    );
};

export default QrCode;
