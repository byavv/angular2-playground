import {Converter} from "../decorators/converter.decorator";

@Converter({ converterName: `milage` })
export class MilageConverter {  
    // convert from route to filter value      
    static convert(value) {
        return {
            milageFrom: value[0],
            milageUp: value[1]
        }
    }
    //convert filter value to route params
    static convertBack(value): any {
        return {
            milageFrom: value.milageFrom || '',
            milageUp: value.milageUp || ''
        };
    }
    // how to present filter value to user
    static convertToView(value) {
        var from, up;
        value.milageFrom ? from = value.milageFrom : from = "any";
        value.milageUp ? up = value.milageUp : up = "any";
        return `milage: ${from}..${up}`;
    }
}