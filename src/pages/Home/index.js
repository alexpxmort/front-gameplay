/**
 * Componente de da página de Home Onde fica
 * o componente de visor do jogo e o ranking
 */


import React,{useRef, useCallback} from 'react'
import { Button, Container } from 'react-bootstrap';
import Ranking from '../../components/ranking'
import Visor from '../../components/visor'


const HomePage = ()=>{
    const rankingRef = useRef(null);

    const updateData = useCallback(()=>{
        rankingRef.current.getDataHandler()
    },[]);

   
    return(
        <Container>
            <Visor/>
            <Ranking ref={rankingRef}/>
            <Button style={{marginTop:30,marginLeft:15}} id='update_data' onClick={()=>updateData()}>Atualizar Dados</Button>
        </Container>
    );
}

export default HomePage;