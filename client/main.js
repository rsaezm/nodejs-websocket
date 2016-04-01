var socket = io.connect('http://localhost:8080', { 'forceNew': true });
socket.on('mensajes', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(item, index){
        return(
            `<div>
                <strong>${item.author}</strong>: <em>${item.text}</em>
            </div>`);
    }).join(" ");

    document.getElementById('mensajes').innerHTML = html;
}

function addMessage(e){
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    };

    socket.emit('newMessage', payload);
    document.getElementById('text').value = '';

    return false;
}
