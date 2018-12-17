import React from "react";
import "./Favorites.scss";
import homeIcon from "../../assets/001-home.png";
import workIcon from "../../assets/002-work.png";
import schoolIcon from "../../assets/003-school.png";
import newIcon from "../../assets/004-more.png";

import FavoriteField from "./FavoriteField";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: "",
      work: "",
      school: "",
      new: ""
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div className="FavoritesContainer">
        <h2 className="FavoritesHeading">Favorites</h2>
        <FavoriteField
          value={this.state.home}
          name="home"
          icon={homeIcon}
          handleChange={e => this.handleChange(e)}
        />
        <FavoriteField
          value={this.state.work}
          name="work"
          icon={workIcon}
          handleChange={e => this.handleChange(e)}
        />
        <FavoriteField
          value={this.state.school}
          name="school"
          icon={schoolIcon}
          handleChange={e => this.handleChange(e)}
        />
        <FavoriteField
          value={this.state.new}
          name="new"
          icon={newIcon}
          handleChange={e => this.handleChange(e)}
        />
        <button className="FavoritesSubmit">Save</button>
      </div>
    );
  }
}

export default Favorites;
