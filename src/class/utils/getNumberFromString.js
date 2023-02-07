export default (str) => {
    const regex = /\d+/g;
    const matches = str.match(regex);
    return matches && matches.map(Number);
}