# Mileum

## Component - MileumLogin

Description
-----------

MileumLogin component is intended as a simple as fast way of creating a login interface, currently it only features 2 fields _username_ and _password_ but it's planned in the near future to be customizable using a configuration object.

When user enters the data and clicks 'Login' button, an new **Signal** with name **login-submit** is broadcasted to _mileum-login-channel_ in [Radio](https://github.com/CodeMileu/mileum/tree/master/src/services/radio) service to which you can subscribe to.

For example, if user enters credentials 'myUsername' and 'myPassword' (imagine it's dots) when you
subscribe to _mileum-login-channel_ you will receive the signal looking like this:

```Typescript
{
    name: 'login-submit',
    message: {
        username: 'myUsername',
        password: 'myPassword'
    }
}
```

Methods
-------

-

Usage
-----

Example usage with selector:

```Typescript
import { Component } from '@angular/core';
import { MileumLogin } from 'mileum/components';

@Component({
    selector: 'my-component',
    template: '<mileum-login></mileum-login>'
})
export class MyComponent { }
```

Example usage as component object:

```Typescript
import { MileumLogin } from 'mileum/components';
...
const routes: {
    ...
    path: '/login', component: MileumLogin
}
```

Example of using credentials:

```Typescript
import { Radio, Signal } from 'mileum/services';
...
constructor(private radio: Radio) {
    this.radio.listenToChannel('mileum-login-channel').subscribe(
        (signal: Signal) => {
            if (signal.name === 'login-submit') {
                console.log('Username: ' + signal.message.username);
                console.log('Password: ' + signal.message.password);
            }
        }
    );
}
```
