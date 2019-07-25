const avatarUrl = "https://api.adorable.io/avatars/64/";

module.exports = () => ({
  speakers: [
    {
      id: "1",
      firstname: "Matt",
      lastname: "Reetz",
      title: "Software Engineer",
      company: "Headway",
      avatar: `${avatarUrl}matt`,
      biography: "Matt is a coding ninja.",
      email: "matt@headway.io"
    },
    {
      id: "2",
      firstname: "Tim",
      lastname: "Gremore",
      title: "Software Engineer",
      company: "Headway",
      avatar: `${avatarUrl}tim`,
      biography: "Tim is a coding wizard.",
      email: "tim@headway.io"
    }
  ]
});
