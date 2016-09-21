# DENKO-Board

## Welcome to the Maverick Denko Board

This project is built and runs on Nodejs.  Please verify you have installed Nodejs on your machin
Before you can begin to use Denko Board, you will want to set some values in the `ServerSide\credentials.json` file.

1. latitude
  * The latitude of your office for the weather api to use.
2. longitude
  * The longitude of your office for the weather api to use.
3. musicSrc
  * The location of the Mopidy "Now Playing" page.
4. adminCredentials
 1. username - The username to long in as.
 2. password - The password to long in with.
 3. securityQuestion - The security question used for password resets.
 4. securityAnswer - The answer to the security question.

After these values are set, you may run `nodejs denkoServer.js` in the `ServerSide` folder or `startDenko.sh` in the main directory on Linux.

The Denko Board may be accessed locally in a web browser at `127.0.0.1:1337` or by other machines on the network at `<host-ip>:1337`. **Note:** Denko Board displays best on Chrome or a Chrome variant. The admin page may be accessed locally in a web browser at `127.0.0.1:1337/admin.html` or by other machines on the network at `<host-ip>:1337/admin.html`.
