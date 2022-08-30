import axios from 'axios';

const baseDomain = 'https://www.googleapis.com';
const baseUrl = `${baseDomain}/youtube/v3`;

export default axios.create({
    baseUrl,
});