class Router {

    constructor() {
        this.posts = new Map();
        this.gets = new Map();
    }

    handle(request, response) {
        var url = require('url');
        var pathname = url.parse(request.url).pathname;

        switch (request.method) {
            case 'GET':
                if (this.gets.has(pathname))
                    this.gets.get(pathname)(request, response);
                else {
                    response.writeHead(404);
                    response.end();
                }
                break;
            case 'POST':
                if (this.posts.has(pathname))
                    this.posts.get(pathname)(request, response);
                else {
                    response.writeHead(404);
                    response.end();
                }
                break;
            default:
                response.writeHead(405);
                response.end();
                break;
        }
    }

    addGET(path, callback) {
        this.gets.set(path, callback);
    }

    addPOST(path, callback) {
        this.posts.set(path, callback);
    }

}
module.exports = Router
