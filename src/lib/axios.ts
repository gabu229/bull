import Axios, { AxiosInstance } from 'axios';

const axios: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_COINGECKO_API_URL,
    headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
    },
    // withCredentials: true,
    // withXSRFToken: true
})

export default axios