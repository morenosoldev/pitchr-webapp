import React,{useEffect} from 'react';
import Flags from "country-flag-icons/react/3x2";

const Flag = ({ flagNationCode,showText }) => {

    const Flag = Flags[flagNationCode];
    let getCountryNames = new Intl.DisplayNames(['en'], {type: 'region'});

useEffect(() => {
console.log(flagNationCode);
  }, [])


    return (
<li className="mb-1" style={{display:'inline'}}> 
<Flag className="flag" style={{display:'inline'}}/>
{showText ? (
<span style={{marginLeft:7}}>

{getCountryNames.of(flagNationCode)}
</span>
): (
  null
)}

 </li>

    );
  };

  export default Flag