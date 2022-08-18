import React from 'react';
import  axios  from 'axios';
import  {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';


export default function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  let nums =new Array(13).fill(1).map((elem , index)=> index+1);

  async function getTrending(pageNumber) {
    let {data}=  await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    setTrendingMovies(data.results);
  };
useEffect(()=>{
  getTrending(1);
} , []);


  return (    <>
    {trendingMovies?    <div className='row justify-content-center'>
      {trendingMovies.map((movie , i) => <div key={i} className='col-md-2'>
      <div className='movie'>
        <Link to={`/moviedetails/${movie.id}`}>
         <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt=''/>
          <h2 className='h6 py-1'>{movie.title}</h2>
        </Link>
      </div>
    </div>)} 


</div>: <div className='vh-100 d-flex justify-content-center align-items-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div>}

      <nav aria-label="..." className='py-3'>
        <ul className="pagination pagination-sm d-flex justify-content-center">
        {
          nums.map((pageNum)=> <li onClick={()=> getTrending(pageNum)} key={pageNum} className="page-item"><a className="page-link bg-transparent text-white" >{pageNum}</a></li>
          )
        }
        </ul>
      </nav>
</>
  )
};
