import Swal from 'sweetalert2'

export const Message = (title,text,type)=>{
    Swal.fire(title,text, type)
}