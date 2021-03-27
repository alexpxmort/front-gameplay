/** 
*Componente de Visor que exibe o campo para o jogador inicar o jogo
*E verificar se o computador acertou no núemro que ele estava pensando 
*/


import React, { useState,useRef,useEffect} from 'react' 
import NumberGenerator from '../../utils/numberGenerator'
import { Button,Container,Form,ButtonGroup,Row} from 'react-bootstrap';
import {empty} from '../../utils/string.utils'
import {createMethod}from '../../requests/api/api'
import { Message } from '../../utils/alert.utils';

const numberGenerator = new NumberGenerator(0, 1000)

const Visor = (props,ref) =>{
    const[numberSorted,setNumberSorted] = useState(null);
    const[started,setStarted] = useState(false);
    const [chute,setChute] = useState(0);
    const [chutesArr,setChutesArr] = useState([]);
    const [endGame,setEndGame] = useState(false);
    const [timerText,setTimerText] = useState('00:00:00');
    const [cron,setCron] = useState(null);
    const[send,setSend] = useState(false);
    let inputRef = useRef(null)

    let hour = 0;
    let minute = 0;
    let second = 0;
    let millisecond = 0;


    const startTimer = () => {
        pauseTimer();
        setCron(setInterval(() => { timer(); }, 10));
    }

    const  pauseTimer = ()=> {
        clearInterval(cron);
    }

    const  resetTimer = () => {
        setTimerText('00:00:00');
        pauseTimer();
    }

    
    function timer() {
        if ((millisecond += 10) == 1000) {
          millisecond = 0;
          second++;
        }
        if (second == 60) {
          second = 0;
          minute++;
        }
        if (minute == 60) {
          minute = 0;
          hour++;
        }
        
        setTimerText(`${returnData(hour)}:${returnData(minute)}:${returnData(second)}`)
    }
      
    function returnData(input) {
        return input > 10 ? input : `0${input}`
    }

   const  startGame = ()=>{

        if(empty(inputRef.current.value)){
            Message('Aviso!','Preencha o campo para darmos prosseguimento!','warning');
            return false
        }
        startTimer();
        setStarted(true)
        let number = numberGenerator.generate();
        setNumberSorted(number);
    }

    const  finishGame = ()=>{
        setStarted(false);
        setEndGame(false);
        resetTimer();
        setChute(0);
        setChutesArr([]);
    }

    useEffect(async ()=>{
        if(send){
                let resp = await createJogada()

                if(resp.error){
                   Message('Aviso!',resp.msg,'warning');

                    return false;
                }
                let btn = document.getElementById('update_data')

                if(!empty(btn)){
                    await btn.click();
                }
        }
    },[chutesArr,send])

    const createJogada = async ()=>{
        const data = {
            nome:inputRef.current.value,
            chutes:chutesArr
        }

        let res = await createMethod(data,'gameplay');

        await setSend(false)

        return res;
    }



    const startChute   = async (code)=>{
        let cont = chute+1;
        let obj = {};
        obj['chute']  = cont;
        obj['tempo'] = timerText;

        setChute(cont);

        let arr  =[...chutesArr];
        arr.push(obj);
       await setChutesArr(arr);

        switch(code){
            case '=':
                await setEndGame(true);
                await pauseTimer();
                await setSend(true)
                break;
            case '>':
                await setSend(false)
                await startGame();
                break;
            case '<':
                await setSend(false)
                await startGame();
                break;
        }

    }

    return(
        <Container>
            <Row style={{marginLeft:0.4}}>
                <span>TEMPO: {timerText}</span>
            </Row>
            <Form.Group controlId="name">
                <Form.Label>Nome:</Form.Label>
                <Form.Control disabled={started} type="text" placeholder="Insira o seu nome:" ref={inputRef} />
            </Form.Group>
            {
                (numberSorted!=null && started)?(
                    <h4>O número que você pensou é:{numberSorted}</h4>
                ):null
            }

            {
                (started)?(
                    <h2>Chutes:{chute}</h2>
                ):null
            }

            {
                (endGame)?(
                    <h2>Acertei uhulll!! :)</h2>
                ):null
            }


           {
               (started)?(
                <Container>
                {
                    (!endGame)?(
                    <ButtonGroup aria-label="controls">
                        <Button variant="warning" onClick={()=>startChute('<')}> {'<'} Menor </Button>
                        <Button variant="success" onClick={()=>startChute('=')}>Igual {'='}</Button>
                        <Button variant="danger" onClick={()=>startChute('>')}>Maior {'>'} </Button>
                    </ButtonGroup>
                    ):null
                }
                    <Row style={{marginTop:10}}>
                         <Button variant="primary" onClick={finishGame}>Sair</Button>
                    </Row>
                </Container>
               ):(
                <Button style={{marginBottom:20}} variant="primary" onClick={startGame}>Jogar</Button>
               )
           }
        </Container>
    );
}

export default Visor;