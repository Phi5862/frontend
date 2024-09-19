import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Form,Row,Col,Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const md5 = require('md5');
export default function Login(){
  const [validated, setValidated]=useState(false);
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const navigate = useNavigate();
 
  const onLogin = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity()===false){
      event.stopPropagation();
    } else {
        doLogin();
    }
    setValidated(true);
  }

  const getAuthenToken = async () => {
      const response = await fetch(
        "http://localhost:8080/api/authen_request",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: md5(username)
          })
        }
      );
 
      if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
      const data = await response.json();
      console.log("7777")
      console.log(data)
      console.log("7777")
      return data;
  };

  const getAccessToken = async (authToken) =>{
    // var md5password = md5(password);
    var baseString = username + '&' + md5(password);
    console.log(username)
    console.log(password)
    console.log(md5(password))
    console.log(authToken)
    console.log(baseString)
    var authenSignature = md5(baseString);
    // var authenSignature =  md5(password);
    console.log(authenSignature)
    const response = await fetch(
      "http://localhost:8080/api/access_request",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          auth_signature: authenSignature,
          auth_token: authToken
        })
      }
    );
    const data = await response.json();
    console.log("555555")
    console.log(data)
    console.log("555555")
    return data;
  };

  const doLogin = async () => {
    try {
      console.log("aaa")
      const data1 = await getAuthenToken();
      console.log(data1)

      console.log("bbb")
      const authToken = data1.data.auth_token;
      console.log("ccc")
      const data2 = await getAccessToken(authToken);
      console.log(data2)
      console.log("dddd")
      localStorage.setItem("access_token", data2.data.access_token);
      localStorage.setItem("user_id", data2.data.account_info.user_id);
      localStorage.setItem("username", username);
      localStorage.setItem("first_name", data2.data.account_info.first_name);
      localStorage.setItem("last_name", data2.data.account_info.last_name);
      localStorage.setItem("email", data2.data.account_info.email);
      localStorage.setItem("role_id", data2.data.account_info.role_id);
      localStorage.setItem("role_name", data2.data.account_info.role_name);
 
      navigate("home", {replace: false });
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid Username/Password");
    }
  };

 
  return(
    <div className="container m-auto">
      <Form noValidate validated={validated} onSubmit={onLogin}>
        <Row className="mb-3">
          <Form.Group as = {Col} controlId="validateUsername">
            <Form.Label> Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Username"
              onChange={(e)=> setUsername(e.target.value)}
            />
            <Form.Control.Feedback type = "invalid">
               กรุณากรอก Username
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as = {Col} controlId="validatePassword">
            <Form.Label> Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <Form.Control.Feedback type = "invalid">
               กรุณากรอก Password
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col md={3}>
            <Button type = "submit"> Login </Button>
          </Col>
        </Row>
      </Form>
    </div>

  );
}
