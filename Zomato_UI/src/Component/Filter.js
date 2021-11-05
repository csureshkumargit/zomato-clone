import axios from "axios";
import React from "react";
import QueryString from "query-string";
import '../Styles/Filter.css';
class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            filterpg: false,
            restaurant_data_filter: [],
            locations: [],
            totalCount: undefined,
            mealtype: undefined,
            location: undefined,
            cuisine: undefined,
            lcost: undefined,
            hcost: undefined,
            sort: undefined,
            page: undefined,
            pages: []
        }
    }
    filterRestaurant = (filterobj) => {
        axios({
            url: "https://zomato-clone-db.herokuapp.com/restaurant/filter",
            method: "POST",
            headers: { 'content-type': 'application/json' },
            data: filterobj
        }).then(
            res => {
                this.setState({ restaurant_data_filter: res.data.restaurant_filter, pages: res.data.pagearr, totalCount: res.data.totalRestaurantCount });
                console.log('1', '2');
                console.table('restaurant_data_filter', this.state.restaurant_data_filter);
                console.log('Pages', res.data.pagearr);
                console.log('Count', res.data.totalRestaurantCount);
            }
        ).catch(
            err => console.log(err)
        )
    }
    selectCuisine = (name) => {
        const { mealtype, sort, location, lcost, hcost } = this.state;
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let cuisine = [];
        checkboxes.forEach((checkbox) => {
            cuisine.push(parseInt(checkbox.value));
        });
        cuisine = cuisine.length > 0 ? cuisine : undefined;
        this.setState({ cuisine: cuisine });
        const filterobj = {
            mealtype,
            location,
            sort,
            lcost,
            hcost,
            cuisine
        }
        this.filterRestaurant(filterobj);
        this.props.history.push(`/filter?mealtype=${mealtype}&locationid=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}
        &cuisine=${cuisine}`);
    }


    setCost = (lcost, hcost) => {
        const { mealtype, sort, location, cuisine } = this.state;
        this.setState({ lcost: lcost, hcost: hcost });
        const filterobj = {
            mealtype,
            location,
            sort,
            lcost,
            hcost,
            cuisine
        }
        this.filterRestaurant(filterobj);
        this.props.history.push(`/filter?mealtype=${mealtype}&locationid=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}
        &cuisine=${cuisine}`);
    }
    handlelocationchange = (event) => {
        const { mealtype, sort, lcost, hcost, cuisine } = this.state;
        const location = event.target.value;
        this.setState({ location: location });
        const filterobj = {
            mealtype,
            location,
            sort,
            lcost,
            hcost,
            cuisine
        }
        this.filterRestaurant(filterobj);
        this.props.history.push(`/filter?mealtype=${mealtype}&locationid=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}
        &cuisine=${cuisine}`);


    }
    handlePages = (page) => {
        const { mealtype, location, sort, lcost, hcost, cuisine } = this.state;
        this.setState({ page: page });
        const filterobj = {
            mealtype,
            location,
            sort,
            page,
            lcost,
            hcost,
            cuisine
        }
        this.filterRestaurant(filterobj);
        this.props.history.push(`/filter?mealtype=${mealtype}&locationid=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}
        &cuisine=${cuisine}&page=${page}`);


    }
    handlepriceSort = (sort) => {
        const { mealtype, location, lcost, hcost, cuisine } = this.state;
        this.setState({ sort: sort });
        const filterobj = {
            mealtype,
            location,
            sort,
            lcost,
            hcost,
            cuisine,
        }
        this.filterRestaurant(filterobj);
        this.props.history.push(`/filter?mealtype=${mealtype}&locationid=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}
        &cuisine=${cuisine}`);

    }
    componentDidMount() {
        const qs = QueryString.parse(this.props.location.search);
        const { mealtype, locationid } = qs;
        this.setState({ mealtype: mealtype, location: locationid });
        const filterobj = {
            mealtype,
            location: locationid
        }
        axios({
            url: "https://zomato-clone-db.herokuapp.com/restaurant/filter",
            method: "POST",
            headers: { 'content-type': 'application/json' },
            data: filterobj
        }).then(
            res => {
                this.setState({ restaurant_data_filter: res.data.restaurant_filter, pages: res.data.pagearr, totalCount: res.data.totalRestaurantCount });
                console.log('1', '2');
                console.table('restaurant_data_filter', this.state.restaurant_data_filter);
                console.log('Pages', res.data.pagearr);
                console.log('Count', res.data.totalRestaurantCount);
            }
        ).catch(
            err => console.log(err)
        )

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
    }
    handleapplybtn = () => {
        document.getElementById('filter_pg').style.display = 'none';
        document.getElementById('filter_pg').style.zIndex = 0;
        document.getElementById('btnfilterapply').style.display = 'none';

    }
    showFilterPage = () => {
        this.setState({ filterpg: true });
        console.log('filter', this.state.filterpg);
        if (this.state.filterpg) {
            let filterpg = document.getElementById('filter_pg');
            filterpg.style.display = 'inline-block';
            filterpg.style.zIndex = 1;
            var Itemsapply = document.getElementById('btnfilterapply');
            Itemsapply.style.display = 'block';
            this.setState({ filterpg: false });

        }
        else {
            document.getElementById('filter_pg').style.display = 'none';
            document.getElementById('filter_pg').style.zIndex = 0;
            document.getElementById('btnfilterapply').style.display = 'none';
        }

    }
    handleRestaurantDetails = (Id) => {
        this.props.history.push(`/details?id=${Id}`);
    }


    render() {
        const { restaurant_data_filter, locations, pages } = this.state;
        return (
            <div>
                <div className="heading-filter">
                    <b>Available Food Places</b>
                </div>
                <div className="mFilterItems">
                    <select aria-placeholder="SelectItems " onClick={this.showFilterPage}>
                        <option>Filters/Sort</option>
                    </select>
                </div>
                <div className="content" >
                    <div className="filter col-fil-s-3 col-fil-m-3 col-fil-lg-3 col-fil-xlg-3 mFilterforselection" id="filter_pg" >
                        <div className="filter_heading">Filters</div>
                        <div className="location">
                            <label >Select Location</label>
                            <br />
                            <select aria-placeholder="Select Location" onChange={this.handlelocationchange}>
                                <option value='0'>Select Location</option>
                                {locations.map((item, index) => {
                                    return (
                                        <option value={item.location_id}>{item.name},{item.city}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="Cuisine">
                            <label>Cuisine</label>
                            <br />
                            <input type="checkbox" name="Cuisine" value='1' onChange={() => this.selectCuisine("Cuisine")} /><span>North Indian</span>
                            <br />
                            <input type="checkbox" name="Cuisine" value='2' onChange={() => this.selectCuisine("Cuisine")} /><span>South Indian</span>
                            <br />
                            <input type="checkbox" name="Cuisine" value='3' onChange={() => this.selectCuisine("Cuisine")} /><span>Chinese</span>
                            <br />
                            <input type="checkbox" name="Cuisine" value='4' onChange={() => this.selectCuisine("Cuisine")} /><span>Fast Food</span>
                            <br />
                            <input type="checkbox" name="Cuisine" value='5' onChange={() => this.selectCuisine("Cuisine")} /><span>Street Food</span>
                        </div>
                        <div className="price">
                            <label>Cost For Two</label>
                            <br />
                            <input type="radio" name="Less than 500" name='cost' onChange={() => this.setCost(undefined, 501)} /><span>Less than &#8377;500</span>
                            <br />
                            <input type="radio" name="500 to 1000" name='cost' onChange={() => this.setCost(500, 1000)} /><span>&#8377;500 to &#8377;1000</span>
                            <br />
                            <input type="radio" name="1000 to 1500" name='cost' onChange={() => this.setCost(1000, 1500)} /><span>&#8377;1000 to &#8377;1500</span>
                            <br />
                            <input type="radio" name="1500 to 2000" name='cost' onChange={() => this.setCost(1500, 2000)} /><span>&#8377;1500 to &#8377;2000</span>
                            <br />
                            <input type="radio" name="2000 above" name='cost' onChange={() => this.setCost(2000, undefined)} /><span>&#8377;2000+</span>
                            <br />
                            <input type="radio" name="All" name='cost' onChange={() => this.setCost(1, 100000)} /><span>All</span>
                            <br />
                            <br />
                        </div>
                        <div className="sort_price">
                            <label>Sort</label>
                            <br />
                            <input type="radio" name="Price low to high" name="sort" onChange={() => this.handlepriceSort(1)} /><span>Price low to high</span>
                            <br />
                            <input type="radio" name="Price high to low" name="sort" onChange={() => this.handlepriceSort(-1)} /><span>Price high to low</span>
                        </div>
                        <div className="mFilterItemsapply">
                            <button id="btnfilterapply" onClick={this.handleapplybtn}>Apply</button>
                        </div>
                    </div>
                    <div className="items col-fil-s-8 col-fil-m-8 col-fil-lg-8 col-fil-xlg-8" style={{ display: "inline-block" }}>
                        {restaurant_data_filter.map((restaurant) => {
                            return (
                                <div className='items_details col-fil-s-11 col-fil-m-11 col-fil-lg-11 col-fil-xlg-11' style={{ display: "inline-block" }} onClick={() => this.handleRestaurantDetails(restaurant._id)}>
                                    <div className="ResultCuisine" style={{ display: "inline-block" }}>
                                        <div className="Img_shutter" style={{ display: "inline-block" }}>
                                            <img src={`./${restaurant.image}`} alt={restaurant.name} />
                                        </div>
                                        <div className="CusineAddress" style={{ display: "inline-block", verticalAlign: "top", textAlign: "left" }}>
                                            <div className="shopname">{restaurant.name}</div>
                                            <div className="shopstreet">{restaurant.locality}</div>
                                            <div className="address">{restaurant.city}</div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="seperator"></div>
                                    <div className="costdetails" >
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>CUISINES:</td>
                                                    <td>{restaurant.cuisine.map((item, index) => ((restaurant.cuisine.length - 1 != index) ? `${item.name}, ` : `${item.name}`))}</td>
                                                </tr>
                                                <tr>
                                                    <td>COST FOR TWO:</td>
                                                    <td>&#8377;{restaurant.min_price}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            )
                        })}
                        <br />
                        <br />
                        {restaurant_data_filter.length === 0 ? <div className="user-msg" style={{ textAlign: "center" }}>
                            No items found in our record. Please look for some other items.
                        </div> : null}
                        {restaurant_data_filter && restaurant_data_filter.length > 0 ? <div className="pagebtn col-fil-s-11 col-fil-m-11 col-fil-lg-11 col-fil-xlg-11" style={{ textAlign: "center" }}>
                            <button className='pagerbtn' >&lt; </button>{pages.map((pagenum) => (
                                <button className='pagerbtn' onClick={() => this.handlePages(pagenum)}>{pagenum}</button>
                            ))}<button className='pagerbtn' >&gt; </button>
                            {/* <span>&lt; </span><span style={{ backgroundColor: "#8c96ab" }}>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>&gt; </span> */}
                        </div> : null}

                    </div>
                </div>
            </div >
        )
    }
}

export default Filter;