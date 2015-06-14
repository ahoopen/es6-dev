import {Observable} from 'Rx';

class tv {

    constructor() {
        this.api = 'https://api.themoviedb.org/3/search/tv?query=game-of-thrones&api_key=d086542135ccd8848541b28dfeea5d91';
    }

    serializeParams(obj) {
        var str = '';
        for (var key in obj) {
            if (str !== '') {
                str += '&';
            }
            str += key + '=' + encodeURIComponent(obj[key]);
        }
        return str;
    }

    status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    json(response) {
        if (typeof response.json === 'function') {
            return response.json();
        }
    }

    action(uri, data) {
        var apiBase = 'http://api.themoviedb.org/3';
        var params = {
            'api_key': 'd086542135ccd8848541b28dfeea5d91'
        };
        var opts = {};

        if (data) {
            opts.body = JSON.stringify(data);
            opts.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        }

        if (data) {
            for (var i in data) {
                params[i] = data[i];
            }
        }

        return fetch(apiBase + uri + '?' + this.serializeParams(params))
            .then(this.status)
            .then(this.json);
    }

    /**
     * Fetch the endpoint and return the json
     *
     * @param endpoint
     * @returns {Promise}
     */
    grab(endpoint) {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            fetch(endpoint)
                .then(this.status)
                .then((body)=> {
                    resolve(body.json());
                }).catch((err)=> {
                    reject(err);
                });
        }));
    }

    async tvSearch(query) {
        try {
            return await this.action('/search/tv', {
                query: query
            });
        } catch (error) {
            console.log('Errorz', error);
        }
    }

    process() {
        let api = this.grab(this.api);

        api.subscribe(
            (response) => {
                response.results.map(function (result) {
                    return {id: result.id, name: result.name};
                }).forEach(function (show) {
                    console.log('tv: ', show);
                });
            },
            (err) => {
                console.log('error!', err);
            },
            () => {
                console.log('complete!!');
            });
    }
}

export default tv;
