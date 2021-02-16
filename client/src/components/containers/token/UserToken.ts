export class UserToken {
    static LoginToken(token:string) {
        localStorage.setItem('userToken',token)
    }

    static isLogin():string|null {
        return localStorage.getItem('userToken')
    }

    static logout() {
        localStorage.removeItem('userToken')
    }
}