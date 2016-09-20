import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModel } from "../catalog/product.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
    private mergedFilters: any = {};
    private subscriber: EventEmitter<ProductModel[]>;
    private activeFilters: string[] = [];

    displayFilters: any[] = [];

    constructor(private _service: ProductService) {
    }

    ngOnInit() {
        /**
         * subscribe to the update event of ProductService to keep display filters in sync with actual data set
         */
        this.subscriber = this._service.serviceEvent$.subscribe((products)=> {
            this.processFilters(products);
        });

        /**
         * load all products and create display filters
         */
        this._service.load().then((products)=> {
            this.processFilters(products)
        });
    }

    ngOnDestroy() {
        /**
         * unsubscribe from ProductService event
         */
        this.subscriber.unsubscribe();
    }

    /**
     * extract unique filters and counts from product
     */
    private mergeFilters(product: ProductModel) {
        product.filters.forEach((filterId: string)=> {
            /** filter format "category:urlName:displayName" */
            let parts = filterId.split(':');

            /**
             * if filter does not exist, create filter object
             * else, just add one to the counter
             */
            if (this.mergedFilters[filterId] === undefined) {
                this.mergedFilters[filterId] = {
                    id: filterId,
                    category: parts[0],
                    urlName: parts[1],
                    name: parts[2],
                    count: 1,
                    disabled: false
                }
            } else {
                this.mergedFilters[filterId].count++;
            }
        });
    }

    /**
     * iterate through mergedFilters array and push it to the displayFilters array
     */
    private createDisplayFilters() {
        let _displayFilters = [];

        Object.keys(this.mergedFilters).forEach((value: string) => {
            let filterObj = this.mergedFilters[value];
            let filter = this.displayFilters.filter((f) => {
                return f.id === filterObj.id;
            })[0];

            if (filter) {
                filter.count = filterObj.count;
            } else {
                _displayFilters.push(filterObj);
            }
        });
        /** just one change for the change detection */
        this.displayFilters = _displayFilters;
    }

    /**
     * iterate through all displayFilters and update the filter count
     */
    private updateDisplayFilters() {
        /** local copy of all displayFilters */
        let _displayFilters = this.displayFilters.slice();

        _displayFilters.forEach((filter: any) => {
            let filterObj = this.mergedFilters[filter.id];

            if (filterObj) {
                filter.count = filterObj.count;
                filter.disabled = false;
            } else {
                filter.count = 0;
                filter.disabled = true;
            }
        });

        /** just one change for the change detection */
        this.displayFilters = _displayFilters;
    }

    /**
     * create or update displayFilters from mergedFilters
     */
    private processMergedFilters() {
        if (this.displayFilters.length === 0) {
            this.createDisplayFilters();
        } else {
            this.updateDisplayFilters();
        }
        this.mergedFilters = {};
    }

    /**
     * iterate through all products and extract filter information
     */
    private processFilters(products: ProductModel[]) {
        products.forEach((product: ProductModel) => {
            this.mergeFilters(product);
        });

        this.processMergedFilters();
    }

    /**
     * function is used by template
     * add or remove filter to activeFilters and filter data set
     */
    filter(filterId: string) {
        let idx = this.activeFilters.indexOf(filterId);

        if (idx > -1) {
            this.activeFilters.splice(idx, 1);
        } else {
            this.activeFilters.push(filterId);
        }

        this._service.filter(this.activeFilters);
    }
}
