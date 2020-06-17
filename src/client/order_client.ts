import { BaseClient } from "./base_client";

export class OrderClient extends BaseClient {
    private restUtils: RestUtils;

    constructor(options: __NAME__Dto) {
        super(options);
        this.restUtils = new RestUtils(options);
    }
}