const express = require("express");
const router = express.Router();
const { protect, isAuthor } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults")
const {
    SampleCode,
    postNewComment,
    postNewReply,
    deleteComment,
    getAllComments,
    editComment,
    deleteReply,
    allPosts,
    onePost,
    getMyPosts,
    createNewPost,
    deletePost,
    editPost,
    editContent
} = require("../controllers/blog");
const Post = require("../model/post");


router.get("/test", SampleCode);
router.get("/posts", advancedResults(Post), allPosts);
router.get("/post/:url", onePost);
router.get("/post/manage", protect, getMyPosts);
router.post("/post/create", protect, createNewPost);
router.delete("/post/delete/:id", protect, isAuthor(Post), deletePost);
router.put("/post/edit/:id", protect, isAuthor(Post), editPost);
router.put("/post/edit/content/:id", protect, isAuthor(Post), editContent);

router.get("/comment/:postid", getAllComments);
router.post("/comment/create/:postid", postNewComment);
router.put("/comment/edit/:id", editComment); // Comment can only be deleted so might be depercated  
router.delete("/comment/delete/:id", deleteComment);
router.delete("/comment/reply/delete/:id", deleteReply);
router.post("/comment/reply/:id", postNewReply);


// router.post("/leading/create/", SampleCode);
// router.put("/leading/edit/", SampleCode);


module.exports = router;