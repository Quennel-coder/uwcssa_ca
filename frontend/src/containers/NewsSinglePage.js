import React, { Fragment, useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "../components/news_components/newssinglepage/NewsSinglePage.css";

const NewsSinglePage = ({ isAuthenticated, user }) => {
  const { article_id } = useParams();

  const [singleNewsData, setsingleNewsData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/news/article/${article_id}`)
      .then((response) => {
        setsingleNewsData(
          <Fragment>
            <div className="newssingle-title">{response.data.subject}</div>
            <div className="newssingle-info-share">
              <Link>
                <i class="fab fa-weixin"></i>
              </Link>
              <Link>
                <i class="fab fa-weibo"></i>
              </Link>
              <Link>
                <i class="fab fa-facebook"></i>
              </Link>
            </div>
            <div className="newssingle-post-info">
              <ul>
                <li>By: {response.data.created_by}</li>
                <li>Post at: {response.data.created_at}</li>
                <li>Last Update: {response.data.updated_at}</li>
              </ul>
            </div>
            <div className="newssingle-main-pic">
              <img src={response.data.image} alt="" />
            </div>
            <div className="newssingle-content">
              <pre>{response.data.content}</pre>
            </div>
          </Fragment>,
        );
      });
  }, []);

  const logInBar = (
    <div className="newssingle-login">
      <div className="newssingle-login-inner">
        <span>The comment section is now closed. Please </span>
        <span>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </span>
        <span>or </span>
        <span>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </span>
      </div>
    </div>
  );

  const [singleNewsCommentData, setsingleCommentNewsData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/news/articlecommentsingle_list/${article_id}`)
      .then((response) => {
        setsingleCommentNewsData(
          response.data.results.map((newscommentitem, index) => (
            <Fragment>
              <div className="newssingle-comments-box">
                <div className="newssingle-comments-box-head">
                  {newscommentitem.created_by}| {newscommentitem.created_at}
                </div>
                <div className="newssingle-comments-box-content">
                  {newscommentitem.comment}
                </div>
                <div className="newssingle-comments-box-footer">
                  <button>Reply</button>
                  <div></div>
                  <button>Share</button>
                  <button>Like</button>
                </div>
              </div>
            </Fragment>
          )),
        );
      });
  }, []);

  const [inputField, setInputField] = useState({
    comment: "",
  });

  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const submitButton = () => {
    // alert(inputField.comment);
    axios.post(
      `http://127.0.0.1:8000/news/articlecomment_create/`,
      {
        comment: inputField.comment,
        article_id: article_id,
        created_by_id: user.id,
      },
      config,
    );
    window.location.reload();
  };

  console.log(localStorage.getItem("access"));

  return (
    <Fragment>
      <div className="newssingle-main-container">
        {singleNewsData}
        <div className="newssingle-comment">
          {isAuthenticated ? "" : logInBar}
          <div className="newssingle-comments">
            <div className="newssingle-comments-header">
              All comments 53 total number need to be added
            </div>
            {singleNewsCommentData}
          </div>
          <div className="newssingle-comments-post">
            <input
              type="text"
              name="comment"
              onChange={inputsHandler}
              placeholder="comment"
              value={inputField.comment}
            />
            <button onClick={submitButton}>Submit Now</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(NewsSinglePage);
