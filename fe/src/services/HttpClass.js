import { Component } from 'react';

class HttpClass extends Component
{
    /**
     * Global Post Request
     * @param {string} service 
     * @param {object} options 
     */
    request(service, options) {
        let url = this.getEnvironment();

        var data = {
            endpoint: service,
            options: options
        }

        return fetch(url, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json());
    }

     /**
     * Auth Post Request
     * @param {object} options 
     */
    auth(options) {
        let url = this.getEnvironment();

        var data = {
            endpoint: 'login',
            options: options
        }

        return fetch(url, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json());
    }

    getEnvironment() {
        const isLocalhost = Boolean(
            window.location.hostname === 'localhost' ||
              // [::1] is the IPv6 localhost address.
              window.location.hostname === '[::1]' ||
              // 127.0.0.1/8 is considered localhost for IPv4.
              window.location.hostname.match(
                /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
              )
          );

        if (isLocalhost) {
            return 'http://localhost:8012/listner.php';
        }
        return '/listner.php';
    }
}

export default HttpClass;