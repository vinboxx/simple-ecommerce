import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
    imports: [
        TranslateModule
    ],
    exports: [
        TranslateModule
    ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }

}
