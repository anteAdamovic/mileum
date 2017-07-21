import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'rxjs';

// Services
import { Radio } from './services/radio/radio.service';
import { RequestManager } from './services/request-manager/request-manager.service';

// Components
import { MileumLogin } from './components/mileum-login/mileum-login.component';
import { MileumRegister } from './components/mileum-register/mileum-register.component';

@NgModule({
    imports: [FormsModule],
    declarations: [
        MileumLogin,
        MileumRegister
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MileumModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MileumModule,
            providers: [Radio, RequestManager]
        }
    }
}