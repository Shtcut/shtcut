'use client';

import '../styles/globals.css';
import { PageLayout, ShtcutProvider, Toaster, cn } from '@shtcut-ui/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@shtcut/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { fontHandwriting, fontHeading, fontMono, fontSans } from '@shtcut/_shared/utils/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    fontSans.variable,
                    fontMono.variable,
                    fontHeading.variable,
                    fontHandwriting.variable,
                    'min-h-screen scroll-smooth font-sans antialiased selection:bg-foreground selection:text-background'
                )}
            >
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ShtcutProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem={false}
                            disableTransitionOnChange
                        >
                            {/* <PageLayout className="bg-white-90">{children}</PageLayout> */}
                            {children}
                            <Toaster />
                        </ShtcutProvider>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}
