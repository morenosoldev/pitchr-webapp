import React, { useEffect } from "react";
import Flags from "country-flag-icons/react/3x2";

const Flag = ({ flagNationCode, showText }) => {
  const Flag = flagNationCode?.length ? Flags[flagNationCode] : "US";
  let getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });

  useEffect(() => {}, []);

  return (
    <li className="mb-1" style={{ display: "inline" }}>
      <Flag className="flag" style={{ display: "inline" }} />
      {showText ? (
        <span style={{ marginLeft: 7 }}>
          {getCountryNames.of(
            flagNationCode?.length > 0 ? flagNationCode : "US"
          )}
        </span>
      ) : null}
    </li>
  );
};

export default Flag;
