import React, { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
const [post, setPost] = useState([
  {
    username:'clever Mary' ,
    caption:'Great coding' ,
    imageUrl:'https://images.freeimages.com/images/large-previews/256/spring-1376144.jpg',
  },
  {
    username:'Mary' ,
    caption:'Nice work' ,
    imageUrl:'https://images.freeimages.com/images/large-previews/48f/spring-colour-1399971.jpg',
  },
  {
    username:'clever' ,
    caption:'Making more projects' ,
    imageUrl:'https://images.freeimages.com/images/large-previews/fa6/spring-1376376.jpg',
  },
]);

  return(
    <div className="app">
      {/* Header */}
      <div className='app__header'>
        <img className='app__headerImage'
              src='https://hd-report.com/wp-content/uploads/2016/02/instagram_text_logo_blk-600x228.png'
              alt=''
        />
      </div>
      <h1>Hello there! This is Instagram cloning project</h1> 

      {/* Posts */}
      {
        post.map( post =>(
          <Post 
            username={post.username} 
            caption={post.caption} 
            imageUrl={post.imageUrl}      
          />
        ))
      }
    </div>
  );
}

export default App;
