'use client';

import '../styles/globals.css';
import { PageLayout, ShtcutProvider, Toaster } from '@shtcut-ui/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@shtcut/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="font-poppins">
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
                            <Toaster/>
                        </ShtcutProvider>
                    </PersistGate>
                </Provider>
                
            </body>
        </html>
    );
}
