import axios, { AxiosRequestConfig } from "axios";

export class RestUtils {
    constructor(private baseUrl: string, private querystringParams?: { [key: string]: string }) {
    }

    async post<BODY_TYPE, RESPONSE_TYPE>(url: string, data: BODY_TYPE, additionalQueryStringObject?: IQueryStringObject): Promise<RESPONSE_TYPE> {
        let resp = null

        if (!!data) {
            resp = await axios.post(this.getUrl(url, additionalQueryStringObject), data);
        } else {
            resp = await axios.post(this.getUrl(url, additionalQueryStringObject));
        }
        
        return resp.data;
    }

    async put<BODY_TYPE, RESPONSE_TYPE>(url: string, data?: BODY_TYPE, additionalQueryStringObject?: IQueryStringObject): Promise<RESPONSE_TYPE> {
        let resp = null;

        if (!!data) {
            resp = await axios.put(this.getUrl(url, additionalQueryStringObject), data);
        } else {
            resp = await axios.put(this.getUrl(url, additionalQueryStringObject));
        }

        return resp.data;
    }

    async get<T>(url: string, additionalQueryStringObject?: IQueryStringObject): Promise<T> {
        try {
            const resp = await axios.get(this.getUrl(url, additionalQueryStringObject));
            return resp.data;
        } catch (error) {
            let nrTentativas = 0;
            while (nrTentativas <= 10) {
                try {
                    const resp = await axios.get(this.getUrl(url, additionalQueryStringObject));
                    return resp.data;
                } catch (error) {
                    nrTentativas++;
                }
            }

            throw error;
        }
    }

    async delete<RESPONSE_TYPE>(url: string, additionalQueryStringObject?: IQueryStringObject): Promise<RESPONSE_TYPE> {
        const resp = await axios.delete(this.getUrl(url, additionalQueryStringObject));
        return resp.data;
    }

    private getUrl(url: string, additionalQueryStringObject?: IQueryStringObject): string {
        if (!!this.baseUrl) {
            if (!additionalQueryStringObject) {
                return `${this.baseUrl}${url}?access_token=${this.querystringParams.access_token}`;
            }

            const additionalQueryString = new URLSearchParams(additionalQueryStringObject)
            return `${this.baseUrl}${url}?access_token=${this.querystringParams.access_token}&${additionalQueryString}`;
        }

        return url;
    }
}

interface IQueryStringObject {
    [key: string]: string
}