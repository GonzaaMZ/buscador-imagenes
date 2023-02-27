import Imagen from "./Imagen";


const ListadoImagenes = ({imagenes}) => {
    return ( 
        <div className="col-12 p-5 row">
            {imagenes.map(i => (
                <Imagen 
                key={i.id}
                imagen={i}
                />
            ))}
        </div>
     );
}
 
export default ListadoImagenes;