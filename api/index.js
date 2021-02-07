const TIMEOUT_REQUEST = 30000;
const token = "123456";
const API_URL = "https://api.dev.abilition-rise.com/api/";

const getParams = (method, body, token, headers) => {
    const requestHeader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
        ...headers
    };
    return {
        method: method,
        headers: requestHeader,
        body:
            requestHeader["Content-Type"] === "application/json"
                ? JSON.stringify(body)
                : body
    };
};

export const request = async (endpoint, method, body, headers) => {
    const fullEndpoint = API_URL + endpoint;
    return Promise.race([
        fetch(fullEndpoint, getParams(method, body, token, headers)),
        new Promise(function (resolve, reject) {
            setTimeout(() => reject("NETWORK REQUEST FAILED"), TIMEOUT_REQUEST);
        })
    ])
        .then(res => {
            try {
                return res.json();
            } catch (e) {
                throw e;
            }
        })
        .then(data => handleError(data))
        .catch(error => {
            throw error;
        });
};

export const requestToken = async (token, endpoint, method, body) => {
    const fullEndpoint = API_URL + endpoint;
    return fetch(fullEndpoint, getParams(method, body, token))
        .then(res => {
            try {
                return res.json();
            } catch (e) {
                throw e;
            }
        })
        .then(data => handleError(data))
        .catch(error => {
            throw error;
        });
};

const handleError = response => {
    console.log("response", response);
    if (!response.success) {
        throw response.error;
    } else {
        return response;
    }
};
