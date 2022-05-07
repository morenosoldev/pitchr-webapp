import React,{useState,useEffect} from 'react'
import {Row, Col,Badge, Container, Nav, Tab, Button} from 'react-bootstrap'
import Card from '../../../components/Card'
import { useSelector,useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import API from '../../../util/AxiosConfig'
import {storage} from '../../../firebase/index';
import ReactFlagsSelect, { Gb } from 'react-flags-select';
import { InputGroup,FormControl } from 'react-bootstrap'
import { userActions } from '../../../store/actions'
import Select from 'react-select'
import Flag from '../../../components/Flag/Flag'

const UserProfile =() =>{
   const dispatch = useDispatch();
   const user = useSelector(state => state.authentication.user);
   const [selected, setSelected] = useState('');
   const [description,setDescription] = useState('')
   const [writeDescription,setWriteDescription] = useState(false);

   const [writeMarkets, setWriteMarkets] = useState(false);
   const [markets,setMarkets] = useState([]);
   const [temporaryMarkets,setTemporaryMarkets] = useState([]);
   const [market,setMarket] = useState('');

   const [investmentInterest,setInvestmentInterest] = useState('');
   const [investmentInterests, setInvestmentInterests] = useState([]);
   const [temporaryInterests,setTemporaryInterests] = useState();
   const [writeInvestmentInterest, setWriteInvestmentInterest] = useState(false);

   const [previousInvestment,setPreviousInvestment] = useState('');
   const [previousInvestments, setPreviousInvestments] = useState([]);
   const [temporaryInvestments, setTemporaryInvestments] = useState([]);
   const [writePreviousInvestments, setWritePreviousInvestments] = useState(false);

   const [writeCompetences, setWriteCompetences] = useState(false);
   const [competences,setCompetences] = useState([]);
   const [competence,setCompetence] = useState('');

   const [writeIndustry, setWriteIndustry] = useState(false);
   const [industrys,setIndustrys] = useState([]);
   const [temporaryIndustrys,setTemporaryIndustrys] = useState([]);
   const [industry,setIndustry] = useState('');

   const preIndustrys = [
      {value: "Technology",label: "Technology"},
      {value: "Fintech",label: "Fintech"},
      {value: "Entertainment",label: "Entertainment"},
   ]

   console.log(user);

   const handleSelect = (country) => {
      console.log(country)
      /* returns the details on selected country as an object
         {
            name: "United States of America", 
            code: "US", 
            capital: "Washington, D.C.", 
            region: "Americas", 
            latlng: [38, -97]
          }
      */
    }

   const [writeCapital, setWriteCapital] = useState(false);
   const [capital,setCapital] = useState();

   useEffect(async() => {
     const ces = await API.get(`/getInvestorCompetences/${user.id}`);
     setCompetences(ces.data);

     const res = await API.get(`/getPreviousInvestments/${user.id}`);
     setPreviousInvestments(res.data);
     setTemporaryInvestments(res.data);

     const kes = await API.get(`/getIndustrys/${user.id}`);
     setIndustrys(kes.data);
     setTemporaryIndustrys(kes.data);

     const les = await API.get(`/getMarkets/${user.id}`);
     setMarkets(les.data);
     setTemporaryMarkets(les.data);

     const mes = await API.get(`/getInvestmentInterests/${user.id}`);
     setInvestmentInterests(mes.data);
     setTemporaryInterests(mes.data);

   }, [])


   const submitDescription = () => {
      if(description.length > 0){
         dispatch(userActions.updateDescription(description, user?.user_id));
         setWriteDescription(false);
      }
   }

   const submitCapital = () => {
      if(capital.length > 0){
         dispatch(userActions.updateCapital(capital, user?.user_id));
         setWriteCapital(false);
      }
   }


   const addMarket = (code) => {
         setTemporaryMarkets(oldArray => [...oldArray, {"name": code}]);
   }
  
   const removeMarket = (key) => {
      setTemporaryMarkets(temporaryMarkets.filter((item,index) => index !== key));
   }
  
   const submitMarkets = async(e) => {  
       e.preventDefault()
     await API.put(`/updateMarkets/${user.user_id}`, {"markets": temporaryMarkets}).then(res => {
      setWriteMarkets(false);
      setMarkets(temporaryMarkets);
     })
     .catch(err => {
         console.log(err);
     })
   }


   const addCompetence = () => {
      if(competence.length > 0){
       setCompetences(oldArray => [...oldArray, {"name": competence}]);
      }
   }
  
   const removeCompetences = (key) => {
      setCompetences(competences.filter((item,index) => index !== key));
   }
  
   const submitCompetences = async(e) => {  
       e.preventDefault()
     await API.put(`/updateInvestorCompetences/${user.user_id}`, {"competences": competences}).then(res => {
      setWriteCompetences(false);
     })
     .catch(err => {
         console.log(err);
     })
   }

   const addIndustry = (selectedOption) => {
         setTemporaryIndustrys(oldArray => [...oldArray, {"name": selectedOption.value}]);
   }
  
   const removeIndustry = (key) => {
      setTemporaryIndustrys(temporaryIndustrys.filter((item,index) => index !== key));
   }
  
   const submitIndustrys = async(e) => {  
       e.preventDefault()
     await API.put(`/updateIndustrys/${user.user_id}`, {"industrys": temporaryIndustrys}).then(res => {
      setWriteIndustry(false);
      setIndustrys(temporaryIndustrys)
     })
     .catch(err => {
         console.log(err);
     })
   }


   const addInvestmentInterest = () => {
      if(investmentInterest.length > 0){
        setTemporaryInterests(oldArray => [...oldArray, {"name": investmentInterest}])
        //setInvestmentInterests(oldArray => [...oldArray, {"name": investmentInterest}]);
      }
   }
  
   const removeInvestmentInterest = (key) => {
      //setInvestmentInterests(investmentInterests.filter((item,index) => index !== key));
      setTemporaryInterests(temporaryInterests.filter((item,index) => index !== key));
   }
  
   const submitInvestmentInterest = async(e) => {  
       e.preventDefault()
     await API.put(`/updateInvestmentInterests/${user.user_id}`, {"investmentInterests": temporaryInterests}).then(res => {
      setWriteInvestmentInterest(false);
      setInvestmentInterests(temporaryInterests)
     })
     .catch(err => {
         console.log(err);
     })
   }

   const addPreviousInvestment = () => {
      if(previousInvestment.length > 0){
    setTemporaryInvestments(oldArray => [...oldArray, {"name": previousInvestment}]);
      }
   }
  
   const removePreviousInvestment = (key) => {
      setTemporaryInvestments(temporaryInvestments.filter((item,index) => index !== key));
   }


   
const uploadImage = async (image) => {
   const imageRef = storage.ref(`images/${image.name}`)
   await imageRef.put(image)
   .on(
     "state_changed",
     (snapshot) => {
       const progress = Math.round(
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       );
       console.log(progress)
     },
 (error) => {
   // file upload failed
   console.log(error);
 },
 () => {
   // file upload completed
   storage.ref(`images/${image.name}`).getDownloadURL()
     .then(
       async(url) => {
          console.log(url)
         dispatch(userActions.updateProfilePicture(url,user?.user_id));
       },
       (error) => {
         // failed to get download URL
         console.log(error);
       }
     );
   }
);
}

   const submitPreviousInvestment = async(e) => {  
       e.preventDefault()
     await API.put(`/updatePreviousInvestments/${user.user_id}`, {"previousInvestments": temporaryInvestments}).then(res => {
      setWritePreviousInvestments(false);
      setPreviousInvestments(temporaryInvestments);
     })
     .catch(err => {
         console.log(err);
     })
   }


  return(
      <>
         <Container fluid>
            <Row>
               <Col sm={12}>
                  <Card>
                     <Card.Body className=" profile-page p-0">
                        <div className="profile-header" style={{display:'flex', justifyContent:'center'}}>
                           <div style={{marginTop:'2rem'}} className="user-detail text-center mb-3">
                              <div className="profile-img">
                                 <img src={user?.profile_pic} alt="profile-img1" className="avatar-130 rounded-circle img-fluid" />

  <label className='add-picture' for="file-input-cover">
   <i class="upload-icon fas fa-camera" style={{cursor:'pointer'}}></i>
  </label>


  <input style={{display:'none'}} id="file-input-cover" type="file"  onChange={async(e) => await uploadImage(e.target.files[0])} />
                              </div>

         
                              <div className="profile-detail">
                                 <h3>{user?.name}</h3>
                              </div>
                           </div>
                           <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                          </div>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
               <Tab.Container id="left-tabs-example" defaultActiveKey="second">
                  <Col sm={12}>
                   <div className="card p-0">
                     <div className="card-body p-0">
                        <div className="user-tabing">
                           <Nav as="ul" variant="pills" className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                              <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                                 <Nav.Link  href="#pills-about-tab" eventKey="second" role="button" className="text-center p-3">About me</Nav.Link>
                              </Nav.Item>

                              <Nav.Item as="li" className=" col-12 col-sm-3 p-0">
                                 <Nav.Link  href="#pills-friends-tab"  eventKey="third" role="button" className="text-center p-3">Investment details</Nav.Link>
                              </Nav.Item>

                              <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                                 <Nav.Link  href="#pills-photos-tab"  eventKey="forth" role="button" className="text-center p-3">Capital and competences</Nav.Link>
                              </Nav.Item>

                           </Nav>
                        </div>
                     </div>
                  </div>   
                  </Col>
                 
                  <Col sm={12}>
                     <Tab.Content>
                        <Tab.Pane eventKey="second">
                           <Tab.Container id="left-tabs-example" defaultActiveKey="about5">
                              <Card>
                                 <Card.Body>
                                    <Row>
                                       <Col md={3}>
                                          <Nav variant="pills"  className=" basic-info-items list-inline d-block p-0 m-0">
                                             <Nav.Item >
                                                <Nav.Link href="#" eventKey="about5">Introduction</Nav.Link>
                                             </Nav.Item>             
                                            
                                          </Nav>
                                       </Col>
                                       <Col className=" ps-4">
                                          <Tab.Content >
                                             <Tab.Pane eventKey="about5">
                                                <div className='profile-setting-header'>
                                                 <h4 className="mb-3">About You</h4>

                                                 {!writeDescription ? (
                                                <div className="user-img img-fluid"><i className="fas fa-user-edit" onClick={() => setWriteDescription(true)} style={{cursor:'pointer'}}></i></div>
                                                 ): (
                                                    null
                                                 )}
                                                </div>
                                              

                                                {writeDescription ? (
                                                <div>
<Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Add a short description of yourself.</Form.Label>
    <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
  </Form.Group>
  <Button onClick={() => submitDescription()}>Submit</Button>
  <Button variant='danger' style={{marginLeft:10}} onClick={() => setWriteDescription(false)}>Cancel</Button>

</Form>
                                                </div>) :
                                                <>
                                                 {user?.description ? 
                                                   <ul className="suggestions-lists m-0 p-0">
                                                   <li className="d-flex mb-4 align-items-center">
                                                      <div className="ms-3">
                                                         <h6>{user?.description}</h6>
                                                      </div>
                                                   </li>
                                                </ul>
                                                   : 
                                                      <ul className="suggestions-lists m-0 p-0">
                                                      <li className="d-flex mb-4 align-items-center">
                                                         <div className="user-img img-fluid"><i className="ri-add-fill" onClick={() => setWriteDescription(true)} style={{cursor:'pointer'}}></i></div>
                                                         <div className="ms-3">
                                                            <h6>Add short description</h6>
                                                         </div>
                                                      </li>
                                                   </ul>
                                                }
                                                </>  
                                                }

                                               
                                             </Tab.Pane>
                                          </Tab.Content>
                                       </Col>
                                    </Row>
                                 </Card.Body>
                              </Card>
                           </Tab.Container>
                        </Tab.Pane> 
                        <Tab.Pane eventKey="third" >
                           <Tab.Container id="left-tabs-example" defaultActiveKey="all-friends">
                              <Card>
                                 <Card.Body>
                                    
                                    <Container fluid>
                                       <Row>
                                       <Col sm={4}>
                                       <div className="profile-setting-header">
                                       <h4>Invests in</h4>

                                       {!writeInvestmentInterest ? (
                                       <div className="user-img img-fluid"><i className="fas fa-user-edit" onClick={() => setWriteInvestmentInterest(true)} style={{cursor:'pointer'}}></i></div>
                                       ): (
                                          null
                                       )}
                                       </div>
                                       <div> 

                                       {writeInvestmentInterest ? (
                                                <div>

<Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <InputGroup className="mb-3">
    <FormControl
      onChange={(e) => setInvestmentInterest(e.target.value)}
    />
    <Button  onClick={() =>addInvestmentInterest()} variant="outline-secondary" id="button-addon2">
       +
    </Button>
  </InputGroup>
    
    {temporaryInterests ? (
         <ul className="suggestions-lists m-0 p-0"> 
         {temporaryInterests?.map((interest,key) => (
                    <Badge  style={{padding:'8px'}} pill bg="primary">
                    {interest.name}
                    <i  style={{paddingLeft:'4px'}} class="fas fa-trash-alt" onClick={() => removeInvestmentInterest(key)}></i>
                    </Badge>
               ))}
      </ul>
    ): null}

  </Form.Group>
  <Button onClick={(e) => submitInvestmentInterest(e)}>Submit</Button>
  <Button style={{marginLeft:10}} onClick={() => setWriteInvestmentInterest(false)}>Cancel</Button>
</Form>
                                                </div>) :
                                                <>
                                                 {investmentInterests.length > 0 ? 
                                                   <ul className="suggestions-lists m-0 p-0"> 
                                                   {investmentInterests?.map((interest,key) => (
                                                        <Badge  style={{padding:'8px'}} pill bg="primary">
                                                        {interest.name}
                                                        </Badge>
                                                         ))}
                                                </ul>
                                                   : 
                                                      <ul className="suggestions-lists m-0 p-0">
                                                      <li className="d-flex mb-4 align-items-center">
                                                         <div className="user-img img-fluid"><i className="ri-add-fill" onClick={() => setWriteInvestmentInterest(true)} style={{cursor:'pointer'}}></i></div>
                                                         <div className="ms-3">
                                                            <h6>Add investment interest</h6>
                                                         </div>
                                                      </li>
                                                   </ul>
                                                }
                                                </>  
                                                }
 
</div>
                                        
               
                                       </Col>
                                       <Col sm={4}>
                                       <Container>
                                          <Row>
                                             <Col>
                                             <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
                                             <h4>Previous investments</h4>
                                             {writePreviousInvestments && previousInvestments.length > 0 ? (
                                             null
                                             ): (
                                              <div className="user-img img-fluid"><i className="fas fa-user-edit" onClick={() => setWritePreviousInvestments(true)} style={{cursor:'pointer'}}></i></div>
                                             )}
                                              </div>

                                              <div >
                                              {writePreviousInvestments ? (
                                                <div>

<Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <InputGroup className="mb-3">
       <FormControl
        onChange={(e) => setPreviousInvestment(e.target.value)}
       />
                                                     <Button onClick={() =>addPreviousInvestment()}variant="outline-secondary" id="button-addon2">
                                                       +
                                                     </Button>
        </InputGroup>
                                                   
    
    {temporaryInvestments ? (
         <ul className="suggestions-lists m-0 p-0"> 
         {temporaryInvestments?.map((interest,key) => (
                     <Badge  style={{padding:'8px'}} pill bg="primary">
                     {interest.name}
                     <i  style={{paddingLeft:'4px'}} class="fas fa-trash-alt" onClick={() => removePreviousInvestment(key)}></i>
                     </Badge>
               ))}
      </ul>
    ): null}

  </Form.Group>
  <Button onClick={(e) => submitPreviousInvestment(e)}>Submit</Button>
  <Button style={{marginLeft:10}} onClick={() => setWritePreviousInvestments(false)}>Cancel</Button>
</Form>
                                                </div>) :
                                                <>
                                                 {previousInvestments.length > 0 ? 
                                                   <ul className="suggestions-lists m-0 p-0"> 
                                                   {previousInvestments?.map((interest,key) => (
                                                               <Badge  style={{padding:'8px'}} pill bg="primary">
                                                               {interest.name}
                                                               </Badge>
                                                         ))}
                                                </ul>
                                                   : 
                                                      <ul className="suggestions-lists m-0 p-0">
                                                      <li className="d-flex mb-4 align-items-center">
                                                         <div className="user-img img-fluid"><i className="ri-add-fill" onClick={() => setWritePreviousInvestments(true)} style={{cursor:'pointer'}}></i></div>
                                                         <div className="ms-3">
                                                            <h6>Add previous investments</h6>
                                                         </div>
                                                      </li>
                                                   </ul>
                                                }
                                                </>  
                                                }
  
</div>

                                             </Col>
                                          </Row>
                                       </Container>

                                       </Col>
                                       <Col sm={4}>
                                       <Container>
                                          <Row>
                                             <Col sm>
                                                <div>
                                                 <div style={{display:'flex',alignItems:'center', justifyContent:'space-evenly'}}>
                                                   <h4>Markets</h4>
                                                   {writeMarkets && markets.length > 0 ?(
                                                      null
                                                   ): (
                                                   <div className="user-img img-fluid"><i className="fas fa-user-edit" onClick={() => setWriteMarkets(true)} style={{cursor:'pointer'}}></i></div>
                                                   )}
                                                 </div>  
                
                                                   {writeMarkets ? (
                                                <div>

<Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>What markets are you looking for?</Form.Label>
    <ReactFlagsSelect
        searchable
        selected={selected}
        onSelect={code => addMarket(code)}
      />

    {temporaryMarkets ? (
         <ul className="suggestions-lists m-0 p-0"> 
         {temporaryMarkets?.map((market,key) => (
             <>
             <Badge  style={{padding:'8px'}} pill bg="primary">
             <Flag flagNationCode={market.name}/>
             <i  style={{paddingLeft:'4px'}} class="fas fa-trash-alt" onClick={() => removeMarket(key)}></i>
             </Badge>{' '}
        </>
               ))}
      </ul>
    ): null}

  </Form.Group>
  <Button onClick={(e) => submitMarkets(e)}>Submit</Button>
  <Button style={{marginLeft:10}} onClick={() => setWriteMarkets(false)}>Cancel</Button>
</Form>
                                                </div>) :
                                                <>
                                                 {markets.length > 0 ? 
                                                    <div className="markets">
                                                   <div className="user-img img-fluid">
                                                      </div>
                                                   {markets?.map((market,key) => (
                                                      <>
                     
                                                           <Badge pill bg="primary">
                                                           <Flag flagNationCode={market.name}/>
                                                       </Badge>{' '}
                                                      </>
                                                         ))}
                                                </div>
                                                   : 
                                                      <ul className="suggestions-lists m-0 p-0">
                                                      <li className="d-flex mb-4 align-items-center">
                                                         <div className="user-img img-fluid"><i className="ri-add-fill" onClick={() => setWriteMarkets(true)} style={{cursor:'pointer'}}></i></div>
                                                         <div className="ms-3">
                                                            <h6>Add markets</h6>
                                                         </div>
                                                      </li>
                                                   </ul>
                                                }
                                                </>  
                                                }

                                                   
                                                
                                                </div>
                                             </Col>
                                          </Row>

                                          <Row>
                                             <Col sm>
                                                <div>
                                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}} >
                                                   <h4>Industry</h4>
                                                   {writeIndustry && industrys.length > 0 ? (
                                                   null
                                                   ): (
                                                   <i className="fas fa-user-edit" onClick={() => setWriteIndustry(true)} style={{cursor:'pointer'}}></i>
                                                   )}
                                                </div>
                                                 
                                                   {writeIndustry ? (
                                                <div>

<Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

    <Form.Label>What industrys are you looking for?</Form.Label>

<Select
onChange={addIndustry}
        options={preIndustrys}
      />


    {temporaryIndustrys ? (
         <ul className="suggestions-lists m-0 p-0"> 
         {temporaryIndustrys?.map((industry,key) => (
             <>
             <Badge  style={{padding:'8px'}} pill bg="primary">
             {industry.name}
             <i style={{paddingLeft:'4px', cursor:'pointer'}} class="fas fa-trash-alt" onClick={() => removeIndustry(key)}></i>
             </Badge>{' '}
        </>
               ))}
      </ul>
    ): null}

  </Form.Group>
  <Button onClick={(e) => submitIndustrys(e)}>Submit</Button>
  <Button style={{marginLeft:10}} onClick={() => setWriteIndustry(false)}>Cancel</Button>
</Form>
                                                </div>) :
                                                <>
                                                 {industrys.length > 0 ? 
                                                    <div className="markets">

                                                   <div className="user-img img-fluid">
                                                   </div>

                                                   {industrys?.map((industry,key) => (
                                                      <>
                                                   
                                                       <Badge  style={{padding:'8px'}} pill bg="primary">
             {industry.name}
             </Badge>{' '}
                                                      </>
                                                         ))}
                                                </div>
                                                   : 
                                                      <ul className="suggestions-lists m-0 p-0">
                                                      <li className="d-flex mb-4 align-items-center">
                                                         <div className="user-img img-fluid"><i className="ri-add-fill" onClick={() => setWriteIndustry(true)} style={{cursor:'pointer'}}></i></div>
                                                         <div className="ms-3">
                                                            <h6>Add </h6>
                                                         </div>
                                                      </li>
                                                   </ul>
                                                }
                                                </>  
                                                }    
                                                </div>
                                             </Col>
                                          </Row>

                                       </Container>

                                       </Col>
                                       </Row>
                                    </Container>
                                 </Card.Body>
                              </Card>
                           </Tab.Container>
                        </Tab.Pane> 
                        <Tab.Pane eventKey="forth" >
                           <Tab.Container id="left-tabs-example" defaultActiveKey="p1">
                              
                                 <Row>
                                    <Col sm>
                                    <Card>
                                 <Card.Body>
                                 <div className='profile-setting-header'>
                                    <h4>Capital</h4>
                                    {!writeCapital ? (
                                    <div className="user-img img-fluid"><i className="fas fa-user-edit" onClick={() => setWriteCapital(true)} style={{cursor:'pointer'}}></i></div>
                                    ): (
                                       null
                                    )}
                                 </div>
                                    {writeCapital ? (
             <div>
         <Form>
  <fieldset>
    <Form.Group className="mb-3">
      <Form.Label>How much capital are you looking for?</Form.Label>
      <Form.Control as="select" value={capital} onChange={(e) => setCapital(e.target.value)}>
        <option value="0-50.000 kr">0-50.000 kr</option>
        <option value="100-250.000 kr">100-250.000 kr</option>
        <option value="250-500.000 kr">250-500.000 kr</option>
        <option value="500-1.000.000 kr">500-1.000.000 kr</option>
      </Form.Control>
    </Form.Group>

    <Button onClick={() => submitCapital()} type="submit">Submit</Button>
    <Button style={{marginLeft:10}} onClick={() => setWriteCapital(false)}>Cancel</Button>
  </fieldset>
</Form>
                                                </div>) :
                                                <>
                                                 {user?.available_capital?.length > 0 ? 
                                                   <ul className="suggestions-lists m-0 p-0">
                                                   <li className="d-flex mb-4 align-items-center">
                                                      <div >
                                                      <Badge  style={{padding:'8px'}} pill bg="primary">
             {user?.available_capital}
             </Badge>{' '}

                                                      </div>
                                                   </li>
                                                </ul>
                                                   : 
                                                      <ul className="suggestions-lists m-0 p-0">
                                                      <li className="d-flex mb-4 align-items-center">
                                                         <div className="user-img img-fluid"><i className="ri-add-fill" onClick={() => setWriteCapital(true)} style={{cursor:'pointer'}}></i></div>
                                                         <div className="ms-3">
                                                            <h6>Add available capital</h6>
                                                         </div>
                                                      </li>
                                                   </ul>
                                                }
                                                </>  
                                                }
                                 </Card.Body>
                              </Card>
                                    </Col>
                                    <Col sm>
                                    <Card>
                                 <Card.Body>
                                    <div className='profile-setting-header'>
                                       <h4>Competences</h4>
                                       {!writeCompetences ? (
                                       <div className="user-img img-fluid">
                                       <i className="fas fa-user-edit" onClick={() => setWriteCompetences(true)} style={{cursor:'pointer'}}></i>
                                       </div>       
                                       ): (
                                       null    
                                       )}
                                     
                                    </div>
                                    
                                    <div className="friend-list-tab mt-2">
                                       <Tab.Content>
                                          <Tab.Pane eventKey="p1">
                                             <div className="card-body p-0">
                                             {writeCompetences ? (
                                                <div>

<Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>What competences are you looking for?</Form.Label>
    <InputGroup className="mb-3">
    <FormControl
      onChange={(e) => setCompetence(e.target.value)}
    />
    <Button onClick={() => addCompetence()} variant="outline-secondary" id="button-addon2">
      +
    </Button>
  </InputGroup>
    
    {competences ? (
         <ul className="suggestions-lists m-0 p-0"> 
         {competences?.map((market,key) => (
             <>
             <Badge  style={{padding:'8px'}} pill bg="primary">
             {market.name}
             <i style={{paddingLeft:'4px', cursor:'pointer'}} class="fas fa-trash-alt" onClick={() => removeCompetences(key)}></i>
             </Badge>{' '}
        </>
               ))}
      </ul>
    ): null}

  </Form.Group>
  <Button onClick={(e) => submitCompetences(e)}>Submit</Button>
  <Button style={{marginLeft:10}} onClick={() => setWriteCompetences(false)}>Cancel</Button>
</Form>
                                                </div>) :
                                                <>
                                                 {competences.length > 0 ? 
                                                    <div className="markets">
                                                   {competences?.map((market,key) => (
                                                      <>
                                                      <Badge  style={{padding:'8px'}} pill bg="primary">
             {market.name}
             </Badge>{' '}
                                                      </>
                                                         ))}
                                                </div>
                                                   : 
                                                      <ul className="suggestions-lists m-0 p-0">
                                                      <li className="d-flex mb-4 align-items-center">
                                                         <div className="user-img img-fluid"><i className="ri-add-fill" onClick={() => setWriteCompetences(true)} style={{cursor:'pointer'}}></i></div>
                                                         <div className="ms-3">
                                                            <h6>Add competences</h6>
                                                         </div>
                                                      </li>
                                                   </ul>
                                                }
                                                </>  
                                                }
                                           

                                             </div>
                                          </Tab.Pane>
                                       </Tab.Content>
                                    </div>
                                 </Card.Body>
                              </Card>
                                    </Col>
                                 </Row>
                        
                            
                           </Tab.Container>
                        </Tab.Pane>
                     </Tab.Content>
                  </Col>
               </Tab.Container>
            </Row>
         </Container>   
      </>
  )

}

export default UserProfile;