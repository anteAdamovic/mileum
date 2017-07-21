import { Component, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Radio, Signal } from '../../services/radio/radio.service';

@Component({
    selector: 'mileum-register',
    templateUrl: 'mileum-register.component.html',
    styleUrls: ['mileum-register.component.css']
})
export class MileumRegister implements OnInit, OnDestroy {
    private notification: String;
    private channelListener: EventEmitter<Signal>;
    public registerData: any = {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    };
    @Input() data: any;

    constructor(private radio: Radio) { }

    ngOnInit() {
        this.channelListener = this.radio.listenToChannel('mileum-register-channel');
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

    public submitRegisterData(): void {
        this.radio.broadcastToChannel('mileum-register-channel', new Signal('register-submit', this.registerData));
    }

    public validateForm(): boolean {
        if (!this.registerData.username) {
            return false;
        } else if (!this.registerData.email) {
            return false;
        } else if (this.registerData.password.length < 8) {
            return false;
        } else if (this.registerData.password != this.registerData.repeatPassword) {
            return false;
        } 

        return true;
    }
}