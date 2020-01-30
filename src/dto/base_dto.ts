export class BaseDto<T> {
    constructor(init?: Partial<T>) {
        Object.assign(this, init);
    }
}
