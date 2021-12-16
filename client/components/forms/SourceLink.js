import React, { useState } from "react";

const SourceLinkForm = ({ formType, fetchData }) => {
  let [data, setData] = useState({ link: '' });

  const handleChange = (event) => {
    setData({ [event.target.name]: event.target.value });
  };

  return (
    <div className="form-floating mt-3">
      <input
        name="link"
        className="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        value={data.link}
        onChange={handleChange}
      />
      <label htmlFor="floatingInput">{formType + ' Link'}</label>
      <button
        name={formType}
        className="btn btn-primary"
        onClick={() => fetchData(formType, data.link)}
      >
        Add
      </button>
    </div>
  );
};

export default SourceLinkForm
