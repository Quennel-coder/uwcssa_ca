import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Card from "../components/card/Card";
import HomeTickers from "../components/home_components/HomeTickers";
const Home = () => (
  <Fragment>
    {/* <h1 className="home">Home</h1>
      <Card 
      apiAddress='http://127.0.0.1:8000/news/article_list/'
      index='0'
      />
      <Card 
      apiAddress='http://127.0.0.1:8000/news/article_list/'
      index='1'
      /> */}
    <HomeTickers />
  </Fragment>
);

export default Home;
