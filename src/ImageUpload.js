import { Button } from '@material-ui/core';
import React, {useState} from 'react';
import {db, storage} from './firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
    const [caption, setCaption]= useState('');
    const [image, setImage]= useState(null);
    const [progress, setProgress]= useState(0);
   
    const handleChange = (e) =>{
        setImage(e.target.files[0])
    };

    const handleUpload = () =>{
        const uploadTask = storage.ref('images/'+image.name).put(image); 
        
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress function ...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setProgress(progress); 
            },
            (error) =>{
                //error function ...abs
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                        //post image inside the database
                        db.collection('posts').add({
                           timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl: url,
                            username: username
                        });
                        //Once done reset to default
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )
    }
 
    return (
        <div className='imageUpload'>
            {/* Caption input */}
            {/* File Picker */}
            {/* Post button */}       
            <progress className='imageUpload__progress' value={progress} max='100'/>
            <input type='text' placeholder='Enter a caption...' onChange={ e => setCaption(e.target.value)} />
            <input type='file' onChange={handleChange} />
            <Button className='imageupload_button' onClick={handleUpload}>
                Upload
            </Button> 
        </div>
    )
}

export default ImageUpload
