import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@shtcut-ui/react';
import { Download } from 'lucide-react';
import React from 'react';
import { toJpeg, toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { PiQrCode, PiFolders, PiPencilSimpleLine } from 'react-icons/pi';

const DownloadBtn = ({ qrCodeRef }: any) => {
    const handleDownloadPNG = async () => {
        if (qrCodeRef.current) {
            const png = await toPng(qrCodeRef.current);
            saveAs(png, 'qrcode.png');
        }
    };
    const handleDownloadJPEG = async () => {
        if (qrCodeRef.current) {
            const jpeg = await toJpeg(qrCodeRef.current, { quality: 0.95 });
            saveAs(jpeg, 'qrcode.jpeg');
        }
    };
    const handleDownloadSVG = () => {
        if (qrCodeRef.current) {
            const svgElement = qrCodeRef.current.querySelector('svg');
            if (svgElement) {
                const serializer = new XMLSerializer();
                let source = serializer.serializeToString(svgElement);

                // Add namespaces
                if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
                    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
                }
                if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
                    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
                }

                // Add XML declaration
                source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

                const blob = new Blob([source], { type: 'image/svg+xml' });
                saveAs(blob, 'qrcode.svg');
            }
        }
    };

    return (
        <div className="w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                    <Button className="w-full flex items-center h-8 text-xs gap-x-2 bg-primary-0">
                        <Download size={14} />
                        Download
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24" align="end" forceMount>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-x-2"
                            onClick={handleDownloadSVG}
                        >
                            <PiPencilSimpleLine /> SVG
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-x-2"
                            onClick={handleDownloadPNG}
                        >
                            <PiQrCode />
                            PNG
                        </DropdownMenuItem>{' '}
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-x-2"
                            onClick={handleDownloadJPEG}
                        >
                            <PiFolders />
                            JPEG
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DownloadBtn;
