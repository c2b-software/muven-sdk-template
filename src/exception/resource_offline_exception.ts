import { C2BException } from "@c2b/commons";

export class ResourceOfflineException extends C2BException {
    message:string;

    constructor(init?: Partial<ResourceOfflineException>) {
        super();
        this.message = init.message;
    }
}
