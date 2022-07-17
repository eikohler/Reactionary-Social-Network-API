# Reactionary Social Network API
- I was tasked with creating a social network back end api using MongoDB, Mongoose.
- I started out by defining the routes, since I was provided knowledge of what funtions this api needed to have such as getting all of the users, thoughts, etc.
- Then moved on to the models setup building out the schema for the User and thoughts (with validationa and reference arrays to other tables id's when connecting the too)
- Finally I setup the controllers to do the heavy lifting in the api and manage all the CRUD tasks for the models
- Users can have friends and thoughts
- Thoughts belong to a User and reactions belongs to a thought
- As well there is a date modifier getter method that reformats the created date to a nice format

- Walkthrough: https://youtu.be/MEbUXft6q5g