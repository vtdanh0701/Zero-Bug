import React from 'react';
import './Footer.css';


const Footer = props => {
    
    return(
        
<footer>
    <div className='copy-right'>    
      &copy; 2019 Danh Vuong 
    </div>
      <div className="social-container">
          <a href='https://www.linkedin.com/in/danh-vuong/' target='_blank' rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i> 
          </a>
          <a href='http://github.com/vtdanh0701' target='_blank' rel="noopener noreferrer">
            <i className="fab fa-github-alt"></i>
          </a>
          <a href='mailto:vtdanh0701@gmail.com'>
            <i className="fas fa-envelope"></i>
          </a>
      </div>
     
  </footer>

    )
}

export default Footer;