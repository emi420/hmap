
/*
    DTMFCoordinate will decode strings like this:

        11572611489939

    Where 11572611489939 are two (coordinate + 180) * 10000 together:
    
        (-64,2739 + 180) * 10000 => 1157261
        (-31,0061 + 180) * 10000 => 1489939

*/

const DTMFCoordinate = (valuesString) => {

    // CHECK THIS: change to 14 characters
    const coords = [
        valuesString.substring(0, 6),
        valuesString.substring(6, 13),
    ]

    console.log(coords);
            
    try {
        var lat = parseFloat(coords[0].substring(0, 3) + "." + coords[0].substring(3, coords[0].length)) - 180;
        var lon = parseFloat(coords[1].substring(0, 3) + "." + coords[1].substring(3, coords[1].length)) - 180 ; 
        return {
            coordinate: [lat, lon],
            decoded: true,
        }

    } catch(e) {
        console.log("Error decoding.", e);
        return {
            decoded: false,
            error: true,
        }
    }
}

export default DTMFCoordinate;