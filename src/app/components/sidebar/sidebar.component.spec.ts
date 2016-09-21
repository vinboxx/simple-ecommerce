/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { CatalogService } from '../../services/catalog.service';

describe('Component: Sidebar', () => {
  it('should create an instance', () => {
    let component = new SidebarComponent();
    console.log('Sidebar', component);
    expect(component).toBeTruthy();
  });
});
