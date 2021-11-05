import react from "react";
import { Component } from "react";
import { withRouter } from "react-router";
class QuickSearch extends react.Component {

    navigatetoFilter = (mealType_id) => {
        const locationid = sessionStorage.getItem('locationid');
        if (locationid) {
            this.props.history.push(`/filter?mealtype=${mealType_id}&locationid=${locationid}`);
        }
        else {
            this.props.history.push(`/filter?mealtype=${mealType_id}`);
        }

    }

    render() {
        const { quickSearchItemsData } = this.props;
        return (
            <div>
                <div className="row items-home" style={{ height: "160px" }}>
                    {quickSearchItemsData.map((item, index) => {
                        return (
                            <div className="col-s-5 col-m-4 col-lg-4 col-xlg-4 list-item" style={{ border: "1px solid #ffffff", height: "160px", display: "inline-block" }}>
                                <div className="Menucard" style={{ display: "inline-block" }} key={item.meal_type} onClick={() => this.navigatetoFilter(item.meal_type)}>
                                    <div className="Img_shutter_home">

                                        <img src={`./${item.image}`} alt={`The ${item.name}`} />

                                    </div>
                                    <div className="Menudetails">
                                        <div className="Menuname">{item.name}</div>
                                        <div className="details">{item.content}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>)
    }

}

export default withRouter(QuickSearch);