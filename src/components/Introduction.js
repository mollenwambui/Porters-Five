import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Introduction.css';
import 'typeface-nunito';
import vector from '../images/Vector.png';
import porters from '../images/porters.png';
import question from '../images/question.png';
import need from '../images/need.png';
import user from '../images/user.png';
import arrow from '../images/arrow.png';




const Introduction = () => {
   

  return (
    <div className="introduction-container" style={{ fontFamily: 'Nunito' }}>

    
   
 
     <img src={vector} className= 'vector' alt='vector'/>

     <img src={porters}  alt='porters' className= 'porters'/>
    <h2 className='inst'>Introduction</h2>
     <div className='all'>
    <div className='card1'>
    <img src={question} alt='quiz' className= 'quiz'/>
     <h2 className='what'>What is this tool?</h2>
   <p className='content'>Porter's Five Forces is a strategic model used for analyzing and assessing a company's competitive .<br/> positioning by considering five key forces: rivalry among competitors, threat of new entrants  <br/> power  of suppliers, power of customers, and threat of substitution. 

</p>
    </div>
    <div className='card2'>
    <img src={need} className= 'need' alt='need'/>
    <h2 className='what'>Why do i need it??</h2>
  <p className='content'>You need Porter's Five Forces because it provides a checklist of crucial factors to consider when  <br/> evaluating a company's competitive landscape. It helps in understanding industry dynamics,  <br/> identifying potential threats, and assessing profitability and market positioning. 
</p>

    </div>
    <div className='card22'>
    <img src={user} alt='user' className= 'user'/>
    <h2 className='what'>Why should I use it?</h2>
    <p className='content'>You should use Porter's Five Forces when you want to gain insights into a new industry or market,  <br/> develop hypotheses at the beginning of an assignment, structure and communicate existing industry   <br/> knowledge, and define the boundaries of an industry and your client's role within it.</p>

    
    </div>
    

     </div>
 

 
     <Link to="/template">
  <div  className='last'>
    <h2 className='go' style={{ margin: 0 }}>Go to Template</h2>
    <img src={arrow} alt='arrow' className='arrows' style={{ marginLeft: '5px' }} />
  </div>
</Link>

      
    </div>
  );
};

export default Introduction;
