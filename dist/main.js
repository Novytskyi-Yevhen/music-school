"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const filters_1 = require("./common/filters");
const main_module_1 = require("./main.module");
const session = require("express-session");
require('dotenv').config();
const port = process.env.APP_PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(main_module_1.MainModule);
    app.useGlobalFilters(new filters_1.HttpErrorFilter(new common_1.Logger()));
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
    await app.listen(port, () => console.log(`This server is started on ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map