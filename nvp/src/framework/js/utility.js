var NEG = NEG || {};

// 命名空间注册
NEG.namespace = function (s) {
    var arr = s.split('.');
    var namespace = window;
    var args = arguments;

    for (var i = 0, k = arr.length; i < k; i++) {
        if (typeof namespace[arr[i]] == 'undefined') {
            namespace[arr[i]] = {};
        }
        namespace = namespace[arr[i]];
    }

    if (args) {
        for (var index = 1; index < args.length; index++) {
            var module = args[index];
            if (module) {
                for (var key in module) {
                    namespace[key] = module[key];
                }
            }
        }
    }

    return namespace;
}



NEG.getQuery = function(name){

  var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

  if(result == null || result.length < 1){

    return "";

  }

  return result[1];

}