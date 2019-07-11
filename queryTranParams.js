'use strict';

/**
 * @author          heiyehk
 * @email           heiyehk@foxmail.com
 * @description     这个是用来query和params互转的
 */

;(function (undefined) {
    "use strict";

    /**
     * 
     * 使用样例
     * const testQuery = 'to=undefined&filterEmpty=true&aa=&bb=0&cc=null&dd=123'
     * const testParams = {
     *     to: "obj123231ect",
     *     filterEmpty: true,
     *     aa: '',
     *     bb: 0,
     *     cc: null,
     *     cc: undefined
     * }
     * 
     * const qtp = new qtp(bb, {
     *     to: 'query',
     *     ignore: false
     * });
     * 
     * qtp.backData
     * 
     */

    var _global;

    // 工具函数
    // 对象合并
    function extend(o, n, override) {
        for (var key in n) {
            if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                o[key] = n[key];
            }
        }
        return o;
    }

    // 插件构造函数 - 返回数组结构
    function queryTranParams(content, options) {
        this.init(content, options);
    }

    queryTranParams.prototype = {
        constructor: this,
        /**
         * 
         * @param {String | Object} content 必选
         * @param {Object} options {
         *                          @param {String} to 必选,可选参数,params or query,
         *                          @param {Boolean} ignore 非必选,可选参数,true or false
         *                      }
         */
        init: function init(content, options) {
            // 默认参数
            var defCfg = {
                ignore: true
            };

            //必选content
            if (!content) {
                throw 'queryTranParams ' + (!content && 'content') + ' is undefined';
            };

            this.defCfg = extend(defCfg, options, true); //配置参数

            if (this.defCfg.to === undefined) {
                throw 'options key \'to\' is undefined';
            };

            //判断需要使用哪个方法
            this.userFun(content);
        },
        userFun: function userFun(content) {
            if (this.defCfg.to === 'params') {
                this.backData = this.toParams(content);
            } else if (this.defCfg.to === 'query') {
                this.backData = this.toQuery(content);
            };
        },
        /**
         * 
         * @param {String | Object} data 
         * @return 返回你所需要的格式,在options.to中定义
         */
        toParams: function toParams(data) {
            if (typeof data === 'string') {
                var rtArr = this.queryToArray(data);
                var backObj = {};
                if (rtArr.length) {
                    for (var i = 0; i < rtArr.length; i++) {
                        var spArr = rtArr[i].split('=');
                        if (this.defCfg.ignore) {
                            if (spArr[1] !== '0' && spArr[1] !== 'null' && spArr[1] !== 'undefined' && spArr[1]) {
                                backObj[spArr[0]] = spArr[1];
                            };
                        } else {
                            backObj[spArr[0]] = spArr[1];
                        };
                    };
                } else {
                    var spArr = newDataStr.split('=')[0];
                    backObj[spArr[0]] = spArr[1];
                };
                return backObj;
            } else {
                if (this.defCfg.ignore) {
                    var backObj = {};
                    for (var value in data) {
                        if (data[value] && data[value].length && data[value][0]) {
                            backObj[value] = data[value];
                        };
                    };
                    return backObj;
                };
                return data;
            };
        },
        /**
         * 
         * @param {String | Object} data 
         * @return 返回你所需要的格式,在options.to中定义
         */
        toQuery: function toQuery(data) {
            if (typeof data === 'string') {
                if (this.defCfg.ignore) {
                    var rtArr = this.queryToArray(data);
                    var backStr = '';
                    if (rtArr.length) {
                        for (var i = 0; i < rtArr.length; i++) {
                            var spArr = rtArr[i].split('=');
                            if (spArr[1] !== '0' && spArr[1] !== 'null' && spArr[1] !== 'undefined' && spArr[1]) {
                                backStr += spArr[0] + '=' + spArr[1] + '&';
                            };
                        };
                    } else {
                        var spArr = newDataStr.split('=')[0];
                        backObj[spArr[0]] = spArr[1];
                    };
                    backStr = backStr.substr(0, backStr.length - 1);
                    return backStr;
                };
                return data;
            } else {
                var backStr = '';
                for (var _i in data) {
                    if (data[_i] !== '0' && data[_i] !== 'null' && data[_i] !== 'undefined' && data[_i]) {
                        backStr += '&' + _i + '=' + data[_i];
                    } else {
                        backStr += '&' + _i + '=' + data[_i];
                    };
                };
                if (backStr[0] === '&') backStr = backStr.substring(1, backStr.length);
                return backStr;
            }
        },
        /**
         * 
         * @param {String} data query转成后续所需要的Array数组
         * @return 返回一个Array数组
         */
        queryToArray: function queryToArray(data) {
            var newDataStr = data;
            if (newDataStr.indexOf('?') > -1) {
                newDataStr.replace('?', '');
            };
            var strArray = null;
            if (newDataStr.indexOf('&') > -1) {
                strArray = newDataStr.split('&');
            };
            return strArray;
        }
    };

    // 最后将插件对象暴露给全局对象
    _global = function () {
        return this || (0, eval)('this');
    }();
    if (typeof module !== "undefined" && module.exports) {
        module.exports = queryTranParams;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return queryTranParams;
        });
    } else {
        !('queryTranParams' in _global) && (_global.queryTranParams = queryTranParams);
    };
})();