/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

let fixture: ComponentFixture<FooterComponent>;

describe('Component: Footer', () => {
    beforeEach(() => {
        // Refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [ FooterComponent ]
        });

        // Create component and test fixture
        fixture = TestBed.createComponent(FooterComponent);
    });

    it('should create an instance', () => {
        expect(fixture).toBeTruthy();
    });
});
