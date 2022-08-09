const host = '';
const prefix = 'api/v1';

const routes = {
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
  homePage: () => '/',
  notFoundPage: () => '*',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
};

export default routes;
