export default [
  "organizer",
  "user",
  "admType",
].map(name => {
  return {
    title: name,
    dataIndex: name,
    key: name,
  };
});
