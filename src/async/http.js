import fetch from 'node-fetch';



let url = 'https://opentdb.com/api.php?type=multiple&amount=1&category=9';

const response = await fetch(url);
const body = await response.json();

console.log(body);
