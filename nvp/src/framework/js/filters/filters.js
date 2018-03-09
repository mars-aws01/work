(function() {

  angular.module("formatFilters", []).filter("menuLocalize", [
    "context", function(context) {
      return function(input) {
        if (!input) {
          return input;
        }
        return input[context.currentLanguage];
      };
    }
  ]).filter("isFuture", function() {
    return function(input) {
      return new Date(input) > new Date();
    };
  }).filter('moment', function() {
    return function(input, format) {
      if (typeof input === 'undefined') {
        return null;
      }
      return moment(input).format(format);
    };
  }).filter("line", function() {
    return function(input) {
      if (!input) {
        return input;
      }
      return input.replace(/\n/g, '<br />');
    };
  }).filter('fileSize', function() {
    return function(bytes) {
      if (bytes === null || bytes === void 0) {
        return bytes;
      }
      if (typeof bytes !== 'number') {
        return '';
      }
      if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
      }
      if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
      }
      return (bytes / 1000).toFixed(2) + ' KB';
    };
  }).filter('fromNow', function() {
    return function(input) {
      if (input === null) {
        return;
      }
      if (input === void 0) {
        return;
      }
      return moment(input).fromNow();
    };
  });

}).call(this);
