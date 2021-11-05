import react from "react";
import axios from "axios";
import '../Styles/Login.css';
class Login extends react.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: [],
            jwt_token: '',
            usrMsg: undefined
        }
    }

    //successful login->save user info in session. if user_cart is in session then navigate to order page,elsehome page.
    //order page -> check user info is available in session then do payment..else pop up to login to place order.
    //order page -> final order detail , payment button, user email.,address(save user purchase hist collection.)
    //
    showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }

    }
    navigateToHomepage = () => {
        const { username } = this.state;
        console.log('username', username);
        this.props.history.push('/');
        sessionStorage.setItem('username', username);

    }
    saveUserLoggedInfo = () => {
        const { username } = this.state;
        console.log('username', username);
        sessionStorage.setItem('username', username);


    }
    checkUserLogin = (e) => {
        e.preventDefault();
        const { email, password, usrMsg } = this.state;
        const userinfo = {
            email,
            password
        }
        console.log('info', userinfo);
        axios(
            {
                url: "https://zomato-clone-db.herokuapp.com/users/login",
                Headers: {
                    'content-type': 'application/json'
                },
                method: "POST",
                data: userinfo
            }
        ).then(res => {
            if (res.data.isAuthenticated === true)
                this.setState({ usrMsg: res.data.message, username: res.data.authuser[0]["firstname"] + res.data.authuser[0]["lastname"] });
            else
                this.setState({ usrMsg: res.data.message })
        }).catch(err => console.log('err', err))
        setTimeout(() => {
            this.saveUserLoggedInfo();
        }, 1000);

    }

    render() {
        const { email, password, usrMsg } = this.state;
        return (
            <div className='user-account-container'>
                <h5 className="sign-in-heading"> Please ,Sign in your information </h5>
                <form className='user-account' onSubmit={this.checkUserLogin}>
                    <div>
                        <label className='usr-acct-lbl'>Email :</label>
                        <input type='email' placeholder='Enter your email' required value={email}
                            onChange={(e) => this.setState({ email: e.target.value, usrMsg: undefined })} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            minLength='6' className='usr-acct-input'></input>
                    </div>
                    <div>
                        <label className='usr-acct-lbl'>Password :</label>
                        <input className='usr-acct-input' type='password' placeholder='Enter your password' required value={password}
                            onChange={(e) => this.setState({ password: e.target.value, usrMsg: undefined })}
                            id='password'
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 6 or more characters"></input>
			<div>
                        <input type='checkbox' className='show-password-signup' onClick={this.showPassword}></input><span className="show-pwd">Show Password</span>
			</div>

                    </div>
                    <div>
                        <div>
                            <button className='btn-user-submit' type='submit' >Login</button>
                        </div>
                        {usrMsg && <button className="btn-sign-in-message" type="button" onClick={this.navigateToHomepage}>{usrMsg.includes('been') ? "Logged in !!!.Please click to continue." : usrMsg}</button>}
                    </div>
                </form>
            </div >
        )
    }
}

export default Login;