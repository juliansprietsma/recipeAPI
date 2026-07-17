
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
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (data != null) {
        if (method == "GET" || method == "HEAD" || method == "DELETE") {
            url += "?" + new URLSearchParams(data).toString();
        } else {
            requestConfig.body = JSON.stringify(data);
        }
    }

    return await fetch(url, requestConfig);
}