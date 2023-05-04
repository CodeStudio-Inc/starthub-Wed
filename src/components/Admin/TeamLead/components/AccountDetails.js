import React from "react";

const AccountDetails = ({ state, setState, emailcheck, handleEmailChange }) => {
  return (
    <div className="input-modal-column">
      <h4>Setup account details</h4>
      <h4>username</h4>
      <input
        type="text"
        placeholder="min 4 characters"
        value={state.username}
        onChange={(e) => setState({ ...state, username: e.target.value })}
      />
      {!emailcheck ? <h4>email</h4> : null}
      {emailcheck ? <p style={{ color: "red" }}>{emailcheck}</p> : null}
      <input
        type="email"
        placeholder="@email.com"
        value={state.email}
        onChange={handleEmailChange}
      />
      <h4>password</h4>
      <input
        placeholder="min 8 characters"
        value={state.password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <h4>category</h4>
      <select
        value={state.category}
        onChange={(e) => setState({ ...state, category: e.target.value })}
      >
        <option value="" disabled selected>
          -select-
        </option>
        <option value="internal">StartHub</option>
        <option value="academy">Academy</option>
        <option value="catalyzer">Catalyzer</option>
        <option value="comms">Comms</option>
      </select>
    </div>
  );
};

export default AccountDetails;
