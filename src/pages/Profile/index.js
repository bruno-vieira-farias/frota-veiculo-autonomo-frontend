import React, { useEffect, useState } from 'react';
import './style.css'
import logoImg from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

export default function Profile() {

    const userName = localStorage.getItem('userName');
    const userPhone = localStorage.getItem('userPhone');
    const [item, setItem] = useState([]);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0);


    const history = useHistory();

    useEffect(() => {
        api.get('rides/users/' + userPhone + '?page=' + page)
            .then(res => {
                setItems(res.data.docs);
                setPages(res.data.pages);
            })
    }, [userPhone, page]);

    useEffect(() => {
        api.get('rides/current/users/' + userPhone)
            .then(res => {
                setItem(res.data);                
            })
    }, [userPhone, page]);

    // remover LocalStorage e voltar o usuário para a sessão de Logout
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function nextPage() {
        if ((page + 1) > pages) {
            return;
        }
        setPage(page + 1);
    }

    function previousPage() {
        if ((page - 1) < 1) {
            return;
        }
        setPage(page - 1);
    }

    function handleStatus(status){
        console.log('status '+ status)
        switch (status) {
            case 'asked': return 'Solicitada'
            case 'started': return 'Iniciada'
            case 'finished': return 'Finalizada'
            default: return ''
        }
    }

    function CorridaAtual(){
        
        if(item !== null && item !== undefined && item.length > 0){
            let ride = item[0]
            return(
                <div>
                <h1>Corrida Atual</h1>
                <ul>
            <li>
                
                <strong>VEÍCULO:</strong>

                <p>{ride.vehicle.licensePlate}</p>

                <strong>ORIGEM E DESTINO:</strong>
                <p>{ride.startPlace}</p> <p>{ride.finishPlace}</p>

                <strong>STATUS</strong>
                
                <p>{handleStatus(ride.status)}</p>
            </li>
            </ul></div>)
        }
        else{
            return <span/>;
        }
    }

    function Historico(){
        return(
            <div>
            <h1>Histórico de Corridas</h1>
            <ul>
                {items.map(props => (
                    <li key={props._id}>
                        <strong>VEÍCULO:</strong>
                        <p>{props.vehicle.licensePlate}</p>

                        <strong>ORIGEM E DESTINO:</strong>
                        <p>{props.startPlace}</p> <p>{props.finishPlace}</p>

                        <strong>DATA E HORA DE CHEGADA:</strong>
                        
                        <p>{new Date(props.finishTime).toLocaleString('pt-br')}</p>

                        <strong>STATUS</strong>
                        
                        <p>{handleStatus(props.status)}</p>

                    </li>
                ))}
            </ul>
        </div>
        )
    }

    function RideButton(){
        if(item.length > 0){
            if(item[0].status === 'asked'){
                return(<Link className="button" to={{pathname: "/ride/start", state: item[0]}}>
                    Ir para corrida
                </Link>)
            }
            else{
                return(<Link className="button" to={{pathname: "/ride/status", state: item[0]}}>
                    Ir para corrida
                </Link>)
            }
        }
        else{
            return(<Link className="button" to="/ride/request">
                Solicitar corrida
            </Link>)
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Me Leva Ai" />
                <span>Bem vindo(a), {userName}</span>
                <RideButton />
                <button onClick={handleLogout}
                    type="button">
                    <FiPower size={14} color="#E02041" />
                </button>
                <button onClick={previousPage} disabled={page === 1}>
                    <FiArrowLeft size={14} color="#E02041" />
                </button>
                <p>{page}/{pages}</p>
                <button onClick={nextPage} disabled={page === pages}>
                    <FiArrowRight size={14} color="#E02041" />
                </button>
               
            </header>
            
            <CorridaAtual />
            
            <Historico />
        
        </div>
    );
}