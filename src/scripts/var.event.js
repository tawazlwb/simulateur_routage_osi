function initNodeClick(length) {
  return new Array(length).fill(false);
}

function initPathClick(length) {
  return new Array(length).fill(false);
}

function clearArray(array) {
  array.splice(0, array.length);
}

exports.initNodeClick = initNodeClick;
exports.initPathClick = initPathClick;
exports.clearArray = clearArray;
