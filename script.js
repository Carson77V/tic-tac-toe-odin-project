const gameBoard = (function () {
    let _array = ["1","2","3","4","5","6","7","8","9"]

    const _renderBoard = function () {

    }

    const reset = function () {
        for (let i = 0; i < _array.length - 1; i++){
            _array[i] = "";
        }
    }

    return { reset }
})();