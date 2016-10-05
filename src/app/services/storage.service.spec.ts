/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('Service: Storage', () => {

    let service: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StorageService]
        });
    });

    it('should get a service instance', inject([StorageService], (_service: StorageService) => {
        service = _service;
        expect(service).toBeTruthy();
    }));

    it('should write and read to storage', () => {

        let text = 'This is da remix!';
        service.write('test_storage', text);
        let value = service.read('test_storage');

        let result = value === text;
        expect(result).toBeTruthy();
    });
});
