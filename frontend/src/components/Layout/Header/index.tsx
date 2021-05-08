import Link from 'next/link'
import styles from './header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logoHeader}>iEnquetes</h1>
            <Link href="/enquete/nova">Criar nova</Link>
        </header>
    );
}

export default Header