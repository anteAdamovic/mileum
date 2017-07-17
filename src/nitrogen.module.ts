import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'rxjs';

// Services
import { Radio } from './services/radio/radio.service';
import { HttpAPI } from './services/http-api/http-api.service';

// Components
import { NitrogenLogin } from './components/nitrogen-login/nitrogen-login.component';

@NgModule({
    imports: [FormsModule],
    declarations: [NitrogenLogin],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NitrogenModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NitrogenModule,
            providers: [Radio, HttpAPI]
        }
    }
}