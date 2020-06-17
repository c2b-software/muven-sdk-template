import { BaseClient } from "./base_client";
import { RestUtils } from "./rest_utils";

export class CatalogClient extends BaseClient {
    private restUtils: RestUtils;

    constructor(options: __NAME__Dto) {
        super(options);
        this.restUtils = new RestUtils(options);
    }
}