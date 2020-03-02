import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { __NAME__Dto } from "@c2b/muven-core";
import { AccessKeyResponseDto } from "../dto/auth/access_key_response_dto";

export class RestUtils {

    constructor(private baseUrl: string, protected options: __NAME__Dto, protected getToken?: getAccessTokenFn, private defaultHeaders?: { [key: string]: string }) {
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
        try {

            const resp = await this.executeRequestAndVerify(async () => {
                return await axios.get(await this.getUrl(url, additionalQueryStringObject));
            });
            return resp.data;

        } catch (error) {
            let nrTentativas = 0;
            while (nrTentativas <= 10) {
                try {
                    const resp = await this.executeRequestAndVerify(async () => {
                        return await axios.get(await this.getUrl(url, additionalQueryStringObject));
                    });
                    return resp.data;
                } catch (error) {
                    nrTentativas++;
                }
            }
            throw error;
        }
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

        return config;

    }

    private async executeRequestAndVerify(cb: () => Promise<any>): Promise<AxiosResponse> {

        try {
            return await cb();
        } catch (error) {

            if (error?.response?.status === 401) {
                try {
                    await this.getToken(this.options, true);
                    return await cb();
                } catch (error) {
                    throw error;
                }
            }

            throw error;
        }

    }

    private async getUrl(url: string, additionalQueryStringObject?: IQueryStringObject): Promise<string> {

        if (!!this.baseUrl) {

            if (!this.getToken) {
                return `${this.baseUrl}${url}`;
            }

            const token = await this.getToken(this.options);
            if (!additionalQueryStringObject) {
                return `${this.baseUrl}${url}?access_token=${token.access_token}`;
            }

            const additionalQueryString = new URLSearchParams(additionalQueryStringObject);
            return `${this.baseUrl}${url}?access_token=${token.access_token}&${additionalQueryString}`;
        }

        return url;
    }    
}

export type getAccessTokenFn = (options: __NAME__Dto, force?: boolean) => Promise<AccessKeyResponseDto>;

interface IQueryStringObject {
    [key: string]: string;
}

