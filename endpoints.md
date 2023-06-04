films

- get /films/:id
- get /films
- post /films
- put /films/:id

users

- get /users/:id
- post /users/
- put /users/:id
- delete /users/:id (por el momento solo se eliminan usuarios sin ninguna review)

reviews

- get /films/:id/reviews
- get /users/:id/reviews
- post /films/:id/reviews?userId=:userId
- delete /users/:userId/reveiws/:reviewId
- update /users/:userId/reveiws/:reviewId
