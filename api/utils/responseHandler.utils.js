

export default class ResponseHandler {

    /**
     * @description - This handles API response
     * @param {object} res 
     * @param {object} data 
     * @param {number} status 
     */
    static sendResponse(res, data, status, error) {
        res.status(status).json({ ...data, error });
    }

}

