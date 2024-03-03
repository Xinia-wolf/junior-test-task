'use client'

import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { Button, Box } from '@mui/material';
import styles from './index.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdsList from "./AdsList";


const Index = () => {
  const [progress, setProgress] = useState(null);
  const [ads, setAds] = useState([]);

  const fetchAds = useCallback(() => {
    setProgress('in-progress');
    const fetchData = () => {
      axios({
        url: '/api/ads?minPrice=1000000'
      })
      .then(res => {
        setProgress('finished');
        if (res.status === 200)
        toast("Success!");
        setAds(res.data.results);
      })
      .catch(err => {
        toast("Error!");
        console.log(err);
      });
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Box alignContent="center">
        <h1>And here it starts...</h1>
        <div className={styles.buttonContainer}>
        <Button onClick={fetchAds} variant='outlined'>
          Send an API request
        </Button>
        <span className={styles.buttonText}>{progress === "in-progress" ? <div className={styles.spinner}></div> : progress === 'finished' ? "🎉 Done" : ""}</span>
        </div>
      </Box>
      <AdsList ads={ads}/>
      <ToastContainer />
    </div>
  );
}

export default Index;
