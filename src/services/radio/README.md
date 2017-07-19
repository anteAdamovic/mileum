# Mileum

## Service - Radio

Description
-----------

**Radio** service is intended to be used for component communication within your application. It features an `EventEmitter<Signal>` where **Signal** is the default Event data format.

```Typescript
class Signal {
    public name: String;
    public message: any;
}
```

If you want to send some data from one component to another you can use **Radio** to emit (_broadcast_) a **Signal** that can be caught (_subscribed to_) by another component.

**Radio** will send all Signals to the default channel ('general') if not told otherwise. It does have a multiple channel support so you won't have issues with mixing up events in various components.

Methods
-------



Usage
-----

To send data to the default channel:

```Typescript
import { Radio, Signal } from 'mileum/services';
...
constructor(private radio: Radio) { }

sendDataToDefaultChannel(messageName: String, data: any): void {
    this.radio.broadcast(new Signal(messageName, data));
}
```

To catch the data sent to the default channel:

```Typescript
import { Radio, Signal } from 'mileum/services';
...
constructor(private radio: Radio) { }

subscribeToDefaultChannel(): void {
    this.radio.listen(
        (signal: Signal) => {
            // Code when signal is caught
        }
    );
}
```

NOTE: When you broadcast or listenTo specific channel, Radio will automatically create the channel if it doesn't exist.
To create a new channel: 

```Typescript
import { Radio, Signal } from 'mileum/services';
...
constructor(private radio: Radio) { }

createNewChannel(channelName: string): void {
    this.radio.addChannel(channelName);
}
```

To send data to the specific channel:

```Typescript
import { Radio, Signal } from 'mileum/services';
...
constructor(private radio: Radio) { }

sendDataToChannel(channelName: string, messageName: string, data: any): void {
    this.radio.broadcastToChannel(channelName, new Signal(messageName, data));
}
```

To catch the data sent to the specific channel:

```Typescript
import { Radio, Signal } from 'mileum/services';
...
constructor(private radio: Radio) { }

subscribeToChannel(channelName: string): void {
    this.radio.listenToChannel(
        channelName,
        (signal: Signal) => {
            // Code when signal is caught
        }
    );
}
```
