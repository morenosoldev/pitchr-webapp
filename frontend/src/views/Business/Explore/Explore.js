import React from 'react'
import { Badge, Button, Form, FormControl, Table } from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsChevronBarDown, BsChevronDown, BsEye, BsUpload } from 'react-icons/bs'
import Flag from '../../../components/Flag/Flag'
import './explore.css'

export default function Explore() {

  return (
   <div className="tw-px-2 tw-py-8 tw-mx-auto tw-max-w-7xl">
   <div className="tw-relative tw-px-6 tw-py-10 tw-overflow-hidden tw-border-blue-100 tw-rounded-2xl lg:tw-p-16 lg:tw-flex lg:tw-flex-col lg:tw-items-center lg:tw-justify-between">
   <div className="tw-absolute tw-top-0 tw-left-0 tw-z-10 tw-hidden tw-h-full tw-p-4 tw-mt-1 tw-ml-3 tw--mt-4 tw--ml-4 tw-transform tw--rotate-90 lg:tw-block">
   </div>

   <div className="tw-relative tw-z-20 tw-mb-6 tw-mt-6 tw-text-lg tw-text-black">
   <Form className="d-flex">
       <input type="text" className='explore-input' placeholder='Search investors...'/>
       <button className='explore-btn'>
        <AiOutlineSearch size={'20'} color={'white'}/>
       </button>
      </Form>
   </div>
   <div className="tw-relative tw-z-20 tw-flex tw-flex-col tw-items-center tw-w-full tw-space-y-5 md:tw-space-x-5 md:tw-space-y-0 md:tw-flex-row md:tw-w-auto lg:tw-flex-shrink-0 md:tw-px-0">
       <div style={{width:'500px'}} className='tw-flex tw-justify-around'>
        <a  className='explore-link' href='#'>
            Countries of investment <BsChevronDown style={{marginLeft:'6px'}}/>
        </a>
        <a className='explore-link' href='#'>
            Stages of investment <BsChevronDown style={{marginLeft:'6px'}}/>
        </a>
        <a  className='explore-link' href='#'>
            First cheque <BsChevronDown style={{marginLeft:'6px'}}/>
        </a>
       </div>
    </div>
    </div>

    <Table id="results_tb" responsive>
  <thead>
    <tr>
     <th></th>
     <th>Investor <br></br> name</th>
     <th>Countries of<br></br> investment</th>
     <th>First <br></br> cheque</th>
     <th>Stages <br></br> of investment</th>
     <th>Investment<br></br> thesis</th>
     <th>
         4666 records
         
     </th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>
        <a href="#">
        <img className='company-pic' src="https://dl.airtable.com/.attachments/634e2c7d2e0214fd1a9dff30dc9aceda/8f6ecd42/Unrest.world_unrest_world__Twitter.worldunrest_worldTwitter" style={{maxWidth:'60px'}}/>
        </a>
        </td>

        <td>
        <a className='company-name' href="#">
        Unpopular Ventures
        </a>
        </td>

        <td>
        <Badge>
        <Flag flagNationCode={'ES'} showText={true}/>
        </Badge>
        <Badge>
        <Flag flagNationCode={'DK'} showText={true}/>
        </Badge>
        <Badge>
        <Flag flagNationCode={'UG'} showText={true} />
        </Badge>
        </td>

        <td>
        $20k to<br></br> $500k
        </td>

        <td>
         <Badge>
         1. Idea or Patent
         </Badge>
         <br></br>
         <Badge>
         2. Prototype
         </Badge>
<br></br>
         <Badge>
         3. Early Revenue
         </Badge>
        </td>

        <td>
        We invest in the category leaders of tomorrow whose<br></br> potential is being underestimated today.
        </td>

        <td>
        <a href="#" className='text-white btn tw-flex tw-items-center tw-justify-evenly mb-1 w-100 btn-primary text-nowrap'> <BsUpload color="white"/> Submit pitch</a>
        <a href="#" className='w-100 btn tw-flex tw-items-center explore-details tw-justify-evenly btn-primary text-nowrap"'> <BsEye color="#50b5ff" /> View details</a>

        </td>
    </tr>

    <tr>
        <td>
        <a href="#">
        <img className='company-pic' src="https://dl.airtable.com/.attachments/90f06fae7b9d73b62fba3b1c44c7c6ec/b84704a3/1635944291111e1646265600vbetatkjuUgqLY91CkHvC3eMCfy4HbMeaLCmmGC3j7Ai1QEKU" style={{maxWidth:'60px'}}/>
        </a>
        </td>

        <td>
        <a className='company-name' href="#">
        Mempool Ventures
        </a>
        </td>

        <td>
        <Badge>
        <Flag flagNationCode={'ES'} showText={true}/>
        </Badge>

        <Badge>
        <Flag flagNationCode={'DK'} showText={true}/>
        </Badge>
        </td>

        <td>
        $20k to<br></br> $500k
        </td>

        <td>
         <Badge>
         1. Idea or Patent
         </Badge>
         <br></br>
         <Badge>
         2. Prototype
         </Badge>
<br></br>
         <Badge>
         3. Early Revenue
         </Badge>
        </td>

        <td>
        We invest in breakthrough tech at its genesis stage
        </td>

        <td>
        <a href="#" className='text-white btn tw-flex tw-items-center tw-justify-evenly mb-1 w-100 btn-primary text-nowrap'> <BsUpload color="white"/> Submit pitch</a>
        <a href="#" className='w-100 btn tw-flex tw-items-center explore-details tw-justify-evenly btn-primary text-nowrap"'> <BsEye color="#50b5ff" /> View details</a>

        </td>
    </tr>

    <tr>
        <td>
        <a href="#">
        <img className='company-pic' src="https://dl.airtable.com/.attachments/4c43b6dd6fdbb0d7320ea30b029efa2b/33e11b7a/ScreenShot2021-10-14at4.30.02PM.png" style={{maxWidth:'60px'}}/>
        </a>
        </td>

        <td>
        <a className='company-name' href="#">
        Systema VC   
        </a>
        </td>

        <td>
        <Badge>
        <Flag flagNationCode={'US'} showText={true}/>    
        </Badge>
        <Badge>
        <Flag flagNationCode={'DK'} showText={true}/>    
        </Badge>
        <br></br>
        <Badge>
        <Flag flagNationCode={'DE'} showText={true}/>    
        </Badge>
        </td>

        <td>
        $20k to<br></br> $500k
        </td>

        <td>
         <Badge>
         1. Idea or Patent
         </Badge>
         <br></br>
         <Badge>
         2. Prototype
         </Badge>
<br></br>
         <Badge>
         3. Early Revenue
         </Badge>
        </td>

        <td>
        We invest in Fintech, Legaltech and Proptech<br></br> globally except USA and China
        </td>

        <td>
        <a href="#" className='text-white btn tw-flex tw-items-center tw-justify-evenly mb-1 w-100 btn-primary text-nowrap'> <BsUpload color="white"/> Submit pitch</a>
        <a href="#" className='w-100 btn tw-flex tw-items-center explore-details tw-justify-evenly btn-primary text-nowrap"'> <BsEye color="#50b5ff" /> View details</a>

        </td>
    </tr>
  </tbody>
</Table>

    </div>

  )
}
