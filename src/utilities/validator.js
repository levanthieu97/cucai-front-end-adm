const toString = Object.prototype.toString;

export const trim = str => {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
    // cut space
};

export const isBoolean = boo => {
    return typeof boo === 'boolean' ? true : false;
};

export const isTrue = boo => {
    return isBoolean(boo) && boo;
};

export const isFalse = boo => {
    return isBoolean(boo) && !boo;
};

export const isArray = val => {
    return toString.call(val) === '[object Array]'
    // value of toString is val
    // compare 'val' and '...' -> true or false
};

export const isFormData = val => {
    return typeof FormData !== 'undefined' && val instanceof FormData;
};

export const hasText = val => {
    return typeof val === 'string' && trim(val) != '';
};

export const isColorHexCode = str => {
    let validRegex = new RegExp(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/);
    if (hasText(str)) {
        return validRegex.test(str);
    }
    return false;
};

export const isIPAddress = address => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        address
    );
};

export const isString = val => {
    return typeof val === 'string';
    /*
        ** https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Operators/typeof
        val = 'abc'
        typeof val  -> 'string' 
        val === 'string' -> true
    */
};

export const emptyString = val => {
    return typeof val === 'string' && trim(val) == '';
};

export const isNumber = val => {
    return typeof val === 'number' && !Number.isNaN(val);
    /*
        https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
        Number.isNaN: check this value is NaN ? 
    */
};

export const isUndefined = val => {
    return typeof val === 'undefined';
};

export const isNil = val => {
    return val == null || isUndefined(val);
};

export const isObject = val => {
    return val !== null && typeof val === 'object';
};

export const isDate = val => {
    return toString.call(val) === '[object Date]';
};

export const isFile = val => {
    return toString.call(val) === '[object File]';
};

export const isBlob = val => {
    return toString.call(val) === '[object Blob]';
};

export const isFunction = val => {
    return toString.call(val) === '[object Function]';
};

export const isStream = val => {
    return isObject(val) && isFunction(val.pipe);
}

