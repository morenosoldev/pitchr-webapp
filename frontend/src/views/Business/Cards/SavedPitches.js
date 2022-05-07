import { Card } from 'react-bootstrap'
import { AiOutlineSave } from 'react-icons/ai';
import '../../../assets/scss/custom/components/card/_statistic.scss';

export default function () {
  return (
    <Card>
     <Card.Body>
      <div className='card-statistic'>
        <div className='card-statistic-text'>
            <h2 className='card-statistic-h2'>
               89
            </h2>
            <span className='font-weight-light'>Saved Pitches</span>
        </div>

        <div className='card-icon'>
            <AiOutlineSave color='#50B5FF' size={'45'}/>
        </div>
      </div>
     </Card.Body>
    </Card>
  )
}
