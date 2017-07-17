import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Radio, Signal } from '../../services/radio/radio.service';

@Component({
    selector: 'nitrogen-login',
    templateUrl: 'nitrogen-login.component.html',
    styleUrls: ['nitrogen-login.component.css']
})
export class NitrogenLogin implements OnInit, OnDestroy {
    private notification: String;
    public loginData: any = {};
    @Input() data: any = {};

    constructor(private radio: Radio) { }

    ngOnInit() {
        this.radio.addChannel('nitrogen-login-channel');
        this.radio.getChannel('nitrogen-login-channe;').subscribe(
            (signal: Signal) => {
                if (signal.name == 'notification') {
                    this.notification = signal.message;
                }
            }
        );
    }

    ngOnDestroy() {
        this.radio.getChannel('nitrogen-login').unsubscribe();
    }

    public submitLoginData(): void {
        this.radio.broadcast(new Signal('nitrogen-login-submit', this.loginData), 'nitrogen-login-channel');
    }
}