import React from 'react';
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import  {useState , useEffect} from 'react';

export default function MovieDetails() {

  let params = useParams();
  const [movieDetails, setMovieDetails] = useState();

 async function getMovieDetails(id) {
  let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50`);
  setMovieDetails(data);
}
useEffect(()=> {
  getMovieDetails(params.id);
} , [])

  return ( <>
      {movieDetails?  <div className="row">
        <div className="col-md-3">
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt='' />
        </div>
        <div className="col-md-9">
          <h2>{movieDetails.title}</h2>
          <p className='py-3 text-muted'>{movieDetails.overview}</p>
          <ui>
            <li>budget : {movieDetails.budget}</li>
            <li>vote : {movieDetails.vote_average}</li>
            <li>popularity : {movieDetails.popularity}</li>
            <li>vote_count : {movieDetails.vote_count}</li>
          </ui>
        </div>
      </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div>}

    </>
  )
}
