import { useEffect, useState } from 'react';
import '../style.css';

function Loading() {

  // The text inputs below should match the ones for Strapi
  return (
    <>
     <div className="loading-container">
       <video className="loading-icon" autoPlay loop muted>
           <source src="/loading.mov" type="video/mp4" />
           Your browser does not support the video tag.
       </video>
     </div>      
    </>
  )
}

export default Loading
