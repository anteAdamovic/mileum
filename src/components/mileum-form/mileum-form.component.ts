import { Component, Input, OnDestroy } from '@angular/core';
import { Radio, Signal } from '../../services/radio/radio.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'mileum-form',
    templateUrl: 'mileum-form.component.html',
    styleUrls: ['mileum-form.component.css']
})
export class MileumForm implements OnDestroy {
    private formSubscription: Subscription;
    private formChangedFlag: boolean = true;
    public notification: String;
    public formData: any = {};
    @Input() data: any = {};

    constructor(private radio: Radio) {
        this.formSubscription = this.radio
            .listenToChannel(this.data.id ? ('mileum-form-channel-' + this.data.id) : 'mileum-form-channel')
            .subscribe(
            (signal: Signal) => {
                if (signal.name === 'notification') {
                    this.notification = signal.message;
                }
            }
            );

    }

    ngOnDestroy(): void {
        if (this.formSubscription)
            this.formSubscription.unsubscribe();
    }

    public submitFormData(): void {
        let signal: Signal = new Signal('form-submit', this.formData);
        if (this.data.id)
            this.radio.broadcastToChannel('mileum-form-' + this.data.id, signal);
        else
            this.radio.broadcastToChannel('mileum-form', signal);
    }

    public getFormFields(): any[] {
        if (!this.data)
            return [];

        let formFields: any[] = [];
        Object.getOwnPropertyNames(this.data).forEach(
            (name: string) => {
                formFields.push(this.data.structure[name]);
            }
        );

        return formFields;
    }
}
