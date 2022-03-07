import React, { useEffect } from 'react';
import axios from 'axios';
//import CircularProgress from '@material-ui/core/CircularProgress';
import ViewSDKClient from './ViewSDKClient.js';

//under construction
//import s3Proxy from 's3-proxy';
//import express from 'express';
//under construction


const Loader = () => {
    // const app = express();
    // app.get('9112250_.pdf', s3Proxy({
    //     bucket: 'aws-onecrew-test-public',//prefix: 'optional_s3_path_prefix',
    //     accessKeyId: 'aws_access_key_id',
    //     secretAccessKey: 'aws_secret_access_key',//overrideCacheControl: 'max-age=100000',
    //     defaultKey: 'index.html'
    // }));
    // const underconstruction = () => {
    //     //underconstruction
    //     const express = require('express');
    //     const request = require('request');
    //     const app = express();
    //     //
    //     app.get('/6861226_uploading.pdf', (res) =>{
    //         request(
    //             { url: 'https://aws-onecrew-test-public.s3.us-west-1.amazonaws.com/6861226_uploading.pdf' },
    //             (error, response, body) => {
    //                 if (error || response.statusCode !== 200) {
    //                   return res.status(500).json({ type: 'error', message: error.message });
    //                 }
              
    //                 res.json(JSON.parse(body));
    //             }
    //         )
    //     });
    // }

    const underconstruction = () => {
        //     var AWS = require("aws-sdk");
            
        //     //var s3 = new AWS.s3(options);
        // fetch('https://aws-onecrew-test-public.s3.us-west-1.amazonaws.com/6861226_uploading.pdf', {method: 'GET'})
        // .then(res => {
        //     console.log(res);
        //     return res.blob();
        //   })
        //   .then(blob => {
        //     var url = window.URL.createObjectURL(blob);
        //     var a = document.createElement('a');
        //     a.href = url;
        //     //a.download = 'whatisthis.pdf';
        //     document.body.appendChild(a); 
        //     a.click();  
        //     setTimeout(
        //       _ => { window.URL.revokeObjectURL(url); }, 
        //       60000); 
        //     a.remove(); 
        //   })
        //   .catch(err => {
        //     console.error('err: ', err);
        //   })
        /*

        var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-west-2'});
        var params = {
            Bucket: 'aws-onecrew-test-public',
            Key: '6861226_uploading.pdf',
            Body: 'Uploaded text using the promise-based method!'
        };
        var putObjectPromise = s3.putObject(params).promise();
        putObjectPromise.then(function(data) {
            console.log('Success');
        }).catch(function(err) {
            console.log(err);
        });

        */
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
