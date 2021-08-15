import React from "react";
import '../../App.css';
import Card from '../card/Card'
export default function Home() {
  return (
    <>
      <h1 className="home">Home</h1>
      <Card 
      apiAddress='http://127.0.0.1:8000/api/news/article_list/'
      index='0'
      />
      <Card 
      apiAddress='http://127.0.0.1:8000/api/news/article_list/'
      index='1'
      />
    </>
  );
}