import React from "react";
import RadioGroup from "./RadioGroup";

import "./Settings.scss";
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "First arrival" };
  }
  handleChange(event) {
    this.setState({ selected: event.target.value });
  }
  render() {
    return (
      <div className="Settings">
        <h2 className="SettingsHeading">Settings</h2>
        <RadioGroup
          selected={this.state.selected}
          title="Route Priorities"
          values={[
            "First arrival",
            "Shortest journey",
            "Fewest transfers",
            "Least walking"
          ]}
          handleChange={e => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default Settings;
