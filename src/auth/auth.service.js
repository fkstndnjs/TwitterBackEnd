import * as userRepository from "../user/user.repository.js";

const jwtSecretKey = "secret";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export const signup = (req, res, next) => {
    const { username, password, name, email } = req.body;
    const user = userRepository.findByUsername(username);

    // 이미 가입된 유저일 경우
    if (user) {
        return res.status(409).json({ message: `이미 가입된 유저입니다.` });
    }
};

export const login = (req, res, next) => {};
