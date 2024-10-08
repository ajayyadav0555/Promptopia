import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css'
import React, { Suspense } from 'react';

export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}
const RootLayout = ({ children }) => {
    return (
        <html>
            <body>
            <Suspense fallback={<div>Loading...</div>}>
                <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
                </Provider>
                </Suspense>

            </body>
        </html>
    )
}

export default RootLayout;