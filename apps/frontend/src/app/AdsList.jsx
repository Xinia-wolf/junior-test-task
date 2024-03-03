"use client"

import React, { useState } from "react";
import styles from "./index.module.scss";

const AdsList = ({ ads }) => {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        minPrice: "",
        maxPrice: "",
        query: "",
        city: "",
        district: "",
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = () => {
        fetchFilteredItems(`/api/ads?minPrice=${form.minPrice}&maxPrice=${form.maxPrice}&search=${form.query}&city=${form.city}&district=${form.district}`)
        .then(res => {
            if (res.status === 200)
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
    }

    return (
        <div>
            <centered><h1 className={styles.adsTitle}>List of ads</h1>
            <button onClick={() => setShow(!show)}>Сортировать по:</button>
                {show ? <form className={styles.filtersContainer}>
                    <input type="number" className={styles.filter} placeholder={"Min price"} id="minPrice" value={form.minPrice} onChange={handleChange}></input>
                    <input type="number" className={styles.filter} placeholder={"Max price"} id="maxPrice" value={form.maxPrice} onChange={handleChange}></input>
                    <input type="search" className={styles.filter} placeholder={"Search"} id="query" value={form.query} onChange={handleChange}></input>
                    <input type="text" className={styles.filter} placeholder={"City"} id="city" value={form.city} onChange={handleChange}></input>
                    <input type="text" className={styles.filter} placeholder={"District"} id="district" value={form.district} onChange={handleChange}></input>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form> : null}
            </centered>
            <div className={styles.itemContainer}>
                {ads.map((ad) => (
                    <div key={ad.id} className={styles.card}>
                        <img className={styles.img} src={ad.images[0].image} alt="ad_image" />
                        <h3 className={styles.cardTitle}>{ad.title}</h3><button>Like</button>
                        <h3 className={styles.cardTitle}>{ad.city_name}</h3>
                        <p>{ad.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdsList;