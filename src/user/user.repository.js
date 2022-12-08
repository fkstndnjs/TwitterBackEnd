let users = [];

export const findByUsername = async (username) => {
    return users.find((user) => user.username === username);
};

export const createUser = async (user) => {
    const createdUser = { id: users[length - 1]?.id + 1 || 1, ...user };

    users.push(createdUser);

    return createdUser;
};
