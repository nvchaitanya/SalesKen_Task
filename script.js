const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
var canvas,ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height

// Song titles
const songs = ['adiga', 'ninnuKori', 'onceUpon',"Aathadi Aathadi","Chirunavve"]

// keep track of songs
let songIndex = 1

// Initially load song DOM info
loadSong(songs[songIndex])

// Update song
function loadSong(song) {
    
    title.innerText = song
    audio.src = `music/${song}.mp3`
}


function nextTrack(){
    songIndex++
    
    if(songIndex > songs.length-1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playMusic()
}

function updateProgress(e){
    
    const {duration,currentTime} = e.srcElement
    const progressPercent = (currentTime/duration)*100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration 
    audio.currentTime = (clickX/width)*duration
    console.log(audio.currentTime,"OFFSET")
}

//Play Music Function
function playMusic() {
    console.log(audio,"Volume")
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove("fa-play")
    playBtn.querySelector('i.fas').classList.add("fa-pause")

    audio.play()
    
}

//Pause Music Function
function pauseMusic() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove("fa-pause")
    playBtn.querySelector('i.fas').classList.add("fa-play")
    audio.pause()
}

// Event Listeners 
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains("play")
    
    if (isPlaying) {
        pauseMusic()
    } else {
        playMusic()
    }
})

// change song events
nextBtn.addEventListener('click',nextTrack)
audio.addEventListener("timeupdate",updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended',nextTrack)


// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	document.getElementById('music').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}

// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#00CCFF'; // Color of the bars
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 2;
		bar_width = 1;
		bar_height = -(fbc_array[i] / 2);
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}