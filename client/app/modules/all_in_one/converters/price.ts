import {Converter} from "../decorators/converter.decorator";

@Converter({ converterName: `price` })
export class PriceConverter {  
    //convert from route to filter value
    static convert(value) {
        value = value[0];
        if (!value) return {
            priceFrom: null,
            priceUp: null
        }
        var params = value.split('..');
        var up, from;
        params[0] === "any" || !params[0] ? from = null : from = parseInt(params[0]);
        params[1] === "any" || !params[1] ? up = null : up = parseInt(params[1]);
        return {
            priceFrom: from,
            priceUp: up
        }
    }
    //convert filter value to route
    static convertBack(value): any {
        var from = value.priceFrom || "any";
        var up = value.priceUp || "any";
        return { price: `${from}..${up}` };
    }
    // how to present filter value to user
    static convertToView(value) {
        var from, up;
        value.priceFrom ? from = value.priceFrom : from = "any";
        value.priceUp ? up = value.priceUp : up = "any";
        return `price: ${from}..${up}`;
    }
}