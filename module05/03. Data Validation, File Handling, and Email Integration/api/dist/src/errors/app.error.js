class AppError extends Error {
    status;
    object;
    constructor(message, status, object) {
        super(message);
        this.status = status;
        this.object = object;
    }
}
export default AppError;
