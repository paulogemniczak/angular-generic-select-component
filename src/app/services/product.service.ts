import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Product } from './../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
	
	get(): Observable<Product[]> {
		const products: Product[] = [
			new Product({productId: 1, productName: 'Product 1'}),
			new Product({productId: 2, productName: 'Product 2'}),
			new Product({productId: 3, productName: 'Product 3'}),
			new Product({productId: 4, productName: 'Product 4'}),
			new Product({productId: 5, productName: 'Product 5'})
		];

		return of(products);
	}
}
