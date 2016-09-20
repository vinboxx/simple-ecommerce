import {ProductModel} from './product.model'

export class ProductGenerator {
    private static products: ProductModel[] = [];

    private static getProductImage(id): string {
        return 'img/product-0' + parseInt(id.slice(-1)) + '.png';
    }

    private static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private static  generateProducts() {
        let i = 0;
        let productMax = this.getRandomNumber(10000, 20000);
        let j = 0;
        let filterMax = this.getRandomNumber(16, 72);

        for (i; i < productMax; i++) {
            let product = new ProductModel();
            product.id = this.getRandomNumber(1, 200000);
            product.name = 'Product ' + product.id;
            product.price = Math.floor( this.getRandomNumber(50, 150000)/10 ) * 10;
            product.rating = this.getRandomNumber(0, 5);
            product.filters = [];
            product.image = this.getProductImage(product.id.toString());

            for (j = 0; j < filterMax; j++) {
                let id = this.getRandomNumber(0, 200);
                let filterId = 'feature:filter' + id + ':Filter' + id;

                if (product.filters.indexOf(filterId) < 0) {
                    product.filters.push('feature:filter' + id + ':Filter' + id);
                }
            }
            this.products.push(product);
        }
    }

    static getProducts(): ProductModel[] {
        if (this.products.length === 0) {
            this.generateProducts();
        }
        return this.products;
    }
}
