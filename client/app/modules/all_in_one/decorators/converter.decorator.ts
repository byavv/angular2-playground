import * as converters from '../converters/converters';

/**
 * Class decorator to assign decorated converter for the appropriate filter
 */
export function Converter(converter: any) {
    return (target: any) => {
        target.converterName = converter.converterName;
    }
}
/**
 * Function or property decorator used to convert filter value to "presentable" string
 * ex. {manufacter: "BMW", model: "3-series"} --> "BMW,3-series"
 * conversion method should be defined in appropriate converter's "convertToView" function
 */
export function convert(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {

    if (descriptor.value != null) {
        _convertFilterValue_func(descriptor, target);
    }
    else if (descriptor.get != null) {
        _convertFilterValue_acc(descriptor, target);
    }
    else {
        throw "Only put a convert decorator on a method or get accessor.";
    }
}

function _convertFilterValue_func(descriptor: TypedPropertyDescriptor<any>, target) {
    const originalValue = descriptor.value;
    let convertedValue: string = `Converter not found`;

    descriptor.value = function(...args: any[]) {
        var filterValue = originalValue.apply(this, args);
        let converter = _findConverterByName(target.filterName);
        if (!!converter) {
            convertedValue = converter.convertToView(filterValue);
        }
        return convertedValue;
    };
}

function _convertFilterValue_acc(descriptor: TypedPropertyDescriptor<any>, target) {
    const originalGet = descriptor.get;
    const originalSet = descriptor.set;
    let convertedValue: string = `Converter not found`;

    descriptor.get = function(...args: any[]) {
        var filterValue = originalGet.apply(this, args);
        let converter = _findConverterByName(target.filterName);
        if (!!converter) {
            convertedValue = converter.convertToView(filterValue);
        }
        return convertedValue;
    };

    if (descriptor.set != null) {
        descriptor.set = function(...args: any[]) {
            return originalSet.apply(this, args);
        };
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
