const { createError, json, text } = require("micro");

const base = require('airtable').base('appUMyBbge0Itf7aP');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const table = await base('Table 1').select({
    view: 'Grid view',
    sort: [{field: 'Date Added', direction: 'desc'}]
  }).firstPage()

  let response = '';

  table.forEach(record => {
    response += `**${record.get('Title')}**\n`
    response += record.get('URL')
    response += '\n\n'
  })

  return response;
};