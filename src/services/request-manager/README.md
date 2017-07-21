# Mileum

## Service - RequestManager

Description
-----------

**RequestManager** service is a wrapper for Angular's Http service. It features calls to GET, POST, PUT and DELETE http requests.

Apart from wrapped http methods **RequestManager** also provides a map of urls, allowing you to store the url inside it and give it a specific name so in the future you can just reference to it instead needing to pass the entire url.

Example of the url route:

```Typescript
{
    "google": "https://www.google.com"
}
```

where _google_ is the **route** and _https://www.google.com_ is the **url**.

When passing headers be sure to pass a map object as the service will automatically parse them for you.

All of the methods return the _Response_ type Angular object extended with **data** or **dataRaw** depending if they managed to parse the response data to JSON or not.

Example response when data is parsed **succesfully**:

```Typescript
{
    data: {
        someData: someValue
    },
    headers: Headers,
    ok: true,
    status: 200,
    statusText: "OK",
    type: 2,
    url: "http://www.url.com"
}
```

Example response when data is parsed **unsuccesfully**:

```Typescript
{
    rawData: "<!DOCTYPE html><html><head></head><body></body></html>",
    headers: Headers,
    ok: true,
    status: 200,
    statusText: "OK",
    type: 2,
    url: "http://www.url.com"
}
```

**NOTE:** Unsuccesfull parsing of data does not indicate the request failed, just that the data received from the server can't be parsed into JSON.

Methods
-------

`loadRoutesFromFile(file: String): void` - Loads url routes from a specified file

`loadRoutes(routes: any): void` - Loads url routes from the passed object

`setRoute(routeName: string, routeUrl: string): void` - Set the value of the route 'routeName', if it exists the value is overwriten, if it doesn't exist it will be created

`useStaticHeaders(headers: any): void` - Defines the use of _static_ headers, _static headers_ means it will automatically use the specified headers in every request without the need to specify them every time.  

`callGet(route: string, urlParams?: string, headers?: any): Observable<Response>` - Performs a http **GET** request on the specified route, passing optional url params and headers. Passed headers will override static headers if they are being used.

`callPost(route: string, payload: any, urlParams?: string, headers?: any): Observable<Response>` - Performs a http **POST** request on the specified route, passing payload data along with optional url params and headers. Passed headers will override static headers if they are being used.

`callDelete(route: string, urlParams?: string, headers?: any): Observable<Response>` - Performs a http **DELETE** request on the specified route, passing optional url params and headers. Passed headers will override static headers if they are being used.

`callPut(route: string, payload: any, urlParams?: string, headers?: any): Observable<Response>` - Performs a http **PUT** request on the specified route, passing payload data along with optional url params and headers. Passed headers will override static headers if they are being used.

Usage
-----

Loading routes:

```Typescript
import { RequestManager } from 'mileum/services';
...
constructor(private requestManager: RequestManager) {
    requestManager.loadRoutesFromFile('myRoutesFile.json');
}
```

```Typescript
import { RequestManager } from 'mileum/services';
...
constructor(private requestManager: RequestManager) {
    const routes: any = {
        "testUrl": "http://httpbin.org/"
    };

    requestManager.loadRoutes(routes);
}
```

```Typescript
import { RequestManager } from 'mileum/services';
...
constructor(private requestManager: RequestManager) {
    requestManager.setRoute('testUrl', 'http://httpbin.org/');
}
```

Performing a GET/DELETE request:

```Typescript
import { RequestManager } from 'mileum/services';
...
constructor(private requestManager: RequestManager) {
    requestManager.setRoute('testUrl', 'http://httpbin.org/');
    requestManager.callGet('testUrl').subscribe(
        (response: any) => {
            if(response) {
                // Code to handle the response
            }
        }
    );
}
```

Performing a POST/PUT request:

```Typescript
import { RequestManager } from 'mileum/services';
...
constructor(private requestManager: RequestManager) {
    const payload: any = {
        data: 'value'
    };
    requestManager.setRoute('testUrl', 'http://httpbin.org/');
    requestManager.callPut('testUrl', payload).subscribe(
        (response: any) => {
            if(response) {
                // Code to handle the response
            }
        }
    );
}
```

