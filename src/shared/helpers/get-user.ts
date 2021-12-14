export function getUser(
  accessToken: string,
  refreshToken: string,
  profile: any,
) {
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
