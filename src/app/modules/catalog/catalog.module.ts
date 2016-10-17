import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { SharedModule } from '../../shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: CatalogComponent },
        ])
    ],
    declarations: [
        CatalogComponent,
        SidebarComponent
    ]
})
export class CatalogModule {

    constructor(translate: TranslateService) {

        // Override translation
        let json = require('./i18n/en.json');
        translate.setTranslation('en', json, true);

    }

}
