const generateChatId = (uid1,uid2) => {
    const uids = [uid1,uid2];
    uids.sort();
    const chatId = uids.reduce((id,uid) => id + uid,"");
    return chatId;
}

export {generateChatId}