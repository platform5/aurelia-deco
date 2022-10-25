var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "aurelia-router", "aurelia-framework", "aurelia-resources", "aurelia-framework"], function (require, exports, aurelia_router_1, aurelia_framework_1, aurelia_resources_1, aurelia_framework_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthenticationControl = void 0;
    var AuthenticationControl = /** @class */ (function () {
        function AuthenticationControl(router, container) {
            var _this = this;
            this.router = router;
            this.container = container;
            this.active = true;
            this.notAuthenticated = function () { };
            this.notAuthenticatedRoute = 'login';
            this.onlyForAuthRoutes = false; // if true, the redirect only happens when the route has the settings {auth: true}
            this.notAuthenticated = function () { return __awaiter(_this, void 0, void 0, function () {
                var sdGlobal, instruction, isAuthRoute, t, p, params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.router.ensureConfigured()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _a.sent();
                            sdGlobal = this.container.get('sd-global');
                            return [4 /*yield*/, sdGlobal.isReady()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, sdGlobal.logout()];
                        case 4:
                            _a.sent();
                            instruction = this.router.currentInstruction;
                            isAuthRoute = instruction.config.settings && instruction.config.settings.auth;
                            if (!isAuthRoute && this.onlyForAuthRoutes) {
                                return [2 /*return*/];
                            }
                            t = instruction.config.name;
                            p = instruction.params ? btoa(JSON.stringify(instruction.params)) : '';
                            params = {};
                            if (p) {
                                params.p = p;
                            }
                            if (t) {
                                params.t = t;
                            }
                            this.router.navigateToRoute('login', params);
                            return [2 /*return*/];
                    }
                });
            }); };
        }
        AuthenticationControl.prototype.responseInterceptor = function () {
            var _this = this;
            return {
                request: function (req) {
                    return req;
                },
                response: function (res, req) { return __awaiter(_this, void 0, void 0, function () {
                    var json, errors, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.active) {
                                    return [2 /*return*/, res];
                                }
                                if (!(res.status === 500)) return [3 /*break*/, 4];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, res.clone().json()];
                            case 2:
                                json = _a.sent();
                                errors = [
                                    'Token not found',
                                    'Token has expired'
                                ];
                                if (json && json.error && errors.includes(json.error) && !req.url.includes('/validate')) {
                                    // notify('Please login again to continue');
                                    this.debounceLoginAgainMessage();
                                    this.notAuthenticated();
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/, res];
                        }
                    });
                }); }
            };
        };
        AuthenticationControl.prototype.debounceLoginAgainMessage = function () {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            this.debounceTimeout = setTimeout(function () {
                aurelia_resources_1.notify('Please login again to continue');
            }, 20);
        };
        AuthenticationControl = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router, aurelia_framework_2.Container)
        ], AuthenticationControl);
        return AuthenticationControl;
    }());
    exports.AuthenticationControl = AuthenticationControl;
});
