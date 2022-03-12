const axios = require('axios').default;

/**
 * 
 * @param {String} spreadsheetURL The url of the spreadsheet, ex: https://docs.google.com/spreadsheets/d/1Nzf5ZDPXvABgxOt3uNGnpBXF_fAdfH8dSKfDZi7dz
 * @param {Boolean} hasHeaders Indicates if the spreadsheet has headers
 * @param {String|Number} sheetId The Id of the sheet inside the spreadsheet
 * @returns {Promise<Array<object>>} The rows of the specified spreadsheet
 */
exports.getFromURL = async (spreadsheetURL, hasHeaders = false, sheetId = null) => new Promise((resolve, reject) => {
  const spreadsheetId = spreadsheetURL.split('/spreadsheets/d/')[1]?.split('/')[0];

  if (!spreadsheetId) {
    reject("The specified spreadsheetURL doesn't seem to be valid");
  } else {
    axios.get(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?${sheetId ? `gid=${sheetId}` : ''}`)
      .then((response) => {
        const data = JSON.parse(response.data.slice(47, -2));
        const rows = data.table.rows.map((row) => row.c.map((col) => col?.v ?? ''));

        if (hasHeaders) {
          const headers = rows.splice(0, 1)[0];

          const arrayOfObjects = rows.map((row) => {
            const result = {};
            for (let i = 1; i < headers.length; i += 1) {
              if (headers[i]) {
                result[headers[i]] = row[i];
              }
            }
            return result;
          });

          resolve(arrayOfObjects);

        } else {
          resolve(rows);
        }
      })
      .catch((error) => {
        reject(`Couldn't fetch the specified spreadsheet: ${error.toString()}`);
      });
  }
});

/**
 * 
 * @param {String} spreadsheetId The Id of the spreadsheet, ex: 1Nzf5ZDPXvABgxOt3uNGnpBXF_fAdfH8dSKfDZi7dz
 * @param {Boolean} hasHeaders Indicates if the spreadsheet has headers
 * @param {String|Number} sheetId The Id of the sheet inside the spreadsheet
 * @returns {Promise<Array<object>>} The rows of the specified spreadsheet
 */
exports.getFromURL = async (spreadsheetId, hasHeaders = false, sheetId = null) => new Promise((resolve, reject) => {
  axios.get(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?${sheetId ? `gid=${sheetId}` : ''}`)
    .then((response) => {
      const data = JSON.parse(response.data.slice(47, -2));
      const rows = data.table.rows.map((row) => row.c.map((col) => col?.v ?? ''));

      if (hasHeaders) {
        const headers = rows.splice(0, 1)[0];

        const arrayOfObjects = rows.map((row) => {
          const result = {};
          for (let i = 1; i < headers.length; i += 1) {
            if (headers[i]) {
              result[headers[i]] = row[i];
            }
          }
          return result;
        });

        resolve(arrayOfObjects);

      } else {
        resolve(rows);
      }
    })
    .catch((error) => {
      reject(`Couldn't fetch the specified spreadsheet: ${error.toString()}`);
    });
});
