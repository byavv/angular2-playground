export function emailValidator(control: any) {
	if (!/.+\@.+\..+/.test(control.value)) {
		return { email: true };
	}
}

export function minValue(value: number) {
	return function(control) {
		if (control.value) {
			if ((control.value < value)) {
				return { minValue: true }
			}
		}
	}
}
export function maxValue(value: number) {
	return function(control) {
		if (control.value) {
			if ((control.value > value)) {
				return { maxValue: true }
			}
		}
	}
}