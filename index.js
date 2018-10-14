function ready() {
    const placeholder = document.getElementById('placeholder');
    placeholder.style.height = document.getElementById('messagesFrom').offsetHeight;
        
    const socket = io.connect('http://185.13.90.140:8081/');

    socket.on('message', function (msg) {
        console.log('MESSAGE');
        console.log(msg)

        const echoUser = 'echoBot2000';
        let displaMessage = '';
        const messages = document.getElementById('messages');
        const li = document.createElement('li');

        if (msg.user === echoUser) {
            const sep = "content: ";
            displaMessage = msg.message.substring(msg.message.indexOf(sep) + sep.length);
            li.classList += 'user-message';
        } else {
            displaMessage = msg.user + ': ' + msg.message
        }
        li.innerText = displaMessage;
        messages.append(li);
        window.scrollTo(0,document.body.scrollHeight);
    });

    const messagesFrom = document.getElementById('messagesFrom');
    messagesFrom.addEventListener('submit', function(event){
        console.log('SUBMIT ');

        let message = document.getElementById('message').value;
        if (!message) {
            event.preventDefault();
            return;
        }
        const user = document.getElementById('user').value || 'Guest';

        const data =  { 
            message: message,
            user: user
        };
        
        socket.emit('message', data);
        document.getElementById('message').value = '';
        event.preventDefault();
    })
}