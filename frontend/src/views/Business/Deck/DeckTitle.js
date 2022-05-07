import React, { useState } from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';

export default function DeckTitle({data,changeTitle,removeRow,move}) {

const onChange = (e) => {
changeTitle(e.target.value,data.id);
}

  return (
    <div className="deck-title-container">
    <input type="text" className="deck-input" placeholder="Section Title (optional)" value={data.title} onChange={onChange}/>
    <div className="deck-title-icons">
      <a href="#">
    <BsTrash onClick={() => removeRow(data.id)} size={'20'}/>    
      </a>
     <BsPencil size={'20'}/>   
     <span {...move}>
      <AiOutlineMenu size={'20'}/>
     </span>
    </div>
    </div>
  )
}
