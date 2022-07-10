export const ErrorHandle = (str:string) => {
    switch (str) {
        case "auth/user-not-found":
            return "User with this email was not found!";
         case "auth/wrong-password":
            return "Password is wrong!"
        case "auth/popup-closed-by-user":
            return "You have closed the authorisation popup!"
        default:
            return "Something goes wrong"
    }
}