export default [
  "firstName",
  "lastName",
  "nickName",
  "avatar",
  "email",
  "phone",
  "userType",
  "emailState",
  "emailCode",
  "biography",
  "awards",
  "createdAt",
  "rowState",
].map(name => {
  return {
    title: name,
    dataIndex: name,
    key: name,
  };
});
