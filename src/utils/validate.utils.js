/**
 * Arquivo com função que valida os inputs que são passados pra ele
 * dentro de um array
 */

export const validateInputs = (array)=>{

    var valid = false;


    if(array.length > 0){
        array.forEach((val)=>{
            if(val !="" &&  val!=null && val!=undefined && val!='<empty string>'){
                valid  = true;
            }else{
                valid = false;
            }
        });
    }


    return valid;
}