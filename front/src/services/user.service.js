import http from "../http-common";

class UserDataService {
    getUser(id){
        return http.get(`/user/${id}`);
    }

    // create(data) {
    //     http.post("/auth/signup", data)
    // }

}