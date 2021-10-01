import React,{useState,useEffect} from 'react'
import {Button,Typography} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import API from "@aws-amplify/api";
import {getUwcssaJob} from "../../graphql/queries"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    textAlign: "left",
    margin: "4rem",
    color: "#687988",
  },
  intro: {
    color: "#82919C",
  },
  body: {
    color: "#82919C",
    paddingLeft: "1.5rem",
  }
}));

export default function JobDetail(props) {
  const classes = useStyles();
  const {id} = props.match.params
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const jobData = await API.graphql({
        query: getUwcssaJob,
        variables: {id: id},
        authMode: "AWS_IAM",
      });
      const job = jobData.data.getUwcssaJob;
      console.log("jobData", jobData);
      setJob(job);
    } catch (error) {
      console.log("error on fetching Job", error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">{job.title}</Typography><br />
      <Typography variant="body1" className={classes.intro}>{job.introduction}</Typography><br />
      <Typography variant="h6">REQUIREMENTS:</Typography><br />
      {job.requirements?job.requirements.map((requirement,index) => {
        return (
          <div key={index}>
            <li className={classes.body}>{requirement}</li>
          </div>
        )
      }):""}
      <br />
      <Typography variant="h6">SCHEDULE:</Typography><br />
      {job.Schedule?job.Schedule.map((schedule,index) => {
        return (
          <div key={index}>
            <li className={classes.body}>{schedule}</li>
          </div>
        )
      }):""}
      <br />
      <Typography variant="h6">BENEFITS:</Typography><br />
      {job.Benefits?job.Benefits.map((benefit,index) => {
        return (
          <div key={index}>
            <li className={classes.body}>{benefit}</li>
          </div>
        )
      }):""}
      <br />
      <Typography variant="h6">BONUS:</Typography><br />
      {job.Bonus?job.Bonus.map((bonus,index) => {
        return (
          <div key={index}>
            <li className={classes.body}>{bonus}</li>
          </div>
        )
      }):""}
      <br />
      <Button variant="outlined" color="primary" to={`/career/applyJob/${job.id}`} component={Link}>
        申请
      </Button>
    </div>
  )
}