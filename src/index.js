'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * React Facebook Pixel Module
 *
 * @package react-facebook-pixel
 * @author  Zain Sajjad <zsajjad@fetchsky.com>
 */

//
var initialized = false;
var debug = false;

/**
 * Utilities
 */

var verifyInit = function verifyInit() {
  if (!initialized) {
    console.warn('Pixel not initialized before using call ReactPixel.init with required params');
  }
  return initialized;
};

//
var log = function log() {
  var _console;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console = console).info.apply(_console, _toConsumableArray(['[react-facebook-pixel]'].concat(args)));
};

//
var defaultOptions = {
  autoConfig: true,
  debug: false
};

//
exports.default = {
  init: function init(pixelId) {
    var advancedMatching = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;

    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;n.push = n;n.loaded = !0;n.version = '2.0';
      n.queue = [];t = b.createElement(e);t.async = !0;
      t.src = v;s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    if (!pixelId) {
      console.warn('Please insert pixel id for initializing');
    } else {
      if (options.autoConfig === false) {
        fbq('set', 'autoConfig', false, pixelId); // eslint-disable-line no-undef
      }

      fbq('init', pixelId, advancedMatching); // eslint-disable-line no-undef

      initialized = true;
      debug = options.debug;
    }
  },
  pageView: function pageView() {
    if (!verifyInit()) {
      return;
    }

    fbq('track', 'PageView'); // eslint-disable-line no-undef

    if (debug) {
      log('called fbq(\'track\', \'PageView\');');
    }
  },
  track: function track(title, data) {
    if (!verifyInit()) {
      return;
    }

    fbq('track', title, data); // eslint-disable-line no-undef

    if (debug) {
      log('called fbq(\'track\', \'' + title + '\');');

      if (data) {
        log('with data', data);
      }
    }
  },
  trackCustom: function trackCustom(event, data) {
    if (!verifyInit()) {
      return;
    }

    fbq('trackCustom', event, data); // eslint-disable-line no-undef

    if (debug) {
      log('called fbq(\'trackCustom\', \'' + event + '\');');

      if (data) {
        log('with data', data);
      }
    }
  },
  fbq: function (_fbq) {
    function fbq() {
      return _fbq.apply(this, arguments);
    }

    fbq.toString = function () {
      return _fbq.toString();
    };

    return fbq;
  }(function () {
    if (!verifyInit()) {
      return;
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    fbq.apply(undefined, args); // eslint-disable-line no-undef

    if (debug) {
      log('called fbq(\'' + args.slice(0, 2).join('\', \'') + '\')');

      if (args[2]) {
        log('with data', args[2]);
      }
    }
  })
};
