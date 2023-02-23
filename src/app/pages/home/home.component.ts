import { FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	productList: Product[] = [];
	form: FormGroup;

	constructor(
		private productService: ProductService
	) {
		this.form = this.createEmptyForm();
	}

	ngOnInit(): void {
		this.getProducts();
	}

	createEmptyForm(): FormGroup {
		return new FormGroup({
			product: new FormControl<Product | null>(null, [Validators.required])
		});
	}

	async getProducts(): Promise<void> {
		const products$ = this.productService.get();
		const list = await lastValueFrom(products$);
		this.productList = list;
	}

	onSubmitForm(): void {
		console.log(this.form);
	}

}
