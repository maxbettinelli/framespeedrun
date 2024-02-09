'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import 'chartjs-adapter-date-fns'; // Import date adapter (you can use a different adapter if preferred)

const CryptoChart = () => {
  const [bitcoinPriceData, setBitcoinPriceData] = useState([]);
  const [ethereumPriceData, setEthereumPriceData] = useState([]);
  const [avalanchePriceData, setAvalanchePriceData] = useState([]);
  const [interestCompoundingEthIndexData, setInterestCompoundingEthIndexData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch historical Bitcoin price data
    axios
      .get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
        params: {
          vs_currency: 'usd',
          days: '365',
        },
      })
      .then((response) => {
        // Convert timestamps to JavaScript Date objects for BTC
        const formattedData = response.data.prices.map((dataPoint) => ({
          x: new Date(dataPoint[0]),
          y: dataPoint[1],
        }));
        setBitcoinPriceData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching historical Bitcoin data:', error);
        setLoading(false);
      });

    // Fetch historical Ethereum price data
    axios
      .get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart', {
        params: {
          vs_currency: 'usd',
          days: '365',
        },
      })
      .then((response) => {
        // Convert timestamps to JavaScript Date objects for ETH
        const formattedData = response.data.prices.map((dataPoint) => ({
          x: new Date(dataPoint[0]),
          y: dataPoint[1],
        }));
        setEthereumPriceData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching historical Ethereum data:', error);
        setLoading(false);
      });
  // Fetch historical Avalanche price data
  axios
    .get('https://api.coingecko.com/api/v3/coins/avalanche-2/market_chart', {
      params: {
        vs_currency: 'usd',
        days: '365',
      },
    })
    .then((response) => {
      // Convert timestamps to JavaScript Date objects for AVAX
      const formattedData = response.data.prices.map((dataPoint) => ({
        x: new Date(dataPoint[0]),
        y: dataPoint[1],
      }));
      setAvalanchePriceData(formattedData);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching historical Avalanche data:', error);
      setLoading(false);
    });

// Fetch historical Interest Compounding ETH Index price data
  axios
    .get('https://api.coingecko.com/api/v3/coins/interest-compounding-eth-index/market_chart', {
      params: {
        vs_currency: 'usd',
        days: '365',
      },
    })
    .then((response) => {
      // Convert timestamps to JavaScript Date objects for the new token
      const formattedData = response.data.prices.map((dataPoint) => ({
        x: new Date(dataPoint[0]),
        y: dataPoint[1],
      }));
      setInterestCompoundingEthIndexData(formattedData);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching historical Interest Compounding ETH Index data:', error);
      setLoading(false);
    });
}, []);

  const chartData = {
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: bitcoinPriceData,
        yAxisID: 'left-y-axis',
        fill: false,
        borderColor: 'orange',
        backgroundColor: 'transparent',
      },
      {
        label: 'Ethereum Price (USD)',
        data: ethereumPriceData,
        yAxisID: 'right-y-axis',
        fill: false,
        borderColor: 'blue',
        backgroundColor: 'transparent',
      },
      {
        label: 'icETH (USD)',
        data: interestCompoundingEthIndexData,
        yAxisID: 'right-y-axis',
        fill: false,
        borderColor: 'purple',
        hidden: true, // Hide the Avalanche line initially
        backgroundColor: 'transparent',
      },
      {
        label: 'Avalanche Price (USD)',
        data: avalanchePriceData,
        yAxisID: 'right-y-axis',
        fill: false,
        borderColor: 'red',
        backgroundColor: 'transparent',
        hidden: true, // Hide the Avalanche line initially

      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Date',
        },
      },
      'left-y-axis': {
        position: 'left',
        title: {
          display: true,
          text: 'Bitcoin Price (USD)',
        },
        beginAtZero: true,
      },
      'right-y-axis': {
        position: 'right',
        title: {
          display: true,
          text: 'Altcoin Price (USD)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default CryptoChart;