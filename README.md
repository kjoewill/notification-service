notification-service
====================
Simple Notoification Service is a server application that provides a Rest-based interface to allow definition of Events,
a way to signal an occurrence of Events and also a way to subscribe to occurences of Events. The service runs as a Node 
application and employs MongoDb as the backend.

When an Event occurence is signaled then all subscribers receive notification of the occcurence along with any 
inforrmation specific to the occurence.
