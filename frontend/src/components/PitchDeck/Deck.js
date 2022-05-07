import { Document,Page } from "react-pdf";
import {useState} from 'react';
import { Button,Col,Row} from "react-bootstrap";
import { pdfjs } from "react-pdf";
import { BsChevronLeft,BsChevronRight,BsChevronDoubleLeft,BsChevronDoubleRight} from "react-icons/bs";

export default function Deck() {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [renderedPageNumber, setRenderedPageNumber] = useState(null);

    
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const isLoading = renderedPageNumber !== pageNumber;
  
  function previousPage(e) {
    e.preventDefault()
    changePage(-1);
  }
  
  function nextPage(e) {
    e.preventDefault()
    changePage(1);
  }

  return (
    <div style={{display:'flex',justifyContent:'center'}} className="h-100 w-100" id="deck">
   
    <Document
    style={{display:'flex',justifyContent:'center', display:'inline'}}
    className="h-100"
    file={'https://firebasestorage.googleapis.com/v0/b/pitchr-d3d71.appspot.com/o/files%2F_Skipit_Pitch%20Deck_Funding%20Round_Feb%202022%20%2B%20(2).pdf?alt=media&token=58fcd834-9db0-49c1-8062-e88e23bb4c52'}
    onLoadSuccess={onDocumentLoadSuccess}
    > 
   
    {isLoading && renderedPageNumber ? (
      <>
   <Page  
      renderAnnotationLayer={false} 
      key={renderedPageNumber}
      className="prevPage"
      width={'100%'}
      height={'100%'}
      pageNumber={renderedPageNumber} />
      </>
    ): (
      null
    )}
   
    <Page
    key={pageNumber}
    pageNumber={pageNumber}
    onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
    />
    
    <Row id="pitch-menu">
   
   <Col sm={2}>
   <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <a className='pitch-btn' href="#" onClick={(e) => previousPage(e)}>
    <BsChevronDoubleLeft/>
     </a>
   
     <a className='pitch-btn' href="#" onClick={(e) => nextPage(e)}>
    <BsChevronDoubleRight/>
     </a>
   </div>
   </Col>
   
   <Col sm={2}>
   <p>
   {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
   </p>
   </Col>
   
   <Col style={{padding:0}}>
   <div style={{display:'flex',justifyContent:'end'}}>
   
   <Button className='pitch-btn'  style={{height:42,border:'none'}}  variant="outline-secondary" >
   <i style={{marginLeft:10}} class="fas fa-comment-dots"></i>
   </Button>{' '}
   
   <Button className='pitch-btn' style={{height:42,border:'none'}}  variant="outline-secondary" >
   <i style={{marginLeft:10}} class="fas fa-users"></i>
   </Button>{' '}
 
   <Button className='pitch-btn' style={{height:42,border:'none'}} variant="outline-secondary" >
   <i style={{marginLeft:10}} class="fas fa-save"></i>
   </Button>

   </div>
   </Col>
    </Row>
   
   </Document>  
   </div>
  )
}
