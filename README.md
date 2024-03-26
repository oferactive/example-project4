# example-project4
Example Project using .NET Core and Angular

Includes a .NET Http server and Angular Client
Https was not used to prevent need to use Certificates when Executing.

Two tables are created, 
the first table holds User information, 
the second table holds Insurance Policies of the Users.

There are two Repositories and two Controller, 
Using Generics, There are base classes that implement most of the work.
Each Controller has a reference to the matching repository, making them work seamlessly together.

Projects in the Solution:
1. DataModel : Class Library with Model Definitions.
The DB is SQLite using EFCore.
The Database is Created and Updated Automaticaly when executing the WebApp.
The Database is created at : C:\Users\<User Name>\AppData\Local\ExampleProject4.db 

2. WebApp: Http Server that runs indenedently on http://localhost:5293.
There are two Controllers: UserController and InsurancePolictyController.
The two Controllers inherit from DBController<TRecord, TRepository>.
When Executing the WebApp, the Swagger Page is displayed.

3. AngularClient: The User Interface using Html Client.
The Applcation is built aroung a ControllerService which holds the data 
   while the Components are Used to Display and Edit the Data.
In the src/services directory, there are loaders for each controller, again,
	Generics is used to create the loaders that can cover most of the work with the Controllers.
The Loaders are Initiated by the ControllerService because they are part of the service. 

Execution:
The Solution Can be executed by defining to run both the AngularClient and the WebApp.
When starting the AngularClient for the first time, It will start to download libraries into
	the node_modules directory and a message will be displayed.
The WebApp will create the Database and try to add Demo Data, 
	using class "Add_Demo_Data" in the DataModel project.


There are two pages, One for a list of Users, that allow Adding, Deleting and Navigating 
   to another page that display a User and its an Insurance Policies.
On the User Page, It is possible to edit the user, delete a user, 
   add an Insurance Policy, edit an Insurance Policy and delete an Insurance Policy.
The Editing of an Insurance Policy is done in a panel that is opened below the row
   of the Insurance Policy. More than one Insurance Policy can be edited at the same time.
There is a filter on the Start Date of the Insurance Policy.
	The Filter Values are held by the ControllerService and It 
	is used while navigating the data. 
	The Filter is edited using InsurancePolicyFilterComponent which is displayed in both pages.  

The Forms are Created using angular Reactive Forms and are located in UserEditComponent
	and InsurancePolicyComponent components. The FormGroups are created 
	using functions in the ControllerService which manages the Data.

To Display Messages to the User, library ngx-toasta is added to the project.


Regarding the visual layout, The Layout is Simple and Minimalistic for Consistency.
All the CSS is maintained in the styles.css file.



