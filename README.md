To run this application locally you will need to have node and npm up to date on your machine.  

To download Node: 
    https://nodejs.org/en/

npm documentation:
    https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

I suggest making sure you have the most current version of these running on your machine.
(For reference I am running npm version 9.2.0 and node 18.12.1)

I'm going to suggest using sudo before each command if trying to run this on a mac, or running all these commands as admin on a command prompt for windows. 

Of note, you may want to run the following commands with sudo for mac, or as admin in a command prompt to avoid issues. This may not be necessary however. 

Once Node and npm are ready to go open a Terminal(Mac)/Command Prompt(Windows). 

Then cd into the project folder and run "sudo npm i" 

Then run SSR mode locally using "sudo npm run dev:ssr"

You should eventually get a message that the app is being served to localhost:4200, and is ready to be viewed in your browser

Some unit tests have been written for the code base as well (although not 100% coverage)
If you want to run the unit tests simply enter "npm test" into the terminal. 

So why Angular for such a simple project?
    I use Angular in my current job and just thought it would be nice to show things like 
        -Using SSR
        -Unit testing with jest/ngMocks
        -Using the TransferState to avoid extra server calls
        -Lazy Loading Modules
        -Handling Routing

I have some experience with other front end frameworks, just not professionally. 