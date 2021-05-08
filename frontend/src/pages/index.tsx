import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SurveyInterface from '../interfaces/Survey'
import api from '../services/api'
import styles from '../styles/pages/index.module.css'

const Index = () => {
    const [survey, setSurvey] = useState<SurveyInterface | undefined>(undefined)

    useEffect(() => {
        async function getSurvey() {
            const response = await api.get('/surveys')
            setSurvey(response.data)
        }

        getSurvey()
    }, [])

    return (
        <>
            <Head>
                <title>Página Inicial - iEnquetes</title>
            </Head>

            <section className={styles.gridSurvey}>
                <div className={styles.basedSurvey}>
                    <h2 className={styles.titleGrid}>Enquetes em aberto</h2>

                    {survey?.active.map((content, index) => (
                        <article className={styles.survey} key={`surveyActive${index}`}>
                            <div className={styles.titleSurvey}><Link href={`/enquete/${content.id}`}>{content.title}</Link></div>
                            <div className={styles.dateSurvey}>{content.initiated_at} • {content.ended_at}</div>
                        </article>
                    ))}
                </div>

                <div className={`${styles.basedSurvey} ${styles.surveyFuture} `}>
                    <h2 className={styles.titleGrid}>Futuras enquetes</h2>

                    {survey?.future.map((content, index) => (
                        <article className={styles.survey} key={`surveyFuture${index}`}>
                            <div className={styles.titleSurvey}><Link href={`/enquete/${content.id}`}>{content.title}</Link></div>
                            <div className={styles.dateSurvey}>{content.initiated_at} • {content.ended_at}</div>
                        </article>
                    ))}
                </div>

                <div className={`${styles.basedSurvey} ${styles.surveyEnded} `}>
                    <h2 className={styles.titleGrid}>Enquetes fechadas</h2>

                    {survey?.ended.map((content, index) => (
                        <article className={styles.survey} key={`surveyEnded${index}`}>
                            <div className={styles.titleSurvey}><Link href={`/enquete/${content.id}`}>{content.title}</Link></div>
                            <div className={styles.dateSurvey}>{content.initiated_at} • {content.ended_at}</div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Index