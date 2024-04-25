var socket = io();

socket.on('data', function(data){
    console.log(data);
    document.getElementById('sample').innerHTML = data;
});