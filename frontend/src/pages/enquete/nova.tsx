import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'
import api from '../../services/api'

import styles from '../../styles/pages/new.module.css'

interface MessageInterface {
    message: string;
    type: string;
}

const NewSurvey = () => {
    const [options, setOptions] = useState(3)
    const [dataMessage, setDataMessage] = useState<MessageInterface | undefined>(undefined)

    const router = useRouter()

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

    for (let index = 0; index < options; index++) {
        inputOptions.push(
            <div key={`options${index}`} className={styles.inputGroup}>
                <label htmlFor={`option-${index}`}>Nome da opção</label>
                <input type="text" name="option[]" id={`option-${index}`} placeholder="Digite o nome da opção" />
            </div>
        )
    }

    const formData = useRef(null)

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const data = new FormData(formData.current)

        try {
            const response = await api.post('/surveys', data)
            setDataMessage(response.data)

            if (response.data.type != "error") {
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            }
        } catch (error) {
            setDataMessage(error.response.data)
        }
    }

    return (
        <>
            <Head>
                <title>Criar nova enquete | iEnquetes</title>
            </Head>

            <section className={styles.sectionNew}>
                <h2 className={styles.titleSection}>Criar nova enquete</h2>
                <Link href="/">Voltar</Link>


                {dataMessage != undefined && (
                    <div className={styles.message} data-type={dataMessage.type}>{dataMessage.message}</div>
                )}

                <form ref={formData} onSubmit={(e) => handleFormSubmit(e)}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">Nome da enquete</label>
                        <input name="title" type="text" id="title" placeholder="Digite o nome da enquete" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="date-init">Data do ínicio</label>
                        <input name="initiated_at" type="date" id="date-init" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="date-end">Data do do fim</label>
                        <input name="ended_at" type="date" id="date-end" />
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

export default NewSurvey