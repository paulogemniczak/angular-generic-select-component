import { Component, Input } from '@angular/core';
import { AbstractFormField } from 'src/utils/abstract-form-field';
import { ISelect } from './select.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends AbstractFormField {

	@Input() optionsList: ISelect[] = [];
	@Input() placeholder: string = '';
	@Input() hidden: boolean = false;

	override registerOnChange(onChange: (value: any) => void): void {
		// this.onChange = onChange;
	}

	compareWith(obj1: ISelect, obj2: ISelect): boolean {
		return obj1 && obj2 ? (obj1.getValue() === obj2.getValue()) : obj1 === obj2;
	}
}
