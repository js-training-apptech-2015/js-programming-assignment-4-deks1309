/*
Functon accepts an array of Strings (dependencies) and 
a callback function, 
that gets executed when all the dependencies are loaded
*/
function define() {
    var dependencies;
    var callback;

    if (typeof(arguments[0]) === 'function') {
        callback = arguments[0];
        var srcScript = document.currentScript.src;
        var nameModule = srcScript.split('/').pop().split('.')[0];
        window[nameModule] = callback();
    } else {
        dependencies = arguments[0];
        callback = arguments[1];
        var promises = [];
        dependencies.forEach(function (nameFile) {
            promises.push(loadJSFile(nameFile));
        });

        Promise.all(promises)
            .then(function (results) {
                var args = [];
                results.forEach(function (nameModule) {
                    args.push(window[nameModule]);
                });
                callback(args);
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    //Function loads .js file
    function loadJSFile(nameFile) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = nameFile;
            var nameModule = nameFile.split('/').pop().split('.')[0];

            script.addEventListener('load', function () {
                resolve(nameModule);
            }, false);

            script.addEventListener('error', function () {
                reject(nameModule);
            }, false);

            document.head.appendChild(script);
        });
    }
}