var Sound = require('react-native-sound')
var whoosh: any
var backgroundSound: any
var tap: any
var pop: any

export const PlaySound = () => {
  backgroundSound = new Sound('background_music.mp3', Sound.MAIN_BUNDLE, (error: any) => {
    backgroundSound.setVolume(1)
    if (error) {
      return
    }

    backgroundSound.play((success: any) => {
      if (success) {
        Sound.setCategory('Playback')
      } else {
      }
    })
  })
}

export const onTap = () => {
  pop = new Sound('tap.wav', Sound.MAIN_BUNDLE, (error: any) => {
    if (error) {
      return
    }
    pop.play((success: any) => {
      if (success) {
        Sound.setCategory('Playback')
      }
    })
  })
}

export const countDown = () => {
  pop = new Sound('timer_sound_two.mp3', Sound.MAIN_BUNDLE, (error: any) => {
    if (error) {
      return
    }
    pop.play((success: any) => {
      if (success) {
        console.log('successfully finished playing')
        Sound.setCategory('Playback')
      }
    })
  })
}

export const finishSound = () => {
  whoosh = new Sound('timer_sound_one.mp3', Sound.MAIN_BUNDLE, (error: any) => {
    if (error) {
      return
    }
    whoosh.play((success: any) => {
      if (success) {
        console.log('successfully finished playing')
        Sound.setCategory('Playback')
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  })
}

export const notePadeOutSound = () => {
  whoosh = new Sound('bars.wav', Sound.MAIN_BUNDLE, (error: any) => {
    if (error) {
      return
    }
    whoosh.play((success: any) => {
      if (success) {
        console.log('successfully finished playing')
        Sound.setCategory('Playback')
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  })
}

export const StopAudio = async () => {
  await backgroundSound.stop(() => {})
}