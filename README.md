Steps to install/reproduce

1.  Install nodeJS.   I used v10.15.3.  When/if prompted, make sure ```node``` is added to your PATH

2.  Clone this repo to your chosen project directory
```
git clone https://github.com/thesaxonedone/postman_issue6337_demo
```

3.  Run ```npm install``` to get package dependencies

4.  Run the application with ```node app.js``` from the repo directory

5.  Using POSTMAN, submit a post request to http://localhost:1337/upload using a multipart form per the below screenshot.  Use a large file as the parameter for file1.
![image](https://user-images.githubusercontent.com/31674706/60402514-a5e7ee80-9b45-11e9-96be-3024cf1bcd41.png)

6.  Repeatedly issue this POST request and witness that sometimes POSTMAN accurately shows the 400 response with payload indicating an error, and other times shows a "Could not get any response" message (per the below screenshots).

![image](https://user-images.githubusercontent.com/31674706/60402527-d465c980-9b45-11e9-8ff4-662d0dabdde4.png)

![image](https://user-images.githubusercontent.com/31674706/60402530-dc256e00-9b45-11e9-867b-5e213db865b7.png)


7.  Run wireshark to see the TCP and HTTP traffic and note that the server is sending a correctly formed HTTP 400 followed by a FIN.  Note that whether this HTTP 400 arrives across multiple packets (or not) does not seem to affect the behavior - both behaviors will happen regardless of whether or not the HTTP 400 arrives across multiple packets.    Additionally, whether POSTMAN continues to send data after the 400 is received (or not) for a short while (due to what I assume to be an unacknowledged receive buffer), does not seem to affect whether POSTMAN decides to interpret the traffic as a valid 400 or otherwise - both behaviors will happen regardless of whether or not POSTMAN sends additional data for a short while after the 400 is received.   
