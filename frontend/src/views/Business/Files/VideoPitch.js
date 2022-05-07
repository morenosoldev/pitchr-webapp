import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '../../../store/actions/file.actions'
import { Spinner } from 'react-bootstrap'
import PitchFileItem from './PitchFileItem';

export default function VideoPitch({searchValue,userID,urlID}) {
    const loading = useSelector(state => state.files.loading);
    const pitchFiles = useSelector(state => state.files.pitchFiles);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fileActions.fetchPitchFiles(urlID));
    }, [])


    
    return (
    <>
         {loading ? (
 <div style={{display:'flex',justifyContent:'center',padding:50}}>
  <Spinner animation="grow"/>   
 </div>            
         ): 
        
<table className="files-lists table table-striped mt-4">
        <thead>
            <tr>
                <th scope="col">
                    <div className=" text-center">
                        <input type="checkbox" className="form-check-input"/>
                    </div>
                </th>
                <th scope="col">File Name</th>
                <th scope="col">File Type</th>
                <th scope="col">Size</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
   <tbody>
            {pitchFiles?.filter(file => {
        return file.fileName.toLowerCase().includes(searchValue.toLowerCase())
       }).map((file) => (
                 <PitchFileItem key={file?.id} userID={userID} urlID={urlID} fileName={file.fileName} fileSize={(file.fileSize / (1024*1024)).toFixed(2)} createdAt={file.createdAt} fileType={file.type} downloadLink={file.videoUrl} id={file.id}/>
             ))}
        </tbody>
         
    </table>
}
    </>
    )
}
