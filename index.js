const { createError, json, text } = require("micro");
const { format, isSameDay } = require('date-fns');
const base = require('airtable').base('appUMyBbge0Itf7aP');

const DATE_FORMAT = 'MMMM Do';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const table = await base('Table 1').select({
    view: 'Grid view',
    sort: [{field: 'Date Added', direction: 'desc'}]
  }).firstPage()

  let response = '';
  let currentDate = null;

  table.forEach(record => {
    const date = new Date(record.get('Date Added')).toLocaleString('en-US', { timeZone: 'America/Chicago' });

    if (currentDate === null) {
      response += `# ${format(date, DATE_FORMAT)} \n\n`
    }
    else {
      const sameDay = isSameDay(date, currentDate)

      if (!sameDay) {
        response += `# ${format(date, DATE_FORMAT)} \n\n`
      }
    }

    currentDate = date;

    response += `**[${record.get('Title')}]()**  \n`
    response += record.get('URL')
    response += '\n\n'
  })

  return response;
};