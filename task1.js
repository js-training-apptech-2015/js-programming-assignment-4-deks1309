/*
Constructor that would produce objects 
with an overload method that adds 'overloaded' method 
implementations to this object. .overload decides which 
implementation to use based on: 
1. number of arguments 
2. arguments' types
*/
function ObjectWithMethodOverloading() {

    this.functions = [];

    this.overload = function (nameNewFunc, func, argTypes) {
        var obj = this;
        if (typeof (func) === 'function') {

            if (argTypes) {
                var param = "";
                for (var i = 0; i < argTypes.length; i++) {
                    param += argTypes[i].name.toLowerCase() + ",";
                }
                argTypes = param.substr(0, param.length - 1);
            } else {
                argTypes = 'unknow';
            }

            obj.functions[func.length] = obj.functions[func.length] || [];

            obj.functions[func.length][argTypes] = func;

            obj[nameNewFunc] = function () {
                var param = "";
                for (var i = 0; i < arguments.length; i++) {
                    param += (typeof(arguments[i])).toLowerCase() + ",";
                }
                param = param.substr(0, param.length - 1);
                if (obj.functions[arguments.length][param]) {
                    return obj.functions[arguments.length][param].apply(this, arguments);
                } else if (obj.functions[arguments.length]['unknow']) {
                    return obj.functions[arguments.length]['unknow'].apply(this, arguments);
                }

            }
        }
    }

}