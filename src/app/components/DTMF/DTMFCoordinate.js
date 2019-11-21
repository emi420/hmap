
/*
    DTMFCoordinate will decode strings like this:

        *11572611489939*

    Where '*' is the start of the transmission, 1157261 is (coordinate long + 180) * 10000, for example:
    
        (-64,2739 + 180) * 10000

    The '#' character is 

*/

const DTMFCoordinate = (valuesString) => {
    console.log(valuesString);

    const asteriskCount = (valuesString.match(/\*/g)||[]).length;
    const cleanValueString  = valuesString.replace(new RegExp(/\*/g, 'g'), '');

    if (cleanValueString.length === 14 && asteriskCount === 2) {

        const coords = [
            cleanValueString.substring(0, 6),
            cleanValueString.substring(7, 14),
        ]
                
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
    } else {
        return {
            decoded: false,
        }
    }
}

export default DTMFCoordinate;