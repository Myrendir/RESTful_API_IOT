// x = (accX * 0.5 * 0.01) + x° + (v°*0.1)
// y = (accY * 0.5 * 0.01) + y° + (v°*0.1)
// z = (accZ * 0.5 * 0.01) + z° + (v°*0.1)

function position(acc) {
    for (let x = 0; x < length; x++) {
        x = (acc * 0.5 * 0.01) + x + (acc * 0.1)
    }
}
