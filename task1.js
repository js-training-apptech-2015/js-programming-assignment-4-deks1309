/*
Constructor that would produce objects 
with an overload method that adds 'overloaded' method 
implementations to this object. .overload decides which 
implementation to use based on: 
1. number of arguments 
2. arguments' types
*/
function ObjectWithMethodOverloading() {
    var functions = [];

    this.overload = function (nameNewFunc, func, argTypes) {
        var obj = this;       
        var DEFAULT = 'unknown';

        if (typeof (func) === 'function') {

            if (argTypes) {
                var param = "";
                for (var i = 0; i < argTypes.length; i++) {
                    param += argTypes[i].name.toLowerCase() + ",";
                }
                argTypes = param.substr(0, param.length - 1);
            } else {
                argTypes = DEFAULT;
            }

            functions[func.length] = functions[func.length] || [];
            functions[func.length][argTypes] = func;

            obj[nameNewFunc] = function () {
                var param = "";

                for (var i = 0; i < arguments.length; i++) {
                    param += (typeof(arguments[i])).toLowerCase() + ",";
                }
                param = param.substr(0, param.length - 1);

                if (functions[arguments.length][param]) {
                    return functions[arguments.length][param].apply(this, arguments);
                } else if (functions[arguments.length][DEFAULT]) {
                    return functions[arguments.length][DEFAULT].apply(this, arguments);
                };
            }
        }

    }
}