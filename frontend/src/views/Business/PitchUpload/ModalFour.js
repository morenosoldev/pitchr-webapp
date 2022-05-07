import React from 'react'
import { useSelector } from 'react-redux';
import { Spinner,Container,Row,Col,Button} from 'react-bootstrap';
import baloons from '../../../assets/images/balloons.png';
import { history } from '../../../util/history';

export default function ModalThree() {
    const loading = useSelector(state => state.pitch.loading);    
    const user = useSelector(state => state.authentication.user);

    return (
        <div>
          {loading ? (
              <> 
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh'}}>
            <Spinner animation="grow" />
            </div>
              </>
          ): (
            <>
               <Container>
              <Row>
            <Col sm={12}> 
            
            <div style={{display:'flex',flexDirection:'column', padding:20, justifyContent:'center',alignItems:'center'}}>
            <h1>Hurraay</h1>
            <h2>Congratulations on your first pitch!</h2>
            <img src={baloons} width={'150px'}/>
            
            <Button onClick={() => history.push(`/business/app/company/${user.user_id}/pitch`)} style={{marginTop:25}}>
              Check out
            </Button>
               
             </div>
            </Col>
              </Row>
                </Container>
            </>
          )}    
            
        </div>
    )
}
