const phoneNumber='123-5677-89';
function removeHyphens(str){
    return str.replace(/-/g,'');
}
/* Cach binh thuong
function removeHyphens(str){
    while(str.indexOf('-')!==-1){
        str=str.replace('-','');
    }
    return str;
}
 */
removeHyphens(phoneNumber);
