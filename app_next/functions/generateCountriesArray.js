// A short script that makes an array that contains all countries (AI generated)

const fs = require('fs');
const path = require('path');

const data = require(path.join(__dirname, '../../assets/cities.json'));

// If it's an object with a "cities" array inside
const cities = Array.isArray(data) ? data : data.cities;

const countries = [...new Set(cities.map(city => city.country))].sort();

console.log(JSON.stringify(countries, null, 2));

