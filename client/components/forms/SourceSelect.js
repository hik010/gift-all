import React from 'react';

const SourceSelectForm = ({ handleChange }) => {
  let sourceTypes = ['Amazon / Etsy / Google Shopping', 'custom'];
  return (
    <>
      {sourceTypes.map((source, idx) => (
        <div key={idx} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="formType"
            value={source}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            {source}
          </label>
        </div>
      ))}
    </>
  );
};

export default SourceSelectForm;
