import React from "react";

const AccountDetails = ({
  state,
  setState,
  categories,
  emailcheck,
  handleEmailChange,
}) => {
  const programs = ["SheTechs", "OIP", "Greenovation"];

  return (
    <div className="input-modal-column">
      <h2>Register</h2>
      <h3>Setup Startup account</h3>
      <div className="input-row">
        <div className="input-column">
          <h4>username</h4>
          <input
            type="text"
            placeholder="min 4 characters"
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
        </div>
        <div className="input-column">
          <h4>password</h4>
          <input
            placeholder="min 8 characters"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="input-column">
          {!emailcheck ? <h4>email</h4> : null}
          {emailcheck ? <p style={{ color: "red" }}>{emailcheck}</p> : null}
          <input
            type="email"
            placeholder="@email.com"
            value={state.email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-column">
          <h4>category</h4>
          <select
            value={state.category}
            onChange={(e) => setState({ ...state, category: e.target.value })}
          >
            <option value="" disabled selected>
              -select-
            </option>
            <option value="catalyzer">Catalyzer</option>
            <option value="OIP">OIP</option>
            <option value="SheTechs">SheTechs</option>
            <option value="Greenovation">Greenovation</option>
          </select>
        </div>
      </div>
      {programs.includes(state.category) ? null : (
        <div className="input-row">
          <div className="input-column">
            <h4>contract date</h4>
            <input
              type="date"
              value={state.contractDate}
              onChange={(e) =>
                setState({ ...state, contractDate: e.target.value })
              }
            />
          </div>
          <div className="input-column">
            <h4>Percentage Revenue Share</h4>
            <input
              placeholder="5%"
              value={state.percentageShare}
              onChange={(e) =>
                setState({ ...state, percentageShare: e.target.value })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
