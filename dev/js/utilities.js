// Initial Utility from Waldir B.
// Thanks for the help

const utilities = {};

/**
    * shorthand clean log to console
    * @param {string} strName
    * @param {object variant} objValue
    */
window.log = function f(strName, object, type = 'log') {
    // eslint-disable-next-line no-console
    console[type](type === 'table' ? object : strName, type === 'table' ? [strName] : object || '');
};

/**
     * Iterates over an object's own properties, executing the `callback` for each.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} callback The function executed per own property.
     */
utilities.forOwn = function f(object, callback) {
    for (const key in object) {
        if (object != null && hasOwnProperty.call(object, key))
            callback(object[key], key, object);
    }
};

/**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
utilities.each = function f(object, callback) {
    let i = 0;
    const length = object ? object.length : 0;
    if (typeof length == 'number' && length > -1) {
        while (i < length) {
            callback(object[i], i, object);
            i += 1;
        }
    } else {
        utilities.forOwn(object, callback);
    }
};

/**
     * Iterates over an object's own properties, toggling provided class.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} callback The function executed per own property.
     */
utilities.toggleClass = function f(object, className) {
    this.each(object, (el) => {
        el.classList.toggle(className);
    });
};

/**
     * Iterates over an object's own properties, toggling provided class with timing.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} callback The function executed per own property.
     */
utilities.toggleClassWithDelay = function f(object, className, interval = 100, delay) {
    this.each(object, (el, i) => {
        setTimeout(() => {
            el.classList.toggle(className);
        }, interval * i + delay);
    });
};

/**
     * An empty iteration utility for arrays.
     *
     * @private
     * @param {Array} arr The object to iterate over.
     */
utilities.emptyArray = function f(arr) {
    arr.forEach(clearTimeout);
    arr.length = 0;
    arr = [];
};

/**
     * An empty iteration utility for HTML Elements.
     *
     * @private
     * @param {HTMLElement} parent The object to iterate over.
     */
 utilities.emptyElement = function f(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};


window._ = utilities;
