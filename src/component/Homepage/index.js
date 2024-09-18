import { Component } from "react";
import Cookies from "js-cookie";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Homepage extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profileDetails: {},
  };

  componentDidMount() {
    this.getProfileDetails();
  }

  getProfileDetails = async () => {
    this.setState({ profileApiStatus: apiStatusConstants.inProgress });

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/profile";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      const profileDetails = data.profile_details;
      const updatedData = {
        name: profileDetails.name,
        username: profileDetails.username,
        address: profileDetails.address,
        street: profileDetails.address.street,
        suite: profileDetails.address.suite,
        city: profileDetails.address.city,
        zipcode: profileDetails.address.zipcode,
      };
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ profileApiStatus: apiStatusConstants.failure });
    }
  };

  render() {
    const { profileDetails } = this.state;
    return (
      <>
        <div className="user-profile-container">{profile_details}</div>
      </>
    );
  }
}
