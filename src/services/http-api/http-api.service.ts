import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpAPI {
    private staticHeaders: boolean = false;
    private requestOptions: RequestOptions;
    private routes: any = {};

    constructor(private http: Http) { }

    /**
     * Overwrites current routes with routes from a config file.
     * Can also be used to initialize routes.
     * @param file - Name of the file with configured routes
     */
    public loadRoutesFromFile(file: string): void {
        this.http.get(file).subscribe(
            (routes: any) => this.routes = routes);
    }

    /**
     * Overwrites current routes with routes from the passed object.
     * Can also be used to initialize routes.
     * @param routes - Routes configuration object
     */
    public loadRoutes(routes: any): void {
        this.routes = routes;
    }

    /**
     * Sets a routes url, if specified route doesn't exist creates a new route.
     * @param route - Route entry
     */
    public setRoute(route: string, url: string): void {
        this.routes[route] = url;
    }

    /**
     * Defines the use of static headers throughout the whole api.
     * @param use - Boolean, use or don't use static headers
     * @param headers - Headers (map) to use
     */
    public useStaticHeaders(use: boolean, headers?: any): void {
        this.staticHeaders = use;
        if (use) {
            this.requestOptions = this.formatHeaders(headers);
        }
    }

    /**
     * Performs a http GET request.
     * @param route - Route name
     * @param urlParams - Optional url parameters
     * @param headers - Optional header parameters
     */
    public callGet(route: string, urlParams?: string, headers?: any): Observable<Response> {
        if (this.checkRoute(route)) {
            if (headers) {
                return this.http.get(this.routes[route] + (urlParams ? urlParams : ''), this.formatHeaders(headers))
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else if (this.requestOptions) {
                return this.http.get(this.routes[route] + (urlParams ? urlParams : ''), this.requestOptions)
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else {
                return this.http.get(this.routes[route] + (urlParams ? urlParams : ''))
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            }
        }
    }

    /**
     * Performs a http POST request.
     * @param route - Route name
     * @param payload - Request payload data
     * @param urlParams - Optional url parameters
     * @param headers - Optional header parameters
     */
    public callPost(route: string, payload: any, urlParams?: string, headers?: any): Observable<Response> {
        if (this.checkRoute(route)) {
            const body = JSON.stringify(payload);
            if (headers) {
                return this.http.post(this.routes[route] + (urlParams ? urlParams : ''), body, this.formatHeaders(headers))
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else if (this.requestOptions) {
                return this.http.post(this.routes[route] + (urlParams ? urlParams : ''), body, this.requestOptions)
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else {
                return this.http.post(this.routes[route] + (urlParams ? urlParams : ''), body)
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            }
        }
    }

    /**
     * Performs a http DELETE request.
     * @param route - Route name
     * @param urlParams - Optional url parameters
     * @param headers - Optional header parameters
     */
    public callDelete(route: string, urlParams?: string, headers?: any): Observable<Response> {
        if (this.checkRoute(route)) {
            if (headers) {
                return this.http.delete(this.routes[route] + (urlParams ? urlParams : ''), this.formatHeaders(headers))
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else if (this.requestOptions) {
                return this.http.delete(this.routes[route] + (urlParams ? urlParams : ''), this.requestOptions)
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else {
                return this.http.delete(this.routes[route] + (urlParams ? urlParams : ''))
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            }
        }
    }

    /**
     * Performs a http PUT request.
     * @param route - Route name
     * @param payload - Request payload data
     * @param urlParams - Optional url parameters
     * @param headers - Optional header parameters
     */
    public callPut(route: string, payload: any, urlParams?: string, headers?: any): Observable<Response> {
        if (this.checkRoute(route)) {
            const body = JSON.stringify(payload);
            if (headers) {
                return this.http.put(this.routes[route] + (urlParams ? urlParams : ''), body, this.formatHeaders(headers))
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else if (this.requestOptions) {
                return this.http.put(this.routes[route] + (urlParams ? urlParams : ''), body, this.requestOptions)
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            } else {
                return this.http.put(this.routes[route] + (urlParams ? urlParams : ''), body)
                    .map((response: any) => { 
                        if(response._body) {
                            response.data = JSON.parse(response._body);
                        }
                        return response;
                    });
            }
        }
    }

    /**
     * Checks if the route exists in current routes. 
     * If not throws a RouteNotFound error.
     * @param route - Route name.
     */
    private checkRoute(route: string): boolean {
        if (this.routes[route]) {
            return true;
        } else {
            throw new Error('RouteNotFound ' + route);
        }
    }

    private formatHeaders(headers: any): RequestOptions {
        let requestOptions: RequestOptions = new RequestOptions();
        let requestHeaders: Headers = new Headers();
        Object.getOwnPropertyNames(headers).forEach(
            (header: string) => {
                requestHeaders.append(header, headers[header]);
            }
        );

        requestOptions.headers = requestHeaders;
        return requestOptions;
    }
}