import {Converter} from "../decorators/converter.decorator";
import {allColors} from "../config/carColors";
@Converter({ converterName: `color` })
export class ColorConverter {  
    // convert from route to filter value
    // "red,green" --> ["red", "green"]
    static convert(value): any {
        value = value[0];
        if (!value) {
            return {
                colors: []
            }
        } else {
            var params: Array<string> = value.split(',');           
            return { colors: params };
        }
    }
    
    // ["red", "green"] --> "red,green"
    static convertBack(value): any {
        value = value.colors;
        
        var res = (value.length>0)
                ? { colors: 
                    
                    value.join()}
                : { colors: "" };
                console.log(res)
            return res;    
    }
    
    
    
    // how to present filter value to user
    static convertToView(value) {
        return `color`;
    }
}