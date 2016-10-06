import { RouterModule } from '@angular/router'
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogComponent } from './catalog.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
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
}
