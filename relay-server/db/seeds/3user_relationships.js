exports.seed = async function (knex) {
  return knex("user_relationships").insert([
    {
      status: 2,
      user_id: 1,
      friend_id: 2,
    },
    {
      status: 2,
      user_id: 1,
      friend_id: 3,
    },
    {
      status: 1,
      user_id: 2,
      friend_id: 3,
    },
  ]);
};
