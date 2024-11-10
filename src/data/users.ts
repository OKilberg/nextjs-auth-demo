type User = {
  name: string;
  password: string;
};

type Users = {
  [key: string]: User;
};

export let users: Users = {
  testUser: {
    name: "testUser",
    password: "test1234",
  },
};

const getUser = (username: string) => {
  const user = users[username];

  return user;
};

export const registerUser = (username: string, password: string) => {
  const user = getUser(username); // check if user exists
  if (!user) {
    users[username] = { name: username, password }; // Add user

    console.log(users);
    return true;
  }

  return false;
};

export const getHasCorrectLoginCredentials = (
  username: string,
  password: string
) => {
  console.log(users);
  const user = getUser(username);

  if (user) {
    const hasCorrectLoginCredentials = password === user.password;

    return hasCorrectLoginCredentials;
  }

  return false;
};
