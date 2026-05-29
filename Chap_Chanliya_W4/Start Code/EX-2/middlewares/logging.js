const logger = (req, res, next) => {
    const { method, url } = req;
    const date = new Date();
    console.log(`[${date.toISOString()}] ${method} ${url}`);
    next();
}
export default logger;

