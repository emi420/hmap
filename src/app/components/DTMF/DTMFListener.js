import { PureComponent } from 'react';
import Goertzel from 'goertzeljs';
import DTMFDecoder from './DTMFDecoder/DTMFDecoder';

class DTMFListener extends PureComponent {

    state = {
      audio: null,
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

        var dtmf = new DTMFDecoder({
          sampleRate: context.sampleRate,
          repeatMin: 6,
          downsampleRate: 1,
          energyThreshold: 0.005,
          filter: function(e){
            return !Goertzel.Utilities.doublePeakFilter(e.energies['high'], e.energies['low'], 1.4);
          }
        })

        dtmf.on("decode", (value) => {
            if (value !== null) {
              this.props.onDecode(value);
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

    componentDidUpdate(prevProps) {
      if (this.props.listen !== prevProps.listen) {
        this.toggleMicrophone();
      }
    }
    
    render() {
        return ('');
    }
}

export default DTMFListener;
