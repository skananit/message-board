# message-board


Developed using Node.js, Express and MongoDB

Created a ReST API for a basic Create/Read/Update/Delete (CRUD) interface to develope a Twitter-like web application. 

This web application displays two courses and their message boards.

When a user types a short paragraph (less than 200 characters) in a text area and clicks the “Send” button, the message is sent to the server. The send button sends the text that was typed and save it along with a timestamp and the course code in the database.

When the application starts, it displays the last 20 entries (in order they were received) that has been saved in the database for each course.

The application checks the database at frequent intervals (~1 sec) and update the last 20 entries that have been entered by other users.

The application sanitizes all user input so that the display do not interpret any HTML or JavaScript that might be typed on to the text area.

The application allows typing in any language and displays in that language.
