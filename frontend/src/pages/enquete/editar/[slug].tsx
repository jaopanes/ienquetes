import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import api from '../../../services/api'

import styles from '../../../styles/pages/new.module.css'

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

const EditSlugSurvey = ({ data }: SurveyData) => {
    const [options, setOptions] = useState(data.options.length)

    const addOption = () => {
        setOptions(prevState => prevState + 1)
    }

    const reduceOption = () => {
        if (options == 3) {
            setOptions(prevState => prevState)
        } else {
            setOptions(prevState => prevState - 1)
        }
    }

    const inputOptions = []

    data.options.map((content, index) => (
        inputOptions.push(
            <div key={`options${index}`} className={styles.inputGroup}>
                <label htmlFor={`option-${index}`}>Nome da opção</label>
                <input type="text" name="option[]" id={`option-${index}`} value={content.title} />
            </div>
        )
    ))

    for (let index = 0; index < (options - data.options.length); index++) {
        inputOptions.push(
            <div key={`options${index}`} className={styles.inputGroup}>
                <label htmlFor={`option-${index}`}>Nome da opção</label>
                <input type="text" name="option[]" id={`option-${index}`} placeholder="Digite o nome da opção" />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Editar - {data.survey.title} | iEnquetes</title>
            </Head>

            <section className={styles.sectionNew}>
                <h2 className={styles.titleSection}>Editar Enquete</h2>
                <Link href="/">Voltar</Link>

                <form>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">Nome da enquete</label>
                        <input name="title" type="text" id="title" value={data.survey.title} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="date-init">Data do ínicio</label>
                        <input name="initiated_at" type="date" id="date-init" value={data.survey.initiated_at} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="date-end">Data do do fim</label>
                        <input name="ended_at" type="date" id="date-end" value={data.survey.ended_at} />
                    </div>

                    <h2 className={styles.titleSection}>Opções para a enquete</h2>

                    <div className={styles.inputGroup}>
                        <label htmlFor="date-end">Quantidade de opções</label>

                        <div className={styles.basedOptions}>
                            <div className={styles.qntOptions}>{options}</div>

                            <div onClick={reduceOption} className={styles.btnReduce}></div>
                            <div onClick={addOption} className={styles.btnAdd}></div>
                        </div>
                    </div>

                    {inputOptions}

                    <button type="submit" className={styles.btnSubmit}>Enviar</button>
                </form>
            </section>
        </>
    )
}

export default EditSlugSurvey