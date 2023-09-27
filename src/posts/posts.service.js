const knex = require("../db/connection");

function create(post) {
  return knex("posts as p")
    .insert(post)
    .returning("*")
    .then((createdPost) => createdPost[0]);
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

function update(updatedPost) {
  const { postId, ...restUpdatedPost } = updatedPost;
  return knex("posts as p")
    .where({ "p.post_id": postId })
    .update(restUpdatedPost)
    .returning("*")
    .then((updatedPosts) => updatedPosts[0]);
}

function destroy(postId) {
  return knex("posts as p").where({ "p.post_id": postId }).delete();
}


module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
