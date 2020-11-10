import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { __NAME__Dto } from "@c2b/muven-commons";
import { BASE_URL } from "./api";

export class RestUtils {

    constructor(protected options: __NAME__Dto, private defaultHeaders?: { [key: string]: string }) {
    }

    async post<BODY_TYPE, RESPONSE_TYPE>(url: string, data: BODY_TYPE, additionalQueryStringObject?: IQueryStringObject, config?: AxiosRequestConfig): Promise<RESPONSE_TYPE> {

        const resp = await this.executeRequestAndVerify(async () => {
            return axios.post(await this.getUrl(url, additionalQueryStringObject), data, this.getConfig(config));
        });
        return resp.data;

    }

    async put<BODY_TYPE, RESPONSE_TYPE>(url: string, data?: BODY_TYPE, additionalQueryStringObject?: IQueryStringObject, config?: AxiosRequestConfig): Promise<RESPONSE_TYPE> {
        const resp = await this.executeRequestAndVerify(async () => {
            return axios.put(await this.getUrl(url, additionalQueryStringObject), data, this.getConfig(config));
        });
        return resp.data;
    }

    async get<T>(url: string, additionalQueryStringObject?: IQueryStringObject): Promise<T> {
        const resp = await this.executeRequestAndVerify(async () => {
            return await axios.get(await this.getUrl(url, additionalQueryStringObject));
        });
        return resp.data;
    }

    async delete<RESPONSE_TYPE>(url: string, additionalQueryStringObject?: IQueryStringObject): Promise<RESPONSE_TYPE> {
        const resp = await this.executeRequestAndVerify(async () => {
            return await axios.delete(await this.getUrl(url, additionalQueryStringObject));
        });
        return resp.data;
    }

    private getConfig(config: AxiosRequestConfig): AxiosRequestConfig {

        if (!config) {
            config = {};
        }

        if (!!this.defaultHeaders) {
            config.headers = this.defaultHeaders;
        }

        config.timeout = 10000; // 10s
        return config;

    }

    private async executeRequestAndVerify(cb: () => Promise<any>): Promise<AxiosResponse> {

        try {
            return await cb();
        } catch (error) {
            throw error;
        }

    }

    private async getUrl(endpoint: string, additionalQueryStringObject?: IQueryStringObject): Promise<string> {

        if (!additionalQueryStringObject) {
            return `${BASE_URL}${endpoint}?chave_api=${this.options.chaveApi}&chave_aplicacao=${this.options.chaveAplicacao}`;
        }

        const additionalQueryString = new URLSearchParams(additionalQueryStringObject);
        return `${BASE_URL}${endpoint}?chave_api=${this.options.chaveApi}&chave_aplicacao=${this.options.chaveAplicacao}&${additionalQueryString}`;
    }
}

interface IQueryStringObject {
    [key: string]: string;
}

