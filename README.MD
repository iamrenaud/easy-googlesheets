# easy-googlesheets

An npm package to easily read Google Sheets data. The Share access should be "Anyone with the link can View".

## Installation

```bash
$ npm install easy-googlesheets
```

## API

```js
getFromURL(spreadsheetURL, hasHeaders = false, gid = '')

getFromID(spreadsheetID, hasHeaders = false, gid = '')
```

## Usage 

```js
const EasyGooglesheets = require("easy-googlesheets");

EasyGooglesheets.getFromURL('https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0', true)
  .then((rows) => {
    console.log(rows);
  });

EasyGooglesheets.getFromID('1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', true)
  .then((rows) => {
    console.log(rows);
  });
```

## Contributions

- Feel Free to create a PR/Issue for any feature or bug(s).
- Make sure you follow the community guidelines!
- Have a feature request? Open an Issue!

## License

This package is licensed under [MIT](https://github.com/iamrenaud/easy-googlesheets/blob/master/LICENSE)
