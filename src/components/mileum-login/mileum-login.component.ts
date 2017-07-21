import { Component, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Radio, Signal } from '../../services/radio/radio.service';

@Component({
    selector: 'mileum-login',
    templateUrl: 'mileum-login.component.html',
    styleUrls: ['mileum-login.component.css']
})
export class MileumLogin implements OnInit, OnDestroy {
    private notification: String;
    private channelListener: EventEmitter<Signal>;
    public loginData: any = {
        username: '',
        password: ''
    };
    @Input() data: any;

    constructor(private radio: Radio) { }

    ngOnInit() {
        this.channelListener = this.radio.listenToChannel('mileum-login-channel');
        this.channelListener.subscribe(
            (signal: Signal) => {
                if (signal.name == 'notification') {
                    this.notification = signal.message;
                }
            }
        );
    }

    ngOnDestroy() {
        this.channelListener.unsubscribe();
    }

    public submitLoginData(): void {
        this.radio.broadcastToChannel('mileum-login-channel', new Signal('login-submit', this.loginData));
    }

    public validateForm(): boolean {
        if (!this.loginData.username) {
            return false;
        } else if (this.loginData.password.length < 8) {
            return false;
        }

        return true;
    }
}