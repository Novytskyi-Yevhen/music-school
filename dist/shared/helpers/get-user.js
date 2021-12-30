"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
function getUser(accessToken, refreshToken, profile) {
    const { name, emails, id, displayName, provider } = profile;
    return {
        socialId: id,
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        name: displayName || name.givenName + ' ' + name.familyName,
        accessToken,
        refreshToken,
        provider
    };
}
exports.getUser = getUser;
//# sourceMappingURL=get-user.js.map