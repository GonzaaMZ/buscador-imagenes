import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaActual] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(5);

  useEffect(() => {
    if (busqueda === "") return;
    const consultarAPI = async () => {
      const imagenesPorPag = 30;
      const key = process.env.REACT_APP_API_KEY_PIXABAY;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPag}&page=${paginaactual}`;

      const response = await fetch(url);
      const result = await response.json();

      setImagenes(result.hits);

      const calcularTotalPaginas = Math.ceil(result.totalHits / imagenesPorPag);
      setTotalPaginas(calcularTotalPaginas);

      //Mover la vista de la pantalla hacia arriba cuando cambiamos de pagina
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    };
    consultarAPI();
  }, [busqueda, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    setPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-2"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
