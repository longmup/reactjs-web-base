import {request, requestToken} from "./index";

export const METHOD_POST = "POST";
export const METHOD_GET = "GET";
export const METHOD_PUT = "PUT";
export const METHOD_DELETE = "DELETE";

export const apiBuyItems = (item) => {
    return request("common/healthy", METHOD_GET);
};
