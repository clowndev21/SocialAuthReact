import React, { useState } from 'react';
import axios from 'axios'
// import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin } from 'react-google-login';
import TwitterLogin from "react-twitter-login";
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
function Home(){

    const [ code, errorMessage ] = useState()

    const check=()=>{
        var bodyFormData=new FormData()
    bodyFormData.append('username','admin')
    bodyFormData.append('password','password');
    bodyFormData.append('client_id','9l6eJ9iiCVedDF8tsvP8SvrfOqBbPn9wA4xu93iv')
    bodyFormData.append('client_secret','NjNuiMH2p15cuVygvl4LV9RxtmJi28J02ZBUyiSAQYQfEL4xj5SdNEs1UvLv09zCaAzWuYVNe7oQIn5TYIvoocDyO792HPLkOhiv1DrDHZnJg3HenXkXggaNZ5EqKxUP');
    bodyFormData.append('grant_type','password');

    console.log('ohhh')
    axios.post('http://127.0.0.1:8000/auth/token',bodyFormData,{
            headers: {
              'content-type': 'multipart/form-data'
            }})
        .then((data)=>console.log(data.data))
    }

    const responseFacebook=(res)=>{
        console.log(res)
    }
    const responseGoogle=(res)=>{
        console.log(res)
    }


   const handleSuccess = (data) => {
        console.log("data", data)
        errorMessage(data.code)
        var bodyFormData=new FormData()
    bodyFormData.append('grant_type','authorization_code')
    bodyFormData.append('code',data.code);
    bodyFormData.append('client_id','86bf5uhj67ssy0')
    bodyFormData.append('client_secret','1Du0YxPl4wz2osAJ');
    bodyFormData.append('redirect_uri','http://localhost:3000/linkedin');

    console.log('ohhh')
    axios.get('https://www.linkedin.com/oauth/v2/accessToken',bodyFormData,
    // {
    //         headers: {
    //           'content-type': 'x-www-form-urlencoded',
    //         //   "Access-Control-Allow-Origin": "http://localhost:3000"
    //         }}
            )
        .then((data)=>console.log(data.data))





      }
    
    const handleFailure = (error) => {
        console.log(error)
        errorMessage(error.errorMessage)
        
      }

    return(
        <div>
          
            <FacebookLogin
							appId="482811786156180"
							fields="name,picture"
							callback={responseFacebook}
							// buttonText="Login"
							render={renderProps => (
						<button className="social" onClick={renderProps.onClick}>facebook costume</button>
							)}
							/>																

            <GoogleLogin
							clientId="684458592769-vm96nmdi7l5v46fsn08d6bgdnn5b8rmf.apps.googleusercontent.com"
							render={renderProps => (
						<button className="social" onClick={renderProps.onClick}> google</button>
							)}
							buttonText="Login"
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy={'single_host_origin'}
			        />
            <div>
            <LinkedIn
                    clientId="86bf5uhj67ssy0"
                    redirectUri={`${window.location.origin}/linkedin`}
                    scope="r_liteprofile"
                    state="foobar"
                    onFailure={handleFailure}
                    onSuccess={handleSuccess}
                    supportIE
                    redirectPath='/linkedin'
                    >
                        <button>linkedin</button>
                    {/* <img src={linkedin} alt="Log in with Linked In" style={{ maxWidth: '180px' }} /> */}
                    </LinkedIn>
                    {!code && <div>No code</div>}
                    {code && <div>Code: {code}</div>}
                    {errorMessage && <div>{errorMessage}</div>}
                </div>
        </div>
    )
}

export default Home