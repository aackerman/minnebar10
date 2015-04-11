import jQuery from 'jquery';
import _ from 'lodash';

var STRING_CAMELIZE_REGEXP = (/(\-|_|\.|\s)+(.)?/g);

let camelize = (key) => {
  return key.replace(STRING_CAMELIZE_REGEXP, function(match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(/^([A-Z])/, function(match, separator, chr) {
    return match.toLowerCase();
  });
}

class Adapter {
  constructor(options) {
    var options     = options || {};
    this.namespace  = options.namespace;
    this.host       = options.host;
    this.beforeSend = options.beforeSend;
  }

  request(url, type, options) {
    return new Promise((resolve, reject) => {
      var hash = this.requestOptions(url, type, options);

      hash.beforeSend = (options && options.beforeSend) || this.beforeSend;

      hash.success = function(json, textStatus, jqXHR) {
        json = this.requestSuccess(jqXHR, json);
        resolve(json);
      };

      hash.error = function(jqXHR, textStatus, errorThrown) {
        reject(this.requestError(jqXHR, jqXHR.responseText, errorThrown));
      };

      jQuery.ajax(hash);
    });
  }

  urlPrefix(path, parentURL) {
    var host = this.host;
    var namespace = this.namespace;
    var url = [];

    if (path) {
      // Absolute path
      if (path.charAt(0) === '/') {
        if (host) {
          path = path.slice(1);
          url.push(host);
        }
      // Relative path
      } else if (!/^http(s)?:\/\//.test(path)) {
        url.push(parentURL);
      }
    } else {
      if (host) { url.push(host); }
      if (namespace) { url.push(namespace); }
    }

    if (path) {
      url.push(path);
    }

    return url.join('/');
  }

  buildURL(type, id, record) {
    var url = [],
        host = this.host,
        prefix = this.urlPrefix();

    if (type) { url.push(this.pathForType(type)); }
    if (id && !Array.isArray(id)) { url.push(encodeURIComponent(id)); }
    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }

  requestSuccess(jqXHR, jsonPayload) {
    return jsonPayload;
  }

  requestError(jqXHR, responseText, errorThrown) {
    var isObject = jqXHR !== null && typeof jqXHR === 'object';

    if (isObject) {
      jqXHR.then = null;
      if (!jqXHR.errorThrown) {
        if (typeof errorThrown === 'string') {
          jqXHR.errorThrown = new Error(errorThrown);
        } else {
          jqXHR.errorThrown = errorThrown;
        }
      }
    }

    return jqXHR;
  }

  requestOptions(url, type, options) {
    var hash = options || {};
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    hash.context = this;

    if (hash.data && type !== 'GET') {
      hash.contentType = 'application/json; charset=utf-8';
      hash.data = JSON.stringify(hash.data);
    }

    return hash;
  }

  find(typeKey, params) {
    // find all if only type key is provided
    if ( _.isUndefined(params) ) {
      return this.findAll(typeKey);
    }

    // find one if a number or string id is provided
    if ( _.isNumber(params) || _.isString(params) ) {
      return this.findOne(typeKey, params);
    }

    // find by query if an object is provided
    if ( _.isPlainObject(params) ) {
      return this.findQuery(typeKey, params);
    }

    throw new Error('Invalid input for find', typeKey, params);
  }

  pathForType(type) {
    return camelize(type);
  }

  findOne(typeKey, id) {
    return this.request(this.buildURL(typeKey, id), 'GET');
  }

  findAll(typeKey) {
    return this.request(this.buildURL(typeKey), 'GET');
  }

  findQuery(typeKey, query) {
    return this.request(this.buildURL(typeKey), 'GET', { data: query });
  }

  create(typeKey, params) {
    return this.request(this.buildURL(typeKey), 'POST', { data: params });
  }

  update(typeKey, id, params) {
    return this.request(this.buildURL(typeKey, id), 'PUT', { data: params });
  }

  destroy(typeKey, id) {
    return this.request(this.buildURL(typeKey, id), 'DELETE');
  }
}

export default Adapter;
