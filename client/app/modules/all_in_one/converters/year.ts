import {Converter} from "../decorators/converter.decorator";

@Converter({ converterName: `year` })
export class YearConverter {
    static convert(value) {
        value = value[0];
        if (!value) return {
            yearFrom: null,
            yearUp: null
        }
        var params = value.split('..');
        var up, from;
        params[0] === "any" || !params[0] ? from = "" : from = parseInt(params[0]);
        params[1] === "any" || !params[1] ? up = "" : up = parseInt(params[1]);
        return {
            yearFrom: from,
            yearUp: up
        }
    }

    static convertBack(value): any {
        var from = value.yearFrom || "any";
        var up = value.yearUp || "any";
        return { year: `${from}..${up}` };
    }

    static convertToView(value) {
        var from, up;
        value.yearFrom ? from = value.yearFrom : from = "any";
        value.yearUp ? up = value.yearUp : up = "any";
        return `year: ${from}..${up}`;
    }
}