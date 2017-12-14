import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Radio {
    private channels: any = {
        'general': new EventEmitter<Signal>()
    };

    public broadcast(signal: Signal): void {
        this.channels['general'].emit(signal);
    }

    /**
     * Broadcast the given signal to the specified channel,
     * if the channel doesn't exist it will create a new one
     * before sending the signal.
     * @param channel - Channel name.
     * @param signal - Signal to be sent.
     */
    public broadcastToChannel(channel: string, signal: Signal) {
        if (!this.channels[channel]) {
            this.channels[channel] = new EventEmitter<Signal>();
        }
        console.warn('Sending a signal to newly created channel ', channel, '. Message won\'t be received without active subscriber.');
        this.channels[channel].emit(signal);
    }

    public listen(): EventEmitter<Signal> {
        return this.channels['general'];
    }

    public listenToChannel(channel: string): EventEmitter<Signal> {
        if (!this.channels[channel]) {
            this.channels[channel] = new EventEmitter<Signal>();
        }
        return this.channels[channel];
    }

    public addChannel(channel: string): void {
        if(!this.channels[channel]) {
            this.channels[channel] = new EventEmitter<Signal>();
        } else {
            console.warn('Trying to add an already existing channel - ', channel);
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
            throw new Error('Object is null or undefined at Signal.fromObject()');
        }
        return new Signal(object.name, object.message);
    }
}