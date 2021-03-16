System.register(["http", "aurelia-framework", "aurelia-event-aggregator"], function (exports_1, context_1) {
    "use strict";
    var http, aurelia_framework_1, aurelia_event_aggregator_1, IpStack;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (http_1) {
                http = http_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            }
        ],
        execute: function () {
            IpStack = /** @class */ (function () {
                function IpStack() {
                }
                IpStack.getApiKey = function () {
                    var config = aurelia_framework_1.Container.instance.get('aurelia-deco-config');
                    if (config && config.ipStack && config.ipStack.apiKey)
                        return config.ipStack.apiKey;
                    return '';
                };
                IpStack.autoDetect = function (apiKey) {
                    if (!apiKey)
                        apiKey = IpStack.getApiKey();
                    if (!apiKey)
                        throw new Error('Missing ipstack api key');
                    return IpStack.requester(apiKey);
                };
                IpStack.standard = function (ip, apiKey) {
                    return new Promise(function (resolve, reject) {
                        http.get({
                            hostname: 'api.ipstack.com',
                            port: 80,
                            path: "/" + ip + "?access_key=" + apiKey,
                            agent: false
                        }, function (res) {
                            var body = "";
                            res.on('data', function (data) {
                                body += data;
                            });
                            res.on('end', function () {
                                var parsedBody = JSON.parse(body);
                                var error = parsedBody.error;
                                if (error !== undefined) {
                                    reject(new Error(error.info));
                                }
                                else {
                                    aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator).publish('ipstack:standard', parsedBody);
                                    resolve(parsedBody);
                                }
                            });
                            res.on('error', function (err) {
                                reject(err);
                            });
                        });
                    });
                };
                IpStack.requester = function (apiKey) {
                    return new Promise(function (resolve, reject) {
                        http.get({
                            hostname: 'api.ipstack.com',
                            port: 80,
                            path: "/check?access_key=" + apiKey,
                            agent: false
                        }, function (res) {
                            var body = "";
                            res.on('data', function (data) {
                                body += data;
                            });
                            res.on('end', function () {
                                var parsedBody = JSON.parse(body);
                                var error = parsedBody.error;
                                if (error !== undefined) {
                                    reject(new Error(error.info));
                                }
                                else {
                                    aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator).publish('ipstack:requester', parsedBody);
                                    resolve(parsedBody);
                                }
                            });
                            res.on('error', function (err) {
                                reject(err);
                            });
                        });
                    });
                };
                return IpStack;
            }());
            exports_1("IpStack", IpStack);
        }
    };
});
