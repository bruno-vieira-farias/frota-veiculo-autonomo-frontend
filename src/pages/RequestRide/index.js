import React, { useState } from 'react';
import './style.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

import api from '../../services/api'

export default function RequestRide(){

    const [startPlace, setstartPlace ] = useState('');
    const [finishPlace, setfinishPlace ] = useState('');
    const telephone = localStorage.getItem('userPhone');
    const history = useHistory();
    async function handleNewRide(event){
        event.preventDefault();

        const data ={
            telephone,
            startPlace, 
            finishPlace,
        };

        try{
           const res = await api.post('rides', data);
           
           //////// mandar para a nova tela de acompahamento da corrida
           history.push('/ride/start', res.data);

        } catch(err){
            //alert('Erro ao solicitar corrida, tente novamente!')
            alert(err.response.data);
        }

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Me Leva Ai"/>
                <h1>Solicitar corrida</h1>
                <p>Informe a sua Origem e o seu Destino que o Me Leva Aí te leva!.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color = "#E02041"/>
                    Voltar para Home
                </Link>

                </section>
                <form onSubmit={handleNewRide}>

                <input 
                    placeholder="Origem" 
                    value={startPlace}
                    onChange={e=>setstartPlace(e.target.value)}
                    />
                <input
                    placeholder="Destino" 
                    value={finishPlace}
                    onChange={e=>setfinishPlace(e.target.value)}
                    />

                <button className="button" type="submit">Solicitar</button>

                </form>
            </div>
        </div>
    );
}