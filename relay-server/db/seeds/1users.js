const argon2 = require("argon2");

exports.seed = async function (knex) {
  let password = await argon2.hash("password", { type: argon2.argon2i });

  return knex("users").insert([
    {
      id: 1,
      password,
      username: "gdelamar",
      email: "test@test.com",
      first_name: "Grey",
      last_name: "Delamar",
      full_name: "Grey Delamar",
    },
    {
      id: 2,
      password,
      username: "tmoorlag",
      email: "test1@test.com",
      first_name: "Travier",
      last_name: "Moorlag",
      full_name: "Travier Moorlag",
    },
    {
      id: 3,
      password,
      username: "codyJay",
      email: "test2@test.com",
      first_name: "Cody",
      last_name: "Jay",
      full_name: "Cody Jay",
    },
  ]);
};
