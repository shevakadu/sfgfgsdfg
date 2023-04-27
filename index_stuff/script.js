// JavaScript Document

// Table of contents:
// * Mapping of the main UI parts
// * Animating
// * MOTDs
// * Function:Add post to feed
// * Function:Check if logged in
// * Function:Show an error/info
// * Animate filter options
// * Animate the searchbar
// * Add localization

// * Function:Activate an account
// * Function:Log into an account
// * Function:Get account data
// * Function:Refresh own account
// * Function:Log out of account
// * Function:Change passive account data
// * Function:Change status
// * Function:Create a post
// * Function:Get posts

// * Check if logged in

console.log("sus")

window.onload = function() {
	// Mapping of the elements of the main page
	const elements = {
		mapping: {
			"editbar-header": "editbar",
			"authbar-header": "authbar",
			"filterbar-filterbutton": "searchbar"
		},
		"userbar": {
			header: null,
			contents: {
				userbg: document.getElementById("userbar-background-image"),
				useravatar: document.getElementById("userbar-profile-image"),
				username: document.getElementById("userbar-profile-username"),
				userstatus: document.getElementById("userbar-profile-status"),
				
				submitbutton: document.getElementById("userbar-profile-updatestatus"),
				profile: document.getElementById("userbar-profile"),
				welcome: document.getElementById("userbar-welcome")
			},
			open: true,
			initial_height: document.getElementById("authbar-contents").style.height,
			bartype: "non-folding"
		},
		"editbar": {
			header: document.getElementById("editbar-header"),
			contents: {
				content_source: document.getElementById("editbar-contents"),
				contents: {
					usernamefield: document.getElementById("editbar-contents-username"),
					passwordfield: document.getElementById("editbar-contents-password"),
					profileiconurlfield: document.getElementById("editbar-contents-profileiconurl"),
					submitbuttton: document.getElementById("editbar-contents-submitchanges")
				}
			},
			open: false,
			initial_height: document.getElementById("editbar-contents").style.height,
			bartype: "folding"
		},
		"authbar": {
			header: document.getElementById("authbar-header"),
			contents: {
				content_source: document.getElementById("authbar-contents"),
				contents: {
					usernamefield: document.getElementById("authbar-contents-username"),
					passwordfield: document.getElementById("authbar-contents-password"),
					loginbutton: document.getElementById("authbar-contents-useaccount"),
					
					invitecodefield: document.getElementById("authbar-contents-invitecode"),
					useinvitecodebutton: document.getElementById("authbar-contents-useinvitecode"),
					
					authinfo: document.getElementById("authbar-contents-info"),
					welcome: document.getElementById("authbar-welcome")
				}
			},
			open: true,
			initial_height: document.getElementById("authbar-contents").style.height,
			bartype: "folding"
		},
		"postbar": {
			header: null,
			contents: {
				postinput: document.getElementById("postbar-postinput"),
				taginput: document.getElementById("postbar-taginput"),
				mentioninput: document.getElementById("postbar-mentioninput"),
				
				info: document.getElementById("postbar-submiterror"),
				postbutton: document.getElementById("postbar-submitbutton"),
				
				itself: document.getElementById("postbar")
			},
			open: true,
			initial_height: document.getElementById("authbar-contents").style.height,
			bartype: "non-folding"
		},
		"filterbar": {
			header: null,
			contents: {
				// not yet
			},
			open: true,
			initial_height: document.getElementById("authbar-contents").style.height,
			bartype: "non-folding"
		},
		"searchbar": {
			header: document.getElementById("filterbar-filterbutton"),
			contents: {
				content_source: document.getElementById("filterbar-contents"),
				contents: {
					usersearchinput: document.getElementById("searchbar-usersearchinput"),
					tagsearchinput: document.getElementById("searchbar-tagsearchinput"),
					
					filterbutton: document.getElementById("searchbar-submitbutton")
				}
			},
			open: false,
			initial_height: document.getElementById("filterbar-contents").style.height,
			bartype: "non-folding"
		}
	}
	
	// Animating the elements
	
	for (var name in elements) {
		console.log(name)
		bar = elements[name]
		console.log(bar)
		if (bar.bartype == "folding") {
//			if (bar.open == false) {
//				bar.contents.content_source.style.height = "0px"
//				bar.contents.content_source.style.padding = "0px"		
//			}
			
			console.log(bar.header)
			
//			bar.header.addEventListener("click", function() {
//				console.log(this)
//				if (bar.open == false) {
//					bar.open = true
//					bar.contents.content_source.style.height = bar.initial_height
//					bar.contents.content_source.style.padding = "20px"
//				} else {
//					bar.open = false
//					bar.contents.content_source.style.height = "0px"
//					bar.contents.content_source.style.padding = "0px"
//				}
//			})
			
			bar.header.onclick = function() {
				var clickedon = elements[elements.mapping[this.id]]
				console.log(bar)
				if (clickedon.open == false) {
					clickedon.open = true
					clickedon.contents.content_source.style.maxHeight = "1000px" //clickedon.initial_height
					clickedon.contents.content_source.style.padding = "20px"
				} else {
					clickedon.open = false
					clickedon.contents.content_source.style.padding = "0 20px 0 20px"
					clickedon.contents.content_source.style.maxHeight = "0px"
				}
			}
		}
	}
	
	// Here should be the controller for the MOTDs...
//	const motds = []
	
	// Function to create a post on the feed
	// Example:
//        <div class="post">                                                                                    V
//            <div class="post-top-bar">                                                                        V
//                <div class="post-author-avatar-container">                                                    V
//                    <img src="stock image yay.jpg" alt="sdfdsfsdfdsfafasf" class="post-author-avatar">        V
//                </div>                                                                                        V
//                <div class="post-author-name">*-*-&lt;3_MashUnyA_Ɛ&gt;-*-*</div>                              V
//                <div class="post-author-info">said at 20:00 10/03/2023</div>
//            </div>
//            <div class="post-contents">omg guys!!111! this is so awesome cool and amazing! who wants to go out with me?????
//            </div>
//        </div>
	
	function add_post_to_feed(author, pfp, hour, minute, day, month, year, contents, tag, mention, type) {
		// Types:
		// textpost (v)
		// mention (v)
		// status
		// news (v)
		// help
//		if (type == null || type == undefined || type == "textpost" || type == "news") {
        var post_shell = document.createElement('div')
        if (mention != localStorage.networking_credentialUsername) {
            post_shell.setAttribute('class', 'post')
        } else {
            if (localStorage.networking_allowStandbyAuth == "true") {
                post_shell.setAttribute('class', 'post post-type-mention')
            } else {
                post_shell.setAttribute('class', 'post')
            }
        }

        if (type == "news") {
            post_shell.setAttribute('class', 'post post-type-news')
        }

        var post_top_bar = document.createElement('div')
        post_top_bar.setAttribute('class', 'post-top-bar')

        var post_author_avatar_container = document.createElement('div')
        post_author_avatar_container.setAttribute('class', 'post-author-avatar-container')

        var post_author_avatar = document.createElement('img')
        post_author_avatar.setAttribute('class', 'post-author-avatar')

        post_author_avatar.setAttribute('src', pfp)
		if (type == "activation") {
			post_author_avatar.setAttribute('src', "index_stuff/eggy")
		}
        post_author_avatar.setAttribute('alt', 'epic epic epic epic epic epicepic epicepicepicepic epicepicepicepic')
//		post_author_avatar.setAttribute('onerror', "this.onerror=null;this.src='https://placehold.co/80/png?text=profile%0Apicture%0Anot%0Afound';")
        post_author_avatar.setAttribute('onerror', "this.onerror=null;this.src='https://loremflickr.com/320/320';")
        // document.getElementById("userbar-profile-image").setAttribute('onerror', "this.onerror=null;this.src='https://loremflickr.com/320/320';")
        // https://loremflickr.com/320/320 - photos
        // https://placehold.co/80/png?text=%20 - a question mark
        // https://placekitten.com/300/300 - kitten images
        // https://picsum.photos/ - photos
        // https://fakeimg.pl/ - placeholders
        // https://placebear.com/ - bear images
        // http://dummy-image-generator.com/ - photos
        // gotta choose i guess

        var post_author_name = document.createElement('div')
        post_author_name.setAttribute('class', 'post-author-name')
		if (type != "status"  && type != "activation") {
        	post_author_name.innerHTML = author
		} else if (type == "activation") {
			post_author_name.innerHTML = "someone just joined!"
		} else if (type == "status") {
			post_author_name.innerHTML = `${author} changed their status to ${contents}`
		}

        var post_author_info = document.createElement('div')
        post_author_info.setAttribute('class', 'post-author-info')
		if (type != "status" && type != "activation") {
            if (minute.length == 2) {
                post_author_info.innerHTML = `said at ${hour}:${minute} ${day}/${month}/${year}`
            } else {
                post_author_info.innerHTML = `said at ${hour}:0${minute} ${day}/${month}/${year}`
            }
		} else {
			if (minute.length == 2) {
                post_author_info.innerHTML = `on ${hour}:${minute} ${day}/${month}/${year}`
            } else {
                post_author_info.innerHTML = `on ${hour}:0${minute} ${day}/${month}/${year}`
            }
		}

        var post_contents = document.createElement('div')
        post_contents.setAttribute('class', 'post-contents')
		if (type != "activation" && type != "status") {
        	post_contents.innerHTML = contents
		} else {
			post_contents.innerHTML = ""
		}
		
		if (type != "activation" && type != "status") {
            console.log(tag, mention)
            var post_info = document.createElement('div')
            post_info.setAttribute('class', 'post-info')
            if (tag != null && tag != undefined && tag.length > 0) {
                post_info.innerHTML = `Tagged with ${tag}, `
            } else {
                post_info.innerHTML = "Not tagged, "
            }
            if (mention != null && mention != undefined && mention.length > 0) {
                post_info.innerHTML += `mentions: ${mention}.`
            } else {
                post_info.innerHTML += "no mentions."
            }
		}

//		console.log("hello!!111!1!!!1")
//		console.log(document.getElementById("postfeedcontents").firstChild)
//		console.log("bye:(!!111!1!!!1")
        document.getElementById("postfeedcontents").appendChild(post_shell, document.getElementById("postfeedcontents").firstChild)
        post_shell.appendChild(post_top_bar)
        post_top_bar.appendChild(post_author_avatar_container)
        post_author_avatar_container.appendChild(post_author_avatar)
        post_top_bar.appendChild(post_author_name)
        post_top_bar.appendChild(post_author_info)
        post_shell.appendChild(post_contents)
        if (type != "news" && type != "status" && type != "activation") { post_contents.appendChild(post_info) }
		// }
	}
	
	function clear_feed() {
		document.getElementById("postfeedcontents").replaceChildren()
	}
	
	// ok so:
	// first, the code needs to check if the user is logged in
	// if the user isn't, show the auth bar and hide the others (also show userbar-welcome)
	// otherwise, hide the auth bar.
	
	// variables for preserving the credentials:
	// networking_allowStandbyAuth      - determines if user is logged in
	// networking_credentialUsername    - the username used for authentification
	// networking_credentialPassword    - the password used for authentification
	// networking_credentialInviteCode  - the last invite code used on the system
	// decoration_backgroundImageURL    - locally stored url for the background image
	
	function check_if_logged_in() {
		console.log(localStorage.networking_allowStandbyAuth)
        if (localStorage.networking_allowStandbyAuth != "true") {
            console.log("User is not logged in according to local storage.")
            elements.userbar.contents.profile.style.display = "none"
            elements.userbar.contents.welcome.style.display = "block"

            elements.editbar.header.style.display = "none"
            elements.editbar.contents.content_source.style.display = "none"

            elements.authbar.header.style.display = "block"
            elements.authbar.contents.content_source.style.display = "block"
			elements.authbar.contents.contents.welcome.style.display = "none"

            elements.postbar.contents.itself.style.display = "none"
			
			document.getElementById("filterbar-filter-mentions").style.display = "none"
        } else {
            console.log("User is logged in according to local storage.")
            elements.userbar.contents.profile.style.display = "block"
            elements.userbar.contents.welcome.style.display = "none"

            elements.editbar.header.style.display = "block"	
            elements.editbar.contents.content_source.style.display = "block"
			if (localStorage.decoration_backgroundImageURL != undefined) {
				document.getElementById("editbar-contents-backgroundimageurl").value = localStorage.decoration_backgroundImageURL
			}

            elements.authbar.header.style.display = "none"
            elements.authbar.contents.content_source.style.display = "none"
			elements.authbar.contents.contents.welcome.style.display = "none"

            elements.postbar.contents.itself.style.display = "block"
			
			get_own_profile()
			document.getElementById("filterbar-filter-mentions").style.display = "inline"
        }
	}
	
	function show_info(where, info) {
		where.innerHTML = info
		where.style.opacity = "1"
		setTimeout(function() {
			where.style.transition = "opacity 1s linear"
			setTimeout(function() {
				where.style.opacity = "0"
			}, 100)
			setTimeout(function() {
				where.style.transition = "none"
			}, 1200)
		}, 1000)
	}
	
	var filteroptionelements = []
	for (var filteroption of document.getElementsByClassName("filterbar-filteroption")) {
		filteroptionelements[filteroption.innerHTML.toLowerCase()] = filteroption
		filteroption.addEventListener("click", function() {
			highlight_filter_option(this.innerHTML.toLowerCase())
		})
	}
	
	var highlitedfilteroption = "all"
	function highlight_filter_option(option) {
		for (var [key, value] of Object.entries(filteroptionelements)) {
			value.setAttribute("class", "filterbar-filteroption")
		}
		if (translated) {
			filteroptionelements[translation.translation_filters[option]].setAttribute("class", "filterbar-filteroption feed-selected")
			highlitedfilteroption = translation.translation_filters[option]
		} else {
			filteroptionelements[option].setAttribute("class", "filterbar-filteroption feed-selected")
			highlitedfilteroption = option
		}
		
		if (highlitedfilteroption == "search") {
			document.getElementById("filterbar-contents").style.display = "block"
		} else {
			document.getElementById("filterbar-contents").style.display = "none"
		}
	}
	highlight_filter_option("all")
	console.log(filteroptionelements)
	
	var searchoptions = []
	for (var searchoption of document.getElementsByClassName("searchbar-option")) {
//		searchoptions[searchoption.innerHTML.replace(/\s+/g, '-').toLowerCase()] = searchoption
//		searchoption.addEventListener("click", function() {
//			highlight_search_option(this.innerHTML.replace(/\s+/g, '-').toLowerCase())
//		})
		searchoptions[searchoption.getAttribute("id")] = searchoption
		searchoption.addEventListener("click", function() {
			highlight_search_option(this.getAttribute("id"))
		})
	}
	
	var highlitedsearchoption = "all"
	function highlight_search_option(option) {
		for (var [key, value] of Object.entries(searchoptions)) {
			value.setAttribute("class", "searchbar-option")
		}
		searchoptions[option].setAttribute("class", "searchbar-option searchbar-option-selected")
		highlitedsearchoption = option
		
		if (translated) {
			document.getElementById("searchbar-input").setAttribute("placeholder", {"searchbar-option-user": "Введите имя пользователя, публикации которого хотите просмотреть.", "searchbar-option-tag": "Введите метку, отмечены которой публикации, которые вы хотите просмотреть.", "searchbar-option-mention": "Введите имя пользователя, упоминающие которое публикации которые вы хотите просмотреть."}[highlitedsearchoption])			
		} else {
			document.getElementById("searchbar-input").setAttribute("placeholder", {"searchbar-option-user": "Enter a username to see their posts and info.", "searchbar-option-tag": "Type in a tag to find posts with that tag.", "searchbar-option-mention": "See posts which mention someone."}[highlitedsearchoption])
		}
	}
	console.log("search options everybody")
	console.log(searchoptions)
	
	const translation = {
		translation_text: {
			"errorbar": "О нет! Соединение утеряно :О",
 			"headerbar-text": "Добро пожаловать",
 			"userbar-profile-welcome": "Добро пожаловать",
 			"userbar-profile-username": "Загрузка...",
 			"userbar-profile-status": "",
 			"userbar-profile-updatestatus": "ОБНОВИТЬ<br>СТАТУС",
 			"userbar-profile-statusupdateinfo": "ПРЕВЫШЕНО КОЛИЧЕСТВО СИМВОЛОВ",
 			"userbar-welcome": `Добро пожаловать в очередную социальную сеть в сети Интернет!<br>
					Если у вас есть код приглашения, вы можете присоединиться к сообществу.<br>
					Знакомьтесь и общайтесь с единомышленниками.<br><break></break>
					Примечание: если вы не получили код приглашения, значит вас не пригласили.`,
 			"editbar-header": "Р Е Д А К Т И Р О В А Т Ь",
 			"editbar-contents-text-username": "ИМЯ ПОЛЬЗОВАТЕЛЯ",
 			"editbar-contents-text-pfpurl": "ССЫЛКА НА ИЗОБРАЖЕНИЕ",
 			"editbar-contents-text-password": "ПАРОЛЬ",
 			"editbar-contents-text-bgurl": "ФОНОВОЕ ИЗОБРАЖЕНИЕ",
 			"editbar-contents-text-options": "ОПЦИИ",
 			"editbar-contents-submitchanges": "СОХРАНИТЬ ИЗМЕНЕНИЯ",
 			"editbar-contents-logout": "ВЫЙТИ",
 			"editbar-contents-info": "ОДНО ИЗ ПОЛЕЙ ПУСТО.",
 			"notification": `Привет!<br>
				Команда Chirp безумно рада встретить тебя на этом сайте. To get started, please take a moment to set up your unique username and secure password, so you will be able to login later. Thanks for joining us, and we look forward to connecting with you!<br>
				<ul>
					<li>Set up your username and password in the Edit bar above.<br>
						Expand the Edit bar by clicking on it.</li><break></break>
					<li>Write a post using the Post form below -<br>
						you can give your post a tag to put it in a topic,<br>
						or mention someone and highlight your post for whomever you mention.</li><break></break>
					<li>See what others wrote in the Feed below.</li>
				</ul>
				<button id="notification-close">ЗАКРЫТЬ</button>`,
			"authbar-header": "А У Т Е Н Т И Ф И К А Ц И Я",
			"authbar-contents-text-username": "ИМЯ ПОЛЬЗОВАТЕЛЯ",
			"authbar-contents-text-password": "ПАРОЛЬ",
			"authbar-contents-text-invitecode": "КОД ПРИГЛАШЕНИЯ",
			"authbar-contents-text-useinvitecode": "ЕСЛИ У ВАС КОД ПРИГЛАШЕНИЯ",
			"authbar-contents-useinvitecode": "АКТИВИРОВАТЬ АККАУНТ",
			"authbar-contents-text-useaccount": "ЕСЛИ У ВАС УЖЕ ЕСТЬ АККАУНТ",
			"authbar-contents-useaccount": "ВОЙТИ В АККАУНТ",
			"authbar-welcome-contents-text": `Поздравляем!<br>
				Ваш аккаунт в нашей социальной сети был успешно активирован.<br>
				Мы с радостью приветствуем вас в нашем сообществе и готовы<br>принимать вас с открытыми объятиями.<br><break></break>
				Для начала работы, просто нажмите кнопку входа ниже<br>и вы будете перенаправлены на страницу своего аккаунта.<br>
				С этой страницы вы сможете настроить свой профиль,<br>подключиться к друзьям и начать делиться своими мыслями и идеями со всем миром.<br><break></break>
				Спасибо, что выбрали нашу социальную сеть, и мы надеемся, что вам понравится работать с нами!`,
			"authbar-welcome-login": "ВОЙТИ!",
			"postbar-header": "Н А П И С А Т Ь&emsp;П О С Т",
			"postbar-submitbutton": "ОПУБЛИКОВАТЬ",
			"filterbar-filter-all": "ВСЁ",
			"filterbar-filter-mentions": "УПОМИНАНИЯ",
			"filterbar-filter-updates": "ОБНОВЛЕНИЯ",
			"filterbar-filter-news": "НОВОСТИ",
			"filterbar-filterbutton": "ПОИСК",
			"filterbar-filter-help": "ПОМОЩЬ",
			"searchbar-option-user": "ИСКАТЬ ПОЛЬЗОВАТЕЛЯ",
			"searchbar-option-tag": "ИСКАТЬ МЕТКУ",
			"searchbar-option-mention": "ИСКАТЬ УПОМИНАНИЕ",
			"searchbar-submitbutton": "ОТФИЛЬТРОВАТЬ ПУБЛИКАЦИИ",
			"feed-header": "П У Б Л И К А Ц И И",
			"feed-refresh": "ОБНОВИТЬ"
		},
		translation_placeholders: {
			"userbar-profile-status": "Измените статус тут.			Лимит - 32 символа.",
			"editbar-contents-username": "Введите новое имя пользователя сюда.",
			"editbar-contents-password": "Введите свой новый пароль сюда.",
			"editbar-contents-profileiconurl": "Вставьте сюда URL-адрес картинки профиля.",
			"editbar-contents-backgroundimageurl": "Вставьте сюда URL-адрес фоновой картинки.",
			"authbar-contents-username": "Если же у вас есть аккаунт, введите имя пользователя.",
			"authbar-contents-invitecode": "Если у вас есть код приглашения, введите его сюда.",
			"authbar-contents-password": "Введите соответствующий имени пользователя пароль.",
			"postbar-postinput": `Напишите что-нибудь сюда, затем нажмите на ОПУБЛИКОВАТЬ чтобы опубликовать.
Не публикуйте ничего провокационного и не забудьте про ограничение на 128 символов.`,
			"postbar-taginput": "Отметьте пост - отнесите его в ту или иную категорию.",
			"postbar-mentioninput": "Упомяните кого-то - ваш пост будет подсвечен для них!"
		},
		translation_filters: {
			"все": "all",
			"упоминания": "mentions",
			"обновления": "updates",
			"новости": "news",
			"поиск": "search",
			"помощь": "help"}
	}
	
	const initial_language = {translation_text: {}, translation_placeholders: {}}
	
	function translate(localize) {
		if (localize)  {
			for (var [key, value] of Object.entries(translation.translation_text)) {
				if (document.getElementById(key) != null) {
					initial_language.translation_text[key] = document.getElementById(key).innerHTML
					document.getElementById(key).innerHTML = value
				}
			}
			for (var [key, value] of Object.entries(translation.translation_placeholders)) {
				if (document.getElementById(key) != null) {
					initial_language.translation_placeholders[key] = document.getElementById(key).getAttribute("placeholder")
					document.getElementById(key).setAttribute("placeholder", value)
				}
			}
		} else {
			for (var [key, value] of Object.entries(initial_language.translation_text)) {
				if (document.getElementById(key) != null) {
					document.getElementById(key).innerHTML = value
				}
			}
			for (var [key, value] of Object.entries(initial_language.translation_placeholders)) {
				if (document.getElementById(key) != null) {
					document.getElementById(key).setAttribute("placeholder", value)
				}
			}	
		}
	}
	
	
	var request_gate = new XMLHttpRequest()
	var request_host = "http://localhost:3000/"
	var request_path = null
	var request_params = null
	var request_response = null
	
	function activate_account(invite_code) {
		request_path = "activate_account"
		request_params = {"request_type": "activate_account",
						  "invite_code": invite_code}
		request_gate.open("POST", request_host + request_path)
		request_gate.responseType = "json"
		request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		request_gate.onreadystatechange = function() {
			if (request_gate.readyState == XMLHttpRequest.DONE) {
				console.log("Account activation: response received!")
				console.log(request_gate.response)
				var wonky_wtf = request_gate.response
				if (request_gate.response["general_type"] == "error") {
					if (request_gate.response["response_type"] == "action_cancelled") {
						if (request_gate.response["response_content"] == "invite_code_empty") {
							show_info(document.getElementById("authbar-contents-info"), "INVITE CODE FIELD IS EMPTY")
						} else if (request_gate.response["response_content"] == "invite_code_too_short") {
							show_info(document.getElementById("authbar-contents-info"), "INVITE CODE TOO SHORT")
						}
					} else if (request_gate.response["response_type"] == "internal_error") {
						show_info(document.getElementById("authbar-contents-info"), "OOPS! A SERVER ERROR!")
					} else if (request_gate.response["response_type"] == "action_failed") {
						if (request_gate.response["response_content"] == "no_such_account") {
							show_info(document.getElementById("authbar-contents-info"), "NO SUCH ACCOUNTS WERE FOUND.")
						} else if (request_gate.response["response_content"] == "multiple_accounts") {
							show_info(document.getElementById("authbar-contents-info"), "WOMP! MULTIPLE ACCOUNTS WERE FOUND!")
						} else if (request_gate.response["response_content"] == "unknown") {
							show_info(document.getElementById("authbar-contents-info"), "OOPS! AN UNKNOWN ERROR HAPPENED!")
						}
					}
				} else if (request_gate.response["general_type"] == "success") {
					if (request_gate.response["response_type"] == "account_activated") {
						elements.authbar.contents.content_source.style.display = "none"
						elements.authbar.contents.contents.welcome.style.display = "block"
						
						elements.authbar.contents.contents.invitecodefield.value = ""
						highlight_filter_option("all")
						get_posts("all", null)
						
						console.log("repsoufgdjhsfhksdhfgklsdagh")
						console.log(request_gate.response)			
                        localStorage.networking_credentialUsername = wonky_wtf.response_content.username
                        localStorage.networking_credentialPassword = wonky_wtf.response_content.password
                        localStorage.networking_credentialInviteCode = invite_code
                        localStorage.networking_allowStandbyAuth = "true"
						
						document.getElementById("authbar-welcome-login").addEventListener("click", function() {
//        					localStorage.networking_credentialUsername = request_gate.response.response_content.username
//        					localStorage.networking_credentialPassword = request_gate.response.response_content.password
//        					localStorage.networking_credentialInviteCode = invite_code
//        					localStorage.networking_allowStandbyAuth = "true"
							
        					check_if_logged_in()
							document.getElementById("notification").style.display = "block"
						}, 3000)
					}
				}
			}
		}
		request_gate.send(JSON.stringify(request_params))
	}
	
	console.log(localStorage.networking_allowStandbyAuth)
	
	function log_into_account(username, password) {
		request_path = "log_into_account"
		request_params = {"request_type": "log_into_account",
						  "username": username,
						  "password": password}
		request_gate.open("POST", request_host + request_path)
		request_gate.responseType = "json"
		request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		request_gate.onreadystatechange = function() {
			if (request_gate.readyState == XMLHttpRequest.DONE) {
				console.log("Logging into an account: response received!")
				console.log(request_gate.response)
				if (request_gate.response["general_type"] == "error") {
					if (request_gate.response["response_type"] == "action_cancelled") {
						if (request_gate.response["response_content"] == "username_empty") {
							show_info(document.getElementById("authbar-contents-info"), "NO USERNAME WAS SPECIFIED.")
						} else if (request_gate.response["response_content"] == "password_empty") {
							show_info(document.getElementById("authbar-contents-info"), "NO PASSWORD WAS SPECIFIED.")
						}
					} else if (request_gate.response["response_type"] == "internal_error") {
						show_info(document.getElementById("authbar-contents-info"), "OOPS! A SERVER ERROR!")
					} else if (request_gate.response["response_type"] == "action_failed") {
						if (request_gate.response["response_content"] == "no_such_account") {
							show_info(document.getElementById("authbar-contents-info"), "INCORRECT USERNAME OR PASSWORD.")
						} else if (request_gate.response["response_content"] == "multiple_accounts") {
							show_info(document.getElementById("authbar-contents-info"), "WOMP! MULTIPLE ACCOUNTS WERE FOUND!")
						} else if (request_gate.response["response_content"] == "unknown") {
							show_info(document.getElementById("authbar-contents-info"), "OOPS! AN UNKNOWN ERROR HAPPENED!")
						}
					}
				} else if (request_gate.response["general_type"] == "success") {
					console.log("amogus")
					console.log(request_gate.response)
					if (request_gate.response["response_type"] == "account_found") {
						localStorage.networking_credentialUsername = username
						localStorage.networking_credentialPassword = password
//						localStorage.networking_credentialInviteCode = invite_code
						localStorage.networking_allowStandbyAuth = "true"
						
						document.getElementById("adminbar").style.display = "block"
					
						check_if_logged_in()
//						get_own_profile()
						get_posts("all", null)
					}
				}
			}
		}
		request_gate.send(JSON.stringify(request_params))
	}
	
	function async_get_account_data(username) {
		console.log("apparently this function does not exist????????????")
		return new Promise(function(resolve, reject) {
			console.log("FFS JAVASCRIPTTTTTTTTTTTTTTTTTT")
			var request_gate = new XMLHttpRequest()
			request_path = "get_account_info"
			request_params = {"request_type": "get_account_info",
							  "username": username}
			request_gate.open("POST", request_host + request_path)
			request_gate.responseType = "json"
			request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
			request_gate.onreadystatechange = function() {
				console.log("Getting account info: response received!")
				if (request_gate.readyState == XMLHttpRequest.DONE) {
					console.log("Getting account info: response received!")
					console.log(request_gate.response)
					if (request_gate.response["general_type"] == "error") {
						if (request_gate.response["response_type"] == "internal_error") {
							show_info(document.getElementById("authbar-contents-info"), "OOPS! A SERVER ERROR!")
						} else if (request_gate.response["response_type"] == "action_failed") {
							if (request_gate.response["response_content"] == "no_such_account") {
								show_info(document.getElementById("authbar-contents-info"), "NO SUCH ACCOUNTS WERE FOUND.")
							} else if (request_gate.response["response_content"] == "multiple_accounts") {
								show_info(document.getElementById("authbar-contents-info"), "WOMP! MULTIPLE ACCOUNTS WERE FOUND!")
							} else if (request_gate.response["response_content"] == "unknown") {
								show_info(document.getElementById("authbar-contents-info"), "OOPS! AN UNKNOWN ERROR HAPPENED!")
							}
						}
						reject(null)
					} else if (request_gate.response["general_type"] == "success") {
						if (request_gate.response["response_type"] == "account_found") {
							resolve(request_gate.response["response_content"])
						}
					}
				}
			}
			request_gate.send(JSON.stringify(request_params))
		})
	}
	
	function get_account_data(username) {
		request_path = "get_account_info"
		request_params = {"request_type": "get_account_info",
						  "username": username}
		request_gate.open("POST", request_host + request_path)
		request_gate.responseType = "json"
		request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		request_gate.onreadystatechange = function() {
			if (request_gate.readyState == XMLHttpRequest.DONE) {
				console.log("Getting account info: response received!")
				console.log(request_gate.response)
				if (request_gate.response["general_type"] == "error") {
					if (request_gate.response["response_type"] == "internal_error") {
						show_info(document.getElementById("authbar-contents-info"), "OOPS! A SERVER ERROR!")
					} else if (request_gate.response["response_type"] == "action_failed") {
						if (request_gate.response["response_content"] == "no_such_account") {
							show_info(document.getElementById("authbar-contents-info"), "NO SUCH ACCOUNTS WERE FOUND.")
						} else if (request_gate.response["response_content"] == "multiple_accounts") {
							show_info(document.getElementById("authbar-contents-info"), "WOMP! MULTIPLE ACCOUNTS WERE FOUND!")
						} else if (request_gate.response["response_content"] == "unknown") {
							show_info(document.getElementById("authbar-contents-info"), "OOPS! AN UNKNOWN ERROR HAPPENED!")
						}
					}
					return null
				} else if (request_gate.response["general_type"] == "success") {
					if (request_gate.response["response_type"] == "account_found") {
						return request_gate.response["response_content"]
					}
				}
			}
		}
		request_gate.send(JSON.stringify(request_params))
	}
		
	async function get_own_profile() {
//		var own_profile_data = await get_account_data(localStorage.networking_credentialUsername)
//		console.log("Updating the userbar: getting the user data!")
//		console.log(own_profile_data)
//		
//		document.getElementById("userbar-profile-image").src = "own"
		async_get_account_data(localStorage.networking_credentialUsername).then(function(profile_content) {
			console.log("got the profile data!")
			console.log(profile_content)
			
			document.getElementById("userbar-profile-image").src = profile_content.pfpurl
			document.getElementById("userbar-profile-image").setAttribute('onerror', "this.onerror=null;this.src='https://loremflickr.com/320/320';") // if I replace the pfp placeholder gotta replace this URL too!
			document.getElementById("userbar-profile-username").innerHTML = localStorage.networking_credentialUsername
			document.getElementById("userbar-profile-status").innerHTML = profile_content.status
			
			document.getElementById("editbar-contents-username").value = localStorage.networking_credentialUsername
			document.getElementById("editbar-contents-password").value = localStorage.networking_credentialPassword
			document.getElementById("editbar-contents-profileiconurl").value = profile_content.pfpurl
			
			document.getElementById("userbar-background-image").src = localStorage.decoration_backgroundImageURL
			document.getElementById("userbar-background-image").setAttribute('onerror', "this.onerror=null;this.src='https://picsum.photos/800/600/?blur';") // same thing with replacing here
		})
	}
	
	function log_out_of_account() {
		if (localStorage.networking_allowStandbyAuth == "true") {
			console.log("Logging out: logging out of account...")
			localStorage.networking_allowStandbyAuth = "false"
			check_if_logged_in()
			get_posts("all", null)
		} else {
			console.log("Logging out: already logged out!")
		}
	}
	
	function update_account(oldusername, oldpassword, newusername, newpassword, newpfpurl) {
		request_path = "update_account_credentials"
		request_params = {"request_type": "update_account_credentials",
						  "username": oldusername,
						  "password": oldpassword,
						  "newusername": newusername,
						  "newpassword": newpassword,
						  "newpfpurl": newpfpurl}
		request_gate.open("POST", request_host + request_path)
		request_gate.responseType = "json"
		request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		request_gate.onreadystatechange = function() {
			if (request_gate.readyState == XMLHttpRequest.DONE) {
				console.log("updating the account data & credentials: received response!")
				console.log(request_gate.response)
				if (request_gate.response["general_type"] == "error") {
					if (request_gate.response["response_type"] == "action_cancelled") {
						if (request_gate.response["response_content"] == "username_empty") {
							show_info(document.getElementById("editbar-contents-info"), "NO USERNAME WAS SPECIFIED.")
						} else if (request_gate.response["response_content"] == "password_empty") {
							show_info(document.getElementById("editbar-contents-info"), "NO PASSWORD WAS SPECIFIED.")
						}
					} else if (request_gate.response["response_type"] == "internal_error") {
						show_info(document.getElementById("editbar-contents-info"), "OOPS! A SERVER ERROR!")
					} else if (request_gate.response["response_type"] == "action_failed") {
						if (request_gate.response["response_content"] == "no_such_account") {
							show_info(document.getElementById("editbar-contents-info"), "INCORRECT USERNAME OR PASSWORD.")
						} else if (request_gate.response["response_content"] == "multiple_accounts") {
							show_info(document.getElementById("editbar-contents-info"), "WOMP! MULTIPLE ACCOUNTS WERE FOUND!")
						} else if (request_gate.response["response_content"] == "username_exists") {
							show_info(document.getElementById("editbar-contents-info"), "THIS USERNAME IS ALREADY USED!")
						} else if (request_gate.response["response_content"] == "unknown") {
							show_info(document.getElementById("editbar-contents-info"), "OOPS! AN UNKNOWN ERROR HAPPENED!")
						}
					}
				} else if (request_gate.response["general_type"] == "success") {
					if (request_gate.response["response_type"] == "account_updated") {
						show_info(document.getElementById("editbar-contents-info"), "CREDENTIALS UPDATED! RELOGGING...")
						setTimeout(function() {
							log_out_of_account()
						}, 1000)
						setTimeout(function() {
							log_into_account(newusername, newpassword)
						}, 1500)
						localStorage.decoration_backgroundImageURL = document.getElementById("editbar-contents-backgroundimageurl").value
					}
				}
			}
		}
		request_gate.send(JSON.stringify(request_params))			
	}
	
	function update_status(username, password, newstatus) {
		request_path = "update_account_status"
		request_params = {"request_type": "update_account_status",
						  "username": username,
						  "password": password,
						  "newstatus": newstatus}
		request_gate.open("POST", request_host + request_path)
		request_gate.responseType = "json"
		request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		request_gate.onreadystatechange = function() {
			if (request_gate.readyState == XMLHttpRequest.DONE) {
				console.log("Updating account status: response received!")
				console.log(request_gate.response)
				if (request_gate.response["general_type"] == "error") {
					if (request_gate.response["response_type"] == "action_cancelled") {
						if (request_gate.response["response_content"] == "username_empty") {
							show_info(document.getElementById("userbar-profile-statusupdateinfo"), "NO USERNAME WAS SPECIFIED.")
						} else if (request_gate.response["response_content"] == "password_empty") {
							show_info(document.getElementById("userbar-profile-statusupdateinfo"), "NO PASSWORD WAS SPECIFIED.")
						}
					} else if (request_gate.response["response_type"] == "internal_error") {
						show_info(document.getElementById("userbar-profile-statusupdateinfo"), "OOPS! A SERVER ERROR!")
					} else if (request_gate.response["response_type"] == "action_failed") {
						if (request_gate.response["response_content"] == "no_such_account") {
							show_info(document.getElementById("userbar-profile-statusupdateinfo"), "INCORRECT USERNAME OR PASSWORD.")
						} else if (request_gate.response["response_content"] == "multiple_accounts") {
							show_info(document.getElementById("userbar-profile-statusupdateinfo"), "WOMP! MULTIPLE ACCOUNTS WERE FOUND!")
						} else if (request_gate.response["response_content"] == "unknown") {
							show_info(document.getElementById("userbar-profile-statusupdateinfo"), "OOPS! AN UNKNOWN ERROR HAPPENED!")
						}
					}
				} else if (request_gate.response["general_type"] == "success") {
					if (request_gate.response["response_type"] == "account_updated") {
						show_info(document.getElementById("userbar-profile-statusupdateinfo"), "UPDATED YOUR STATUS!")
						refresh()
					}
				}
			}
		}
		request_gate.send(JSON.stringify(request_params))
	}
	
	function upload_a_post(username, password, contents, tag, mention) {
		request_path = "upload_a_post"
		request_params = {"request_type": "upload_a_post",
						  "username": username,
						  "password": password,
						  "contents": contents,
						  "tag": tag,
						  "mention": mention,
						  "post_type": "textpost"}
		request_gate.open("POST", request_host + request_path)
		request_gate.responseType = "json"
		request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		request_gate.onreadystatechange = function() {
			if (request_gate.readyState == XMLHttpRequest.DONE) {
				console.log("Submitting a post: received a response.")
				console.log(request_gate.response)
				if (request_gate.response["general_type"] == "error") {
					if (request_gate.response["response_type"] == "action_cancelled") {
						if (request_gate.response["response_content"] == "username_empty") {
							show_info(document.getElementById("postbar-submitinfo"), "No username was specified.")
						} else if (request_gate.response["response_content"] == "password_empty") {
							show_info(document.getElementById("postbar-submitinfo"), "No username was specified.")
						}
					} else if (request_gate.response["response_type"] == "internal_error") {
						show_info(document.getElementById("postbar-submitinfo"), "Womp! A server error occured.")
					} else if (request_gate.response["response_type"] == "action_failed") {
						if (request_gate.response["response_content"] == "no_such_account") {
							show_info(document.getElementById("postbar-submitinfo"), "Your stored credentials are invalid.")
						} else if (request_gate.response["response_content"] == "multiple_accounts") {
							show_info(document.getElementById("postbar-submitinfo"), "Multiple accounts with your username were found!")
						} else if (request_gate.response["response_content"] == "post_too_short") {
							show_info(document.getElementById("postbar-submitinfo"), `Your post is <i>still</i> ${String(15 - document.getElementById("postbar-postinput").value.length)} characters too short.`)
						} else if (request_gate.response["response_content"] == "post_type_mismatch") {
							show_info(document.getElementById("postbar-submitinfo"), "Incorrect post type.")
						} else if (request_gate.response["response_content"] == "unknown") {
							show_info(document.getElementById("postbar-submitinfo"), "Womp! An unknown error happened.")
						}
					}
				} else if (request_gate.response["general_type"] == "success") {
					if (request_gate.response["response_type"] == "post_uploaded") {
						show_info(document.getElementById("postbar-submitinfo"), "Post has succesfully been uploaded!")
						document.getElementById("postbar-postinput").value = ""
						document.getElementById("postbar-taginput").value = ""
						document.getElementById("postbar-mentioninput").value = ""
						refresh()
					}
				}
			}
		}
		request_gate.send(JSON.stringify(request_params))
	}
	
	function get_posts(type, args) {
		// all - textposts and activation messages.
		// mentions - posts which mention the user.
		// updates - status updates.
		// news - what's new/update log.
		// search:tagged - posts tagged something.
		// search:user - look up a user and their posts.
		// help - tips and docs.
		if (["all", "mentions", "updates", "news", "tagged", "user", "mentioned", "help"].indexOf(type) > -1) {
			if (type == "all") {
                request_path = "get_posts"
                request_params = {"request_type": "get_posts",
                                  "post_type": "all"}
                request_gate.open("POST", request_host + request_path)
                request_gate.responseType = "json"
                request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                request_gate.onreadystatechange = function() {
                    if (request_gate.readyState == XMLHttpRequest.DONE) {
                        console.log("getting all posts: response received!")
                        console.log(request_gate.response)
						clear_feed()
						for (var post of request_gate.response) {
							if (post.type == "textpost") {
                                if (post.creatorid != null) {
                                    add_post_to_feed(post.creatorusername, post.creatorpfpurl,
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                } else { // author, pfp, hour, minute, day, month, year, contents, tag, mention
                                    add_post_to_feed("<i style='color: #EEEEEE'>post has no account attached</i>", "https://placehold.co/80/png?text=%28%E2%97%8F_%E2%97%8F%29",
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                }
							} else if (post.type == "activation") {
								add_post_to_feed(null, null,
                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, null, null, null, "activation")
							}
//							else if (post.type == "status") {
//								add_post_to_feed(post.creatorusername, post.creatorpfpurl,
//                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "status")
//							}
						}
						var feed_beginning = document.createElement('div')
						feed_beginning.setAttribute('id', 'post-starter')
						feed_beginning.innerHTML = "This is the start of the feed."
						document.getElementById("postfeedcontents").appendChild(feed_beginning)
                    }
                }
                request_gate.send(JSON.stringify(request_params))
            } else if (type == "mentions") {
				request_path = "get_posts"
                request_params = {"request_type": "get_posts",
                                  "post_type": "mentions",
								  "mentions_target": args}
                request_gate.open("POST", request_host + request_path)
                request_gate.responseType = "json"
                request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                request_gate.onreadystatechange = function() {
                    if (request_gate.readyState == XMLHttpRequest.DONE) {
                        console.log("getting all posts: response received!")
                        console.log(request_gate.response)
						clear_feed()
						for (var post of request_gate.response) {
							if (post.creatorid != null) {
								add_post_to_feed(post.creatorusername, post.creatorpfpurl,
								post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention)
							} else { // author, pfp, hour, minute, day, month, year, contents, tag, mention
								add_post_to_feed("<i style='color: #EEEEEE'>post has no account attached</i>", "https://placehold.co/80/png?text=%28%E2%97%8F_%E2%97%8F%29",
								post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention)
							}
						}
						var feed_beginning = document.createElement('div')
						feed_beginning.setAttribute('id', 'post-starter')
						feed_beginning.innerHTML = "This is the start of the feed."
						document.getElementById("postfeedcontents").appendChild(feed_beginning)
                    }
                }
                request_gate.send(JSON.stringify(request_params))
            } else if (type == "updates") {
                request_path = "get_posts"
                request_params = {"request_type": "get_posts",
                                  "post_type": "updates"}
                request_gate.open("POST", request_host + request_path)
                request_gate.responseType = "json"
                request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                request_gate.onreadystatechange = function() {
                    if (request_gate.readyState == XMLHttpRequest.DONE) {
                        console.log("getting all posts: response received!")
                        console.log(request_gate.response)
                        clear_feed()
                        for (var post of request_gate.response) {
                            if (post.creatorid != null) {
                                add_post_to_feed(post.creatorusername, post.creatorpfpurl,
                                post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "status")
                            } else { // author, pfp, hour, minute, day, month, year, contents, tag, mention
                                add_post_to_feed("<i style='color: #EEEEEE'>post has no account attached</i>", "https://placehold.co/80/png?text=%28%E2%97%8F_%E2%97%8F%29",
                                post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "status")
                            }
                        }
                        var feed_beginning = document.createElement('div')
                        feed_beginning.setAttribute('id', 'post-starter')
                        feed_beginning.innerHTML = "This is the start of the feed."
                        document.getElementById("postfeedcontents").appendChild(feed_beginning)
                    }
                }
                request_gate.send(JSON.stringify(request_params))
            } else if (type == "news") {
                request_path = "get_posts"
                request_params = {"request_type": "get_posts",
                                  "post_type": "news"}
                request_gate.open("POST", request_host + request_path)
                request_gate.responseType = "json"
                request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                request_gate.onreadystatechange = function() {
                    if (request_gate.readyState == XMLHttpRequest.DONE) {
                        console.log("getting all posts: response received!")
                        console.log(request_gate.response)
                        clear_feed()
                        for (var post of request_gate.response) {
                            if (post.creatorid != null) {
                                add_post_to_feed(post.creatorusername, post.creatorpfpurl,
                                post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "news")
                            } else { // author, pfp, hour, minute, day, month, year, contents, tag, mention
                                add_post_to_feed("<i style='color: #EEEEEE'>post has no account attached</i>", "https://placehold.co/80/png?text=%28%E2%97%8F_%E2%97%8F%29",
                                post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "news")
                            }
                        }
                        var feed_beginning = document.createElement('div')
                        feed_beginning.setAttribute('id', 'post-starter')
                        feed_beginning.innerHTML = "This is the start of the feed."
                        document.getElementById("postfeedcontents").appendChild(feed_beginning)
                    }
                }
                request_gate.send(JSON.stringify(request_params))
			} else if (type == "tagged") {
                request_path = "get_posts"
                request_params = {"request_type": "get_posts",
                                  "post_type": "tagged",
								  "tagged_with": args}
                request_gate.open("POST", request_host + request_path)
                request_gate.responseType = "json"
                request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                request_gate.onreadystatechange = function() {
                    if (request_gate.readyState == XMLHttpRequest.DONE) {
                        console.log("getting all posts: response received!")
                        console.log(request_gate.response)
						clear_feed()
						for (var post of request_gate.response) {
							if (post.type == "textpost") {
                                if (post.creatorid != null) {
                                    add_post_to_feed(post.creatorusername, post.creatorpfpurl,
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                } else { // author, pfp, hour, minute, day, month, year, contents, tag, mention
                                    add_post_to_feed("<i style='color: #EEEEEE'>post has no account attached</i>", "https://placehold.co/80/png?text=%28%E2%97%8F_%E2%97%8F%29",
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                }
							} else if (post.type == "activation") {
								add_post_to_feed(null, null,
                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, null, null, null, "activation")
							}
//							else if (post.type == "status") {
//								add_post_to_feed(post.creatorusername, post.creatorpfpurl,
//                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "status")
//							}
						}
						var feed_beginning = document.createElement('div')
						feed_beginning.setAttribute('id', 'post-starter')
						feed_beginning.innerHTML = "This is the start of the feed."
						document.getElementById("postfeedcontents").appendChild(feed_beginning)
                    }
                }
                request_gate.send(JSON.stringify(request_params))
            } else if (type == "mentioned") {
                request_path = "get_posts"
                request_params = {"request_type": "get_posts",
                                  "post_type": "mentioned",
								  "mentions_who": args}
                request_gate.open("POST", request_host + request_path)
                request_gate.responseType = "json"
                request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                request_gate.onreadystatechange = function() {
                    if (request_gate.readyState == XMLHttpRequest.DONE) {
                        console.log("getting all posts: response received!")
                        console.log(request_gate.response)
						clear_feed()
						for (var post of request_gate.response) {
							if (post.type == "textpost") {
                                if (post.creatorid != null) {
                                    add_post_to_feed(post.creatorusername, post.creatorpfpurl,
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                } else { // author, pfp, hour, minute, day, month, year, contents, tag, mention
                                    add_post_to_feed("<i style='color: #EEEEEE'>post has no account attached</i>", "https://placehold.co/80/png?text=%28%E2%97%8F_%E2%97%8F%29",
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                }
							} else if (post.type == "activation") {
								add_post_to_feed(null, null,
                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, null, null, null, "activation")
							}
//							else if (post.type == "status") {
//								add_post_to_feed(post.creatorusername, post.creatorpfpurl,
//                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "status")
//							}
						}
						var feed_beginning = document.createElement('div')
						feed_beginning.setAttribute('id', 'post-starter')
						feed_beginning.innerHTML = "This is the start of the feed."
						document.getElementById("postfeedcontents").appendChild(feed_beginning)
                    }
                }
                request_gate.send(JSON.stringify(request_params))
			} else if (type == "user") {
                request_path = "get_posts"
                request_params = {"request_type": "get_posts",
                                  "post_type": "user",
								  "username": args}
                request_gate.open("POST", request_host + request_path)
                request_gate.responseType = "json"
                request_gate.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                request_gate.onreadystatechange = function() {
                    if (request_gate.readyState == XMLHttpRequest.DONE) {
                        console.log("getting all posts: response received!")
                        console.log(request_gate.response)
						clear_feed()
						for (var post of request_gate.response) {
							if (post.type == "textpost") {
                                if (post.creatorid != null) {
                                    add_post_to_feed(post.creatorusername, post.creatorpfpurl,
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                } else { // author, pfp, hour, minute, day, month, year, contents, tag, mention
                                    add_post_to_feed("<i style='color: #EEEEEE'>post has no account attached</i>", "https://placehold.co/80/png?text=%28%E2%97%8F_%E2%97%8F%29",
                                    post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, post.tag, post.mention, "textpost")
                                }
							} else if (post.type == "activation") {
								add_post_to_feed(null, null,
                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, null, null, null, "activation")
							}
//							else if (post.type == "status") {
//								add_post_to_feed(post.creatorusername, post.creatorpfpurl,
//                              	post.creationhour, post.creationminute, post.creationday, post.creationmonth, post.creationyear, post.contents, null, null, "status")
//							}
						}
						var feed_beginning = document.createElement('div')
						feed_beginning.setAttribute('id', 'post-starter')
						feed_beginning.innerHTML = "This is the start of the feed."
						document.getElementById("postfeedcontents").appendChild(feed_beginning)
                    }
                }
                request_gate.send(JSON.stringify(request_params))
            } else {
                show_info(document.getElementById("feed-retrievalinfo"), "Choose a correct post type.")
            }
		}
	}
	
	function refresh() {
		if (highlitedfilteroption == "all") {
			get_posts("all", null)
		} else if (highlitedfilteroption == "mentions") {
			get_posts("mentions", localStorage.networking_credentialUsername)
		} else if (highlitedfilteroption == "updates") {
			get_posts("updates", null)
		} else if (highlitedfilteroption == "news") {
			get_posts("news", null)
		} else if (highlitedfilteroption == "help") {
			get_posts("help", null)
		} else if (highlitedfilteroption == "search") {
			if (highlitedsearchoption == "look-for-a-tag") {
				get_posts("tagged", document.getElementById("searchbar-input").value)
			} else if (highlitedsearchoption == "look-for-a-user") {
				get_posts("user", document.getElementById("searchbar-input").value)
			} else {
				get_posts("mentioned", document.getElementById("searchbar-input").value)
			}
		}
	}
	
	document.getElementById("authbar-contents-useinvitecode").addEventListener("click", function() {
		if (document.getElementById("authbar-contents-invitecode").value.length == 0) {
			show_info(document.getElementById("authbar-contents-info"), "INVITE CODE FIELD IS EMPTY")
		} else if (document.getElementById("authbar-contents-invitecode").value.length < 4) {
			show_info(document.getElementById("authbar-contents-info"), "INVITE CODE TOO SHORT")
		} else {
			show_info(document.getElementById("authbar-contents-info"), "CHECKING FOR ACCOUNT...")
			activate_account(document.getElementById("authbar-contents-invitecode").value)
		}
	})
	
	document.getElementById("authbar-contents-useaccount").addEventListener("click", function() {
		if (document.getElementById("authbar-contents-username").value.length == 0) {
			show_info(document.getElementById("authbar-contents-info"), "ENTER YOUR USERNAME.")
		} else {
			if (document.getElementById("authbar-contents-password").value.length == 0) {
				show_info(document.getElementById("authbar-contents-info"), "ENTER A PASSWORD.")
			} else {
				show_info(document.getElementById("authbar-contents-info"), "CHECKING FOR ACCOUNT...")
				log_into_account(document.getElementById("authbar-contents-username").value, document.getElementById("authbar-contents-password").value)
			}
		}
	})
	
	document.getElementById("editbar-contents-submitchanges").addEventListener("click", function() {
		if (document.getElementById("editbar-contents-username").value.length == 0) {
			show_info(document.getElementById("editbar-contents-info"), "USERNAME FIELD IS EMPTY.")
		} else {
			if (document.getElementById("editbar-contents-password").value.length == 0) {
				show_info(document.getElementById("editbar-contents-info"), "PASSWORD FIELD IS EMPTY.")
			} else {
				update_account(localStorage.networking_credentialUsername, localStorage.networking_credentialPassword, document.getElementById("editbar-contents-username").value, document.getElementById("editbar-contents-password").value, document.getElementById("editbar-contents-profileiconurl").value)
			}
		}
	})
	
	document.getElementById("editbar-contents-logout").addEventListener("click", log_out_of_account)
	
	document.getElementById("userbar-profile-updatestatus").addEventListener("click", function() {
		update_status(localStorage.networking_credentialUsername, localStorage.networking_credentialPassword, document.getElementById("userbar-profile-status").value)
	})
	
	document.getElementById("postbar-submitbutton").addEventListener("click", function() {
		if (document.getElementById("postbar-postinput").value.length < 16) {
			show_info(document.getElementById("postbar-submitinfo"), `Your post is ${String(15 - document.getElementById("postbar-postinput").value.length)} characters too short.`)
		} else {
			upload_a_post(localStorage.networking_credentialUsername, localStorage.networking_credentialPassword, document.getElementById("postbar-postinput").value, document.getElementById("postbar-taginput").value, document.getElementById("postbar-mentioninput").value)
		}
	})
	
	document.getElementById("notification-close").addEventListener("click", function() {
		document.getElementById("notification").style.display = "none"
	})
	
	document.getElementById("filterbar-filter-all").addEventListener("click", function() {
		get_posts("all", null)
	})
	document.getElementById("filterbar-filter-mentions").addEventListener("click", function() {
		get_posts("mentions", localStorage.networking_credentialUsername)
	})
	document.getElementById("filterbar-filter-updates").addEventListener("click", function() {
		get_posts("updates", null)
	})
	document.getElementById("filterbar-filter-news").addEventListener("click", function() {
		get_posts("news", null)
	})
	document.getElementById("filterbar-filter-help").addEventListener("click", function() {
		get_posts("help", null)
	})
	document.getElementById("searchbar-submitbutton").addEventListener("click", function() {
		if (highlitedsearchoption == "look-for-a-tag") {
			get_posts("tagged", document.getElementById("searchbar-input").value)
		} else if (highlitedsearchoption == "look-for-a-user") {
			get_posts("user", document.getElementById("searchbar-input").value)
		} else {
			get_posts("mentioned", document.getElementById("searchbar-input").value)
		}
	})
	document.getElementById("feed-refresh").addEventListener("click", refresh)
	
	document.getElementById("authbar-contents-username").addEventListener('keydown', function onEvent(event) {
    	if (event.keyCode == 9) {
			document.getElementById("authbar-contents-invitecode").focus()
		}
	})
	
	document.getElementById("authbar-contents-password").addEventListener('keydown', function onEvent(event) {
    	if (event.key === "Enter") {
        	if (document.getElementById("authbar-contents-username").value.length == 0) {
				show_info(document.getElementById("authbar-contents-info"), "ENTER YOUR USERNAME.")
			} else {
				if (document.getElementById("authbar-contents-password").value.length == 0) {
					show_info(document.getElementById("authbar-contents-info"), "ENTER A PASSWORD.")
				} else {
					show_info(document.getElementById("authbar-contents-info"), "CHECKING FOR ACCOUNT...")
					log_into_account(document.getElementById("authbar-contents-username").value, document.getElementById("authbar-contents-password").value)
				}
			}
    	}
	});
	
	//check_if_logged_in()
	get_posts("all", null)
	var translated = true
	translate(translated)
	document.getElementById("headerbar-languagebutton").addEventListener("click", function() {
		translated = !translated
		translate(translated)
	})
	highlight_search_option("searchbar-option-user")
	
//	add_post_to_feed("dashka kakaska", "https://www.tutorialspoint.com/javascript/images/javascript-mini-logo.jpg", "21", "32", "10", "03", "2023", "brbrbrhjkfgkdfjlgshdfklghjkldfkhgl")
//	add_post_to_feed("amogus", "amogus", "amogus", "amogus", "amogus", "amogus", "amogus", "amogus")
//	add_post_to_feed("Valeria Michailovna", "https://static.chipdip.ru/lib/110/DOC011110746.jpg", "22", "32", "10", "03", "2023", "and what is this?")
//	add_post_to_feed("AMOGUSUSSY AMOGUS BRUH 1337", "https://i.pinimg.com/originals/32/4d/fd/324dfd2d44ad3815562cb5136c78c9b9.jpg", "22", "34", "10", "03", "2023", "AMOGUS FARD REAL@?????????????????????????")
//	add_post_to_feed("valerie's posts", "https://monitoringminecraft.ru/player/.default/skin.png", "14", "24", "15", "03", "2023", "opkay cool we got posts yay", "thoughts", null)
//	add_post_to_feed("valerie's posts", "https://monitoringminecraft.ru/player/.default/skin.png", "14", "27", "15", "03", "2023", "i really wish that supermarkets had better delivery", "thoughts", null)
}