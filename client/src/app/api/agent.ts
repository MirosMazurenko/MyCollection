/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginatedResponse } from "../models/pagination";
import { toast } from "react-toastify";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = `http://localhost:5085/api/`;
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(async config => {
    const { store } = await import('../store/configureStore');
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

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
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
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
        headers: { 'Content-Type': 'application/json' }
    }).then(responseBody),
    put: (url: string, body?: object) => axios.put(url, body, {
        headers: { 'Content-Type': 'application/json' }
    }).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    getList: (params: URLSearchParams) => requests.get("games", params),
    getGame: (id: number) => requests.get(`games/game/${id}`),
    removeGame: (id: number) => requests.del(`games/deleteGame/${id}`),
    updateGame: (id: number, name: string, consoleName: string, loosePrice: number, completePrice: number, newPrice: number, date: Date) => requests.put(`games/updateGame?Id=${id}&Name=${name}&ConsoleName=${consoleName}&LoosePrice=${loosePrice}&CompletePrice=${completePrice}&NewPrice=${newPrice}&Date=${date}'`),
    getConsoles: () => requests.get("games/consoles"),
}

const GameCollection = {
    getGameCollection: () => requests.get('gameCollection/getGameCollection'),
    addItem: (gameId: number, gameCondition: string) => requests.post(`gameCollection/addItem?gameId=${gameId}&gameCondition=${gameCondition}`),
    removeItem: (gameId: number, gameCondition: string) => requests.del(`gameCollection/removeItem?gameId=${gameId}&gameCondition=${gameCondition}`),
}

const IGDB = {
    getAccessToken: () => requests.post('igdb/twitchToken'),
    getGameCover: (gameName: string) => requests.post(`igdb/${gameName}`),
};

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    getCurrentUser: () => requests.post('account/currentUser'),
}

const agent = {
    Catalog,
    GameCollection,
    IGDB,
    Account,
}

export default agent;