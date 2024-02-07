//mock data to delete once API calls get added

export default function getMockUsers() {
  const mockUsers = [];
  const mockUsersNum = Math.floor(Math.random() * 40);

  const mockNames = [
    "testAcc1",
    "testAcc2",
    "reactDev",
    "GoLangFan",
    "TypescriptsCool",
    "DartIsBestLang",
    "FlutterFan",
    "ReactNative",
  ];

  const skills = [
    { name: "React" },
    { name: "Golang" },
    { name: "Flutter" },
    { name: "ruby on rails" },
    { name: "Dart" },
    { name: "graphql" },
    { name: "typescript" },
    { name: "javascript" },
    { name: "react native" },
  ];

  const statuses = ["accepted", "rejected", "applied"];

  for (let i = 0; i < mockUsersNum; i++) {
    const userData = { user: {} };
    const headShotKey =
      Math.random() > 0.5
        ? "https://www.ashevillenc.gov/wp-content/uploads/2019/03/Panda-pix.png"
        : null;
    userData.user.username =
      mockNames[Math.floor(Math.random() * mockNames.length)];
    userData.user.bio =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    userData.user.skills = skills.slice(
      0,
      Math.floor(Math.random() * skills.length)
    );
    userData.user.headshotKey = headShotKey;
    userData.user.id = i;
    userData.user.match = {
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };

    userData.user.status = mockUsers.push(userData);
  }
  return mockUsers;
}
