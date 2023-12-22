// src/views/Home.jsx
import React, { useState, useEffect } from 'react';
import { CompanyList } from '../components/CompanyList';
import Header from '../components/Header';

const Home = () => {
  const [companiesData, setCompaniesData] = useState([]);  // Use state to store data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using the mergeData function from dataService.js
        const data = await mergeData();
        setCompaniesData(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once after the initial render

  return (
    <div>
      <Header/>
      <CompanyList companies={companiesData} />
    </div>
  );
};

export default Home;

