import { useState, useEffect,Link } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from '../../services/api';
import './filme.css';

export default function Filme() {
    const { id } = useParams(); //pega o id do filme na URL
    const navigate = useNavigate();

    const [ filme, setFilme ] = useState(null);
    const[loanding, setLoading] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        async function loadFilme() {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get(`r-api/?api=filmes/${id}`);
                if (!response.data || (Array.isArray(response.data) && response.data.length === 0 )) {
                    console.warn("Filme não encontrado, redirecionando para Home.");
                    navigate('/', {replace: true});
                    return;
                }
                setFilme(response.data);
            } catch (erro) {
                console.error('Filme não encontrado: ', erro);
                setError("Não foi possível carregar detalhes do filme.")
            }  finally{
                setLoading(false);
            } 
        }
        loadFilme();
    },[id, navigate]);
    function salvarFilme(){
        if(!filme) return;

        const minhaLista = localStorage.getItem('@primeFlix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme  = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
        if (hasFilme) {
            toast.warn('Este filme já existe!');
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if (loanding) {
        return(
            <div className="loading-container">
                <h2>Carregando detalhes...</h2>
            </div>
        );
    }
    if (error) {
        return(
            <div>
                <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
                <Link to="/">Voltar para home</Link> 
            </div>
        );
    }
    if (!filme) {
        return <div className='container'>Filme não encontrado.</div>
    }
    return (
        <div className="container">
            <div className="filme-info">
                <article>
                    <h1>{filme.nome}</h1>
                    <img src={filme.foto} alt={`${filme.nome}`}/>
                    <h3>Sinopse</h3>
                    <p>{filme.sinopse}</p>

                    <div className="botoes">
                        <button onClick={salvarFilme}>Salvar</button>
                        <a target="_blank"
                        rel="noopener noreferrer" 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.nome +'trailer')}`}
                        className="botao-link">
                                Trailer
                        </a>
                    </div>
                </article>
            </div>

        </div>
    )
}