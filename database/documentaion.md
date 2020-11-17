#High Level Document Driver Project

####This project aims to make javascript classes compatible to mariadb database in a very high level way. This may **not** work for you. You are free to change the Code as you like.

##Documentation
Here are some low level functions for the driver(found in file LLD)

* #### clean (object)
    cleans an object. that is by dropping any property with a value of undefined or null

* #### makeTable (table_object, name)
    this takes input the objet for which table is to be made and a name for the table 

* #### add(type, object)
    this takes the input as a object which has to be stored in the database. the input is not cleaned and can be cleaned with the clean function given above;

* #### drop(type, object)
    drops an object of type type. the object is cleaned before that.

* #### read(read, type, object)
    reads read object from an object of type type. both read and object are cleaned. read and object should be of same data type. and the property of the class to be read has to initialized as true in the read variable

* #### alter(update, type, object)
    updates the values which are initialized in update object to all the data entry which follow the object constraints.

__ **both read and alter have not been regulated. The third variable passed acts as selector for type type and is replaced or processed with variable at the first** __

High level functions are specific to the project and has not been prepared.


####What is done??

[x] Basic crud functionality

[ ] High level functions

thank you