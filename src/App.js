import React, { useEffect, useState }from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import './components/Header'
import Header from './components/Header/index';
import Footer from './components/Footer/index';
// import Loading from '../public/loading';

export default() => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  //o useEffect é executado quando carrega a página
  useEffect(() => {
    const loadAll = async () => {
       //pegando a lista total
       let list = await Tmdb.getHomeList();
       setMovieList(list);

      //pegando o filme em destaque
      let originals = list.filter(i=>i.slug === 'originais');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);


  return (
    <div className="page">
      <Header black={blackHeader}/>
      
      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <Footer />

      {movieList.length <= 0 &&
        <div className="loading">
          Carregando...
        {/* <img src={Loading} alt='Carregando...'></img> */}
      </div>
      }
      
    </div>

  );
}