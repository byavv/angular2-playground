import * as converters from '../converters/converters';

/**
 *  Class decorator, adds static methods 'convert' and 'convertBack' and requiredParams property to any class,
 *  takes this functions from the appropriate converter.
 * 
 *  params - required router params to get value(s) from, 
 *  convert - how to convert this params into filter's working value(s)
 *  convertBack - accordingly, turn filter value into route parameter.
 * 
 * ### Example
 *
 * @Filter({ filterName: "my-filter-name", params: ['my-param'] })
 * 
 */
export function Filter(filter: any) {
    return (target: any) => {
        target.filterName = filter.filterName;
        target.requiredParams = filter.params || [];
        target.prototype.filterName = filter.filterName;
        let converter = _findConverterByName(filter.filterName);
        if (converter) {
            target.convert = converter.convert;
            target.convertBack = converter.convertBack;
        }
    }
}

function _findConverterByName(name) {
    var converter = null;
    var keys = Object.keys(converters)
    keys.forEach((converterName) => {
        var converterFunc = converters[converterName];
        if (converterFunc.converterName === name) {
            converter = converterFunc
        }
    })
    return converter;
}

