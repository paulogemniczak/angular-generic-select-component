import { AfterViewInit, Directive, EventEmitter, Input, Optional, Output, Self } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";
import { of, skipWhile, take } from "rxjs";

@Directive()
export abstract class AbstractFormField implements ControlValueAccessor, AfterViewInit {

	@Input() label: string = '';
	@Input() _formControl: FormControl = new FormControl;
	@Output() blur: EventEmitter<void> = new EventEmitter<void>();
	onChange: (value: any) => void = () => { };
	onTouched: () => void = () => { };
	disabled!: boolean;

	constructor(@Self() @Optional() public ngControl: NgControl) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngAfterViewInit(): void {
		if (this.ngControl) {
			of(this.ngControl.control)
				.pipe(
					skipWhile(fc => !fc),
					take(1)
				)
				.subscribe(fc => {
					this.formControl = fc as FormControl;
				});
		}
	}

	get formControl(): FormControl {
		return this._formControl;
	}

	set formControl(forControl: FormControl) {
		this._formControl = forControl;
	}

	writeValue(value: any): void {
		if (this.formControl.value !== value) {
			this.formControl.setValue(value, { emitEvent: false });
		}
	}

	registerOnChange(onChange: (value: any) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
