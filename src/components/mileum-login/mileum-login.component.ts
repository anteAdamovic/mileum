import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Radio, Signal } from '../../services/radio/radio.service';

@Component({
    selector: 'mileum-login',
    templateUrl: 'mileum-login.component.html',
    styleUrls: ['mileum-login.component.css']
})
export class MileumLogin implements OnInit, OnDestroy {
    private notification: String;
    public loginData: any = {
        username: '',
        password: ''
    };
    @Input() data: any;

    constructor(private radio: Radio) { }

    ngOnInit() {
        this.radio.addChannel('mileum-login-channel');
        this.radio.getChannel('mileum-login-channe;').subscribe(
            (signal: Signal) => {
                if (signal.name == 'notification') {
                    this.notification = signal.message;
                }
            }
        );
    }

    ngOnDestroy() {
        this.radio.getChannel('mileum-login').unsubscribe();
    }

    public submitLoginData(): void {
        this.radio.broadcast(new Signal('mileum-login-submit', this.loginData), 'mileum-login-channel');
    }
}