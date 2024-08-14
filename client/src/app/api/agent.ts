/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginatedResponse } from "../models/pagination";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = `http://localhost:5085/api/`;
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    if (import.meta.env.DEV) await sleep();

    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }

            break;
        case 401:

            break;
        case 403:

            break;
        case 500:

            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body?: object) => axios.post(url, body, {
        headers: { 'Content-Type': 'application/json' } // Ensure content type is set to JSON
    }).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body, {
        headers: { 'Content-Type': 'application/json' }
    }).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    getList: (params: URLSearchParams) => requests.get("games", params),
    getGame: (id: number) => requests.get(`games/${id}`),
    getConsoles: () => requests.get("games/consoles"),
}

const IGDB = {
    getAccessToken: () => requests.post('igdb/twitchToken'),
    getGameCover: (gameName: string) => requests.post(`igdb/${gameName}`),
};

const agent = {
    Catalog,
    IGDB
}

export default agent;