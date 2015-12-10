/*
Functon accepts an array of Strings (dependencies) and 
a callback function, 
that gets executed when all the dependencies are loaded
*/
function define() {
    var dependencies;
    var callback;
    window.loadedModules = window.loadedModules || [];

    if (typeof(arguments[0]) === 'function') {
        callback = arguments[0];
        var srcScript = document.currentScript.src;
        var nameModule = srcScript.split('/').pop().split('.')[0];
        window[nameModule] = callback();
    } else {
        dependencies = arguments[0];
        callback = arguments[1];

        var promises = dependencies.map(loadJSFile);

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
            var unique = window.loadedModules.find((el) => (el === nameFile)) ? false : true;
            var nameModule = nameFile.split('/').pop().split('.')[0];

            if (unique) {
                var script = document.createElement('script');
                script.src = nameFile;
                
                window.loadedModules.push(nameFile);
                script.addEventListener('load', function () {
                    resolve(nameModule);
                }, false);

                script.addEventListener('error', function () {
                    reject(nameModule);
                }, false);

                document.head.appendChild(script);
            } else {
                resolve(nameModule);
            }
        });
    }
}