import React, { useEffect, useState } from 'react';
import { apiPublicKeys } from '../Routes/Cred';
import Error from './Error';

const Features = ({ search }) => {
    const [data, setData] = new useState([]);
    const [load, setLoad] = new useState(true);
    const [error, setError] = new useState("");
    const [pages, setPages] = new useState([]);
    const [actualPage, setActualPage] = new useState(0);

    const Chance = require("chance");
    const change = Chance();

    useEffect(() => {
        fetchApi(apiPublicKeys.url, apiPublicKeys.key, change.word({ pool: 'uncopyrightable', syllables: 1 }));
    }, [])

    useEffect(() => {
        setLoad(true);
        fetchApi(apiPublicKeys.url, apiPublicKeys.key, search !== "" ? search : change.word());
        setActualPage(0);
    }, [search])

    useEffect(() => {
        const pageSize = 9;
        const mainArray = [];

        for (let i = 0; i < data.length; i += pageSize) {
            let subArrays = data.slice(i, i + pageSize);
            mainArray.push(subArrays);
        }
        setPages(mainArray);
    }, [data])

    const fetchApi = (url, key, query) => {
        const urlComplete = `${url}?q=${query}&api_key=${key}`;

        let fetchs = async () => {
            await fetch(urlComplete)
                .then(response => {
                    if (!response.ok)
                        throw new Error(response.status);
                    return response.json();
                })
                .then(dataset => {
                    setTimeout(() => {
                        setData(dataset.data);
                        setLoad(false);
                    }, 2000)
                })
                .catch(errors => setError(errors));
        }
        fetchs();
    }

    const changePage = (change) => {
        const actual = actualPage;
        const last = actual - 1;
        const next = actual + 1;

        switch (change) {
            case 'last':
                setActualPage(last);
                break;
            case 'next':
                setActualPage(next);
                break;
            default:
                return;
        }
    }

    if (error === "" && load === false) {
        return (
            <main className='main-section' id='Inicio_page'>
                <section className='main-content-news display-center'>
                    {
                        pages.length !== 0 ? pages[actualPage].map((article, index) => {
                            return (
                                <article key={`key${index}`} className='story-new-content display-center' >
                                    <div className="image-story-content">
                                        <img src={article.images.original.url} alt={article.title} title={article.title} className="image-story" />
                                    </div>
                                    <div className='info-story-content display-center'>
                                        <h2 className='title-story'>{article.title.length > 60 ? `${article.title.slice(0, 60)}...` : article.title}.</h2>
                                        <p className='name'>{article.source_tld}</p>
                                    </div>
                                </article>
                            )
                        }) : null
                    }
                </section>
                <section id="nav-buttons" className='display-center'>
                    <div className="buttons-page-content display-center">
                        {
                            actualPage !== 0 && (<button className='buttons-page' id="last-page" onClick={e => changePage("last")}>{`<`} Anterior</button>)
                        }
                    </div>
                    <div className="count-page display-center">
                        <p className='text-page'>{actualPage + 1} de {pages.length}</p>
                    </div>
                    <div className="buttons-page-content display-center">
                        {
                            actualPage < pages.length - 1 ? (<button id="next-page" className='buttons-page' onClick={e => changePage("next")}>Siguiente {`>`}</button>) : null
                        }
                    </div>
                </section>
            </main>
        )
    } else if (load === true && error === "") {
        return (
            <div id='spinner-content' className='display-center'>
                <div id='spinner'></div>
            </div>
        )
    } else if (error !== "")
        return <Error />

}

export default Features; 