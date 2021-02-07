import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import styles from "./index.module.css";
import {Button, Badge} from 'reactstrap';
import {apiBuyItems} from "../api/Api";
import Image from 'next/image';

export default function Home() {
    const [result, setResult] = useState("");
    const [inputNumber, setInputNumber] = useState(0);

    const _onClickSubmit = () => {
        // Call API
        if (inputNumber) {
            apiBuyItems(inputNumber).then(result => {
                setResult(inputNumber);
            });
        }
    };

    const _updateInputValue = (evt) => {
        setInputNumber(evt.target.value);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Market</title>
            </Head>
            <div className={styles.viewImage}>
                <Image
                    className={styles.imageLogo}
                    alt={""}
                    src="/images/logo.jpg"
                    width={200}
                    height={200}
                />
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12 d-flex flex-column justify-content-center align-items-center">
                <input type="number" className="col-md-5 col-sm-5 col-xs-12"
                       value={inputNumber}
                       onChange={_updateInputValue}/>
                <Button className="col-md-3 col-sm-3 mt-3 mb-5 col-xs-12" color="primary"
                        onClick={_onClickSubmit}>Submit</Button>
                {result &&
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <span className={styles.labelResult}>Result </span>
                    <h1><Badge color="secondary">{result}</Badge></h1>
                </div>
                }
            </div>
        </div>
    );
}
