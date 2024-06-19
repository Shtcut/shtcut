import { ClassyQRCode } from '@shtcut/components/ui/_shared/svg/classy';
import { ClassyRoundedQRCode } from '@shtcut/components/ui/_shared/svg/rounded-classy';
import { DotQRCode } from '@shtcut/components/ui/_shared/svg/dot';
import { ExtraRoundedQRCode } from '@shtcut/components/ui/_shared/svg/extra-rounded';
import { RoundedQRCode } from '@shtcut/components/ui/_shared/svg/rounded';
import { SquareQRCode } from '@shtcut/components/ui/_shared/svg/square';
import Image from 'next/image';
import {
    CornerDotType,
    CornerSquareType,
    DotType,
    DrawType,
    ErrorCorrectionLevel,
    Mode,
    TypeNumber
} from 'qr-code-styling';

const LOGO_FAV_ICON =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAIVBMVEVMaXEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+JJ50AAAACnRSTlMAYe6EDUIkn9m+6SpLswAAAAlwSFlzAAAD6AAAA+gBtXtSawAAA4NJREFUeJztWu2SwyAIDKJo8v4PfJPU72hi0LQzN+7Pa3NLAGGRLsvExMTExMTExMTExMS/BcEqtm3bhNFK/oJ9iyCQvsqOJma3Jsgfsh8w33CCqrEfgNfZxQX72xYofcf+pgWqwr4iACafqfHkssoOLusgJIYYnIkSquzJqUP/gfkB+w4lRqeBfMCeWCBGFCSZFtoQYV1mPyxwX8J+ehRP2eM86HYBlOjFfceTZkgWSF1kb7J8xEGQK5N9h3NBTy3QKbvBJ6UN+2OAfPa9U9sHNZtfxewMR5reJDA+8NAVQC4/OP6V+iLY6wATH3kCBGiUve4NOjNAUEH8VlpA+T8wDdBZMc+k96bpZQ8Y64DPq6pCP8JXDZDJKY5OZISb7OxLQmWfPk6grEhQcVmbrNMEzwCwHJScyEcWWKtXngFoKY4UKAuSGwugT5Lo2H+eTgNJqTAyKKkSCVauNqej68QG0KkTR4diHasHaB/34GzASQeETll2MQlGBMgOm5DlwMcnlTcsqz7ynYwYoy7kp6AIb0Gh4YfBADljPuR14EYvUV3Gt4liyqSXbtMzXvhifYRp068i5f8ktusFLQ1T1kaYpgDojN6Suj9fqaE1qdfnAUqz+NfPoO1ybG1wQRyzp/yYs3t3ioYwmmCkPPmxSUlC/ESqc/C22Ka6M8uke8GS9dmTyqIGT8bVIs6AZhmv/RPq4sO6L52RKjbgwQhD/pliOb2651AfEvuV0D2ejTDool9+qNpw9rKt4yzcP9eMAUpc+9iXuiRE9p7sZAA8H9+Uy7/aF0IQjsiSpFBoMTeAAbxNsrIa9nnnDz9zBF/t4xcHvS5HEwOZBoibCBwUFUWOiQ+Z4+vWEsCgbWLYcyv6rgC2Jv/JrF0cTpNJgLiXIFtjADPB4k97U78aYcCykB8F4lrj7GJfwmxPUlgqAPR38jt8aNj3YFtLElZxrcufGKA771D599HGvgGDPl6L8K+jNa+MZGubjptQYPhQ2h3xgAAsXo80H6P8oqrrIvak61lb2j7+xc/wkrelZd7hBvhaeh3Iyq5wxIoct7tqfrGpHLIQE+5t1IhtXVc9VbcHzn1zHPuOcK6wd1fIA4mz9KYq+xu/T1EJw76B/yb7pfBN2Zf3AD9lr65nuds6Fsj8kv1AYUXO2hUO29Kb77IfkK7jifCDlImJiYmJiYmJiYmJif+HP1zjXmgmoSYOAAAAAElFTkSuQmCC';

export const QR_CODE_CONFIG = {
    width: 300,
    height: 300,
    type: 'svg' as DrawType,
    data: 'https://app.shtcut.link/',
    margin: 10,
    qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: 'Byte' as Mode,
        errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous'
    },
    dotsOptions: {
        color: '#222222',
        type: 'classy' as DotType
    },
    cornersSquareOptions: {
        color: '#222222',
        type: 'extra-rounded' as CornerSquareType
    },
    cornersDotOptions: {
        color: '#222222',
        type: 'dot' as CornerDotType,
        gradient: {
            type: 'linear', // 'radial'
            rotation: 180,
            colorStops: [
                { offset: 0, color: '#00266e' },
                { offset: 1, color: '#4060b3' }
            ]
        }
    }
};

export const QR_PATTERNS = [
    {
        type: 'square',
        icon: <SquareQRCode />
    },
    {
        type: 'dots',
        icon: <DotQRCode />
    },
    {
        type: 'rounded',
        icon: <RoundedQRCode />
    },
    {
        type: 'extra-rounded',
        icon: <ExtraRoundedQRCode />
    },
    {
        type: 'classy',
        icon: <ClassyQRCode />
    },
    {
        type: 'classy-rounded',
        icon: <ClassyRoundedQRCode />
    }
];

export const QR_CORNER_PATTERNS = [
    {
        type: 'square',
        icon: (
            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6048_119858)">
                    <path
                        d="M0.5 0.5V60.5H60.5V0.5H0.5ZM9.15671 9.05721H52.0423V51.9428H9.15671V9.05721Z"
                        fill="black"
                    ></path>
                    <path d="M17.7148 17.6152H43.486V43.3864H17.7148V17.6152Z" fill="black"></path>
                </g>
                <defs>
                    <clipPath id="clip0_6048_119858">
                        <rect width="60" height="60" fill="white" transform="translate(0.5 0.5)"></rect>
                    </clipPath>
                </defs>
            </svg>
        )
    },
    {
        type: 'extra-rounded',
        icon: (
            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6048_52443)">
                    <path
                        d="M0.5 21.9288V39.0712C0.5 50.9062 10.0938 60.5 21.9288 60.5H39.0712C50.9062 60.5 60.5 50.9062 60.5 39.0712V21.9288C60.5 10.0938 50.9062 0.5 39.0712 0.5H21.9288C10.0938 0.5 0.5 10.0938 0.5 21.9288ZM21.9288 9.07171H39.0712C46.1724 9.07171 51.9283 14.8276 51.9283 21.9288V39.0712C51.9283 46.1724 46.1724 51.9283 39.0712 51.9283H21.9288C14.8276 51.9283 9.07171 46.1724 9.07171 39.0712V21.9288C9.07171 14.8276 14.8276 9.07171 21.9288 9.07171Z"
                        fill="black"
                    ></path>
                    <path
                        d="M30.4977 43.3567C37.5985 43.3567 43.3548 37.6004 43.3548 30.4997C43.3548 23.3989 37.5985 17.6426 30.4977 17.6426C23.3969 17.6426 17.6406 23.3989 17.6406 30.4997C17.6406 37.6004 23.3969 43.3567 30.4977 43.3567Z"
                        fill="black"
                    ></path>
                </g>
                <defs>
                    <clipPath id="clip0_6048_52443">
                        <rect width="60" height="60" fill="white" transform="translate(0.5 0.5)"></rect>
                    </clipPath>
                </defs>
            </svg>
        )
    },
    {
        type: 'dot',
        icon: (
            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6048_26219)">
                    <path
                        d="M30.4498 0.5C13.8821 0.52784 0.472203 13.9815 0.500043 30.5492C0.527883 47.1179 13.9815 60.5268 30.5493 60.499C47.118 60.4712 60.5269 47.0175 60.499 30.4498C60.4722 13.9208 47.0792 0.52784 30.5493 0.5H30.4498ZM30.4498 9.07171C42.2848 9.09955 51.8557 18.7153 51.8289 30.5502C51.8011 42.3852 42.1854 51.9561 30.3504 51.9293C18.5164 51.9004 8.94449 42.2847 8.97233 30.4498C8.99917 18.6546 18.5552 9.09856 30.3504 9.07171H30.4498Z"
                        fill="black"
                    ></path>
                    <path
                        d="M30.4508 43.3567C37.5516 43.3567 43.3079 37.6004 43.3079 30.4997C43.3079 23.3989 37.5516 17.6426 30.4508 17.6426C23.3501 17.6426 17.5938 23.3989 17.5938 30.4997C17.5938 37.6004 23.3501 43.3567 30.4508 43.3567Z"
                        fill="black"
                    ></path>
                </g>
                <defs>
                    <clipPath id="clip0_6048_26219">
                        <rect width="60" height="60" fill="white" transform="translate(0.5 0.5)"></rect>
                    </clipPath>
                </defs>
            </svg>
        )
    }
];

export const SOCIAL_ICONS_LOGOS = [
    {
        name: 'shtcut',
        image: LOGO_FAV_ICON
    },
    {
        name: 'facebook',
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPgo8cGF0aCBkPSJNMjUsM0MxMi44NSwzLDMsMTIuODUsMywyNWMwLDExLjAzLDguMTI1LDIwLjEzNywxOC43MTIsMjEuNzI4VjMwLjgzMWgtNS40NDN2LTUuNzgzaDUuNDQzdi0zLjg0OCBjMC02LjM3MSwzLjEwNC05LjE2OCw4LjM5OS05LjE2OGMyLjUzNiwwLDMuODc3LDAuMTg4LDQuNTEyLDAuMjc0djUuMDQ4aC0zLjYxMmMtMi4yNDgsMC0zLjAzMywyLjEzMS0zLjAzMyw0LjUzM3YzLjE2MWg2LjU4OCBsLTAuODk0LDUuNzgzaC01LjY5NHYxNS45NDRDMzguNzE2LDQ1LjMxOCw0NywzNi4xMzcsNDcsMjVDNDcsMTIuODUsMzcuMTUsMywyNSwzeiIvPgo8L3N2Zz4='
    },
    {
        name: 'instagram',
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPgo8cGF0aCBkPSJNIDE2LjUgNSBDIDEwLjE2NjM5IDUgNSAxMC4xNjYzOSA1IDE2LjUgTCA1IDMxLjUgQyA1IDM3LjgzMjc1NyAxMC4xNjYyMDkgNDMgMTYuNSA0MyBMIDMxLjUgNDMgQyAzNy44MzI5MzggNDMgNDMgMzcuODMyOTM4IDQzIDMxLjUgTCA0MyAxNi41IEMgNDMgMTAuMTY2MjA5IDM3LjgzMjc1NyA1IDMxLjUgNSBMIDE2LjUgNSB6IE0gMTYuNSA4IEwgMzEuNSA4IEMgMzYuMjExMjQzIDggNDAgMTEuNzg3NzkxIDQwIDE2LjUgTCA0MCAzMS41IEMgNDAgMzYuMjExMDYyIDM2LjIxMTA2MiA0MCAzMS41IDQwIEwgMTYuNSA0MCBDIDExLjc4Nzc5MSA0MCA4IDM2LjIxMTI0MyA4IDMxLjUgTCA4IDE2LjUgQyA4IDExLjc4NzYxIDExLjc4NzYxIDggMTYuNSA4IHogTSAzNCAxMiBDIDMyLjg5NSAxMiAzMiAxMi44OTUgMzIgMTQgQyAzMiAxNS4xMDUgMzIuODk1IDE2IDM0IDE2IEMgMzUuMTA1IDE2IDM2IDE1LjEwNSAzNiAxNCBDIDM2IDEyLjg5NSAzNS4xMDUgMTIgMzQgMTIgeiBNIDI0IDE0IEMgMTguNDk1MTc4IDE0IDE0IDE4LjQ5NTE3OCAxNCAyNCBDIDE0IDI5LjUwNDgyMiAxOC40OTUxNzggMzQgMjQgMzQgQyAyOS41MDQ4MjIgMzQgMzQgMjkuNTA0ODIyIDM0IDI0IEMgMzQgMTguNDk1MTc4IDI5LjUwNDgyMiAxNCAyNCAxNCB6IE0gMjQgMTcgQyAyNy44ODMxNzggMTcgMzEgMjAuMTE2ODIyIDMxIDI0IEMgMzEgMjcuODgzMTc4IDI3Ljg4MzE3OCAzMSAyNCAzMSBDIDIwLjExNjgyMiAzMSAxNyAyNy44ODMxNzggMTcgMjQgQyAxNyAyMC4xMTY4MjIgMjAuMTE2ODIyIDE3IDI0IDE3IHoiLz4KPC9zdmc+'
    },
    {
        name: 'youtube',
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPgo8cGF0aCBkPSJNIDQ0Ljg5ODQzOCAxNC41IEMgNDQuNSAxMi4zMDA3ODEgNDIuNjAxNTYzIDEwLjY5OTIxOSA0MC4zOTg0MzggMTAuMTk5MjE5IEMgMzcuMTAxNTYzIDkuNSAzMSA5IDI0LjM5ODQzOCA5IEMgMTcuODAwNzgxIDkgMTEuNjAxNTYzIDkuNSA4LjMwMDc4MSAxMC4xOTkyMTkgQyA2LjEwMTU2MyAxMC42OTkyMTkgNC4xOTkyMTkgMTIuMTk5MjE5IDMuODAwNzgxIDE0LjUgQyAzLjM5ODQzOCAxNyAzIDIwLjUgMyAyNSBDIDMgMjkuNSAzLjM5ODQzOCAzMyAzLjg5ODQzOCAzNS41IEMgNC4zMDA3ODEgMzcuNjk5MjE5IDYuMTk5MjE5IDM5LjMwMDc4MSA4LjM5ODQzOCAzOS44MDA3ODEgQyAxMS44OTg0MzggNDAuNSAxNy44OTg0MzggNDEgMjQuNSA0MSBDIDMxLjEwMTU2MyA0MSAzNy4xMDE1NjMgNDAuNSA0MC42MDE1NjMgMzkuODAwNzgxIEMgNDIuODAwNzgxIDM5LjMwMDc4MSA0NC42OTkyMTkgMzcuODAwNzgxIDQ1LjEwMTU2MyAzNS41IEMgNDUuNSAzMyA0NiAyOS4zOTg0MzggNDYuMTAxNTYzIDI1IEMgNDUuODk4NDM4IDIwLjUgNDUuMzk4NDM4IDE3IDQ0Ljg5ODQzOCAxNC41IFogTSAxOSAzMiBMIDE5IDE4IEwgMzEuMTk5MjE5IDI1IFoiLz4KPC9zdmc+'
    },
    {
        name: 'linkedIn',
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPgo8cGF0aCBkPSJNNDEsNEg5QzYuMjQsNCw0LDYuMjQsNCw5djMyYzAsMi43NiwyLjI0LDUsNSw1aDMyYzIuNzYsMCw1LTIuMjQsNS01VjlDNDYsNi4yNCw0My43Niw0LDQxLDR6IE0xNywyMHYxOWgtNlYyMEgxN3ogTTExLDE0LjQ3YzAtMS40LDEuMi0yLjQ3LDMtMi40N3MyLjkzLDEuMDcsMywyLjQ3YzAsMS40LTEuMTIsMi41My0zLDIuNTNDMTIuMiwxNywxMSwxNS44NywxMSwxNC40N3ogTTM5LDM5aC02YzAsMCwwLTkuMjYsMC0xMCBjMC0yLTEtNC0zLjUtNC4wNGgtMC4wOEMyNywyNC45NiwyNiwyNy4wMiwyNiwyOWMwLDAuOTEsMCwxMCwwLDEwaC02VjIwaDZ2Mi41NmMwLDAsMS45My0yLjU2LDUuODEtMi41NiBjMy45NywwLDcuMTksMi43Myw3LjE5LDguMjZWMzl6Ii8+Cjwvc3ZnPg=='
    },
    {
        name: 'tiktok',
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPgo8cGF0aCBkPSJNNDEsNEg5QzYuMjQzLDQsNCw2LjI0Myw0LDl2MzJjMCwyLjc1NywyLjI0Myw1LDUsNWgzMmMyLjc1NywwLDUtMi4yNDMsNS01VjlDNDYsNi4yNDMsNDMuNzU3LDQsNDEsNHogTTM3LjAwNiwyMi4zMjMgYy0wLjIyNywwLjAyMS0wLjQ1NywwLjAzNS0wLjY5LDAuMDM1Yy0yLjYyMywwLTQuOTI4LTEuMzQ5LTYuMjY5LTMuMzg4YzAsNS4zNDksMCwxMS40MzUsMCwxMS41MzdjMCw0LjcwOS0zLjgxOCw4LjUyNy04LjUyNyw4LjUyNyBzLTguNTI3LTMuODE4LTguNTI3LTguNTI3czMuODE4LTguNTI3LDguNTI3LTguNTI3YzAuMTc4LDAsMC4zNTIsMC4wMTYsMC41MjcsMC4wMjd2NC4yMDJjLTAuMTc1LTAuMDIxLTAuMzQ3LTAuMDUzLTAuNTI3LTAuMDUzIGMtMi40MDQsMC00LjM1MiwxLjk0OC00LjM1Miw0LjM1MnMxLjk0OCw0LjM1Miw0LjM1Miw0LjM1MnM0LjUyNy0xLjg5NCw0LjUyNy00LjI5OGMwLTAuMDk1LDAuMDQyLTE5LjU5NCwwLjA0Mi0xOS41OTRoNC4wMTYgYzAuMzc4LDMuNTkxLDMuMjc3LDYuNDI1LDYuOTAxLDYuNjg1VjIyLjMyM3oiLz4KPC9zdmc+'
    }
];

{
    /* <section className="border border-black  rounded-[3rem] w-60 mx-auto h-80 flex justify-center    bg-transparent">
                            <div className="flex flex-col justify-between  w-full ">
                                <div className=" bg-black h-10 w-full rounded-t-[3rem]" />
                                <div className=" w-52  flex justify-center items-center flex-col mx-auto ">
                                    <div className="border-black border-4 flex justify-center items-center  w-full rounded-2xl">
                                        <div ref={ref} className="h-35 w-35 rounded-lg " />
                                    </div>
                                    <section className="flex flex-col w-full items-center">
                                        <div className="triangle" />
                                        <div className="bg-black  flex justify-center mx-auto w-full h-6 items-center  rounded-xl ">
                                            <p className="text-white text-xs">SCAN ME!</p>
                                        </div>
                                    </section>
                                </div>
                                <div className="bg-black h-10  rounded-b-[3rem]" />
                            </div>
                        </section> */
}

{
    /* <div className=" w-56  flex justify-center items-center flex-col mx-auto ">
                            <div className="border-black rounded-bl-md rounded-tr rounded-br-3xl flex-col border flex justify-between items-center h-60   w-full rounded-tl-[1.7rem]">
                                <div className="flex-1">
                                    <div ref={ref} className="h-35 w-35 rounded-lg " />
                                </div>

                                <div className=" w-full bg-black ">
                                    <div className=" bg-white   h-6 w-full rounded-b-2xl  " />
                                </div>
                                <div className="w-full rounded-br-[1.1rem]  h-12 flex justify-center items-center border  border-black rounded-bl bg-black">
                                    <p className="text-xs text-center text-white font-medium">SCAN ME!</p>
                                </div>
                            </div>
                        </div> */
}

export const QR_CODE_FRAMES = ({ children }: { children: JSX.Element }) => {
    return [
        {
            id: 1,
            icon: (
                <Image
                    className="cursor-pointer"
                    src={`/svg/qrcode-scanner-1.svg`}
                    alt={`qrcode-scanner-1`}
                    width={500}
                    height={500}
                />
            ),
            frame: (
                <div className=" w-56  flex justify-center items-center flex-col mx-auto ">
                    <div className="border-black border-4 flex justify-center items-center  w-full rounded-2xl">
                        {children}
                    </div>
                    <section className="flex flex-col w-full items-center">
                        <div className="triangle" />
                        <div className="bg-black  flex justify-center mx-auto w-full h-6 items-center  rounded-xl ">
                            <p className="text-white text-xs">SCAN ME!</p>
                        </div>
                    </section>
                </div>
            )
        },
        {
            id: 2,
            icon: (
                <Image
                    className="cursor-pointer"
                    src={`/svg/qrcode-scanner-7.svg`}
                    alt={`qrcode-scanner-1`}
                    width={500}
                    height={500}
                />
            ),
            frame: (
                <div className=" w-48  flex justify-center items-center flex-col mx-auto ">
                    <div className=" flex-col border-black border-2 rounded-lg   flex justify-between items-center    w-full ">
                        {children}
                    </div>
                    <div className="tooltip" />
                    <p className="text-xs mt-3 border-black py-1 w-full  border-b-2 text-center">SCAN ME!</p>
                </div>
            )
        }
    ];
};
