export class CommandNotFoundError extends Error {
    constructor(message: string) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CommandNotFoundError.prototype);

    }
    public static StatusCode = 404;
}