import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Input, List, Checkbox, Button } from 'antd-mobile'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from "axios"
import md5 from "js-md5"
import "./globle"
// const history = useHistory();
function strToMd5(str) {
  // 将字符串先进行一次md5加密，然后将加密结果进行一次翻转，然后再进行一次加密
  return md5(md5(str).split('').reverse().join(''));
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ruleForm: {
        loginId: "",
        loginPWD: "",
        checked: false
      }
    }
  }
  componentDidMount() {
    let node = document.querySelector("#id");
    // console.log(id);
  }

  // 点击取消按钮触发
  handleCancel = () => { }
  // 登录按钮
  handleLogin = async () => {
    await this.setState({
      ruleForm: {
        loginId: this.state.ruleForm.loginId,
        loginPWD: strToMd5(this.state.ruleForm.loginPWD)
      }
    })
    let res = await axios.get("http://bingjs.com:83/Admin/Login", {
      params: this.state.ruleForm
    })
    console.log(res);
    if (res.data.success) {
      // console.log(history);
      localStorage.setItem("res", JSON.stringify(res));
      localStorage.setItem("loginId", this.state.ruleForm.loginId)
      // console.log(localStorage.getItem("res"));

      // globalRes = res
      // this.props.history.push("/home");
      // history.pushState(null, "/layout")
      // history.push("/layout")

    }

  }
  // 注册按钮
  handleRegister = () => {

  }
  // 修改登录id
  handleInputId = async () => {
    await this.setState({
      ruleForm: {
        loginId: document.querySelector("#id").value,
        loginPWD: this.state.ruleForm.loginPWD
      }
    })
  }
  // 修改密码
  handleInputPwd = () => {
    this.setState({
      ruleForm: {
        loginId: this.state.ruleForm.loginId,
        loginPWD: document.querySelector("#pwd").value,
      }
    })
  }
  // 点击单选按钮
  handleChecked = () => {
    this.setState({
      checked: !this.state.ruleForm.checked
    })
  }
  render() {
    return (
      <div style={{
        border: "1px solid #ccc",
        padding: "60px",
        fontSize: "15px"
      }}>
        <h2 style={{
          color: "white",
          display: 'flex',
          justifyContent: 'center',
          marginBottom: "20px"
        }}>React子应用酒店管理系统</h2>
        <List
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            fontSize: "15px",
            '--prefix-width': '6em',
            "width": "500px",
          }}
        >
          <List.Item prefix='账号'>
            <Input placeholder='请输入账号' value={this.state.ruleForm.loginId} clearable
              onChange={this.handleInputId} id="id"
            />
          </List.Item>
          <List.Item prefix='密码'>
            <Input placeholder='请输入密码' value={this.state.ruleForm.loginPWD} clearable type='password'
              onChange={this.handleInputPwd} id="pwd" />
          </List.Item>
          <Checkbox checked={this.state.ruleForm.checked} style={{ margin: "5px" }}
            onChange={this.handleChecked} id="check"
          ><span style={{ fontSize: "5px" }}>记住密码</span> </Checkbox>
          <List>
            <Button color="success" size="mini" style={{
              margin: "10px 5px 10px 10px"
            }} onClick={this.handleLogin}>登录</Button>

            {/* <Button color="primary" size="mini" style={{
              margin: "10px 5px 10px 10px"
            }} onClick={this.handleRegister}>注册</Button>

            <Button color="warning" size="mini" style={{
              margin: "5px"
            }} onClick={this.handleCancel}>取消</Button> */}
          </List>

        </List>
        <span>注意：此react子应用简单实现，需要先点击子应用的登陆，然后再点击此登陆按钮</span>

      </div >
    )





  }
}
// function App() {
//   return (<div>22</div>)
// }
function Home() {
  <Router>
    <Link to="/home"></Link>
    <Route path="/home" render={() => <div>22</div>}></Route>
  </Router>
}

export default App
