import { Card } from 'react-bootstrap'
import { AiOutlineEye } from 'react-icons/ai';
import '../../../assets/scss/custom/components/card/_statistic.scss';


export default function PitchViews() {
  return (
    <Card>
    <Card.Body>
     <div className='card-statistic'>
       <div className='card-statistic-text'>
           <h2 className='card-statistic-h2'>
              952
           </h2>
           <span className='font-weight-light'>Pitch Views</span>
       </div>

       <div className='card-icon'>
           <AiOutlineEye color='#50B5FF' size={'45'}/>
       </div>
     </div>
    </Card.Body>
   </Card>
  )
}
