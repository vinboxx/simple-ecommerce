import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs/Subject';
// import { DefaultCheckout, IDiscount } from './checkout.service';
// import { discounts } from '../mock/discounts.mock.json';

@Injectable()
export class CartService {

    private cart: Item[] = [];
    // private discount:IDiscount;

    // Observable sources
    private totalItemSource = new Subject<number>();
    private totalPriceSource = new Subject<number>();

    // Observable streams
    totalItem$ = this.totalItemSource.asObservable();
    totalPrice$ = this.totalPriceSource.asObservable();

    constructor(private storageService: StorageService) {
        this.refreshCart();
    }

    addItem(item: Item) {

        let itemExist = false;

        // Update exist item
        if (this.cart && this.cart.length) {
            for (let lineItem of this.cart) {
                if (lineItem.id === item.id) {
                    lineItem.qty += 1;
                    lineItem.totalPrice = lineItem.qty * lineItem.price;
                    itemExist = true;
                }
            }
        }

        // Add new item
        if (!itemExist) {
            item.qty = 1;
            item.totalPrice = item.price;
            this.cart.push(item);
        }

        this.saveCart();
    }

    updateItem(item: Item) {
        // Update exist item
        if (this.cart && this.cart.length) {
            for (let lineItem of this.cart) {
                if (lineItem.id === item.id) {
                    lineItem.qty = item.qty;
                    lineItem.totalPrice = lineItem.qty * lineItem.price;
                }
            }
        }

        this.saveCart();
    }
    deleteItem(item: Item) {
        this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
        this.saveCart();
    }
    clearCart() {
        this.cart = [];
        this.saveCart();
    }
    // applyDiscount(code:string){
    //     this.discount = discounts.filter(discount => discount.code == code)[0];
    // }
    refreshCart(): Item[] {
        this.cart = JSON.parse( this.storageService.read<string>('cart') ) || [];
        this.recalculateCart();
        return this.cart;
    }
    getCart(): Item[] {
        return this.cart;
    }
    saveCart() {
        this.storageService.write('cart', JSON.stringify(this.cart));
        this.refreshCart();
    }
    getTotalItem() {
        return this.cart.length;
    }
    getTotalPrice() {
        let totalPrice = this.cart.reduce((sum, cartItem) => {
            return sum += cartItem.totalPrice, sum;
        }, 0);
        // if(this.discount){
        //     totalPrice -= totalPrice=this.discount.amount;
        // }
        return totalPrice;
    }
    recalculateCart() {

        if (this.cart && this.cart.length) {
            for (let lineItem of this.cart) {
                lineItem.qty = lineItem.qty * 1;
                lineItem.totalPrice = lineItem.qty * lineItem.price;
            }
        }

        this.totalItemSource.next(this.cart.length);
        this.totalPriceSource.next(this.getTotalPrice());
    }

}
