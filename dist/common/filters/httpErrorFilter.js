"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpErrorFilter = class HttpErrorFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const responseMessage = ((_a = exception.response) === null || _a === void 0 ? void 0 : _a.message) || (exception === null || exception === void 0 ? void 0 : exception.message);
        const statusCode = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const prodMessage = exception instanceof common_1.HttpException ? responseMessage : 'Internal server error';
        const devErrorResponse = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            errorName: exception === null || exception === void 0 ? void 0 : exception.name,
            message: responseMessage,
            body: request.body,
            query: request.query
        };
        const prodErrorResponse = {
            statusCode,
            message: prodMessage
        };
        const { errorName, message } = devErrorResponse, devErrorLog = __rest(devErrorResponse, ["errorName", "message"]);
        this.logger.log(`${JSON.stringify(devErrorLog)} \n ${exception === null || exception === void 0 ? void 0 : exception.stack}`, exception === null || exception === void 0 ? void 0 : exception.name);
        response.status(statusCode).json(process.env.MODE === 'dev' ? devErrorResponse : prodErrorResponse);
    }
};
HttpErrorFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_1.Logger])
], HttpErrorFilter);
exports.HttpErrorFilter = HttpErrorFilter;
//# sourceMappingURL=httpErrorFilter.js.map