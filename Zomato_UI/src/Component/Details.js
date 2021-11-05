import react from "react";
import '../Styles/Details.css';
import QueryString from "query-string";
import axios from "axios";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const https = require('https');

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
const customStyles_carousel = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        height: "70%"

    },
};

class Details extends react.Component {
    constructor() {
        super();
        this.state = {
            showOverviewdetails: true,
            showContactdetails: undefined,
            showdetails: false,
            restaurant: {},
            resid: undefined,
            menu_items: [],
            modalIsOpenMenuItems: false,
            modalIsOpenGalleryItems: false,
            modalIsOpenCustomerDetails: false,
            customerName: undefined,
            customerEmail: undefined,
            customerNumber: undefined,
            customerAddress: undefined,
            subtotal: 0,
            //  form_state: undefined

        }
    }
    componentDidMount() {
        const qs = QueryString.parse(this.props.location.search);
        const { id } = qs;
        axios({
            url: `https://zomato-clone-db.herokuapp.com/restaurant/${id}`,
            method: "GET",
            headers: { 'content-type': 'application/json' },
        }).then(
            res => {
                this.setState({ restaurant: res.data.restaurant_By_Id, showdetails: true, resid: id });
            }
        ).catch(
            err => console.log(err)
        )

    }
    setshowOverviewdetails = () => {
        this.setState({ showOverviewdetails: true, showContactdetails: false });
        document.getElementsByClassName('contact')[0].style.borderBottomColor = 'white';
        document.getElementsByClassName('over-view')[0].style.borderBottomColor = 'red';


    }
    setshowContactdetails = () => {
        this.setState({ showOverviewdetails: false, showContactdetails: true });
        document.getElementsByClassName('contact')[0].style.borderBottomColor = 'red';
        document.getElementsByClassName('over-view')[0].style.borderBottomColor = 'white';


    }
    handleOrder = () => {

        const { resid } = this.state;
        console.log('resid', resid);

        axios({
            url: `https://zomato-clone-db.herokuapp.com/menuitems/${resid}`,
            method: "GET",
            headers: { 'content-type': 'application/json' },
        }).then(
            res => {
                this.setState({ menu_items: res.data.restaurant_By_Items, modalIsOpenMenuItems: true });

            }
        ).catch(
            err => console.log(err)
        )

    }

    handlecartItem = (operation, index) => {
        const items = [...this.state.menu_items];
        const item = items[index];
        let total = 0;
        if (operation == 'Add') {
            item.qty = item.qty + 1;
        }
        else {
            item.qty = item.qty - 1;
        }
        items[index] = item;
        items.map((item) => (
            total += item.price * item.qty
        ))
        this.setState({ menu_items: items, subtotal: total })
    }

    handlemodal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleCustomerDetails = (state, event) => {
        this.setState({ [state]: event.target.value });
    }
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        //form.setAttribute('enctype', 'utf-8')

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        console.log('form', form);
        return form
    }

    post = (details) => {

        const form = this.buildForm(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    }
    getData = (data_pay) => {
        return fetch(`https://zomato-clone-db.herokuapp.com/api/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data_pay)
        }).then(response => response.json()).catch(err => console.log(err))
    }
    Payments = (e) => {
        e.preventDefault();
        const { subtotal, customerEmail } = this.state;
        console.log('total', subtotal, 'email', customerEmail);
        const paymentObj = {
            amount: subtotal,
            email: customerEmail
        };

        this.getData(paymentObj).then(response => {
            console.log('resp', response);
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            console.log('info', information);
            this.post(information)
        })
    }

    render() {
        const { showOverviewdetails, showContactdetails, restaurant, showdetails, menu_items,
            modalIsOpenMenuItems, modalIsOpenGalleryItems,
            modalIsOpenCustomerDetails, customerName, customerEmail, customerNumber, customerAddress, subtotal } = this.state;
        return (
            <div>
                <div className="banner col-det-s-12 col-det-m-12 col-det-lg-12 col-det-xlg-12">
                    <img className="banner-img" src="./Assets/breakfast.jpg" alt='breakfast' />
                    <div className="image-gallery">
                        <button className="img-gallery-btn" onClick={() => this.handlemodal("modalIsOpenGalleryItems", true)}>Click to see image Gallery</button>
                    </div>
                </div>
                <div className='restaurant-detail'>
                    {showdetails && <div>
                        <div className='restaurant-name'>
                            {restaurant.name}
                        </div>
                        <div className="online-order">
                            <button className="btn-order-online" onClick={this.handleOrder}>Place Online Order</button>
                        </div>
                        <div className="restaurant-detail-cust">
                            <div className="btn-details">
                                <button className="btn-rest-detail over-view" onClick={this.setshowOverviewdetails}>Overview</button>
                                <button className="btn-rest-detail contact" onClick={this.setshowContactdetails}>contact</button>
                            </div>

                            {showOverviewdetails && <div classname="overview-detail">
                                <div className='overview-detail-heading'>About this place</div>
                                <div className='overview-detail-Cuisine'>Cuisine</div>
                                <div className='overview-detail-Cuisine-items'>Bakery : {restaurant.cuisine.map((item, index) => ((restaurant.cuisine.length - 1 != index) ? `${item.name}, ` : `${item.name}`))}</div>
                                <div className='overview-detail-Cost'>Average Cost</div>
                                <div className='overview-detail-Cost-detail'>&#8377; {restaurant.min_price} for two people (approx.)</div>
                            </div>}
                            {showContactdetails && <div classname="contact-detail">
                                <div className='contact-detail-heading'>Phone Number</div>
                                <div className='contact-detail-number'>+{restaurant.contact_number}</div>
                                <div className='contact-detail-shop-name'>{restaurant.name}</div>
                                <div className='contact-detail-shop-address'>{restaurant.address}</div>
                            </div>}

                        </div>
                    </div>}
                </div>
                <Modal
                    isOpen={modalIsOpenMenuItems}
                    style={customStyles}
                >
                    <div className="rest-name-menu-card">
                        {restaurant.name}
                        <span className="order-modal-close" onClick={() => this.handlemodal('modalIsOpenMenuItems', false)}><strong class="fas fa-times"></strong></span>
                    </div>
                    {menu_items.map((item, index) => {
                        return (<div className="menu-item-restaurant">
                            <div className="menu-item-details">
                                <div className="meat-Indicator">{item.has_meat ? <span className="food-has-meat"><strong class="fas fa-square"></strong></span>
                                    : <span className="food-has-no-meat"><strong class="fas fa-square"></strong></span>}</div>
                                <div className="item-name">{item.name}</div>
                                <div className="item-price">&#8377;{item.price}</div>
                                <div className="item-description">{item.description}</div>
                            </div>
                            <div className="menu-item-order">
                                <div className="item-image"><img src={`./${item.image}`} alt={item.name} /></div>
                                <div className="btn-item">
                                    {item.qty === 0 ? <button className="btn-add-remove" onClick={() => this.handlecartItem("Add", index)}>Add</button> : <div><button className="btn-remove" onClick={() => this.handlecartItem("Sub", index)}>-</button><button className="item-qty">{item.qty}</button><button className="btn-add" onClick={() => this.handlecartItem("Add", index)}>+</button></div>}
                                </div>
                            </div>
                            <hr></hr>
                        </div>)
                    })}
                    <div className="item-cost-pay">
                        <div className="sub-total-items">
                            Subtotal <span className="sub-total-amt">&#8377;{subtotal}</span>
                        </div>
                        <div className='pay-now-btn'>
                            <button className="pay-btn" onClick={() => { this.handlemodal('modalIsOpenMenuItems', false); this.handlemodal('modalIsOpenCustomerDetails', true); }}>Pay Now</button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={modalIsOpenGalleryItems}
                    style={customStyles_carousel}


                >
                    <span className="order-modal-close gallery-modal-close" onClick={() => this.handlemodal('modalIsOpenGalleryItems', false)}><strong class="fas fa-times"></strong></span>
                    <Carousel>

                        {restaurant && restaurant.thumb && restaurant.thumb.map((img) => {
                            return (<div>
                                <img src={`./${img}`} />
                            </div>)
                        })}
                    </Carousel>

                </Modal>
                <Modal
                    isOpen={modalIsOpenCustomerDetails}
                    style={customStyles}

                >

                    <div className='Customer-form'>
                        <form onSubmit={this.Payments}>
                            <div className="restaurant-name restaurant-form-name">
                                {restaurant.name}
                                <span className="order-modal-close" onClick={() => this.handlemodal('modalIsOpenCustomerDetails', false)}><strong class="fas fa-times"></strong></span>
                            </div>
                            <div className="customer-names customer-detail-lbl">
                                <lable className="lbl-customer-form">
                                    Name
                                </lable>
                                <div>
                                    <input className="customer-detail" value={customerName} type="text" placeholder="Enter your Name" minLength='6' required
                                        onChange={(event) => this.handleCustomerDetails('customerName', event)} />
                                </div>
                            </div><div className="customer-email customer-detail-lbl">
                                <lable className="lbl-customer-form">
                                    Email
                                </lable>
                                <div>
                                    <input className="customer-detail" value={customerEmail} type="email" placeholder="Enter your email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required
                                        onChange={(event) => this.handleCustomerDetails('customerEmail', event)}
                                    />
                                </div>
                            </div>
                            <div className="customer-mobile-number customer-detail-lbl">
                                <lable className="lbl-customer-form">
                                    Mobile Numer
                                </lable>
                                <div>
                                    <input className="customer-detail" value={customerNumber} type="tel" placeholder="Enter mobile number" required
                                        minLength='10' required onChange={(event) => this.handleCustomerDetails('customerNumber', event)} />
                                </div>
                            </div>
                            <div className="customer-address customer-detail-lbl">
                                <lable className="lbl-customer-form">
                                    Address
                                </lable>
                                <div>
                                    <textarea value={customerAddress} className="customer-detail" cols='30' rows='3' placeholder="Enter Your address"
                                        required onChange={(event) => this.handleCustomerDetails('customerAddress', event)}></textarea>
                                </div>
                            </div>
                            <button className="proceed-btn" type="submit" >
                                Proceed
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>);
    }
}

export default Details;