import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './favoritos.css';

export default function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
    try {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
    } catch (erro) {
        console.error('Não foi possível ler os filmes salvos!', erro);
        toast.error('Não foi possível ler os filmes salvos!');
        setFilmes([]);
    }
}, []);


    function Deletar(id){
        const confirma = window.confirm('Tem certeza que deseja excluir este filme?');
        if(!confirma){
            return;
        }
        try{
            const filmeFiltrado = filmes.filter((item) => item.id !== id);
            setFilmes(filmeFiltrado);
            localStorage.setItem('@primeflix', JSON.stringify(filmeFiltrado));
            toast.success('Filme apagado com sucesso!');
        }catch(erro){
            console.error('Ocorreu algum erro!',erro);
            toast.error('Ocorreu algum erro!');
        }
    }
    return(
        <div className='container'>
            <div className='meus-filmes'>
                <h1>Meus filmes favoritos</h1>
                {filmes.length === 0 && (
                    <h3>Você não salvou nenhum filme!</h3>
                )}

                <ul>
                    {filmes.map((item) =>(
                        <li key={item.id}>
                            <span>{item.nome}</span>
                            <div className="acoes">
                                <Link to={`/filme/${item.id}`}>
                                Ver detalhes
                                </Link>

                                <button onClick={() => Deletar(item.id)}>
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}