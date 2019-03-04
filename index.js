const { createError, json, text } = require("micro");

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return 'Hi Chase!';
};