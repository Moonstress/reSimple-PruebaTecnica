import React, { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@primer/octicons-react';
import { readExcelData, readJsonData } from '../services/dataUtils.js';
import { mergeData } from '../services/dataService'; // Import the mergeData function
import '../css/styles.css';


export const CompanyList = () => {
  const [excelData, setExcelData] = useState([]);
  const [jsonData, setJsonData] = useState({});
  const [expandedCompanies, setExpandedCompanies] = useState({});
  const [expandedAreas, setExpandedAreas] = useState({});

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

  const toggleCompanyAccordion = (companyId) => {
    setExpandedCompanies((prevExpanded) => ({
      ...prevExpanded,
      [companyId]: !prevExpanded[companyId],
    }));
  };

  const toggleAreaAccordion = (companyId, areaId) => {
    setExpandedAreas((prevExpanded) => ({
      ...prevExpanded,
      [companyId]: {
        ...prevExpanded[companyId],
        [areaId]: !prevExpanded[companyId]?.[areaId],
      },
    }));
  };

  const renderIndividuals = (companyId, areaId) => {
    return excelData
      .filter(
        (individual) =>
          individual.ID_EMPRESA === companyId && individual.ID_AREA === areaId
      )
      .map((individual) => (
        <tr key={individual.RUT_TRABAJADOR}>
          <td>{individual.NOMBRE_TRABAJADOR}</td>
          <td>{individual.RUT_TRABAJADOR}</td>
          <td>{individual.EDAD}</td>
          <td>{individual.PROFESION || ''}</td>
          <td>{individual.CARGO}</td>
        </tr>
      ));
  };

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