
/**
 * Arquivo com função que exibe um alerta de acordo 
 * com os paramêtros passados pra ela
 */

import Swal from 'sweetalert2'

export const Message = (title,text,type)=>{
    Swal.fire(title,text, type)
}