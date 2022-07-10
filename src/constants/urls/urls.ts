export const HOME_PAGE = '/'
export const LOGIN_PAGE = '/login'
export const REGISTER_PAGE = '/register'
export const USER_STORE = (id:string) => `users/${id}/store`
export const USER_STORE_BY_ID = (userID:string , id:string) =>`/users/${userID}/store/${id}`