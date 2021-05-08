import api from '../../services/api'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/pages/survey.module.css'

interface OptionSurvey {
    id: number,
    survey_id: number,
    title: string,
    created_at: string,
    updated_at: string
}

interface SurveyData {
    data: {
        survey: {
            id: number,
            title: string,
            initiated_at: string,
            ended_at: string,
        },
        options: Array<OptionSurvey>,
        status: 'future' | 'ended' | 'active',
    }
}

export async function getServerSideProps(context) {
    const { params } = context

    const requestSurvey = await api.get(`/surveys/${params.slug}`)
    const response = requestSurvey.data

    return {
        props: {
            data: response
        }
    }
}

const SlugSurvey = ({ data }: SurveyData) => {
    return (
        <>
            <Head>
                <title>{data.survey.title} | iEnquetes</title>
            </Head>

            <section className={styles.readSurvey}>
                <Link href="/">Voltar</Link>
                <Link href={`/enquete/editar/${data.survey.id}`}>Editar</Link>

                <div className={styles.survey}>
                    <h2 className={styles.titleRead}>{data.survey.title}</h2>

                    <form action="">
                        {data.options?.map((content, index) => (
                            <div className={styles.inputGroup} key={`optionsSurvey${index}`}>
                                <input type="radio" name="option-survey" id={`option-${content.id}`} />

                                <label htmlFor={`option-${content.id}`}>
                                    <p className={styles.titleOption}>{content.title}</p>
                                    <p className={styles.qntOption}>35</p>
                                </label>
                            </div>
                        ))}
                        
                        {data.status == "active" ? (
                            <button type="submit" className={styles.btnSubmit}>Confirmar voto</button>
                        ) : data.status == "future" ? (
                            <div className={`${styles.btnSubmit} ${styles.btnNot}`}>Votação não iniciada</div>
                        ) : data.status == "ended" && (
                            <div className={`${styles.btnSubmit} ${styles.btnEnd}`}>Votação encerrada</div>
                        )}
                        
                    </form>
                </div>

                <div className={styles.dateSurvey}><strong>{data.survey.initiated_at}</strong> até <strong>{data.survey.ended_at}</strong></div>
            </section>
        </>
    )
}

export default SlugSurvey