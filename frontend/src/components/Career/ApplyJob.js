import React,{ useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Button,Typography,Snackbar} from "@material-ui/core"
import { Checkbox,TextField,Grid, } from '@material-ui/core';
import {useSelector} from "react-redux"
import API from "@aws-amplify/api";
import Storage from "@aws-amplify/storage";
import {getUwcssaJob} from "../../graphql/queries"
import Alert from '@material-ui/lab/Alert';
import { v4 as uuid } from "uuid"
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {createUwcssaJobResume} from "../../graphql/mutations"


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: 'left',
    margin: "4rem",
  },
  input: {
    display: 'none',
  },
  form: {
    width: "16rem",
    marginTop: theme.spacing(1),
  },
  fileName: {
    paddingLeft: "1rem",
  }
}));

export default function ApplyJob(props) {
  const classes = useStyles();
  const {id} = props.match.params
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailure, setSubmitFailure] = useState(false);
  const [resume, setResume] = useState("");
  const userAuth = useSelector((state) => state.userAuth);
  
  const [applyData, setApplyData] = useState({
    job: "",
    applyname: "",
    applyemail: "",
    applyphone: "",
    resumePath: "",
  });

  useEffect(() => {
    initUser();
    fetchJob();
  },[])

  const initUser = () => {
    console.log(userAuth)
    if(userAuth.user){
      const applyname = userAuth.user.username
      const applyemail = userAuth.user.attributes.email
      setApplyData({ ...applyData, applyname: applyname, applyemail: applyemail })
    }
  }

  const fetchJob = async () => {
    try {
      const jobData = await API.graphql({
        query: getUwcssaJob,
        variables: {id: id},
        authMode: "AWS_IAM",
      });
      const job = jobData.data.getUwcssaJob;
      console.log("jobData", jobData);
      setApplyData({ ...applyData, job: job });
    } catch (error) {
      console.log("error on fetching Job", error);
    }
  };

  const onChange = (event) => {
    setApplyData({ ...applyData, [event.target.name]: event.target.value });
    console.log(applyData);
  };

  const addFile = (event) => {
    setResume(()=>event.target.files[0])
  }

  const postResume = async (resume) => {
    try {
      const response = await Storage.put(
        `career/${uuid()}${resume.name}`,
        resume,
      );
      setApplyData({ ...applyData, resumePath: response.key})
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    if(!userAuth.user){
      setOpen(true)
      setTimeout(() => {props.history.push("/signIn")},1200)
    }else{
      if(!resume || !applyData.applyname || !applyData.applyemail || !applyData.applyphone){
        setInfo(true)
      }else{
        if(resume){
          postResume(resume)
        }
        try {
          const createUwcssaJobResumeInput = {
            name: applyData.applyname,
            email: applyData.applyemail,
            phone: applyData.applyphone,
            resumeFilePath: applyData.resumePath,
            uwcssaJobResumeUwcssaJobId: applyData.job.id
          }
          const newUwcssaJobResume = await API.graphql(graphqlOperation(createUwcssaJobResume,{input: createUwcssaJobResumeInput}))
          console.log("newUwcssaJobResume",newUwcssaJobResume.data.createUwcssaJobResume)
          if(newUwcssaJobResume) {
            setSubmitSuccess(true)
            setTimeout(() => {props.history.push("/career")},1200)
          }
        } catch (error) {
          console.log("submit resume failure: ",error)
          setSubmitFailure(true)
        }
      }
    }
    console.log(applyData)
  }

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const handleCloseInfo = (event, reason) => {
    setInfo(false);
  }

  const handleCloseSuccess = (event, reason) => {
    setSubmitSuccess(false);
  }

  const handleCloseFailure = (event, reason) => {
    setSubmitFailure(false);
  }
  
  return (
    <div className={classes.root}>
      <Typography variant="h6">{applyData.job.title}</Typography><br />
      <Typography variant="body1">谢谢你的兴趣.请填写下面的表格并点击"提交"</Typography><br />
      <div>* 使用简历申请</div>
      <input
        accept="*"
        className={classes.input}
        id="contained-button-file"
        name="files"
        // multiple
        type="file"
        onChange={event => addFile(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="outlined" color="primary" component="span">
          上传文件
        </Button>
        { resume?<Typography variant="overline" className={classes.fileName}>{resume.name}</Typography>:<Typography variant="overline" className={classes.fileName}>未上传文件</Typography> }
      </label><br /><br />
      <Typography variant="body1">个人信息</Typography>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              name="applyname"
              placeholder="姓名"
              type="text"
              id="applyname"
              autoComplete="applyname"
              value={applyData.applyname}
              onChange={(event) => onChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              name="applyemail"
              placeholder="邮箱"
              type="email"
              id="applyemail"
              autoComplete="applyemail"
              value={applyData.applyemail}
              onChange={(event) => onChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              name="applyphone"
              placeholder="手机号码"
              type="tel"
              id="applyphone"
              autoComplete="applyphone"
              value={applyData.applyphone}
              onChange={(event) => onChange(event)}
            />
          </Grid>
        </Grid>
      </form>
      <br />
      <p>我保证我对所有问题的回答都是真实和正确的,没有任何形式的间接遗漏.我明白,如果我被录用,在本申请书中或在雇用前的过程中所作的任何虚假,误导性或其它不正确的陈述,都可能成为我被立即解雇的理由.</p>
      <Checkbox className={classes.checkbox} name="agree" checked={true}/>我同意<br />
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        提交
      </Button>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          请先登录!
        </Alert>
      </Snackbar>
      <Snackbar open={info} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000} onClose={handleCloseInfo}>
        <Alert severity="warning" onClose={handleCloseInfo}>
          请上传RESUME并补充完整个人信息!
        </Alert>
      </Snackbar>
      <Snackbar open={submitSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert severity="success" onClose={handleCloseSuccess}>
          申请提交成功,请耐心等待!
        </Alert>
      </Snackbar>
      <Snackbar open={submitFailure} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={4000} onClose={handleCloseFailure}>
        <Alert severity="error" onClose={handleCloseFailure}>
          申请提交失败,请重试!
        </Alert>
      </Snackbar>
    </div>
  )
}
