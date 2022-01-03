import friendModel from "@/models/friend";

export class userService {
  static getFriends(userID: number) {
    return friendModel.getFriends(userID);
  }
}
