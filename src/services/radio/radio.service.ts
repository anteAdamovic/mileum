import { Injectable, EventEmitter } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable()
export class Radio {
    private channels: any = {
        'general': new EventEmitter<Signal>()
    };

    public broadcast(signal: Signal, channel?: string): void {
        if (channel) {
            this.channels[channel].emit(signal);
        } else {
            this.channels['general'].emit(signal);
        }
    }

    public getChannel(channel?: string): EventEmitter<Signal> {
        if (channel) {
            return this.channels[channel];
        } else {
            return this.channels['general'];
        }
    }

    public addChannel(channel: string): void {
        if(!this.channels[channel]) {
            this.channels[channel] = new EventEmitter<Signal>();
        }
    }
}

export class Signal {
    public name: String;
    public message: any;

    constructor(name: String, message: any) {
        this.name = name;
        this.message = message;
    }

    static fromObject(object: any): Signal {
        if (!object) {
            throw new Error("Object is null or undefined at Signal.fromObject()");
        }
        return new Signal(object.name, object.message);
    }
}