import  Axios  from 'axios';
import  Joi  from 'joi';
import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'; 


export default function Login(props) {

  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const [error, setError] = useState(''); 
  const [user, setUser] = useState({
    email:'',
    password:''
  });

  function getUserData(e) {
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  async function submitLoginFrom(e) {
   e.preventDefault();
   setIsLoading(true);
    let validationResult = validateLoginForm();
    
    if(validationResult.error){
      setErrorList(validationResult.error.details);
      setIsLoading(false);
    }
    else{
      let {data} = await Axios.post(`https://route-egypt-api.herokuapp.com/signin`,user);
      if(data.message  == 'success')
      {
        /// navigat login || Home
        setIsLoading(false);
        localStorage.setItem('userToken' , data.token);
        props.saveUserData(); 
        navigate('/home');
      }
      else{
        setError(data.message);
        setIsLoading(false);

      }
    }
  }; 



function validateLoginForm() {
const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required()
})

return schema.validate(user , {abortEarly:false});
};


  return (
    <>
    <div className="w-75 mx-auto py-5">
        <h2 className='mb-3'>Login Now</h2>
        {errorList.map((error ,i)=> i===1? <div key={i} className='alert p-2 alert-danger'>{error.message}</div> :<div key={i} className='alert p-2 alert-danger'>password invalid</div>)}
        {error?<div className='alert alert-danger'>{error}</div>:''}
      <form  onSubmit={submitLoginFrom}>

      <label htmlFor="email" className='mb-1'>email</label>
      <input onChange={getUserData}  type="email" className='form-control mb-2' id='email' name='email'/>

      <label htmlFor="password" className='mb-1'>password</label>
      <input onChange={getUserData} type="password" className='form-control mb-2' id='password' name='password'/>

      <button type='submit' className='btn btn-outline-info'>
      {isLoading === true? <i className='fas fa-spinner fa-spin'></i>:'Login'}
      </button>
      </form>
    </div>
    </>
  )
} 





