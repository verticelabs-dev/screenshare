
import { db } from "@loaders/database";
import { UserFriends } from "src/models/user";

export class userService {
  static async getFriends(userID: number) {
    const friends: UserFriends[] = await db("user_relationships AS UR")
      .select('UR.status',
        'UR.user_id',
        'UR.friend_id',
        'UR_Status.name AS status_name',
        'User.full_name as user_full_name',
        'Friend.full_name as friend_full_name')
      .leftJoin('user_relationship_statuses AS UR_Status', 'UR.status', 'UR_Status.id')
      .leftJoin('users AS User', 'User.id', 'UR.user_id')
      .leftJoin('users AS Friend', 'Friend.id', 'UR.friend_id')
      .where("user_id", userID)
      .orWhere("friend_id", userID);

    return friends;
  }
}
