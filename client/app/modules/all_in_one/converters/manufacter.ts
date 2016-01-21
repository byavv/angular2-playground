import {Converter} from "../decorators/converter.decorator";

@Converter({ converterName: `manufacter` })
export class ManufacterConverter {
    static convert(value) {
        value = value[0];
        if (!value) return {
            manufacter: null,
            model: null
        }
        var params = value.split(',');
        if (params[0] === "any" || !params[0])
            return {
                manufacter: '',
                model: ''
            }
        if (params[1] === "any" || !params[1]) {
            return {
                manufacter: params[0],
                model: ''
            }
        } else {
            return {
                manufacter: params[0],
                model: params[1]
            }
        }
    }

    static convertBack(value): any {
        if (value.manufacter && value.model) {
            return { manufacter: `${value.manufacter},${value.model}` };
        }
        if (!value.manufacter)
            return { manufacter: `any` };
        if (!value.model)
            return { manufacter: `${value.manufacter},any` };
    }

    static convertToView(value) {
        if (value.manufacter && value.model)
            return `${value.manufacter},${value.model}`;
        if (!value.manufacter)
            return `any`;
        if (!value.model)
            return `${value.manufacter},any`;
    }
}