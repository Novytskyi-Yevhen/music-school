"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.HTTPLogger = void 0;
const common_1 = require("@nestjs/common");
let HTTPLogger = class HTTPLogger {
    constructor() {
        this.logger = new common_1.Logger('HTTPLogger');
    }
    use(request, response, next) {
        const { ip, method } = request;
        const userAgent = request.get('user-agent') || '';
        let send = response.send;
        response.send = (body) => {
            if (body !== undefined && typeof body === 'object' && body.errorName) {
                response.send = send;
                return response.send(body);
            }
            if (body === undefined) {
                body = { body: undefined };
            }
            const { statusCode } = response;
            const { buffer } = body, bodyWithoutBuffer = __rest(body, ["buffer"]);
            this.logger.log(`${method} ${request.url} Status code: ${statusCode} - User agent: ${userAgent} IP: ${ip} \n Request body: ${JSON.stringify(request.body)} Query: ${JSON.stringify(request.query)} Params: ${JSON.stringify(request.params)} ${`\n Response body: ${bodyWithoutBuffer}`}`);
            response.send = send;
            return response.send(body);
        };
        next();
    }
};
HTTPLogger = __decorate([
    (0, common_1.Injectable)()
], HTTPLogger);
exports.HTTPLogger = HTTPLogger;
//# sourceMappingURL=http.logger.js.map