class VideoCanvas {
	constructor(width, height) {

		this.$video = document.createElement('video')
		this.$video.src = 'assets/videos/minions.mp4'
		this.$video.controls = true
		this.$video.muted = true
		this.$video.autoplay = true
		this.$video.currentTime = 15

		this.$body = document.querySelector('body')
		this.canvas = document.createElement('canvas')
		this.context = this.canvas.getContext('2d')

		this.canvas.width = width
		this.canvas.height = height

		this.$body.appendChild(this.$video)
		this.$body.appendChild(this.canvas)

		this.$video.style.display = 'none'

		this.$video.addEventListener('play', () =>
		{
			this.draw()
		}, false)
	}
  
	draw()
	{
		if(this.$video.paused || this.$video.ended) { return false }
		this.context.drawImage(this.$video, 0, 0, this.canvas.width, this.canvas.height)
		this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
		this.findColor()
		setTimeout(() => { this.draw() }, 20)
	}

	findColor()
	{
		let data = this.imageData.data
		let counter = 0
		for(let i = 0; i < data.length ; i+=4)
		{
			let r = data[i]
			let g = data[i+1]
			let b = data[i+2]
			counter++

			if((r==241)&&(g==202)&&(b==69))
			{
				let x = Math.floor((i%3200)/4)
				let y = Math.floor(i/3200) 
				console.log(`Call n°${counter} : x = ${x} y = ${y}`)
				this.context.fillStyle = 'red'
				this.context.arc(x, y, 50, 0, Math.PI*2)
				this.context.fill()
			}
		}
	}
}
