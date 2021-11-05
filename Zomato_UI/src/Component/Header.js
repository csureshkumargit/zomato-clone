import react from "react";
import '../Styles/Header.css';
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};
class Header extends react.Component {

    constructor() {
        super();
        this.state = {
            modalIsOpenforLogin: false,
            username: undefined
        }
    }
    navigateToHome = () => {
        this.props.history.push('/');
    }
    handleLoginAccount = () => {
        this.setState({ modalIsOpenforLogin: true });
    }
    zomatoUserLogin = () => {
        this.props.history.push('/login');
        this.handlemodal('modalIsOpenforLogin', false);
    }
    zomatoUserSignup = () => {
        this.props.history.push('/signup');
    }
    handleLogout = () => {
        sessionStorage.setItem('username', '');
        this.setState({ username: undefined });
    }
    responseFacebook = (response) => {

        this.setState({ username: response.name });
        console.log(response.name);
    }
    componentClicked = () => {
        this.setState({ modalIsOpenforLogin: false });
    }
    handlemodal = (state, value) => {
        this.setState({ [state]: value });
    }
    // componentDidUpdate() {
    //     if (sessionStorage.getItem('username') && sessionStorage.getItem('username').length > 0) {
    //         this.setState({ username: sessionStorage.getItem('username') })
    //     }

    // }


    componentDidUpdate(prevProps, prevState) {
        console.log('Prev state', prevState); // Before update
        console.log('New state', this.state); // After update 
        let { username } = this.state;
        if (sessionStorage.getItem('username'))
            username = sessionStorage.getItem('username');

        if (prevState.username != username)
            this.setState({ username: username });
    }

    render() {
        const { modalIsOpenforLogin, username } = this.state;
        return (
            <div className="header" >
                <div className="logo" onClick={this.navigateToHome}>
                    <b>e!</b>
                </div>
                {username && <div className='customerlogin' style={{ float: "right" }}>
                    <div className="username" >
                        Hi, {username}
                    </div>
                    <div className="logout" onClick={this.handleLogout}>
                        Logout
                    </div>
                </div>}
                {!username && <div className='customerlogin' style={{ float: "right" }}>
                    <div className="login" onClick={this.handleLoginAccount}>
                        Login
                    </div>
                    <div className="account" onClick={this.zomatoUserSignup}>
                        Create an account
                    </div>
                </div>}
                <Modal
                    isOpen={modalIsOpenforLogin}
                    style={customStyles}
                >


                    <FacebookLogin
                        appId="921327618474127"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}>

                    </FacebookLogin>
                    <div className="user-acct-sign-in">
                        <button className='btn-acct-signin' onClick={this.zomatoUserLogin} >Zomato Sign in</button>
                        <span className="add-to-cart-modal-close" onClick={() => this.handlemodal('modalIsOpenforLogin', false)}><strong class="fas fa-times"></strong></span>
                    </div>
                </Modal>
            </div>

        )
    }
}

export default withRouter(Header);