import React, { useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import { Button, Input, Modal } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

// Modal Styles
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


//Main App
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [post, setPost] = useState([]);
  const [open, setOpen]= useState(false);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // the user has logged in
        console.log(authUser);
        setUser(authUser);

        // if(authUser.displayName){
        //   //dont update username
        // }else{
        //   //if just created someone
        //   return authUser.updateProfile({
        //     displayName:username
        //   })
        // }
      }else{
        // the user has logged out
        setUser(null);
      }
    })
    return () =>{
      //Perform cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  //UseEffect ---> runs a piece of code based on a specific condition
  useEffect( () => {
    // the condition is actually a variable }, [post]) => every single time post change this code will run 
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setPost(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  const signUp = (e) =>{
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }
  const signIn =(e) => {
      e.preventDefault();

      auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

      setOpenSignIn(false);
  }

  return(
    <div className="app">
      
      {/* Modal for authentication*/}
      <Modal 
        open={open}
        onClose={ () => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            {/* <center > */}
              <img className='app_singupImage'
                  src='https://hd-report.com/wp-content/uploads/2016/02/instagram_text_logo_blk-600x228.png'
                  alt=''
              />
              <Input required
                placeholder='username'
                type='text'
                value={username}
                onChange={ (e) => setUsername(e.target.value)}
              />
              <Input required
                placeholder='email'
                type='email'
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
              />
              <Input required
                placeholder='password'
                type='text'
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signUp}>Sign Up</Button>
            {/* </center>  */}
          </form>
        </div> 
      </Modal>

      {/* Sign In Modal */}
      <Modal 
        open={openSignIn}
        onClose={ () => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            {/* <center > */}
              <img className='app_singupImage'
                  src='https://hd-report.com/wp-content/uploads/2016/02/instagram_text_logo_blk-600x228.png'
                  alt=''
              />
              <Input required
                placeholder='email'
                type='email'
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
              />
              <Input required
                placeholder='password'
                type='text'
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signIn}>Sign In</Button>
            {/* </center>  */}
          </form>
        </div> 
      </Modal>     


      {/* Header */}
      <div className='app__header'>
        <img className='app__headerImage'
              src='https://hd-report.com/wp-content/uploads/2016/02/instagram_text_logo_blk-600x228.png'
              alt=''
        />

        {/* Sign In LogIn sign Up */}
        {user ? (
          <Button onClick={ () => auth.signOut()}>Logout</Button>
      ): (
        <div className='app__loginContainer'>
          <Button onClick={ () => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={ () => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>

      {/* Posts */}
      <div className='app__posts'>
        <div className='app__postLeft'>
        {
          post.map( ({id, post}) =>  (
            <Post 
              key = {id}
              username={post.username} 
              caption={post.caption} 
              imageUrl={post.imageUrl}
              postId={id}      
              user={user}
            />
          ))
        }
        </div>
        <div className='app__postRight'>
          <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={ () => {}}
          onSuccess={ () => {}}
          onAfterRender={ () => {}}
          onFailure={ () => {}}
        />
        </div>
      
      </div>
      
     
      {/* Image upload at the bottom of the page */}
      {user? (
           <ImageUpload username={user.displayName}/>

      ):(
          <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
