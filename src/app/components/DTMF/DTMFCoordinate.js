

const DTMFCoordinate = (valuesString) => {
    console.log(valuesString);

    let firstChar = valuesString.indexOf("*");
    let lastChar = valuesString.lastIndexOf("*");
    let charCount = (valuesString.match(/\*/g)||[]).length;

    if (valuesString.length > 10 && charCount === 2) {

        valuesString = valuesString.substring(firstChar + 1, lastChar - 1);
                
        let coords = valuesString.split("#");
        
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