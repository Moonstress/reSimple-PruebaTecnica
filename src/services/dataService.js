// src/services/dataService.js

// Helper function to merge individuals
export const mergeIndividuals = (excelIndividuals, jsonIndividuals) => {
  console.log('excelIndividuals:', excelIndividuals);

  // Check if excelIndividuals is defined and is an array
  if (!Array.isArray(excelIndividuals)) {
    console.error('excelIndividuals is not an array or is undefined:', excelIndividuals);
    return [];
  }

  const mergedIndividuals = excelIndividuals.map((excelIndividual) => {
    const matchingJsonIndividual = jsonIndividuals.find(
      (jsonIndividual) => jsonIndividual.RUT_TRABAJADOR === excelIndividual.RUT_TRABAJADOR
    );

    if (matchingJsonIndividual) {
      return {
        ...excelIndividual,
        ...matchingJsonIndividual,
      };
    }

    return excelIndividual;
  });

  console.log('mergedIndividuals:', mergedIndividuals);
  return mergedIndividuals;
};

// Helper function to merge areas
export const mergeAreas = (excelData, jsonData) => {
  if (!Array.isArray(jsonData) || !Array.isArray(excelData)) {
    console.error('Invalid jsonData or excelData:', jsonData, excelData);
    return [];
  }

  const mergedAreas = jsonData.map((jsonArea) => {
    const matchingExcelArea = excelData.find((excelArea) => excelArea.ID_AREA === jsonArea.ID_AREA);

    if (matchingExcelArea) {
      return {
        ...jsonArea,
        INDIVIDUOS: mergeIndividuals(matchingExcelArea.INDIVIDUOS || [], jsonArea.INDIVIDUOS || []),
      };
    }

    return jsonArea;
  });

  return mergedAreas;
};

// Remove the mergeData function
