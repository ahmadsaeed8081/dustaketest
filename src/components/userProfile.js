import React from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "../../src/assets/Icons/LogoutIcon";

const UserProfile = () => {


  function logout()
  {
    window.location.reload();
  }

  return (
    <span  className="btn button" onClick={logout}> Logout</span>

    // <Link to={window.location.reload}>
    //   {/* <img
    //     src="/images/user-img.png"
    //     className="h-12 w-12 rounded-full"
    //     alt="img"
    //   /> */}
    // </Link>
  );
};

export default UserProfile;
