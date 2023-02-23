import { ISelect } from './../components/select/select.interface';

export class Product implements ISelect {
	productId: number = 0;
	productName: string = '';

	constructor(init?: Partial<Product>) {
		Object.assign(this, init);
	}
	
	getKey(): string {
		return this.productName;
	}

	getValue(): number {
		return this.productId;
	}
}
