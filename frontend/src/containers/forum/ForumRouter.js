import { Route, Switch } from "react-router-dom";

import { Box } from "@mui/material";
import Footer from "../Footer";
import ForumHome from "./ForumHome";
import ForumPost from "./ForumPost";
import ForumPostUpload from "./ForumPostUpload";
import ForumSubTopic from "./ForumSubTopic";
import ForumTopic from "./ForumTopic";
import ForumTopicCURD from "./ForumTopicCURD";
import React from "react";

export default function ForumRouter() {
  return (
    <Box>
      <Switch>
        <Route exact path="/forum" component={ForumHome} />
        <Route
          exact
          path="/forum/admin/forumTopicCURD"
          component={ForumTopicCURD}
        />
        {/*这个应该放到staff里面或者别的什么地方，或者再开个forum admin */}
        <Route exact path="/forum/:forumTopicID" component={ForumTopic} />
        <Route
          exact
          path="/forum/:forumTopicID/:forumSubTopicID"
          component={ForumSubTopic}
        />
        <Route
          exact
          path="/forum/:forumTopicID/:forumSubTopicID/发布帖子"
          component={ForumPostUpload}
        />
        {/* 上下两个必须发布帖子在上 */}
        <Route
          exact
          path="/forum/:forumTopicID/:forumSubTopicID/:forumPostID"
          component={ForumPost}
        />
      </Switch>
      <Footer />
    </Box>
  );
}