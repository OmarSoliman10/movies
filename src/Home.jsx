import  axios  from 'axios';
import React , {useState , useEffect} from 'react';
import avatar from '../src/Avatar-Profile-Vector-PNG-File.png';
import { Link } from 'react-router-dom';

export default function Home() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function getTrending(mediaType , callback) {
    let {data}=  await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`);
    callback(data.results.slice(0,10));
  }; 

  useEffect(()=>{
  getTrending('movie', setTrendingMovies);
  getTrending('tv', setTrendingTv);
  getTrending('person', setTrendingPeople);
} , []);

return ( <> 


<div className='row'>
  <div className='col-md-4 d-flex align-items-center'>
      <div>
        <div className='brdr mb-4 '></div>
        <h2 className='h3'>Trending <br/>Movies<br/> To Watch Right Now </h2>
        <p className='text-muted'>Top Trending Movies by day</p>
        <div className='brdr mt-4'></div>
      </div>

  </div>
  {trendingMovies.map((movie , i) => <div key={i} className='col-lg-2 col-md-4'>
    <div className='movie'>
      <Link to={`/moviedetails/${movie.id}`}>
      <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt=''/>
      <h2 className='h6 py-1'>{movie.title}</h2>
      </Link>

    </div>

  </div>)}

</div>



<div className='row py-5'>
  <div className='col-md-4 d-flex align-items-center'>
      <div>
        <div className='brdr mb-4 w-25'></div>
        <h2 className='h3'>Trending <br/>Tv<br/> To Watch Right Now </h2>
        <p className='text-muted'>Top Trending Tv by day</p>
        <div className='brdr mt-4'></div>
      </div>

  </div>
  {trendingTv.map((tv , i) => <div key={i} className='col-lg-2 col-md-4'>
    <div className='tv'>
      <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt=''/>
      <h2 className='h6 py-1'>{tv.name}</h2>
    </div>

  </div>)}

</div>


<div className='row py-5'>
  <div className='col-md-4 d-flex align-items-center'>
      <div>
        <div className='brdr mb-4 w-25'></div>
        <h2 className='h3'>Trending <br/>people<br/> To Watch Right Now </h2>
        <p className='text-muted'>Top Trending people by day</p>
        <div className='brdr mt-4'></div>
      </div>

  </div>
  {trendingPeople.map((person , i) => <div key={i} className='col-lg-2 col-md-4'>
    <div className='person'>
      {person.profile_path==null? <img src={avatar} className="w-100 person-img" /> :
      <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt=''/>}
      <h2 className='h6 py-1'>{person.name}</h2>
    </div>

  </div>)}

</div>


</>
  )
}
