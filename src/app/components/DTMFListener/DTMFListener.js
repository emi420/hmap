import React, { PureComponent } from 'react';
import Goertzel from 'goertzeljs';
import DTMF from './DTMF/DTMF';

class DTMFListener extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          audio: null
        };
    }

    componentDidMount() {
        this.toggleMicrophone();
    }

    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });

        const audioContext = window.AudioContext || window.webkitAudioContext
        const context = new audioContext()
        const volume = context.createGain()
        const audioInput = context.createMediaStreamSource(audio)
        audioInput.connect(volume)
        const bufferSize = 512
        const recorder = context.createScriptProcessor(bufferSize, 1, 1);

        var dtmf = new DTMF({
          sampleRate: context.sampleRate,
          repeatMin: 6,
          downsampleRate: 1,
          energyThreshold: 0.005,
          filter: function(e){
            return !Goertzel.Utilities.doublePeakFilter(e.energies['high'], e.energies['low'], 1.4);
          }
        })

        var lastValue;
        var valuesString = "";
        var nullCount = 0;

        dtmf.on("decode", (value) => {

            if (this.props.listen) {
                  
              // var coords;
              // console.log(value);
          
              if (value === null) {
                nullCount +=1 ;
                if (nullCount > 10) {
                  valuesString = "";
                  lastValue = "";
                  nullCount = 0;
                }
              }
          
              if (value != null && value !== lastValue  ) {
                lastValue = value;
                valuesString += value;

                console.log(valuesString);
          
                let firstChar = valuesString.indexOf("*");
                let lastChar = valuesString.lastIndexOf("*");
                let charCount = (valuesString.match(/\*/g)||[]).length;
          
                if (firstChar < 3 && lastChar >= 10 && valuesString.length > 10 && charCount === 2) {
          
                  /*valuesString = valuesString.substring(firstChar + 1, lastChar - 1);
                            
                  coords = valuesString.split("#");
                  coords[0] = coords[0].replace("*", "");
                  coords[1] = coords[1].replace("*", "");
          
                  console.log("coords", coords);
                  */
                  
                  valuesString = "";
                  lastValue = "";

                  this.props.onDecode('-64.3002159 -31.0649561');
          
                  /*try {
                    var lat = parseFloat(coords[0].substring(0, 3) + "." + coords[0].substring(3, coords[0].length)) - 180;
                    var lon = parseFloat(coords[1].substring(0, 3) + "." + coords[1].substring(3, coords[1].length)) - 180 ; 
                    console.log([lat, lon])

                    this.props.onDecode([lat, lon].join(' '));
      
                  } catch(e) {
                    console.log("Error decoding.");
                  }*/
          
                }
              }
            }
        });

        recorder.onaudioprocess = function(e){
            var buffer = e.inputBuffer.getChannelData(0)
            dtmf.processBuffer(buffer)
        }
        volume.connect (recorder)
        recorder.connect (context.destination) 

        this.setState({ audio });
    }

    stopMicrophone() {
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({ audio: null });
    }

    toggleMicrophone() {
        if (this.state.audio) {
            this.stopMicrophone();
        } else {
            this.getMicrophone();
        }
    }
    
    render() {
        return ('');
    }
}

export default DTMFListener;
