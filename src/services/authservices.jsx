import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../helper/handle-response";
import { authHeader } from "../helper/auth-header";
import Config from "../config";
const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem("currentUser"))
);
export const Authservices = {
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
    loginWithPassword,
    logout,
    getRequestedClient
}

function loginWithPassword(UserName, Password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserName, Password }),
    };
    return fetch(`${Config.SERVER_URL}/auth/LoginWithPassword`, requestOptions)
        .then(handleResponse)
        .then(async (user) => {
            localStorage.setItem("currentUser", JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

async function logout() {
    currentUserSubject.next(null);
    localStorage.removeItem("currentUser");
    window.location.href = "/";
}

function getRequestedClient() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),

    };
    return fetch(`${Config.SERVER_URL}/auth/GetRequestedUserData`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}