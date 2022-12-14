import sequelize from "../../database.js";
import * as userRepository from "../user/user.repository.js";
import { DataTypes } from "sequelize";

export const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(userRepository.User);

export const getAllTweets = async () => {
  return Tweet.findAll({
    attributes: ["id", "text", "createdAt"],
    include: {
      model: userRepository.User,
      attributes: ["id", "username"],
    },
    order: [["createdAt", "DESC"]],
  });
};

export const getAllTweetsByUsername = async (username) => {
  return Tweet.findAll({
    attributes: ["id", "text", "createdAt"],
    include: {
      model: userRepository.User,
      attributes: ["id", "username"],
      where: {
        username,
      },
    },
    order: [["createdAt", "DESC"]],
  });
};

export const getTweetById = async (id) => {
  return Tweet.findOne({
    attributes: ["id", "text", "createdAt"],
    include: {
      model: userRepository.User,
      attributes: ["id", "username"],
    },
    where: {
      id,
    },
  }).then((data) => data.dataValues);
};

export const createTweet = async (text, userId) => {
  return Tweet.create({ text, userId }).then((data) => data.dataValues);
};

export const updateTweet = async (id, text) => {
  Tweet.update(
    {
      text,
    },
    {
      where: {
        id,
      },
    }
  );
};

export const deleteTweet = async (id) => {
  Tweet.destroy({
    where: {
      id,
    },
  });
};
