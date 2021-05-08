import { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
    children: ReactNode
}

import styles from './layout.module.css'

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />

            <main className={styles.main}>
                {children}
            </main>

            <Footer />
        </>
    )
}