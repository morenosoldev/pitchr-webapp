import React,{useEffect} from 'react'
import FileItem from './FileItem'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '../../../store/actions/file.actions'
import { Spinner } from 'react-bootstrap'

export default function Financials({searchValue,userID,urlID}) {
    const loading = useSelector(state => state.files.loading);
    const files = useSelector(state => state.files.files);


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
            {files?.filter(file => {
        return file.fileName.toLowerCase().includes(searchValue.toLowerCase()) && file.type == "Financial"
       }).map((file) => (
                 <FileItem key={file?.id} userID={userID} urlID={urlID} fileName={file.fileName} fileSize={(file.fileSize / (1024*1024)).toFixed(2)} createdAt={file.createdAt} fileType={file.fileType} downloadLink={file.fileUrl} id={file.id}/>
             ))}
        </tbody>
         
    </table>
}
    </>
    )
}
