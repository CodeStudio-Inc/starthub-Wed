import React from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { actionCreators, svg } from "../../../Paths";
import { validateObjectData } from "../../../utilities/helpers";
import EmailIcon from "@mui/icons-material/Email";

const ProfileCard = ({ username, email, loading }) => {
  const [state, setState] = React.useState({
    oldPassword: "",
    newPassword: "",
  });
  const [visible, setVisible] = React.useState(false);

  const dispatch = useDispatch();

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const changePassword = () => {
    const data = state;
    dispatch(
      actionCreators.updateProfileItem(
        `auth/change-password`,
        data,
        (data) => {
          if (validateObjectData(data)) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            console.log(success);
            setState({
              oldPassword: "",
              newPassword: "",
            });
            dispatch(actionCreators.removeUser());
          }
          if (!success) message.info("Old password does not match");
        }
      )
    );
  };

  return (
    <div className="profile-content">
      <div className="profile-content-header">
        <div className="startup-avatar">
          <h1>{username.substring(0, 1)}</h1>
        </div>
      </div>
      <div className="profile-content-row">
        <div className="profile-details-column">
          <h3>{username}</h3>
          <div className="profile-details-row">
            <EmailIcon
              style={{
                color: "rgba(0,0,0,0.2)",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
            <h4>{email}</h4>
          </div>
        </div>
        <div className="change-password-row">
          {visible ? (
            <div className="change-password-input">
              <input
                placeholder="enter old password"
                value={state.oldPassword}
                onChange={(e) =>
                  setState({ ...state, oldPassword: e.target.value })
                }
              />
              <input
                placeholder="enter new password"
                value={state.newPassword}
                onChange={(e) =>
                  setState({ ...state, newPassword: e.target.value })
                }
              />
              <p onClick={changePassword}>save changes</p>
              <p onClick={hide}>cancel</p>
            </div>
          ) : null}
          {visible ? null : <p onClick={show}>change password</p>}
        </div>
      </div>
      {loading ? (
        <img
          src={svg}
          style={{ height: "40px", width: "40px", alignSelf: "center" }}
        />
      ) : null}
    </div>
  );
};

export default ProfileCard;
