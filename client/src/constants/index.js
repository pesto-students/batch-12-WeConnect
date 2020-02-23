import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.REACT_APP_BASE_URL;
// const apiUrl = process.env.PUBLIC_URL;
const apiUrl = "http://localhost:4000";

export { baseUrl, apiUrl };
