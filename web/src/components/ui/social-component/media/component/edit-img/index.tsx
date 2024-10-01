import { Input, Label } from '@shtcut-ui/react';
import { RootState } from '@shtcut/redux/store';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Crop, X } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import './style.css';
import getCroppedImg from '@shtcut/_shared/utils/helper';
// @ts-ignore
import Cropper from 'react-easy-crop';

const EditModal = () => {
    const selectedPhoto = useSelector((state: RootState) => state.img.selectedPhoto);
    console.log('clg:::', selectedPhoto);
    const DEFAULT_BRIGHTNESS = 100;
    const DEFAULT_CONTRAST = 100;
    const DEFAULT_SATURATE = 100;
    const DEFAULT_GRAYSCALE = 0;
    const DEFAULT_EXPOSURE = 100;
    const DEFAULT_TEMPERATURE = 100;

    const [imageFile, setImageFile] = useState<File | undefined>(undefined);
    const [brightness, setBrightness] = useState(DEFAULT_BRIGHTNESS);
    const [contrast, setContrast] = useState(DEFAULT_CONTRAST);
    const [saturate, setSaturate] = useState(DEFAULT_SATURATE);
    const [grayscale, setGrayscale] = useState(DEFAULT_GRAYSCALE);
    const [exposure, setExposure] = useState(DEFAULT_EXPOSURE);
    const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageSrc = selectedPhoto?.urls?.small;

    const fetchImageAsFile = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });
            setImageFile(file);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        if (selectedPhoto?.urls?.small) {
            fetchImageAsFile(selectedPhoto.urls.small);
        }
    }, [selectedPhoto]);

    const adjustExposureAndTemperature = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        exposure: number,
        temperature: number
    ) => {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i]; // Red channel
            let g = data[i + 1]; // Green channel
            let b = data[i + 2]; // Blue channel

            r = r * exposure;
            g = g * exposure;
            b = b * exposure;

            if (temperature > 1) {
                r = r * temperature;
                g = g * temperature;
            } else if (temperature < 1) {
                b = b * (2 - temperature);
            }

            data[i] = Math.min(255, r);
            data[i + 1] = Math.min(255, g);
            data[i + 2] = Math.min(255, b);
        }

        ctx.putImageData(imageData, 0, 0);
    };

    useEffect(() => {
        if (canvasRef.current && imageSrc) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;

                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.filter = `
                        brightness(${brightness}%)
                        contrast(${contrast}%)
                        saturate(${saturate}%)
                        grayscale(${grayscale}%)
                    `;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    // Apply exposure and temperature manually
                    adjustExposureAndTemperature(ctx, canvas.width, canvas.height, exposure / 100, temperature / 100);
                }
            };
        }
    }, [brightness, contrast, saturate, grayscale, exposure, temperature, imageSrc]);

    // Cropper functionality
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            if (!croppedAreaPixels || !imageSrc) return;
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            setCroppedImage(croppedImage); // Save cropped image
            const ctx = canvasRef.current?.getContext('2d');
            const image = new Image();
            image.src = croppedImage;
            image.onload = () => {
                if (ctx) {
                    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                }
            };
            setIsCropping(false);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imageSrc]);

    const handleUndo = () => {
        setBrightness(DEFAULT_BRIGHTNESS);
        setContrast(DEFAULT_CONTRAST);
        setSaturate(DEFAULT_SATURATE);
        setGrayscale(DEFAULT_GRAYSCALE);
        setExposure(DEFAULT_EXPOSURE);
        setTemperature(DEFAULT_TEMPERATURE);
    };

    return (
        <section>
            <div>
                {imageSrc && (
                    <div className="canvas-container relative" style={{ width: '100%', height: '287px' }}>
                        {!isCropping && (
                            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} className="rounded-xl" />
                        )}

                        {isCropping && (
                            // @ts-ignore
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                style={{
                                    cropAreaStyle: {
                                        border: '2px dashed #ffffff'
                                    },
                                    containerStyle: {
                                        zIndex: 10,
                                        height: '100%',
                                        width: '100%',
                                        margin: 'auto'
                                    }
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
            <section className="flex mt-4 items-center justify-between">
                <h1 className="font-bold">Edit Image</h1>
                <div className="flex items-center gap-x-4">
                    <div
                        className="text-[#5A5555] flex items-center cursor-pointer gap-x-1 text-xs"
                        onClick={() => setIsCropping(!isCropping)}
                    >
                        <Crop size={16} /> {isCropping ? 'Cancel' : 'Crop'}
                    </div>
                    <div
                        className="text-[#5A5555] flex items-center cursor-pointer gap-x-1 text-xs"
                        onClick={handleUndo}
                    >
                        <RotateCcw size={16} /> Undo
                    </div>
                </div>
            </section>

            {/* Crop Button */}
            {isCropping && (
                <div className="flex mt-4 z-50 gap-2">
                    <button onClick={showCroppedImage} className="bg-blue-500 text-white p-2 rounded">
                        Apply Crop
                    </button>
                </div>
            )}

            {/* Image Adjustment Controls */}
            <div className="flex mt-4 flex-col gap-2">
                <section className="flex flex-col gap-1">
                    <Label className="text-xs p-0 m-0 font-light">Brightness</Label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="bg-[#D0D0D080] rounded-lg h-[10px] hover:bg-none"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                        }}
                    />
                </section>
                <section className="flex flex-col gap-1">
                    <Label className="text-xs p-0 m-0 font-light">Contrast</Label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="bg-[#D0D0D080] rounded-lg h-[10px] hover:bg-none"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                        }}
                    />
                </section>
                <section className="flex flex-col gap-1">
                    <Label className="text-xs p-0 m-0 font-light">Saturate</Label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={saturate}
                        onChange={(e) => setSaturate(Number(e.target.value))}
                        className="bg-[#D0D0D080] rounded-lg h-[10px] hover:bg-none"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                        }}
                    />
                </section>
                <section className="flex flex-col gap-1">
                    <Label className="text-xs p-0 m-0 font-light">Grayscale</Label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={grayscale}
                        onChange={(e) => setGrayscale(Number(e.target.value))}
                        className="bg-[#D0D0D080] rounded-lg h-[10px] hover:bg-none"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                        }}
                    />
                </section>
                <section className="flex flex-col gap-1">
                    <Label className="text-xs p-0 m-0 font-light">Exposure</Label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={exposure}
                        onChange={(e) => setExposure(Number(e.target.value))}
                        className="bg-[#D0D0D080] rounded-lg h-[10px] hover:bg-none"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                        }}
                    />
                </section>
                <section className="flex flex-col gap-1">
                    <Label className="text-xs p-0 m-0 font-light">Temperature</Label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="bg-[#D0D0D080] rounded-lg h-[10px] hover:bg-none"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                        }}
                    />
                </section>
            </div>
        </section>
    );
};

export default EditModal;
