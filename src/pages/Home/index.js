import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';
import './home.css';

export default function Home(){

    //vamos criar uma variavel de estado que irá conter os filmes
    const [ filmes, setFilmes ] = useState([]);

    useEffect(() => {
        async function carregarFilmes() {
            try {
                const response = await api.get('r-api/?api=filmes');
                setFilmes(response.data);
            } catch (erro) {
                console.error('Deu erro ao ler a API: ', erro);
            }
        }
        carregarFilmes();
    },[]);
    //vamos exibir a lista de filmes
    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) =>(
                    <article key={filme.id}>
                        <h1>{filme.nome}</h1>
                        <img src={filme.foto} alt={`Foto do filme ${filme.nome}`}/>
                        <Link to={`/filme/${filme.id}`}>
                        Acessar
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )

}