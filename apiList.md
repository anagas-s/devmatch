# DevMatch APIs

authRouter

- POST /ssignup
- POST /login
- POST /logout

profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

ConnectionrequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userConnectionsRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profile of other users
  status : ignore,interested,accepted,rejected