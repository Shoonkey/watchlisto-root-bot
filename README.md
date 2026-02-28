## Watchlisto Bot

A bot application for [Root](https://rootapp.com) that allows you and your friends to keep a watchlist of movies and series for you and your friends, along with individual ratings and watch state tracking.

### Commands

#### Implemented

- `/list`: Lists all media currently present in the watchlist, along with their average rating within your server
- `/add-media [Media Name Here]`: Adds a piece of media into the watchlist
- `/clear`: Clears the list

#### Planned

These might change in name or nature as development goes on

- `/update-name [index] [Media Name Here]`: Renames the piece of media currently at that index on the list
- `/remove [index]`: Removes a single piece of media from the watchlist based on its current index on the list
- `/rate [index] [rating from 0.0 to 10.0]`: Adds your personal user rating to the piece of media currently at that index on the list
- `/unrate [index]`: Undoes your `/rate`
- `/watch [index]`: Sets that you personally have watched a piece of media
- `/unwatch [index]`: Undoes your `/watch`

### Running the project yourself

Assuming Node v22 or higher and NPM dependencies installed (`npm i` within the repo directory), you can run the bot application by building the application (`npm run build`) and starting the bot process from the entry file (`npm run bot`).

To get your own test version running, you'll need to create a bot app within Root's [Dev Portal](https://dev.rootapp.com/apps) so a dev token and a test server with your bot are generated for you. Once you have the dev token, create a `.env` file following the model in `.env.example` and paste your dev token right after `DEV_TOKEN=` (if you used the copy button from their UI, `DEV_TOKEN=` is already included, so you can just paste it directly into a `.env` file with no more setup).

Now, you have a test server where your bot in development is and a way to start it (`npm run build && npm run bot`). From here on out, you can test the bot commands freely on that server, and as long as the bot process is running, it'll respond to the commands it recognizes.
