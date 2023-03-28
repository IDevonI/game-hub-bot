const getTimestamp = () => {
    return '['+(new Date).toLocaleString('pl-PL')+']';
}

module.exports = {
    getTimestamp
}