"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Radio = (function () {
    function Radio() {
        this.channels = {};
        this.channels['general'] = new core_1.EventEmitter();
    }
    Radio.prototype.broadcast = function (signal, channel) {
        if (channel) {
            this.channels[channel].emit(signal);
        }
        else {
            this.channels['general'].emit(signal);
        }
    };
    Radio.prototype.listenTo = function (channel) {
        if (channel) {
            return this.channels[channel];
        }
        else {
            return this.channels['general'];
        }
    };
    Radio.prototype.addChannel = function (channel) {
        this.channels[channel] = new core_1.EventEmitter();
    };
    return Radio;
}());
Radio = __decorate([
    core_1.Injectable()
], Radio);
exports.Radio = Radio;
var Signal = (function () {
    function Signal(name, message) {
        this.name = name;
        this.message = message;
    }
    Signal.fromObject = function (object) {
        if (!object) {
            throw new Error("Object is null or undefined at Signal.fromObject()");
        }
        return new Signal(object.name, object.message);
    };
    return Signal;
}());
exports.Signal = Signal;
