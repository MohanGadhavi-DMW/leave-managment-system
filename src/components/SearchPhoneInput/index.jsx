import { PhoneNumberUtil } from 'google-libphonenumber';
import React, { useState } from "react";
import {
    PhoneInput, defaultCountries,
    parseCountry,
} from "react-international-phone";
import "react-international-phone/style.css";
// import "./style.css";

const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};
export default function SearchPhoneInput({ defaultCountryCode = "in", defaultPhone = "", onChange = () => { } }) {
    const [phone, setPhone] = useState(defaultPhone);
    const [isValid, setIsValid] = useState(isPhoneValid(phone));

    //If you want to filter specific countries
    // const countries = defaultCountries.filter((country) => {
    //     const { iso2 } = parseCountry(country);
    //     return ['us', 'ua', 'gb'].includes(iso2);
    // });

    const onPhoneChange = (phone, meta) => {
        // console.log("SearchPhoneInput -> isValid, phone", isValid, phone);
        setPhone(phone);

        const valid = isPhoneValid(phone);
        setIsValid(valid);
        if (valid) onChange({
            phone: phone,
            dialCode: meta.country.dialCode, // e.g. "91"
            countryCode: meta.country.iso2,    // e.g. "in"
        });
    }

    return (
        <div className='flex flex-col w-full border-0'>
            <PhoneInput
                required={true}
                placeholder="Enter phone no."
                value={phone}
                onChange={onPhoneChange}
                defaultCountry={defaultCountryCode}
                preferredCountries={["in", "us", "gb"]}
                // countries={countries}
                inputProps={{
                    style: { width: "85%" }
                }}
            />
            {/* {!isValid && <div className='text-sm text-red-500 mt-1'>Phone is not valid</div>} */}
        </div>
    );
}