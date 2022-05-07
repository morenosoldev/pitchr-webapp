import React, { useEffect, useState } from 'react'
import '../../../assets/scss/custom/components/deck/deck.scss';
import { Col,Row,Container, Button } from 'react-bootstrap';
import NewGrid from '../Deck/NewGrid';
import Content from '../Deck/Content';
import { pitchActions } from '../../../store/actions/pitch.actions';
import { useSelector } from 'react-redux';
import API from '../../../util/AxiosConfig';
import '../../../assets/scss/custom/components/deck/deck-showcase.scss';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineVideoCamera } from 'react-icons/ai';

export default function DeckShowcase() { 
const { id } = useParams();

const user = useSelector(state => state.authentication.user);    
const [data,setData] = useState([])

const [selectedColumn,setSelectedColumn] = useState(data[0]?.subItems[0]?.content)


useEffect(async() => {
const lastSaved = (await API.get(`/pitch/${id}`)).data
if(lastSaved?.length > 0){
setData(lastSaved);
}

},[])


const selectColumn = (obj) => {
setSelectedColumn(obj);
}

  return (
    <Container className='h-100' fluid>
      {data.length > 0 ? (
  <Row className='h-100'>
          <Col className='container-wrapper-subItems h-100' sm={3}>
            <Row style={{height:'100%', overflowY:'scroll'}}>
            <div className='subItems-container'>
            {data.map((item) => (
            <div className='deck-section-show mt-3 mb-3'>
              <h2 className='deck-title-show'>
            {item.title}
              </h2>
            {item.subItems.map(deck => (
                <div onClick={() => selectColumn(deck)} className={`deck-container-show mb-3`}>
                    <div className='deck-image-show'>
                     <AiOutlineVideoCamera size={'25'} color={selectedColumn?.id == deck.id ? "blue" : "black"}/>
                    </div>
                    <div className="deck-content-show">
                     <h2>{deck.title}</h2>
                     <span>{deck?.content?.duration}</span>
                    </div>
                </div>
            ))}
            </div>    
            ))}
            </div>
            </Row>
            </Col>
            
            <Col sm>
            <Content content={data} selectedColumn={selectedColumn}/>
            </Col>
        </Row>
      ): (
        <div className='content-parent'>
            <div className='content-container'>
            <div className='mx-auto'>
                <div style={{display:'flex', flexDirection:'column'}} className='content-icon'>
                 <h2 className='text-center'>You have not created your first pitch yet!</h2>
                 <p className='text-center'>Get started, click the button down below.</p>
                 <Link to="/business/app/upload" className='mt-3' style={{margin:'0 auto'}}>Create pitch</Link>
                </div>     
            </div>
        </div>
    </div>
      )}
      
    </Container>
  )
}
