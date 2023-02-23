import { Component, Input } from '@angular/core';
import { AbstractFormField } from 'src/utils/abstract-form-field';
import { ISelect } from './select.interface';

@Component({
  selector: 'app-select',
  template: `
	<div class="relative">
		<div class="flex flex-col gap-1 relative">
			<label class="text-sm text-gray-500">{{label}}</label>
			<select
				class="rounded-md border bg-gray-100 invalid:text-blue-400 dark:bg-[#121214] dark:border-[#29292e] dark:text-white py-3 focus:outline-none focus:ring-0 text-sm outline-none focus:border-purple-500"
				(blur)="onTouched(); blur.emit()"
				[ngClass]="{'is-invalid': formControl.invalid && formControl.touched, 'no-padding-icon' : ''}"
				(change)="onChange($any($event.target).value)"
				[hidden]="hidden"
				[formControl]="formControl"
				[compareWith]="compareWith"
			>
				<option [ngValue]="null" disabled selected>
					Selecione uma opção...
				</option>
				<option
					*ngFor="let o of optionsList"
					[ngValue]="o"
				>
					{{o.getKey()}}
				</option>
			</select>
		</div>
		<div class="error-message absolute">
			<span *ngIf="formControl.invalid && formControl.touched">	
				<span *ngIf="formControl.hasError('required')">
					Campo obrigatório.
				</span>
			</span>
		</div>
	</div>
	`,
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
