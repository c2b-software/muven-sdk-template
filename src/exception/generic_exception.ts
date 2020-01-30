import { HttpException } from "@c2b/web-commons";

export class GenericException extends HttpException {
    private data: any;

    constructor(error: any) {
        super(error.response.data);
        this.httpStatus = error.response.status;
        this.message = error.response.statusText;
        this.data = {};
        this.data.info = error.response.data;
        this.data.config = error.response.config;
    }
}
