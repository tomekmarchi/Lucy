//convert object to string
var $tostring = object_prototype.toString,
    //make collection into an array
    arrayFrom = _array.from,
    _toArray;
if (arrayFrom) {
    _toArray = function(item) {
        return arrayFrom.call(_array, item);
    };
} else {
    _toArray = function(items) {
        var arr = [];
        for (var i = -1, l = items.length; ++i !== l; arr[i] = items[i]);
        return arr;
    };
}
