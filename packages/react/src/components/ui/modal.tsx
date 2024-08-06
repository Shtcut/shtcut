'use client';
import * as React from 'react';
import { CommonProps } from '../../types';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../utils';
import { X } from 'lucide-react';
import { Drawer } from 'vaul';

interface ModalProps extends CommonProps {
    showModel?: boolean;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    preventDefaultClose?: boolean;
    showCloseIcon?: boolean;
    useDrawer?: boolean;
}

export const Modal = (props: ModalProps) => {
    const { showModel, className, setShowModal, showCloseIcon, onClose, preventDefaultClose, children, useDrawer } =
        props;

    const closeModal = () => {
        if (preventDefaultClose) {
            return;
        }
        onClose && onClose();

        if (setShowModal) {
            setShowModal(false);
        }
    };

    const handleVisibility = (open: boolean) => {
        if (!open) {
            closeModal();
        }
    };
    return (
        <>
            {useDrawer ? (
                <Drawer.Root open={setShowModal ? showModel : false} onOpenChange={(open) => handleVisibility(open)}>
                    <Drawer.Overlay className="fixed inset-0 z-50 bg-gray-100 bg-opacity-40 backdrop-blur-sm  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto max-h-screen grid place-items-center" />
                    <Drawer.Portal>
                        <Drawer.Content
                            className={cn(
                                'fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border border-gray-200 bg-white p-0 shadow-xl sm:rounded-2xl',
                                className,
                            )}
                        >
                            {children}
                            {showCloseIcon && (
                                <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </Dialog.Close>
                            )}
                        </Drawer.Content>
                        <Drawer.Overlay />
                    </Drawer.Portal>
                </Drawer.Root>
            ) : (
                <Dialog.Root open={setShowModal ? showModel : false} onOpenChange={(open) => handleVisibility(open)}>
                    <Dialog.Portal>
                        <Dialog.Overlay
                            id="modal-backdrop"
                            className="animate-fade-in fixed overflow-y-auto max-h-screen grid place-items-center inset-0 z-50 bg-gray-100 bg-opacity-50 backdrop-blur-sm"
                            // className="fixed inset-0 z-50 backdrop-blur-md  bg-white bg-opacity-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto max-h-screen grid place-items-center"
                            aria-hidden="true"
                        >
                            <Dialog.Content
                                onOpenAutoFocus={(e) => e.preventDefault()}
                                onCloseAutoFocus={(e) => e.preventDefault()}
                                className={cn(
                                    'fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border border-gray-200 animate-scale-in  bg-white  p-0 shadow-xl sm:rounded-2xl',
                                    className,
                                )}
                                aria-labelledby="radix-:r35:"
                            >
                                {children}
                                {showCloseIcon && (
                                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </Dialog.Close>
                                )}
                            </Dialog.Content>
                        </Dialog.Overlay>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </>
    );
};
