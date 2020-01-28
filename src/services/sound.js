var Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

var whoosh = new Sound('ride_alert.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

    // Play the sound with an onEnd callback

});

export default whoosh;