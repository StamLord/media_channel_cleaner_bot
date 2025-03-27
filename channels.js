const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("channels.db");

let monitoredChannels = new Map();

function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS monitored_channels (
        channelId TEXT PRIMARY KEY, 
        allowAttachments INTEGER, 
        allowEmbedded INTEGER
    )`);
}

async function loadDbToCache(client) {
    db.all(`SELECT * FROM monitored_channels`, [], async (err, rows) => {
        if (err) {
            console.error("Error loading channels: ", err);
            return;
        }
        
        for (const row of rows) {
            try {
                console.log(`Fetching channel ${row.channelId}`);
                const channel = await client.channels.fetch(row.channelId);
                console.log(`Got channel ${channel}`);
                monitoredChannels.set(channel, {
                    "allowAttachments": Boolean(row.allowAttachments),
                    "allowEmbedded": Boolean(row.allowEmbedded)});
            } catch (err) {
                console.error(`Failed to fetch channel ${row.channelId}:`, err);
                console.log(`DELETING channelId: ${row.channelId}`);
                db.run(`DELETE FROM monitored_channels WHERE channelId = ?`, [row.channelId]);
            }
        }
    });
}

function addChannel(channel, allowAttachments = true, allowEmbedded = true) {
    monitoredChannels.set(
        channel, {
            "allowAttachments": allowAttachments, 
            "allowEmbedded": allowEmbedded
        });
    
    console.log(`INSERTING channelId: ${channel.id}`);
    db.run(`INSERT OR REPLACE INTO monitored_channels (channelId, allowAttachments, allowEmbedded) VALUES (?, ?, ?)`, 
        [channel.id, allowAttachments ? 1 : 0, allowEmbedded ? 1 : 0],
        function (err) {
            if (err) return console.error(err);
            console.log(`Inserted row with ID: ${this.lastID}`);
        });
}

function removeChannel(channel) {
    monitoredChannels.delete(channel);
    console.log(`DELETING channelId: ${channel.id}`);
    db.run(`DELETE FROM monitored_channels WHERE channelId = ?`, [channel.id]);
}

function getMonitoredChannels() {
    return monitoredChannels;
}

module.exports = {
    initializeDatabase,
    loadDbToCache,
    addChannel,
    removeChannel,
    getMonitoredChannels,
};
