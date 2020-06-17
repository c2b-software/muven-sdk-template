import { GenericException } from "../exception/generic_exception";
import { __NAME__Dto } from "@c2b/muven-commons";

export class BaseClient {

    protected querystringParam: { [key: string]: string };
    protected defaultHeader: { [key: string]: string };

    constructor(protected options: __NAME__Dto) {
    }

    protected async callMethod<T>(cb: () => Promise<T>) {
        try {
            return await cb();
        } catch (error) {
            throw new GenericException(error);
        }
    }

}
