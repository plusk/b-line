import React from "react";
import "./Favorites.scss";
import homeIcon from "../../assets/001-home.png";
import workIcon from "../../assets/002-work.png";
import schoolIcon from "../../assets/003-school.png";
import plusIcon from "../../assets/004-more.png";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeAddress: "",
      workAddress: "",
      campusAddress: "",
      otherAddress: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(param, event) {
    this.setState({ param: event.target.param });
  }

  render() {
    return (
      <div class="wrapper">
        <h2 class="favorites-heading">Favorites</h2>
        <div class="address">
          <img class="fa fa-icon" src={homeIcon} alt="home" />
          <input
            type="text"
            placeholder="Home address"
            name="homeAddress"
            onChange={e => this.handleChange(this.state.homeAddress, e)}
            homeAddress={this.state.homeAddress}
          />
        </div>
        <div class="address">
          <img class="fa fa-icon" src={workIcon} alt="home" />
          <input
            type="text"
            placeholder="Work address"
            name="workAddress"
            onChange={e => this.handleChange(this.state.workAddress, e)}
            workAddress={this.state.workAddress}
          />
        </div>
        <div class="address">
          <img class="fa fa-icon" src={schoolIcon} alt="school" />
          <input
            type="text"
            placeholder="Campus address"
            name="campusAddress"
            onChange={e => this.handleChange(this.state.campusAddress, e)}
            campusAddress={this.state.campusAddress}
          />
        </div>
        <div class="address">
          <img class="fa fa-icon" src={plusIcon} alt="home" />
          <input
            type="text"
            placeholder="New favorite"
            name="otherAddress"
            onChange={e => this.handleChange(this.state.otherAddress, e)}
            otherAddress={this.state.otherAddress}
          />
        </div>
        <div class="address">
          <button type="submit">Save</button>
        </div>
      </div>
    );
  }
}

export default Favorites;
