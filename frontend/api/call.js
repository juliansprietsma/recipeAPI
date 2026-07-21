
/**
 * 
 * @param {string} url
 * @param {string} method
 * @param {object} data
 * @returns {Promise<Response>}
 * 
 */

const server = "http://localhost:8000";

export default async function apiCall(url, method = "GET", data = null) {

    url = `${server}/${url}`;

    /** @type {RequestInit} */
    const requestConfig = {
        method: method,
        headers: {}
    };

    if (data != null) {
        if (method == "GET" || method == "HEAD" || method == "DELETE" || method =="PUT") {
            url += "?" + new URLSearchParams(data).toString();
        } else {
            if (data instanceof FormData) {
                requestConfig.body = data;
            } else {
                requestConfig.body = JSON.stringify(data);
                requestConfig.headers['Content-Type'] = 'application/json';
            }
        }
    }

    return await fetch(url, requestConfig);
}