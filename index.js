const { createError, json, text } = require("micro");

const base = require('airtable').base('appUMyBbge0Itf7aP');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const table = await base('Table 1').select({view: 'Grid view'}).firstPage()

  table.forEach(record => (
    console.log(record.get('Title'))
  ))

  return table.map(record => record.get('Title'))

  return 'Failed.';
};