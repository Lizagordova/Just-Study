import { getCookie } from "./getCookie";

export function getToken() {
    return getCookie("token");
}