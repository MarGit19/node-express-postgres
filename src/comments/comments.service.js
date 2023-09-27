const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
   return knex("comments as c")
  .join("users as u", "u.user_id", "c.commenter_id")
  .select("u.user_email as commenter_email")
  .count("comment_id")
  .groupBy("commenter_email")
  .orderBy("commenter_email")
}

function read(commentId) {
  return knex("comments")
    .select(
      "comments.comment_id",
      "comments.comment",
      "users.user_email as commenter_email",
      "posts.post_body as commented_post"
    )
    .join("users", "users.user_id", "comments.commenter_id")
    .join("posts", "posts.post_id", "comments.post_id")
    .where({ "comments.comment_id": commentId })
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
