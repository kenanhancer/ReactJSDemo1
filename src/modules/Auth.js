export default class Auth {
  
  //auth{ Authorization: `Bearer xyz` sessionKey:`xyz` }
  //{ token: aresp.data.token, session: response.data.session, Locale:'tr' }
  static login(auth) {
    localStorage.setItem('auth', auth);
  }

  static isLoggedIn() {
    let auth = localStorage.getItem('auth');
    //console.log('is authenticated user '+(token !== null)+' '+token);
    return auth !== null;
    //return false;
  }

  // to do
  static isAdmin() {
    return true;
  }

  static getUserLocale() {
    let auth = localStorage.getItem('auth');
    if (auth)
      return 'tr';//auth.Locale || 'tr';
    else
      return 'tr';
  }
// to do
  static getLocalCurrency() {
    return 'TRY';
  }

  static logout() {
    localStorage.removeItem('auth');
  }

  static getAuth() {
    return localStorage.getItem('auth');
  }

}

