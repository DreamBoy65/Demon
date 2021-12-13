module.exports = (client, res, req) => {
  const user = client.users.cache.get(res.vote.user)
  console.log(user)
}