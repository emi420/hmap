import GeoJSON from 'geojson';

// Conversion code from: https://github.com/gavinr/csv-to-geojson

function getColName(data, possibleColumnNames) {
    if (!data || !data.length) return null;
    for (var i = 0; i < data[0].length; i++) {
      if (possibleColumnNames.indexOf(data[0][i]) !== -1) {
        return data[0][i];
      }
    }
    return null;
  }

function massageData(data) {
    if (!data || !data.length) return null;
    var firstRow = data[0];
    var map = data.map(function(item) {
      var returnItem = {},
        i = 0;
      firstRow.forEach(function(columnName) {
        returnItem[columnName] = item[i++];
      });
      return returnItem;
    });
    //get rid of header
    map.shift();
    return map;
  }

function latLonColumnsToNumbers(data, latName, lonName) {
    return data.map(function(item) {
      if (item.hasOwnProperty(latName)) {
        item[latName] = parseFloat(item[latName]);
      }
      if (item.hasOwnProperty(lonName)) {
        item[lonName] = parseFloat(item[lonName]);
      }
      return item;
    });
  }

export const CSVToArray = ( strData, strDelimiter ) => {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

export const CSVToGeoJSON = (CSVString) => {
    const csvObject = CSVToArray(CSVString);
    var latName = getColName(csvObject, ['lat', 'Lat', 'LAT', 'latitude', 'Latitude', 'LATITUDE']);
    var lonName = getColName(csvObject, ['lng', 'Lng', 'LNG', 'lon', 'Lon', 'LON', 'longitude', 'Longitude', 'LONGITUDE']);
    return GeoJSON.parse(latLonColumnsToNumbers(massageData(csvObject), latName, lonName), {
        Point: [latName, lonName]
      }
    )
}