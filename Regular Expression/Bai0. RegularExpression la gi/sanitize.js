const phoneNumbers=[
    '123-588-123',
    '567.555.222',
    '086 123 555'
];
function sanitize(arr){
    return arr.map(ele=>ele.replace(/[-. ]/g,''));
}
sanitize(phoneNumbers)
