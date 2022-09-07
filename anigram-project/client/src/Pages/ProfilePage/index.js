import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update_profile } from "../../actions/profile";

const ProfilePage = ({
  update_profile,
  first_name_global,
  last_name_global,
  phone_global,
  city_global,
  status_global,
  adoptable_global,
  credentials_global,
}) => {
  const [profileUpdated, setProfileUpdated] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    city: "",
    status: "",
    adoptable: "",
    credentials: "",
  });

  console.log(status_global);
  const navigate = useNavigate();

  const { first_name, last_name, phone, city, status, adoptable, credentials } =
    formData;

  useEffect(() => {
    setFormData({
      first_name: first_name_global,
      last_name: last_name_global,
      phone: phone_global,
      city: city_global,
      status: status_global,
      adoptable: adoptable_global,
      credentials: credentials_global,
    });
  }, [first_name_global]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const updateProfile = async () => {
      await update_profile(
        first_name,
        last_name,
        phone,
        city,
        status,
        adoptable,
        credentials
      );
      setProfileUpdated(!profileUpdated);
    };
    updateProfile();
  };

  const toggleAdoption = () => {
    if (adoptable === false) {
      setFormData({ ...formData, adoptable: true });
    } else {
      setFormData({ ...formData, adoptable: false });
    }
  };

  return (
    <div className="profileContainer">
      <div className="profileWrapper">
        <h1> Welcome to the user profile:</h1>
        <p>
          {" "}
          Set whether you want your pet to be adopted, and your contact details,
          along with any credentials to prove you are a certified breeder or
          animal rescuer.
        </p>

        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder={`${first_name_global}`}
              onChange={(e) => onChange(e)}
              value={first_name}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder={`${last_name_global}`}
              onChange={(e) => onChange(e)}
              value={last_name}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder={`${phone_global}`}
              onChange={(e) => onChange(e)}
              value={phone}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              placeholder={`${city_global}`}
              onChange={(e) => onChange(e)}
              value={city}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <input
              type="text"
              name="status"
              placeholder={`${status_global}`}
              onChange={(e) => onChange(e)}
              value={status}
            />
          </div>
          <div>
            <label htmlFor="adoptable">Adoptable?</label>
            <input
              type="checkbox"
              name="adoptable"
              checked={adoptable ? true : false}
              placeholder={`${adoptable_global}`}
              onChange={toggleAdoption}
              // value={adoptable}
            />
          </div>
          <div>
            <label htmlFor="credentials">List credentials here</label>
            <input
              type="text"
              name="credentials"
              placeholder={`${credentials_global}`}
              onChange={(e) => onChange(e)}
              value={credentials}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  first_name_global: state.profile.first_name,
  last_name_global: state.profile.last_name,
  phone_global: state.profile.phone,
  city_global: state.profile.city,
  status_global: state.profile.status,
  adoptable_global: state.profile.adoptable,
  credentials_global: state.profile.credentials,
});
export default connect(mapStateToProps, { update_profile })(ProfilePage);
