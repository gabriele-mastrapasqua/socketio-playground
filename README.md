# Basic socketio playground
Basic test using socket.io for testing clients reconnection using the default settings.

## Motivation
It's useful to see how socket.io interacts with different client state, for example on web mobile when you change tab or when you go in aero-mode then reconnect.
Without configuring special timeouts and keep-alive, the socket.io client can reconnect on every behaviour!

For more info please see the defaults here: https://socket.io/docs/v3/client-api/

## Setup

```
nvm use

npm i
```

## Run 
```
npm run server
```

Then connect on http://localhost:3000/ with multiple browser tabs to see the same random number broadcasted to all users every 2 seconds, a list of users connected (using the socket.id) and a basic chat without history or rooms.
