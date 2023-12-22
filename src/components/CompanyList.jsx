// Import necessary dependencies and styles
import React, { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@primer/octicons-react';
import { readExcelData, readJsonData } from '../services/dataUtils.js';
import { mergeData } from '../services/dataService'; // Import the mergeData function
import '../css/styles.css';

// Define the CompanyList component
export const CompanyList = () => {
  // State variables for data and accordion state
  const [excelData, setExcelData] = useState([]);
  const [jsonData, setJsonData] = useState({});
  const [expandedCompanies, setExpandedCompanies] = useState({});
  const [expandedAreas, setExpandedAreas] = useState({});

  // Fetch data from Excel and JSON files on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const excel = await readExcelData();
        const json = await readJsonData();

        console.log('Excel Data:', excel);
        console.log('JSON Data:', json);

        setExcelData(excel);
        setJsonData(json);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  // Toggle state for expanded companies
  const toggleCompanyAccordion = (companyId) => {
    setExpandedCompanies((prevExpanded) => ({
      ...prevExpanded,
      [companyId]: !prevExpanded[companyId],
    }));
  };

  // Toggle state for expanded areas within a company
  const toggleAreaAccordion = (companyId, areaId) => {
    setExpandedAreas((prevExpanded) => ({
      ...prevExpanded,
      [companyId]: {
        ...prevExpanded[companyId],
        [areaId]: !prevExpanded[companyId]?.[areaId],
      },
    }));
  };

  // Render individuals within an area, avoiding duplicates based on RUT
  const renderIndividuals = (companyId, areaId) => {
    // Maintain a set to keep track of unique RUTs
    const uniqueRuts = new Set();

    return excelData
      .filter(
        (individual) =>
          individual.ID_EMPRESA === companyId && individual.ID_AREA === areaId
      )
      .map((individual) => {
        // Check if RUT is already rendered, skip if true
        if (uniqueRuts.has(individual.RUT_TRABAJADOR)) {
          return null;
        }

        // Add RUT to the set to track uniqueness
        uniqueRuts.add(individual.RUT_TRABAJADOR);

        // Render individual if not a duplicate
        return (
          <tr key={individual.RUT_TRABAJADOR}>
            <td>{individual.NOMBRE_TRABAJADOR}</td>
            <td>{individual.RUT_TRABAJADOR}</td>
            <td>{individual.EDAD}</td>
            <td>{individual.PROFESION || ''}</td>
            <td>{individual.CARGO}</td>
          </tr>
        );
      })
      .filter((individual) => individual !== null); // Filter out null entries
  };

  // Render the main component structure
  return (
    <div className="company-list">
      {jsonData?.EMPRESAS?.map((company) => (
        <div key={company.ID_EMPRESA} className="company-container">
          <div
            className={`company-container__header ${
              expandedCompanies[company.ID_EMPRESA]
                ? 'company-container__header--expanded'
                : ''
            }`}
            onClick={() => toggleCompanyAccordion(company.ID_EMPRESA)}
          >
            <h2>{company.NOMBRE_EMPRESA}</h2>
            <button className="company-container__collapse-button">
              {expandedCompanies[company.ID_EMPRESA] ? (
                <ChevronUpIcon size={12} />
              ) : (
                <ChevronDownIcon size={12} />
              )}
            </button>
          </div>
          {expandedCompanies[company.ID_EMPRESA] && (
            <div className="company-container__areas">
              {company.AREAS?.map((area) => (
                <div key={area.ID_AREA} className="area-container">
                  <div
                    className={`area-container__header ${
                      expandedAreas[company.ID_EMPRESA] &&
                      expandedAreas[company.ID_EMPRESA][area.ID_AREA]
                        ? 'area-container__header--expanded'
                        : ''
                    }`}
                    onClick={() =>
                      toggleAreaAccordion(company.ID_EMPRESA, area.ID_AREA)
                    }
                  >
                    <p>{area.NOMBRE_AREA}</p>
                    <button className="area-container__collapse-button">
                      {expandedAreas[company.ID_EMPRESA] &&
                      expandedAreas[company.ID_EMPRESA][area.ID_AREA] ? (
                        <ChevronUpIcon size={12} />
                      ) : (
                        <ChevronDownIcon size={12} />
                      )}
                    </button>
                  </div>
                  {expandedAreas[company.ID_EMPRESA] &&
                  expandedAreas[company.ID_EMPRESA][area.ID_AREA] && (
                    <div className="area-container__details">
                      <table>
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Rut</th>
                            <th>Edad</th>
                            <th>Profesión</th>
                            <th>Cargo</th>
                          </tr>
                        </thead>
                        <tbody>{renderIndividuals(company.ID_EMPRESA, area.ID_AREA)}</tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
