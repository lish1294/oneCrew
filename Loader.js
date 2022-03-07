import React, { useEffect } from 'react';
import axios from 'axios';
import ViewSDKClient from './ViewSDKClient.js';


const Loader = () => {

    const underconstruction = () => {
    }
    underconstruction();

    //This is a dummy, which in the context of my application is returning true for property questionLink. 
    //Why? The Lambda function runs, but it doesn't have anything to do with what shows up for the user right now. 
    //I couldn't get over the AWS hump for what allows a URI to share.
    const API_ENDPOINT = "https://frlz3ttau1.execute-api.us-west-1.amazonaws.com/default/getPresignedImageURL";
	const [state, setState] = React.useState({isDataLoaded: false, menuLink: null, hasFile: false});
	useEffect(() => {
		axios({
            method: 'GET',
            url: API_ENDPOINT
        })
		.then(response => setState({isDataLoaded: true, hasFile: true , questionLink: response.data.uploadURL}))
		.catch(error => alert(error.message))
        console.log(state);
	}, []);

    const loadPDF = () => {
        console.log('loadPDF ran');
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
        viewSDKClient.previewFile("pdf-div", {showAnnotationTools: true, showLeftHandPanel: true, showPageControls: true,
        showDownloadPDF: true, showPrintPDF: false}, state.questionLink);
    });
    }

    

    return (
        <div >
        {
            state.isDataLoaded ?
            <div>
                { state.hasFile ? 
                    <> 
                        <div id="pdf-div" className="full-window-div" onLoad={loadPDF()}></div>
                    </>
                        :
                        
                        <div>
                            <p className='text dashboard' id="no-file">Sorry, no file at this link</p>
                        </div>
                }
            </div> 
            : <div className='cp'>spinner</div>
        }
        </div>
    );
}

export default Loader;
