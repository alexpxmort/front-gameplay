import React, { useState,useImperativeHandle,useEffect,memo, useCallback,forwardRef} from 'react' 
import { Button,Container,Form,ButtonGroup,Row} from 'react-bootstrap';
import {getAllMethodJogadas} from '../../requests/api/api'
import _ from 'lodash';
import { empty } from '../../utils/string.utils';
import moment from 'moment';

const Ranking = (props,ref) =>{
    const [jogadas,setJogadas] = useState([]);
    const [loading,setLoading] = useState(true)

    useEffect(async()=>{
       await getData();
       await setLoading(false);
    },[]);
    
    const getData = async()=>{
        let _jogadas = await getAllMethodJogadas();
        
        if(_jogadas.error){
            alert(_jogadas.msg);
            return false;
        }
        await setJogadas(getNewArr(_jogadas.jogadas));
    }

    const getDataHandler = useCallback(async ()=>{
        let _jogadas = await getAllMethodJogadas();

        if(_jogadas.error){
            alert(_jogadas.msg);
            return false;
        }
        await setJogadas(getNewArr(_jogadas.jogadas));
    },[]);
    

    useImperativeHandle(ref,()=>{
        return {
            getDataHandler:getDataHandler
        }
    })

    const   getNewArr = (_jogadas)=>{
        let _newArr = [];
        let sortByArr = [];
      
        _jogadas.forEach((val)=>{
            let _newJogadas = [];
            let user = val.user_gameplay

            let _jogadasNew = _jogadas.filter((val)=>{
                return val.user_gameplay.id == user.id
            }) 

            _jogadasNew.forEach((valJogada)=>{
                let obj = {
                   chute:valJogada.chute,
                   tempo:valJogada.tempo
                };

                _newJogadas = [..._newJogadas,{...obj}]
            })

            let userObj = {
                user:user,
                user_id:user.id,
                jogadas:_newJogadas
            }

            _newArr = [..._newArr,{...userObj}]
        })

        _newArr =  _.uniqBy(_newArr, 'user_id');

        sortByArr = _.sortBy(_newArr,'jogadas')


        sortByArr.forEach((val)=>{
            let getIguals = sortByArr.filter(valX =>{
                return valX.jogadas.length == val.jogadas.length
            })
           
            if(getIguals.length > 0){
                for(var cont=0;cont<=getIguals.length;cont++){
                    if(!empty(getIguals[cont]) && !empty(getIguals[cont+1])){
                        let atual = getIguals[cont];
                        let next = getIguals[cont+1];

                        let dateAtual = moment(`2021-03-27 00:00:00`)
                        let dateAtualNext = moment(`2021-03-27 00:00:00`)

                        atual.jogadas.forEach((jogadaAtual)=>{
                            let dat  = moment(`2021-03-27 ${jogadaAtual.tempo}`)
                           
                            dateAtual.add('hours',dat.hours())
                            dateAtual.add('minutes',dat.minutes())
                            dateAtual.add('seconds',dat.seconds())
                        })

                        next.jogadas.forEach((jogadaAtualNext)=>{
                            let dat  = moment(`2021-03-27 ${jogadaAtualNext.tempo}`)
                           
                            dateAtualNext.add('hours',dat.hours())
                            dateAtualNext.add('minutes',dat.minutes())
                            dateAtualNext.add('seconds',dat.seconds())
                        })

                        let trocar = false

                        if(dateAtual.hours() > dateAtualNext.hours()){
                            trocar = true
                        }

                        
                        if(dateAtual.minutes() > dateAtualNext.minutes()){
                            trocar = true
                        }

                        if(dateAtual.seconds() > dateAtualNext.seconds()){
                            trocar = true
                        }

                        if(trocar){
                            sortByArr[cont] = next
                            sortByArr[cont+1] = atual
                        }
                    }
                }
            }
        })

        return sortByArr;
    }

    if(!loading){
        return (
            <Container>
                <h2>Ranking de Jogadas:</h2>
                {
                    jogadas.map((val,idx)=>{
                       return(
                        <Container key={idx}>
                            <h4>Jogador: {val.user.nome}</h4>
                            {
                                val.jogadas.map((jogada,index)=>{
                                      return(
                                        <Row key={index}>
                                            <span style={{marginRight:40}}>Chute: {jogada.chute}</span>
                                            <span>Tempo: {jogada.tempo}</span>
                                        </Row> 
                                      )
                                })
                            }
                          
                        </Container>
                       )
                    })
                }
                </Container>
        );
    }else{
        return (
            <Container/>
        );
    }
   
}

export default forwardRef(Ranking);