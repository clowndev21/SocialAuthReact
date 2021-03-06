import React,{useState} from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie';
// import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin } from 'react-google-login';
// import TwitterLogin from "react-twitter-login";
import { LinkedIn } from 'react-linkedin-login-oauth2';
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
function Home(){
    const [cookies,setCookie] = useCookies(['user','signinstatus']);
    console.log(cookies.user,'user')
    return(
        <div>

            {
                cookies.user?
                <div>
                    <Mainpage/>
                </div>
                :
                <Account/>
            }
            
            
        </div>
    )
    
}

export default Home


const Account=()=>{
    const [account,setAccount]=useState(false)
    const [companydetails,setCompanydetails]=useState()
    const [mobile,setMobile]=useState('')
    const [cookies,setCookie] = useCookies(['user']);
    console.log(companydetails)
    const company=()=>{
        var companyname = document.getElementById("companyname").value
        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var data={'companyname':companyname,'name':name,'email':email}
        setCompanydetails(data)
    }


    const responseFacebook=(res)=>{
        if(res.accessToken){
		
		var bodyFormData=new FormData();
	  bodyFormData.append('token',res.accessToken)
	  bodyFormData.append('backend','facebook')
	  bodyFormData.append('grant_type','convert_token')
	  bodyFormData.append('client_id','9l6eJ9iiCVedDF8tsvP8SvrfOqBbPn9wA4xu93iv')
	  bodyFormData.append('client_secret','NjNuiMH2p15cuVygvl4LV9RxtmJi28J02ZBUyiSAQYQfEL4xj5SdNEs1UvLv09zCaAzWuYVNe7oQIn5TYIvoocDyO792HPLkOhiv1DrDHZnJg3HenXkXggaNZ5EqKxUP')
	  axios.post('http://127.0.0.1:8000/auth/convert-token',bodyFormData).then((response)=> {
		User(response.data.access_token,'Facebook')
	  })
	 
	}
    }
    const responseGoogle=(res)=>{
		if(res.accessToken){
		var bodyFormData=new FormData();
	  bodyFormData.append('token',res.accessToken)
	  bodyFormData.append('backend','google-oauth2')
	  bodyFormData.append('grant_type','convert_token')
	  bodyFormData.append('client_id','9l6eJ9iiCVedDF8tsvP8SvrfOqBbPn9wA4xu93iv')
	  bodyFormData.append('client_secret','NjNuiMH2p15cuVygvl4LV9RxtmJi28J02ZBUyiSAQYQfEL4xj5SdNEs1UvLv09zCaAzWuYVNe7oQIn5TYIvoocDyO792HPLkOhiv1DrDHZnJg3HenXkXggaNZ5EqKxUP')
	  axios.post('http://127.0.0.1:8000/auth/convert-token',bodyFormData).then((response)=> {
		User(response.data.access_token,'Google')
	  })
	 
	}
	}


   const responseLinkedIn = (data) => {
    var bodyFormData=new FormData()
    bodyFormData.append('code',data.code);
    bodyFormData.append('client_id','86bf5uhj67ssy0')
    axios.post('http://127.0.0.1:8000/account/ldaccessToken',bodyFormData)
        .then((data)=>{
            console.log(data.data)
            User(data.data,LinkedIn)
        })
      }



    const User=(access_token,provider)=>{
    var bodyFormData=new FormData();
        if(companydetails){
            bodyFormData.append('access_token',access_token)
            bodyFormData.append('companyname',companydetails.companyname)
            bodyFormData.append('name',companydetails.name)
            bodyFormData.append('email',companydetails.email)
            axios.post('http://127.0.0.1:8000/account/setcompany',bodyFormData).then((response)=> {
                console.log(response.data,'userdata')
                var data=response.data
                if(data.status){
                    var userdata={'access_token':access_token,'email':data.email,'first_name':data.first_name,'last_name':data.last_name,'username':data.username,'provider':provider,'status':data.status,'companyname':data.companyname}
                    setCookie('user',userdata);
                    setCookie('signinstatus',true);
                }
                else{
                    alert(data.error)
                }
                
            
            })
        }else{
            bodyFormData.append('access_token',access_token)
            axios.post('http://127.0.0.1:8000/account/get-user',bodyFormData).then((response)=> {
                console.log(response.data,'userdata')
                var data=response.data
                if(data.status){
                    var userdata={'access_token':access_token,'email':data.email,'first_name':data.first_name,'last_name':data.last_name,'username':data.username,'provider':provider,'status':data.status,'companyname':data.companyname}
                setCookie('user',userdata);
                setCookie('signinstatus',true);
                } else{
                    alert('please signup')
                }
            
            })
        }
        
    }
    return(
        <div>
            {
                    account?
                    <div>
                        this is signup page 
            {
                companydetails?
                <div>
                    
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
                        
                        <LinkedIn
                                clientId="86bf5uhj67ssy0"
                                redirectUri={`${window.location.origin}/linkedin`}
                                scope="r_liteprofile"
                                state="foobar"
                                onFailure={responseLinkedIn}
                                onSuccess={responseLinkedIn}
                                supportIE
                                redirectPath='/linkedin'
                                >
                                    <button>linkedin</button>
                        
                        </LinkedIn>
                                
                            
                    </div>
                    {
                        mobile?
                        <form onSubmit={(event)=>
                            { event.preventDefault();
                                var otp=event.target.otp.value
                                var bodyFormData=new FormData();
                                bodyFormData.append('mobile',mobile)
                                bodyFormData.append('otp',otp)
                                axios.post('http://127.0.0.1:8000/account/checkotp',bodyFormData).then((response)=> {
                                    console.log(response)
                                    if(response.data.error==='no'){
                                        setMobile('')
                                        var data=response.data
                                        var userdata={'access_token':data.access_token,'email':data.email,'first_name':data.first_name,'last_name':data.last_name,'username':data.username,'provider':'otp','status':data.status,'companyname':data.companyname}
                                        setCookie('user',userdata);
                                        setCookie('signinstatus',true);
                                    }
                                    else{
                                        alert(response.data.error)
                                    }
                                })
                                }
                                }>
                            <label>Otp</label>
                            <input type='number' id='otp' placeholder='enter otp'/>
                            <button type='submit'>submit</button>
                        </form>
                    :
                        <form onSubmit={(event)=>
                            { event.preventDefault();
                                var mobile=event.target.number.value
                                
                                var bodyFormData=new FormData();
                                bodyFormData.append('mobile',mobile)
                                bodyFormData.append('companyname',companydetails.companyname)
                                bodyFormData.append('name',companydetails.name)
                                bodyFormData.append('email',companydetails.email)
                                axios.post('http://127.0.0.1:8000/account/createuser',bodyFormData).then((response)=> {
                                    if(response.data.status){
                                        setMobile(mobile)
                                        setCompanydetails({})
                                    }
                                    else{
                                        alert(response.data.error)
                                    }
                                })
                                }
                                }>
                        <label>Mobile Number</label>
                        <input type='number' id='number' placeholder='enter your number' required/>
                        
                        <button type='submit'>submit</button>
                        </form>
                    }
                </div>
                :
                <div>
                    <form onSubmit={company}>
                        <input type="text" id='companyname' placeholder="Company Name" required/>
                        <input type="text" id='name' placeholder="Name" required/>
                        <input type="email" id='email' placeholder="Email" required/>
                        <button >submit</button>
                    </form>
                    
                </div>
            }
            <button onClick={()=>{setAccount(false);setCompanydetails('');setMobile('')}}>signin</button>
            </div>
            
            :
            
            <div>
                this is signin page 
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
                    
                    <LinkedIn
                            clientId="86bf5uhj67ssy0"
                            redirectUri={`${window.location.origin}/linkedin`}
                            scope="r_liteprofile"
                            state="foobar"
                            onFailure={responseLinkedIn}
                            onSuccess={responseLinkedIn}
                            supportIE
                            redirectPath='/linkedin'
                            >
                                <button>linkedin</button>
                    
                    </LinkedIn>
                            
                        
                </div>
                {
                    mobile?
                    <form onSubmit={(event)=>
                        { event.preventDefault();
                            var otp=event.target.otp.value
                            var bodyFormData=new FormData();
                            bodyFormData.append('mobile',mobile)
                            bodyFormData.append('otp',otp)
                            axios.post('http://127.0.0.1:8000/account/checkotp',bodyFormData).then((response)=> {
                                console.log(response)
                                if(response.data.error==='no'){
                                    setMobile('')
                                    var data=response.data
                                    var userdata={'access_token':data.access_token,'email':data.email,'first_name':data.first_name,'last_name':data.last_name,'username':data.username,'provider':'otp','status':data.status,'companyname':data.companyname}
                                    setCookie('user',userdata);
                                    setCookie('signinstatus',true);
                                }
                                else{
                                    alert(response.data.error)
                                }
                            })
                            }
                            }>
                        <label>Otp</label>
                        <input type='number' id='otp' placeholder='enter otp'/>
                        <button type='submit'>submit</button>
                    </form>
                    :
                    <form onSubmit={(event)=>
                       { event.preventDefault();
                        var mobile=event.target.number.value
                        var bodyFormData=new FormData();
                        bodyFormData.append('mobile',mobile)
                        axios.post('http://127.0.0.1:8000/account/otprequest',bodyFormData).then((response)=> {
                            if(response.data){
                                setMobile(mobile)
                            }
                            else{
                                alert("your number does't exist")
                            }
                        })
                        }
                        }>
                    <label>Mobile Number</label>
                    <input type='number' id='number' placeholder='enter your number' required/>
                    <button type='submit'>submit</button>
                    </form>
                }
                
            <button onClick={()=>setAccount(true)}>signup</button>
            </div>
        }
        
        </div>
    )
}




const Mainpage=()=>{
    const [cookies,setCookie] = useCookies(['user','state']);
    return(
        
        <div style={{padding: '50px'}}> 
        
        <center>
        <button className="btn btn-success" onClick={()=>setCookie('user','')}>Signout</button>
        {
            cookies.user.first_name?
            <div style={{marginTop: '20px'}}>hello! {cookies.user.first_name}</div>
            :
            <div style={{marginTop: '20px'}}>hello! {cookies.user.username}</div>
        }
        
        <div style={{marginTop: '20px'}}>Email:- {cookies.user.email}</div>
        <div style={{marginTop: '20px'}}>Username:- {cookies.user.username}</div>
        {
            cookies.user.last_name?
            <div style={{marginTop: '20px'}}>Last_name:- {cookies.user.last_name}</div>
            :
            <></>

        }
        <div style={{marginTop: '20px'}}>Provider:- {cookies.user.provider}</div>
        <div style={{marginTop: '20px'}}>CompanyName:- {cookies.user.companyname}</div>

        </center>

        
        
    </div>
    )
}