export default (array, order) => {
    const orderArray = Object.entries(order);
    orderArray.forEach(([oldIdx, newIdx]) => {
      swap(array, oldIdx, newIdx);
    })
}

function swap(array, oldIdx, newIdx) {
    const tmp = array[oldIdx];
    array[oldIdx] = array[newIdx];
    array[newIdx] = tmp;
}