var RequestRecorder = /** @class */ (function () {
    function RequestRecorder() {
        this.recording = false;
        this.requests = [];
        this.idByVar = {};
        this.varById = {};
        this.keepRequestCallback = function () { return true; };
        this.expectPropertyCallback = function () { };
        this.headerCallback = function (_headerName, headerValue) { return headerValue; };
    }
    RequestRecorder.prototype.requestInterceptor = function () {
        var _this = this;
        return {
            request: function (req) {
                if (!_this.recording) {
                    return req;
                }
                var extendedRequest = req;
                extendedRequest._maxCaptureIndex = Object.keys(_this.idByVar).length - 1;
                if (req.method === 'POST' || req.method === 'PUT') {
                    try {
                        extendedRequest.clone().json().then(function (jsonBody) {
                            extendedRequest._jsonBody = jsonBody;
                        });
                    }
                    catch (e) {
                        // do nothing
                    }
                }
                return req;
            },
            response: function (res, req) {
                if (!_this.recording) {
                    return res;
                }
                var extendedRequest = req;
                var currentRequest = new RecordedRequest();
                currentRequest.maxCaptureIndex = extendedRequest._maxCaptureIndex || 0;
                currentRequest.rawUrl = req.url;
                currentRequest.testUrl = req.url.replace(_this.host, '');
                currentRequest.method = req.method;
                req.headers.forEach(function (val, key) { if (typeof key === 'string')
                    currentRequest.rawHeaders[key] = val; });
                var testBody = '';
                if (extendedRequest._jsonBody) {
                    currentRequest.rawBody = extendedRequest._jsonBody;
                    testBody = currentRequest.rawBody ? JSON.stringify(currentRequest.rawBody) : '';
                }
                for (var varName in _this.idByVar) {
                    var reg = new RegExp(_this.idByVar[varName], 'gm');
                    currentRequest.testUrl = currentRequest.testUrl.replace(reg, "{{\u00A0" + varName + "\u00A0}}");
                    if (testBody)
                        testBody = testBody.replace(reg, "{{\u00A0" + varName + "\u00A0}}");
                }
                if (testBody)
                    currentRequest.testBody = JSON.parse(testBody);
                var currentResponse = new RecordedResponse();
                currentResponse.statusCode = res.status;
                currentResponse.statusText = res.statusText;
                res.headers.forEach(function (val, key) { if (typeof key === 'string')
                    currentResponse.headers[key] = val; });
                currentRequest.response = currentResponse;
                if (res.status !== 201 && currentResponse.headers['content-type'] && currentResponse.headers['content-type'].indexOf('application/json') !== -1) {
                    res.clone().json().then(function (value) {
                        currentResponse.data = value;
                        currentRequest.captures["\"$\""] = "\"response\"";
                        if (Array.isArray(value)) {
                            currentResponse.type = 'array';
                            for (var index = 0; index < value.length; index++) {
                                var item = value[index];
                                if (item.id && !_this.varById[item.id]) {
                                    var varName = "capture_" + Object.keys(_this.idByVar).length;
                                    _this.idByVar[varName] = item.id;
                                    _this.varById[item.id] = varName;
                                    currentRequest.captures["\"$." + index + ".id\""] = "\"" + varName + "\"";
                                }
                            }
                        }
                        else if (value.id && !_this.varById[value.id]) {
                            var varName = "capture_" + Object.keys(_this.idByVar).length;
                            _this.idByVar[varName] = value.id;
                            _this.varById[value.id] = varName;
                            currentRequest.captures["\"$.id\""] = "\"" + varName + "\"";
                        }
                        if (value.token) {
                            currentRequest.captures['"$.token"'] = "\"token\"";
                        }
                    });
                }
                setTimeout(function () {
                    _this.setRequestHeaders(currentRequest);
                    _this.setRequestExpectations(currentRequest);
                }, 500);
                _this.requests.push(currentRequest);
                return res;
            }
        };
    };
    RequestRecorder.prototype.setRequestHeaders = function (request) {
        for (var key in request.rawHeaders) {
            var headerValue = this.headerCallback(key, request.rawHeaders[key]);
            if (headerValue !== null) {
                request.testHeaders[key] = headerValue;
            }
        }
    };
    RequestRecorder.prototype.setRequestExpectations = function (request) {
        request.expectStatusCode = true;
        request.expectProperties = [];
        request.keep = this.keepRequestCallback(request);
        if (!request.response.data)
            return;
        if (request.response.type === 'array') {
            request.expectProperties['response.length'] = request.response.data.length;
        }
        else if (Object.keys(request.response.data).length > 0) {
            for (var key in request.response.data) {
                var keyVal = request.response.data[key];
                var expect_1 = {
                    key: key,
                    prop: "{{ response." + key + " }}",
                    type: 'exact'
                };
                if (typeof keyVal === 'string') {
                    if (this.varById[keyVal]) {
                        // just need to make sure it is not a capture from this request
                        var ok = true;
                        var index = 0;
                        for (var capture in request.captures) {
                            if (request.captures[capture] === "\"" + this.varById[keyVal] + "\"") {
                                ok = false;
                                break;
                            }
                            if (index > request.maxCaptureIndex) {
                                ok = false;
                                break;
                            }
                            index++;
                        }
                        if (ok) {
                            expect_1.capturedValue = "\"{{\u00A0" + this.varById[keyVal] + " }}\"";
                        }
                    }
                    expect_1.originalValue = "\"" + keyVal + "\"";
                    expect_1.expectedValue = "\"" + keyVal + "\"";
                    expect_1.type = expect_1.capturedValue ? 'captured' : 'exact';
                }
                else if (typeof keyVal === 'number') {
                    expect_1.originalValue = "" + keyVal;
                    expect_1.expectedValue = "" + keyVal;
                }
                else {
                    expect_1.type = 'has';
                }
                this.expectPropertyCallback(expect_1);
                request.expectProperties.push(expect_1);
            }
        }
    };
    RequestRecorder.prototype.handleEvent = function (event) {
        if (this.recording) {
            this.stop();
        }
        else {
            this.start();
        }
    };
    RequestRecorder.prototype.start = function () {
        this.recording = true;
    };
    RequestRecorder.prototype.stop = function () {
        this.recording = false;
    };
    RequestRecorder.prototype.toggle = function () {
        this.recording = !this.recording;
    };
    return RequestRecorder;
}());
export { RequestRecorder };
var RecordedRequest = /** @class */ (function () {
    function RecordedRequest() {
        this.rawHeaders = {};
        this.testHeaders = {};
        this.captures = {};
        this.keep = true;
        this.expectStatusCode = true;
        this.expectProperties = [];
        this.maxCaptureIndex = 0;
    }
    return RecordedRequest;
}());
export { RecordedRequest };
var RecordedResponse = /** @class */ (function () {
    function RecordedResponse() {
        this.headers = {};
    }
    return RecordedResponse;
}());
export { RecordedResponse };
