'use client';

export const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                <div className="text-center space-y-1">
                    <p className="font-medium">Loading Workspace</p>
                    <p className="text-sm text-muted-foreground">Please wait while we prepare your workspace...</p>
                </div>
            </div>
        </div>
    );
};
