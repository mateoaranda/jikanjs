//@ts-check

const Settings = require('./Settings');
const http = require('http'), https = require('https');

class Request {

    /**
     * sends a request with the given list of URL parts and the optional list of query parameter
     * @param {*[]} args           URL Parts
     * @param {{}} [parameter]     Query Parameter
     * @returns {Promise<*>} returns the request response or an error
     */
    async send(args, parameter) {
        var response = await fetch(this.urlBuilder(args, parameter));
        var data = await response.json();

        if (response.statusCode !== 200) return Promise.reject(new Error(data.error));
        return Promise.resolve(data);
    }

    /**
     *
     * @param {*[]} args            URL Parts
     * @param {{}} [parameter]      Query Parameter
     * @returns {string}            URL
     */
    urlBuilder(args, parameter) {
        var url = new URL(Settings.getBaseURL());

        url.pathname += '/' + args.filter(x => x).join('/');
        if (parameter) Object.entries(parameter).forEach(([key, value]) => url.searchParams.append(key, value));

        return url.href;
    }
}

module.exports = Request;

// Se tomó prestada desde https://github.com/Fabricio-191/youtube/blob/main/src/utils/requests.js (?)
function fetch(url, options = {}){
    const parsedURL = new URL(url);

    const promise = new Promise((resolve, reject) => {
        (parsedURL.protocol === 'http:' ? http : https)
            .request(parsedURL, options, cb)
            .on('error', reject)
            .end();

        function cb(response){
            const body = new Promise((res, rej) => {
                const chunks = [];

                response
                    .on('data', chunks.push.bind(chunks))
                    .on('end', () => res(Buffer.concat(chunks)))
                    .on('error', rej);
            });

            Object.assign(response, {
                buffer: () => body,
                text: async () => (await body).toString(),
                json: async () => JSON.parse(
                    (await body).toString()
                ),
            });

            resolve(response);
        }
    });

    Object.assign(promise, {
        buffer: async () => (await promise).buffer(),
        text: async () => (await promise).text(),
        json: async () => (await promise).json(),
    });

    return promise;
}