import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import Dropzone from 'react-dropzone-uploader';

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const text = files.length > 0 ? 'Add more files' : 'Choose files'
  
    return (
      <label style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
        {text}
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />
      </label>
    )
  }
  
  const CustomInput = () => {
    const axios = require("axios").default;
    const API_ENDPOINT = "https://frlz3ttau1.execute-api.us-west-1.amazonaws.com/default/getPresignedImageURL";
    
    const handleSubmit = async (files, allFiles) => {
      // console.log( ' -------- handleSubmit CustomInput ------');
      // console.log(files);
      // console.log(allFiles);
      // console.log(files.map(f => f.meta));
      //underconstruction//
      allFiles.map( (file) =>  { 
        uploadMain(file);
      });

      
      //underconstruction//
      //assumes all files were uploaded properly
      allFiles.forEach(f => f.remove())
    }

    const uploadMain = async (file) => {
      //GET request: presigned URL
      const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
      });
      //PUT request: upload file to S3
      fetch(response.data.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: file["file"],
      })
      .then((res) => {
        console.log(res);
       })
      .catch((err) => console.log(err));
    };

    const getFilesFromEvent = e => {
      return new Promise(resolve => {
        getDroppedOrSelectedFiles(e).then(chosenFiles => {
          resolve(chosenFiles.map(f => f.fileObject))
        })
      })
    }
  
    return (
      <Dropzone
        accept=".pdf"
        onSubmit={handleSubmit}
        InputComponent={Input}
        getFilesFromEvent={getFilesFromEvent}
      />
    )
  }
  
  <CustomInput />

export default CustomInput