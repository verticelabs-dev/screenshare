
export interface User {
  id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  full_name: string | undefined;
  created_at: string | undefined;
  deleted_at: string | undefined;
  updated_at: string | undefined;
}

export interface UserFriends {
  status: number | undefined;
  user_id: number | undefined;
  friend_id: number | undefined;
  status_name: string | undefined;
  user_full_name: string | undefined;
  friend_full_name: string | undefined;
}
