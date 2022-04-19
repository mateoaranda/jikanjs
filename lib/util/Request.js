const Settings = require('./Settings');
const https = require('https');

class Request {

    /**
     * sends a request with the given list of URL parts and the optional list of query parameter
     * @param {*[]} args           URL Parts
     * @param {{}} [parameter]     Query Parameter
     * @param {boolean} [mal=false]      Request to official MAL API?
     * @returns {Promise<*>} returns the request response or an error
     */
    async send(args, parameter, mal = false) {
        const response = await fetch(
            this.urlBuilder(args, parameter, mal),
            mal ? { headers: { 'X-MAL-CLIENT-ID': '6114d00ca681b7701d1e15fe11a4987e' } } : {}
        );
        const data = await response.json();

        if (response.statusCode !== 200) return Promise.reject(new Error(data.error));
        return Promise.resolve(data);
    }

    /**
     *
     * @param {*[]} args            URL Parts
     * @param {{}} [parameter]      Query Parameter
     * @param {boolean} [mal]       Request to official MAL API? 
     * @returns {string}            URL
     */
    urlBuilder(args, parameter, mal) {
        const url = new URL(mal ? 'https://api.myanimelist.net/v2' : Settings.getBaseURL());

        url.pathname += '/' + args.filter(x => x).join('/');
        if(parameter){
            for(const [key, value] of Object.entries(parameter)){
                if(value !== 0 && !value) continue;
                url.searchParams.append(key, value);                
            }
        }

        return url.href;
    }
}

module.exports = Request;

// Se tomó prestada desde https://github.com/Fabricio-191/youtube/blob/main/src/utils/requests.js (?)
function fetch(url, options = {}){
    const parsedURL = new URL(url);
    parsedURL.protocol = 'https:';

    const promise = new Promise((resolve, reject) => {
        https
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