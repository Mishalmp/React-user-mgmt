import { Link,useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { baseUrl } from "../../api/api";
import { getLocal } from "../../healpers/auth";
import "./login.css"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import { setUserInfo } from "../../Redux/userslice";

function Login(){

    const history = useNavigate();
    const response = getLocal();
    const dispatch = useDispatch()
    

    useEffect(() => {
        if (response) {
        history("/");
        }
    }, [response, history]);

    const signupSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`${baseUrl}token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        });
        
        const data = await response.json();
        // console.log(data.access,'dataaaaaaaaaa');
        try {
          const token =jwtDecode(data.access)

        const dics={"user_id":token.user_id,

          "name":token.username,
          "email":token.email,
          "is_admin":token.is_admin
          

        }
        dispatch(setUserInfo(
          {userinfo:dics}
        ))
        console.log(token.user_id,'userrrr');
          
        } catch (error) {
          console.error('Error decoding JWT:', error);
          
        }
        

        

        if (response.status === 200) {
          localStorage.setItem("authToken", JSON.stringify(data));
          history("/");
        } else if (response.status === 401) {
          alert("User credentials mismatch");
          history("/login");
        }
      };

      

    return (
        <div className="maindiv">
           <div >
        <img style={{float:"left",width:600}}
          src="https://www.saaspegasus.com/static/images/web/modern-javascript/django-react-header.51a983c82dcb.png"
          alt="Sample image"
        />
      </div>
          <div style={{ display: "block", width: 500, padding: 30 }}>
            <h4>Login</h4>
            <Form onSubmit={(e) => signupSubmit(e)}>
              <Form.Group className="py-4">
                <Form.Control type="email" name="email" placeholder="Email" />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button variant="primary" className="my-4" type="submit">
                submit
              </Button>
              <p className="text-center text-muted mt-4 mb-0">
                Don't yet registered?
                <Link to="/register" className="fw-bold text-body">
                  <u>Sign up</u>
                </Link>
              </p>
            </Form>
          </div>
        </div>
      );
    }



export default Login