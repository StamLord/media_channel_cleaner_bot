# Media Channel Cleaner Bot

...🧹...🧹...🧹...🧹

🚀 **Currently Hosted on Render**  
You can invite the bot to your server using the link below:
🔗 **[Invite the Bot](https://discord.com/oauth2/authorize?client_id=1352329964266979368&permissions=2147560448&scope=bot%20applications.commands)**

## Description

This is a Discord bot that allows you to set channels as media-only in your server.
It will monitor all new messages and remove them if they contain no attachments or embedds.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Interaction](#interaction)
- [License](#license)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/StamLord/media_channel_cleaner_bot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd media_channel_cleaner_bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. You will have to create a new Discord app in the Discord Developer Portal:
    https://discord.com/developers/applications
2. Enable the "Message Content Intent" permission:
  a. Navigate to "Bot" tab in the Discord Developer Portal under your applocation
  b. Enable "Message Content Intent"
3. Get your application token from the "Bot" tab and application id from the "General" tab and create a .env file in your project's root directory:
   ```bash
      cd media_channel_cleaner_bot
      touch .env
   ```
   Edit ".env" to look like this:
   ```bash
      DISCORD_TOKEN=YOUR_BOT_TOKEN,
      DISCORD_APP_ID=YOUR_APPLICATION_ID
   ```
  Replace YOUR_BOT_TOKEN and YOUR_APPLICATION_ID with your actual bot token and application ID!
  
4. Invite the bot to your Discord server
   
5. Start the bot from your local repository's directory:
   ```bash
   npm start
   ```

## Interaction

Once the bot is in your server and running, it will appear connected like any other user.
To interact with the bot you will use the following slash commands:
* [/add-media-channel](#add-media-channel)
* [/remove-media-channel](#remove-media-channel)
* [/is-media-channel](#is-media-channel)
* [/clean](#clean)
* [/clean-bots](#clean-bots)

### add-media-channel
Adds the current channel to the list of media-only channels.
Any message in a media-only channel that doesn't contain an attachment or embedding will be deleted by the bot!
This bot will not automatically delete messages made by bots. Use /clean-bots for that.

### remove-media-channel
Removes the current channel from the list of media-only channels.

### is-media-channel
Checks to see if the current channel is a media-only channel.

### clean
Deletes all messages in the channel that don't contain an attachment or an embedding.
This is useful if you already have messages from before the bot was running.

### clean-bots
Deletes all messages in the channel were made by bots, including this one.
This is useful if you have many bots posting in this channel.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
