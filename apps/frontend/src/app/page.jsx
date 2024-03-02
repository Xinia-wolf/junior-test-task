'use client'

import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { Button, Box } from '@mui/material';
import styles from './index.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Index = () => {
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(null);

  const fetchAds = useCallback(() => {
    const documentStyles = document.documentElement.style;
    let progress = 0;
    setProgress('in-progress');
    const fetchData = async () => {
      const data = await axios({
        url: '/api/ads?minPrice=1000000',
        onDownloadProgress(progressEvent) {
          progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

          setPercentage(progress);

          documentStyles.setProperty('--progress', `${progress}%`);
      }
      })
      .then(res => {
        setProgress('finished');
        if (res.status === 200)
        toast("Success!");
      console.log(res);
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
        <Button onClick={fetchAds} variant='outlined'>
          Send an API request
        </Button>
        <span className="button-text">{progress === 'finished' ? '🎉 Done ' : ' '}</span>
        <span className="percentage">{percentage}%</span>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default Index;
