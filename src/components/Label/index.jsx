import React from "react";

const Label = ({ text, required }) => {
    return <label className="block text-sm mb-2">{text}{required && <span className="star">*</span>}</label>
}
export default Label;
