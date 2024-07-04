'use client';

import { PageLayout, ShtcutProvider, Toaster, cn } from '@shtcut-ui/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@shtcut/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SidebarProvider } from '@shtcut/components/dashboard';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ShtcutProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                    <SidebarProvider>
                        {/* <PageLayout className="bg-white-90">{children}</PageLayout> */}
                        {children}
                        <Toaster />
                    </SidebarProvider>
                </ShtcutProvider>
            </PersistGate>
        </Provider>
    );
}
