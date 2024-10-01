import { NextRequest } from 'next/server';

export const parse = (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const searchParams = req.nextUrl.searchParams.toString();
    const key = decodeURIComponent(path.split('/')[1]);
    const fullKey = decodeURIComponent(path.slice(1));
    const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    return {
        path,
        key,
        fullPath,
        fullKey
    };
};

export const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(
        regex,
        (match) =>
            `<span style="background-color: #2F64E9; color: #ffffff; padding: 0.05em 0.2em 0.05em 0.2em; border-radius:2px; ">${match}</span>`
    );
};

export function formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return formatter.format(date);
}

export default async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    return new Promise<string>((resolve) => {
        image.onload = () => {
            if (ctx) {
                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height
                );
                resolve(canvas.toDataURL('image/jpeg'));
            }
        };
    });
}
