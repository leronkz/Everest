import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {MantineProvider, createEmotionCache} from "@mantine/core";
import { StyledEngineProvider } from '@mui/material/styles';
const myCache = createEmotionCache({ key: 'mantine' });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
      {/* <MantineProvider emotionCache={myCache}
        theme={{
          colors: {
              'color-main': ['#defaff', '#bbe7f3', '#96d6e7', '#6fc5dd', '#4ab5d2', '#319bb8', '#227990', '#145668', '#033540', '#00131a'],
              'color-main-hover': ['#e0f8fc', '#c5e1e8', '#a7cdd6', '#87b7c4', '#67a3b1', '#4e8998', '#3a6b77', '#264d55', '#112f36', '#001117'],
              'color-main-light': ['#e8f8fc', '#c3eaf3', '#9ddbeb', '#77cee4', '#59c0dc', '#47a7c3', '#388197', '#295d6c', '#173741', '#031317'],
              'color-dark': ['#edf1fc', '#d3d4e2', '#b5b7c9', '#989ab3', '#7c7e9c', '#626482', '#4b4e66', '#36384a', '#20212e', '#0a0a16'],
              'color-dark-medium': ['#edf1fe', '#d2d4e3', '#b6b8ca', '#989bb3', '#7b7e9d', '#616583', '#4c4f67', '#36384a', '#1f222f', '#0a0a17'],
              'color-dark-light': ['#efefff', '#d1d3e5', '#b3b6ce', '#9698b7', '#777ba1', '#5e6288', '#494c6a', '#33364d', '#1e2131', '#070b18'],
              'color-light': ['#f8f0f2', '#d9d9d9', '#bfbfbf', '#a6a6a6', '#8c8c8c', '#737373', '#595959', '#404040', '#262626', '#120b0d'],
              'color-gray': ['#feeff2', '#ded7d9', '#c2bebf', '#a7a5a6', '#8c8c8c', '#737373', '#5a5959', '#423f40', '#2a2526', '#17080d'],
              'color-light-gray': ['#e7f6f6', '#d3dddd', '#bac4c4', '#a1adad', '#869494', '#6d7b7b', '#546060', '#3b4545', '#202a2a', '#001111'],
              'color-bg': ['#f0f0fc', '#d4d4e0', '#b8b8c7', '#9b9baf', '#7f7f98', '#65657e', '#4f4f63', '#383847', '#22222d', '#0a0a15'],
              'color-success': ['#e3fded', '#bef1d4', '#98e5ba', '#71dba0', '#4ad186', '#31b76c', '#248e54', '#17663b', '#083e22', '#001607'],
              'color-error': ['#ffe9df', '#ffc5af', '#ffa17f', '#fe7c4e', '#fc581c', '#e33e03', '#b12f01', '#7f2200', '#4e1200', '#200300']
          },
      }}> */}
        <App />
        {/* </MantineProvider> */}
        </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
