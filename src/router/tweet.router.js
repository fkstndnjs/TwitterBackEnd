import express from "express";
import * as tweetController from "../controller/tweet.data.js";

const tweetRouter = express.Router();

// 전체 조회
tweetRouter.get("/", (req, res) => {
    const { username } = req.query;
    const tempTweets = username
        ? tweetRepository.getAllTweetsByUsername(username)
        : tweetRepository.getAllTweets();

    res.status(200).json(tempTweets);
});

// 상세 조회
tweetRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const tweet = tweetRepository.getTweetById(id);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
});

// 트윗 생성
tweetRouter.post("/", (req, res) => {
    tweetRepository.createTweet(req.body);

    res.sendStatus(201);
});

// 트윗 수정
tweetRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = tweetRepository.updateTweet(id, text);

    if (tweet) {
        tweet.text = text;

        res.status(200).json(tweet);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
});

// 트윗 삭제
tweetRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deleteResult = tweetRepository.deleteTweet(id);

    if (deleteResult) {
        res.sendStatus(204);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
});

export default tweetRouter;
