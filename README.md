# Media Channel Cleaner Bot

🧹 🧹 🧹 🧹

## Description

This is a Discord bot that allows you to set channels as media-only in your server.
It will monitor all new messages and remove them if they contain no attachments or embedds.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
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
3. Get your application token from the "Bot" tab and application id from the "General" tab and edit the config.json file in your project as follows:
  ```json
  {
    "token": "YOUR_BOT_TOKEN",
    "clientId": "YOUR_APPLICATION_ID"
  }
  ```
  Replace YOUR_BOT_TOKEN and YOUR_APPLICATION_ID with your actual bot token and application ID!
  
4. Invite the bot to your Discord server
   
5. Start the bot from your local repository's directory:
   ```bash
   npm start
   ```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
