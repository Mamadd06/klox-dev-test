const axios = require('axios');
const _ = require('lodash');

const BASE_URL = 'https://restcountries.eu/rest/v2';

const getCountries = async ({ alphaCode, local, first = 0, offset = 20}) => {
  const countries = await axios.get(`${BASE_URL}/all`);
  return _
    .chain(countries)
    .get("data", [])
    .filter(elm => alphaCode ? [elm.alpha2Code, elm.alpha3Code].includes(alphaCode) : true)
    .map(elm => _getLocalName(elm, local))
    .slice(first, offset + first)
    .value();
};

const getBorders = async ({ borders = [], local}) => {
  const bordersDetails = !_.isEmpty(borders) ? await axios.get(`${BASE_URL}/alpha?codes=${borders.join(';')}`) : {data: []};
  return _
    .chain(bordersDetails)
    .get("data", [])
    .map(elm => _getLocalName(elm, local))
    .value();
};

const _getLocalName = (country, local = "") => {
  const {translations = {}, name} = country;
  return _.extend({}, country, {name: translations[local.toLowerCase()] || name, local});
};

function build() {
  return {
    getCountries,
    getBorders
  }
}
module.exports.build = build;
