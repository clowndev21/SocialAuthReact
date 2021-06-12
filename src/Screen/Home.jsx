
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import TwitterLogin from "react-twitter-login";
function Home(){
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
    return(
        <div>
          
            <FacebookLogin
            buttonText="Login"
    appId="469620310816209"
    fields="name,picture"
    callback={responseFacebook} />

<GoogleLogin
    clientId="684458592769-vm96nmdi7l5v46fsn08d6bgdnn5b8rmf.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    // cookiePolicy={'single_host_origin'}
  />
  <TwitterLogin
      authCallback='{authHandler}'
      consumerKey='{CONSUMER_KEY}'
      consumerSecret='{CONSUMER_SECRET}'
    />
        </div>
    )
}

export default Home