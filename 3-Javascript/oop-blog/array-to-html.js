function relativeTimeLabel (timestamp) {
	const elapsedMilliseconds = Date.now() - timestamp
	const seconds = Math.floor(elapsedMilliseconds / 1000)

	if (seconds < 60) {
		return `${seconds} second${seconds === 1 ? '' : 's'} ago`
	}

	const minutes = Math.floor(seconds / 60)
	if (minutes < 60) {
		return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
	}

	const hours = Math.floor(minutes / 60)
	if (hours < 24) {
		return `${hours} hour${hours === 1 ? '' : 's'} ago`
	}

	const days = Math.floor(hours / 24)
	return `${days} day${days === 1 ? '' : 's'} ago`
}

updateDOM = () => {
	const feed = document.getElementById('feed')

	feed.innerHTML = ''

	if (typeof allPosts === 'undefined') {
		return false
	}

	for (let i = allPosts.length - 1; i >= 0; i--) {
		const post = allPosts[i]

		const article = document.createElement('article')
		article.className = 'post'

		const info = document.createElement('p')
		info.className = 'post-info'
		info.textContent = `${post.author.username} * ${relativeTimeLabel(post.time)}`

		const body = document.createElement('p')
		body.className = 'post-body'
		body.textContent = post.body

		article.append(info, body)
		feed.appendChild(article)
	}

}

updateDOM()