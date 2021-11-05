import React from "react";
import '../Styles/Home.css';
import Wallpaper from '../Component/Wallpaper.js';
import QuickSearch from "./QuickSearch";
import axios from "axios";

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            locations: [],
            quickSearchItems: [],
            restaurants: []
        }
    }
    componentDidMount() {
        sessionStorage.setItem('locationid', '');
        axios({
            url: "https://zomato-clone-db.herokuapp.com/location/",
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            this.setState({ locations: res.data.location_data })
            console.table(this.state.locations);
        }).catch(
            err => console.log(err)
        )

        axios({
            url: "https://zomato-clone-db.herokuapp.com/mealtype/",
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            this.setState({ quickSearchItems: res.data.meal_data })
            console.table(this.state.quickSearchItems);
        }).catch(
            err => console.log(err)
        )

        axios({
            url: "https://zomato-clone-db.herokuapp.com/restaurant/",
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant_data })
            console.table(this.state.restaurants);
        }).catch(
            err => console.log(err)
        )
    }


    render() {
        const { locations, quickSearchItems, restaurants } = this.state;

        return (
            <div>
                <Wallpaper locationsData={locations} restaurantlist={restaurants} />
                <QuickSearch quickSearchItemsData={quickSearchItems} />
            </div>
        )
    }
}

export default Home;