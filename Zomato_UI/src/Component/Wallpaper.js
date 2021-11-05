import react from "react";
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";


class Wallpaper extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant_list_location: [],
            searchText: undefined,
            suggestions: []
        }
    }
    handlelocationchange = (event) => {
        const locationid = event.target.value;
        sessionStorage.setItem('locationid', locationid);
        console.log('event', locationid);
        axios({
            url: `https://zomato-clone-db.herokuapp.com/restaurant/location/${locationid}`,
            method: "GET",
            headers: { 'content-type': 'application/json' },
        }).then(
            res => {
                this.setState({ restaurant_list_location: res.data.restaurant_loc_data });
                console.log('restlist', this.state.restaurant_list_location);
            }
        ).catch(
            err => console.log(err)
        )

    }

    NavigateToRestaurantdetail = (restaurant) => {
        this.props.history.push(`/details?id=${restaurant._id}`);
    }

    handleSearch = (event) => {
        const { restaurant_list_location } = this.state;
        let searchText = event.target.value;
        let suggestedRest = [];
        console.log('length', searchText.length);
        if (searchText.length > 0) {
            suggestedRest = restaurant_list_location.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())

            )
        }
        console.log('rest-sug', suggestedRest);
        this.setState({ searchText: searchText, suggestions: suggestedRest })
    }
    render() {
        const { locationsData, restaurantlist } = this.props;
        const { suggestions, searchText } = this.state;

        return (
            <div>
                <div className="row background col-s-12 col-m-12 col-lg-12 col-xlg-12 " style={{ position: "relative" }}>
                    <img src='./Assets/homepageimg.png' alt="background_img" />
                    <div className="heading-home col-s-10 col-m-10 col-lg-10 col-xlg-10 ">
                        Find the best restaurants, cafés, and bars
                    </div>
                    <div className="search col-s-9 col-m-9 col-lg-9 col-xlg-9 ">
                        <span>
                            {/* <input id="location" type="text" placeholder="Please type a location" /> */}
                            <select id="location" type="text" placeholder="Please type a location" onChange={this.handlelocationchange}>
                                <option value='0'>Select</option>
                                {locationsData.map((item, index) => {
                                    return (
                                        <option value={item.location_id}>{item.name},{item.city}</option>
                                    )
                                })}
                            </select>
                        </span>
                        <span>
                            <input id="restaurants" type="text" placeholder="      Search for restaurants" onChange={(event) => this.handleSearch(event)} />
                            {/* {restaurantlist.map((item, index) => {
                                return (
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{item.locality},{item.city}</p>
                                    </div>
                                )
                            })} */}
                            <i className="fa fa-search searchicon" ></i>
                            <div className="suggested-restaturant-list">
                                {suggestions && suggestions.length > 0 && suggestions.map((item) => {
                                    return (

                                        <li className="suggested-restaurant" onClick={() => this.NavigateToRestaurantdetail(item)}>
                                            {item.name}-{item.city},{item.locality}
                                        </li>

                                    )
                                })}
                            </div>
                            {searchText && searchText.length > 0 && suggestions.length == 0 && <div className="suggested-no-restaurant">
                                No items Found
                            </div>}
                        </span>
                    </div>
                    <div className="sub-heading col-s-4 col-m-4 col-lg-4 col-xlg-4">
                        Quick Searches
                    </div>
                    <div className="sub-heading-1 col-s-5 col-m-5 col-lg-4 col-xlg-4">
                        Discover restaurants by type of meal
                    </div>
                </div>
                <br />
            </div>
        )
    }
}
export default withRouter(Wallpaper);