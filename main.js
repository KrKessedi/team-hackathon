// Чынгыз, [30.09.2022 0:12]
// function initStorage() {
//  if (!localStorage.getItem('favorites-data')) {
//   localStorage.setItem('favoritess-data', '[]')
//  }
// }

// initStorage()

// function setProductStorage(favorites) {
//  localStorage.setItem('favorites-data', JSON.stringify(favorites))
// }

// function getProductFromStorage() {
//  let favorites = JSON.parse(localStorage.getItem('favorites-data'))
//  return favorites
// }

let container = document.querySelector('.posts')

let POSTS = 'http://localhost:8000/posts'

let userImgInp = document.querySelector('#user-img-inp')
let userNameInp = document.querySelector('#username-inp')
let locationInp = document.querySelector('#location-inp')
let postImgInp = document.querySelector('#post-img-inp')
let descInp = document.querySelector('#desc-inp')
let addPostBtn = document.querySelector('#add-btn')
let renderBtn = document.querySelector('#render-btn')
let commentInp = document.querySelector('#comment-send')
let saveChangesBtn = document.querySelector('#save-btn')
let searchInp = document.querySelector('#search-inp')

// addPosts

function addPosts() {
	if (
		!userImgInp.value.trim() ||
		!userNameInp.value.trim() ||
		!locationInp.value.trim() ||
		!postImgInp.value.trim() ||
		!descInp.value.trim()
	) {
		alert('Some inputs are empty')
		return
	}

	let postObj = {
		pfp: userImgInp.value,
		username: userNameInp.value,
		location: locationInp.value,
		image: postImgInp.value,
		description: descInp.value,
		comments: [],
	}

	fetch(POSTS, {
		method: 'POST',
		body: JSON.stringify(postObj),
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
	userImgInp.value = ''
	userNameInp.value = ''
	locationInp.value = ''
	postImgInp.value = ''
	descInp.value = ''
}

addPostBtn.addEventListener('click', addPosts)

// render

let currentPage = 1
let limit = 3
let search = ''

async function render() {
	container.innerHTML = ''
	let requestAPI = `${POSTS}?q=${search}&_page=${currentPage}&_limit=${limit}`
	if (search !== '') {
		requestAPI = `${POSTS}?q=${search}`
	}
	await fetch(requestAPI)
		.then((res) => res.json())
		.then((data) => {
			data.forEach((item) => {
				container.innerHTML += `
            <div class="card mb-3" id="${item.id}">
        <div class="card__inner">
        <button id="${item.id}" class="update-btn btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#exampleModal">Update</button>
    <button id='${item.id}' class='delete-btn btn btn-danger'>Delete</button>
            <div class="card__inner_info">
                <div class="card__inner_info-user">
                    <img src="${item.pfp}"
                        alt="Error">
                    <div class="card__inner_info-user-text">
                        <p class="nickname">${item.username}</p>
                        <p class="country">${item.location}</p>
                    </div>
                </div>
            </div>
            <img src="${item.image}"
                class="card-img-top" alt="...">
            <div class="favorites">
                <div class="icons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5vw" height="2.5vw" fill="currentColor"
                        class="bi bi-heart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5vw" height="2.5vw" style="color: red;"
                        fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5vw" height="2.5vw" fill="currentColor"
                    class="bi bi-chat" viewBox="0 0

16 16" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="svg-com">
                    <path
                    d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5vw" height="2.5vw" fill="currentColor"
                    class="bi bi-bookmark" viewBox="0 0 16 16">
                    <path
                        d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5vw" height="2.5vw" fill="currentColor"
                    class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                    d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                    </svg>
                    </div>
            <div class="card-body">
                <h5 class="card-title" id="likes">Liked:</h5>
                <p class="card-text opisanie">${item.description}</p>
                <p class="card-text comments"><small class="text-muted">View all comments()</small></p>
                </div>
                </div>
                </div>`
				container.querySelectorAll('.update-btn').forEach((item) => {
					item.addEventListener('click', updateProduct)
				})
				container.querySelectorAll('.delete-btn').forEach((item) => {
					item.addEventListener('click', deletePost)
				})
			})
		})

	let some_arr = document.querySelectorAll('#svg-com')
	some_arr.forEach((item) => {
		item.addEventListener('click', (e) => {
			let productId = e.target.parentNode.parentNode.parentNode.parentNode.id
			id = +productId
			renderComments()
		})
	})
}
let id = 1
render()

renderBtn.addEventListener('click', render)

// comments

let ahah
async function createComment() {
	let commentInp = document.querySelector('#comment-inp')
	if (!commentInp.value.trim()) return alert('Input is empty')
	let res = await fetch(`http://localhost:8000/posts/${id}`)
	let post = await res.json()

	let gg = post.comments
	gg.push(commentInp.value)
	ahah = gg
	commentInp.value = ''
	saveComment()
}

async function saveComment() {
	await fetch(`http://localhost:8000/posts/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({ comments: ahah }),
		headers: {
			'Content-Type': 'Application/json;charset=utf-8',
		},
	})
}

let commentSendBtn = document.querySelector('#comment-send')
commentSendBtn.addEventListener('click', createComment)

// render comments
let containerComments = document.querySelector('#container-comments')
async function renderComments() {
	containerComments.innerHTML = ''
	let res = await fetch(`http://localhost:8000/posts/${id}`)
	let data = await res.json()

	let aa = data.comments
	aa.forEach((item) => {
		containerComments.innerHTML += `<h4>
      Anonimus: <small>${item}</small></h4>`
	})
}

// update
let id1 = 0
async function updateProduct(e) {
	let productId1 = e.target.id
	id1 += +productId1
	await fetch(`http://localhost:8000/posts/${id1}`)
		.then((res) => res.json())
		.then((data) => {
			userImgInp.value = data.pfp
			userNameInp.value = data.username
			locationInp.value = data.location
			postImgInp.value = data.image
			descInp.value = data.description
		})
}

function saveProduct() {
	if (
		!userImgInp.value.trim() ||
		!userNameInp.value.trim() ||
		!locationInp.value.trim() ||
		!postImgInp.value.trim() ||
		!descInp.value.trim()
	) {
		alert('Inputs are empty')
		return
	}
	fetch(`http://localhost:8000/posts/${id1}`, {
		method: 'PATCH',
		body: JSON.stringify({
			pfp: userImgInp.value,
			username: userNameInp.value,
			location: locationInp.value,
			image: postImgInp.value,
			description: descInp.value,
		}),
		headers: {
			'Content-Type': 'Application/json;charset=utf-8',
		},
	})
	alert('Updated successfully')
	userImgInp.value = ''
	userNameInp.value = ''
	locationInp.value = ''
	postImgInp.value = ''
	descInp.value = ''
	render()
	id1 = 0
}

saveChangesBtn.addEventListener('click', saveProduct)

//delete

function deletePost(e) {
	let postId = e.target.id

	fetch(`http://localhost:8000/posts/${postId}`, {
		method: 'DELETE',
	})

	render()
}

// search

// let searchInp = document.querySelector('#search-inp')
searchInp.addEventListener('input', () => {
	search = searchInp.value
	render()
})

let prevPageBtn = document.querySelector('#prev-page-btn')
let nextPageBtn = document.querySelector('#next-page-btn')
prevPageBtn.addEventListener('click', () => {
	currentPage--
	pagintaion()
	render()
})
nextPageBtn.addEventListener('click', () => {
	currentPage++
	pagintaion()
	render()
})

if (currentPage === 1) {
	prevPageBtn.style.display = 'none'
}

async function pagintaion() {
	if (currentPage === 1) {
		prevPageBtn.style.display = 'none'
	} else if (currentPage > 1) {
		prevPageBtn.style.display = 'block'
	}
	let res = await fetch(POSTS)
	let data = await res.json()
	let kolvo = data.length
	let pageNum = Math.ceil(kolvo / limit)

	if (currentPage === pageNum) {
		nextPageBtn.style.display = 'none'
	} else {
		nextPageBtn.style.display = 'block'
	}
}
