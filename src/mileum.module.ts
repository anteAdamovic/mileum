import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'rxjs';

// Services
import { Radio } from './services/radio/radio.service';
import { HttpAPI } from './services/http-api/http-api.service';

// Components
import { MileumLogin } from './components/mileum-login/mileum-login.component';

@NgModule({
    imports: [FormsModule],
    declarations: [MileumLogin],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MileumModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MileumModule,
            providers: [Radio, HttpAPI]
        }
    }
}