import  Axios  from 'axios';
import  Joi  from 'joi';
import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'; 


export default function Register() {

  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const [error, setError] = useState(''); 
  const [user, setUser] = useState({
    first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:''
  });

  function getUserData(e) {
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  async function submitRegisterFrom(e) {
   e.preventDefault();
   setIsLoading(true);
    let validationResult = validateRegisterForm();
    
    if(validationResult.error){
      setErrorList(validationResult.error.details);
      setIsLoading(false);
    }
    else{
      let {data} = await Axios.post(`https://route-egypt-api.herokuapp.com/signup`,user);
      if(data.message  == 'success')
      {
        /// navigat login || Home
        setIsLoading(false);
        navigate('/login')
      }
      else{
        setError(data.message);
        setIsLoading(false);

      }
    }
  }; 


// (3)
function validateRegisterForm() {
const schema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required()
})
return schema.validate(user , {abortEarly:false});
};


  return (
    <>
    <div className="w-75 mx-auto">
        <h2>Register Now </h2>
        {errorList.map((error ,i)=> i===4? <div key={i} className='alert p-2 alert-danger'>{error.message}</div> :<div key={i} className='alert p-2 alert-danger'>password invalid</div>)}
        {error?<div className='alert alert-danger'>{error}</div>:''}
      <form  onSubmit={submitRegisterFrom}>
      <label htmlFor="frist_name" className='mb-1'>frist name</label>
      <input onChange={getUserData} className='form-control mb-2' id='frist_name' name='first_name'/>

      <label htmlFor="last_name" className='mb-1'>Last name</label>
      <input onChange={getUserData} className='form-control mb-2' id='last_name' name='last_name'/>

      <label htmlFor="age" className='mb-1'>age</label>
      <input onChange={getUserData} type="number" className='form-control mb-2' id='age' name='age'/>

      <label htmlFor="email" className='mb-1'>email</label>
      <input onChange={getUserData}  type="email" className='form-control mb-2' id='email' name='email'/>

      <label htmlFor="password" className='mb-1'>password</label>
      <input onChange={getUserData} type="password" className='form-control mb-2' id='password' name='password'/>

      <button type='submit' className='btn btn-outline-info'>
      {isLoading === true? <i className='fas fa-spinner fa-spin'></i>:'Register'}
      </button>
      </form>
    </div>
    </>
  )
} 
