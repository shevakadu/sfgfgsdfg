const express    = require('express')
const bodyparser = require('body-parser')
const cors       = require('cors')
const fs         = require('fs')
const path       = require('path')
const mysql      = require('mysql2')
const { connect } = require('http2')

const app        = express()
const port       = 3000

var logType      = 1
// logTypes:
// 0 - console.log() operations
// 1 - small icons
// 2 - console.log() results with small icons
// logType 1 symbol table
// [-=!=-] - account activation
// [>]     - logging in
// [i]     - getting account info
// [%]     - changing credentials
// [#]     - changing status
// [+]     - adding a post
// [:]     - getting posts

const connection = mysql.createConnection({
    host: "sql7.freemysqlhosting.net",
    user: "sql7613766",
    password: "3SZqEZDLTb",
    database: "sql7613766"
})

// Server: sql7.freemysqlhosting.net
// Name: sql7613766
// Username: sql7613766
// Password: 3SZqEZDLTb
// Port number: 3306

console.log("===[i] Connecting...")
connection.connect(function(err) {
    if (err) throw err;
    console.log("===[v] Successfully connnected!")
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors())

app.get("/", (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"})
    response.write(fs.readFileSync('index.html'))
    response.end()
})

app.get("*index_stuff*", (request, response) => {
    var requested_url = decodeURIComponent(request.originalUrl)
    if (path.extname(requested_url) == '.js') {
        response.writeHead(200, {"Content-Type": "application/javascript"})
    } else if (path.extname(requested_url) == '.css') {
        response.writeHead(200, {"Content-Type": "text/css"})
    } else if (path.extname(requested_url) == '.png') {
        response.writeHead(200, {"Content-Type": "image/png"})
    } else if (path.extname(requested_url) == '.jpg') {
        response.writeHead(200, {"Content-Type": "image/jpeg"})
    } else if (path.extname(requested_url) == '.svg') {
        response.writeHead(200, {"Content-Type": "image/svg+xml"})
    }
    response.write(fs.readFileSync(__dirname + requested_url))
    response.end()
})

app.post("/activate_account", (request, response) => {
    if (request.headers['content-type'] == "application/json;charset=UTF-8") {
        if (request.body.request_type == "activate_account") {
            if (request.body.invite_code.length == 0) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_cancelled",
                    "response_content": "invite_code_empty"
                })
            } else if (request.body.invite_code.length < 4) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_cancelled",
                    "response_content": "invite_code_too_short"
                })
            } else {
                var query = "SELECT * FROM accounts WHERE invitecode = ? AND activated = 'false'"
                connection.query(query, [request.body.invite_code], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    if (result.length < 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "no_such_account"
                        })
                    } else if (result.length > 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "multiple_accounts"
                        })
                    } else if (result.length == 1) {
                        var date = new Date()
                        var query = "UPDATE accounts SET invitecode = '', activated = 'true', username = ?, password = ?, status = ?, registerday = ?, registermonth = ?, registeryear = ? WHERE invitecode = ? AND activated = 'false'"
                        connection.query(query, [request.body.invite_code.substring(0, 10), request.body.invite_code, "just activated my account!", String(date.getUTCDate()), String(date.getUTCMonth() + 1), String(date.getUTCFullYear()), request.body.invite_code], function(error, result) {
                            if (error) {
                                response.json({
                                    "general_type": "error",
                                    "response_type": "internal_error"
                                })
                                throw error
                            }
                            if (logType == 2) {
                                console.log(result)
                            }
                            response.json({
                                "general_type": "success",
                                "response_type": "account_activated",
                                "response_content": {
                                    "username": request.body.invite_code.substring(0, 10),
                                    "password": request.body.invite_code
                                }
                            })
                            var query = "SELECT id FROM accounts WHERE username = ? AND password = ?"
                            connection.query(query, [request.body.invite_code.substring(0, 10), request.body.invite_code], function(error, result) {
                                // if (error) {
                                //     response.json({
                                //         "general_type": "error",
                                //         "response_type": "internal_error"
                                //     })
                                //     throw error
                                // }
                                var query = "INSERT INTO posts (creatorid, creationhour, creationminute, creationday, creationmonth, creationyear, tag, mention, type, contents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                                connection.query(query, [result[0].id, String(date.getHours()), String(date.getMinutes()), String(date.getDate()), String(date.getMonth() + 1), String(date.getFullYear()), request.body.tag, request.body.mention, "activation", ""], function (error, result) {
                                    // if (error) {
                                    //     response.json({
                                    //         "general_type": "error",
                                    //         "response_type": "internal_error"
                                    //     })
                                    //     throw error
                                    // }
                                })
                            })
                            if (logType == 0) {
                                console.log("[i] (v) An account has just been activated.")
                            } else {
                                process.stdout.write("[-=!=-]")
                            }
                        })
                    } else {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "unknown"
                        })
                    }
                })
            }
        } else {
            response.json({
                "general_type": "error",
                "response_type": "action_denied",
                "response_content": "request_type_mismatch"
            })
        }
    } else {
        response.json({
            "general_type": "error",
            "response_type": "action_denied",
            "response_content": "content_type_mismatch"
        })
    }
})

app.post("/log_into_account", (request, response) => {
    if (request.headers['content-type'] == "application/json;charset=UTF-8") {
        if (request.body.username.length == 0) {
            response.json({
                "general_type": "error",
                "response_type": "action_cancelled",
                "response_content": "username_empty"
            })
        } else {
            if (request.body.password.length == 0) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_cancelled",
                    "response_content": "password_empty"
                })
            } else {
                var query = "SELECT * FROM accounts WHERE username = ? AND password = ?"
                connection.query(query, [request.body.username, request.body.password], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    if (logType == 2) {
                        console.log(result)
                    }
                    if (result.length < 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "no_such_account"
                        })
                    } else if (result.length > 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "multiple_accounts"
                        })
                    } else if (result.length == 1) {
                        response.json({
                            "general_type": "success",
                            "response_type": "account_found",
                            "response_content": {
                                "pfpurl": result[0].pfpurl,
                                "status": result[0].status
                            }
                        })
                        if (logType == 0) {
                            console.log("[i] Someone logged in.")
                        } else {
                            process.stdout.write("[>]")
                        }
                    }
                })
            }
        }
    }
})

app.post("/get_account_info", (request, response) => {
    if (request.headers['content-type'] == "application/json;charset=UTF-8") {
        var query = "SELECT * FROM accounts WHERE username = ?"
        connection.query(query, [request.body.username], function(error, result) {
            if (error) {
                response.json({
                    "general_type": "error",
                    "response_type": "internal_error"
                })
                throw error
            }
            if (logType == 2) {
                console.log(result)
            }
            if (result.length < 1) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_failed",
                    "response_content": "no_such_account"
                })
            } else if (result.length > 1) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_failed",
                    "response_content": "multiple_accounts"
                })
            } else if (result.length == 1) {
                response.json({
                    "general_type": "success",
                    "response_type": "account_found",
                    "response_content": {
                        "pfpurl": result[0].pfpurl,
                        "status": result[0].status,
                        "registerday": result[0].registerday,
                        "registermonth": result[0].registermonth,
                        "registeryear": result[0].registeryear
                    }
                })
                if (logType == 0) {
                    console.log("[i] Getting account info.")
                } else {
                    process.stdout.write("[i]")
                }
            }
        })
    } else {
        response.json({
            "general_type": "error",
            "response_type": "action_denied",
            "response_content": "content_type_mismatch"
        })
    }
})

app.post("/update_account_credentials", (request, response) => {
    if (request.headers['content-type'] == "application/json;charset=UTF-8") {
        if (request.body.username.length == 0) {
            response.json({
                "general_type": "error",
                "response_type": "action_cancelled",
                "response_content": "username_empty"
            })
        } else {
            if (request.body.password.length == 0) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_cancelled",
                    "response_content": "password_empty"
                })
            } else {
                var query = "SELECT * FROM accounts WHERE username = ? AND password = ?"
                connection.query(query, [request.body.username, request.body.password], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    if (logType == 2) {
                        console.log(result)
                    }
                    if (result.length < 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "no_such_account"
                        })
                    } else if (result.length > 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "multiple_accounts"
                        })
                    } else if (result.length == 1) {
                        var query = "SELECT * FROM accounts WHERE username = ?"
                        connection.query(query, [request.body.newusername], function(error, result) {
                            if (result.length < 1 || request.body.username == request.body.newusername) {
                                var query = "UPDATE accounts SET username = ?, password = ?, pfpurl = ? WHERE username = ? AND password = ?"
                                connection.query(query, [request.body.newusername, request.body.newpassword, request.body.newpfpurl, request.body.username, request.body.password], function (error, result) {
                                    if (error) {
                                        response.json({
                                            "general_type": "error",
                                            "response_type": "internal_error"
                                        })
                                        throw error
                                    }
                                    response.json({
                                        "general_type": "success",
                                        "response_type": "account_updated",
                                        "response_content": {
                                            "username": request.body.newusername,
                                            "password": request.body.newpassword
                                        }
                                    })
                                    if (logType == 0) {
                                        console.log("[i] Account credentials had just been changed.")
                                    } else {
                                        process.stdout.write("[%]")
                                    }
                                })
                            } else {
                                response.json({
                                    "general_type": "error",
                                    "response_type": "action_failed",
                                    "response_content": "username_exists"
                                })
                            }
                        })
                    }
                })
            }
        }
    } else {
        response.json({
            "general_type": "error",
            "response_type": "action_denied",
            "response_content": "content_type_mismatch"
        })
    }
})

app.post("/update_account_status", (request, response) => {
    if (request.headers['content-type'] == "application/json;charset=UTF-8") {
        if (request.body.username.length == 0) {
            response.json({
                "general_type": "error",
                "response_type": "action_cancelled",
                "response_content": "username_empty"
            })
        } else {
            if (request.body.password.length == 0) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_cancelled",
                    "response_content": "password_empty"
                })
            } else {
                var query = "SELECT * FROM accounts WHERE username = ? AND password = ?"
                connection.query(query, [request.body.username, request.body.password], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    if (logType == 2) {
                        console.log(result)
                    }
                    if (result.length < 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "no_such_account"
                        })
                    } else if (result.length > 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "multiple_accounts"
                        })
                    } else if (result.length == 1) {
                        var query = "UPDATE accounts SET status = ? WHERE username = ? AND password = ?"
                        connection.query(query, [request.body.newstatus, request.body.username, request.body.password], function(error, result) {
                            if (error) {
                                response.json({
                                    "general_type": "error",
                                    "response_type": "internal_error"
                                })
                                throw error
                            }
                            response.json({
                                "general_type": "success",
                                "response_type": "account_updated"
                            })
                            if (logType == 0) {
                                console.log("[i] A status was updated.")
                            } else {
                                process.stdout.write("[#]")
                            }
                            ////// Add a status type post
                            var query = "SELECT id FROM accounts WHERE username = ? AND password = ?"
                            connection.query(query, [request.body.username, request.body.password], function(error, result) {
                                if (error) {
                                    response.json({
                                        "general_type": "error",
                                        "response_type": "internal_error"
                                    })
                                    throw error
                                }
                                var query = "INSERT INTO posts (creatorid, creationhour, creationminute, creationday, creationmonth, creationyear, tag, mention, type, contents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                                var date = new Date()
                                connection.query(query, [result[0].id, String(date.getHours()), String(date.getMinutes()), String(date.getDate()), String(date.getMonth() + 1), String(date.getFullYear()), request.body.tag, request.body.mention, "status", request.body.newstatus], function (error, result) {
                                    if (error) {
                                        response.json({
                                            "general_type": "error",
                                            "response_type": "internal_error"
                                        })
                                        throw error
                                    }
                                })
                            })
                            ////// End of the add status type post snippet
                        })
                    }
                })
            }
        }
    } else {
        response.json({
            "general_type": "error",
            "response_type": "action_denied",
            "response_content": "content_type_mismatch"
        })
    }
})

app.post("/upload_a_post", (request, response) => {
    // Algorithm for posting something:
    // 1. Check request type (v)
    // 2. Log into account (v)
    // 3. Check length of post (v)
    // 4. Trim the post if it's too long (v)
    // 5. Substitute questionable characters with their HTML codes (*)
    // 6. Replace markdown stuff with HTML tags (*)
    if (request.headers['content-type'] == "application/json;charset=UTF-8") {
        if (request.body.username.length == 0) {
            response.json({
                "general_type": "error",
                "response_type": "action_cancelled",
                "response_content": "username_empty"
            })
        } else {
            if (request.body.password.length == 0) {
                response.json({
                    "general_type": "error",
                    "response_type": "action_cancelled",
                    "response_content": "password_empty"
                })
            } else {
                var query = "SELECT * FROM accounts WHERE username = ? AND password = ?"
                connection.query(query, [request.body.username, request.body.password], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    if (logType == 2) {
                        console.log(result)
                    }
                    if (result.length < 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "no_such_account"
                        })
                    } else if (result.length > 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "multiple_accounts"
                        })
                    } else if (result.length == 1) {
                        if (request.body.contents.length < 16) {
                            response.json({
                                "general_type": "error",
                                "response_type": "action_failed",
                                "response_content": "post_too_short"
                            })
                        } else {
                            if (["textpost"].indexOf(request.body.post_type) > -1) {
                                if (request.body.post_type == "textpost") {
                                    var post_to_be_uploaded = request.body.contents
                                    if (request.body.contents.length > 128) {
                                        post_to_be_uploaded = request.body.contents.substring(0, 128)
                                    }

                                    function replace_substring(where, originalstring, newstring) {
                                        var modifiedstring = where
                                        for (let i = 0; i < where.split(originalstring).length - 1; i++) {
                                            modifiedstring = modifiedstring.replace(originalstring, newstring)
                                        }
                                        return modifiedstring
                                    }
                                    // post_to_be_uploaded = post_to_be_uploaded.replace("/</gi", "&lt;")
                                    // post_to_be_uploaded = post_to_be_uploaded.replace("/>/gi", "&gt;")

                                    // post_to_be_uploaded = post_to_be_uploaded.replace("/\\b/gi", "<b>")
                                    // post_to_be_uploaded = post_to_be_uploaded.replace("/\\\\b/gi", "</b>")
                                    // post_to_be_uploaded = post_to_be_uploaded.replace("/\\i/gi", "<i>")
                                    // post_to_be_uploaded = post_to_be_uploaded.replace("/\\\\i/gi", "</i>")
                                    post_to_be_uploaded = replace_substring(post_to_be_uploaded, "<", "&lt;")
                                    post_to_be_uploaded = replace_substring(post_to_be_uploaded, ">", "&gt;")
                                    post_to_be_uploaded = replace_substring(post_to_be_uploaded, "\n", "<br>")

                                    post_to_be_uploaded = replace_substring(post_to_be_uploaded, "[b[", "<b>")
                                    post_to_be_uploaded = replace_substring(post_to_be_uploaded, "]b]", "</b>")
                                    post_to_be_uploaded = replace_substring(post_to_be_uploaded, "[i[", "<i>")
                                    post_to_be_uploaded = replace_substring(post_to_be_uploaded, "]i]", "</i>")
                                    // post_to_be_uploaded = replace_substring(post_to_be_uploaded, "[l[", "<a href=\"")
                                    // post_to_be_uploaded = replace_substring(post_to_be_uploaded, "]l]", "\">link</a>")

                                    var query = "SELECT id FROM accounts WHERE username = ? AND password = ?"
                                    connection.query(query, [request.body.username, request.body.password], function(error, result) {
                                        if (error) {
                                            response.json({
                                                "general_type": "error",
                                                "response_type": "internal_error"
                                            })
                                            throw error
                                        }
                                        
                                        if (logType == 2) {
                                            console.log("new post!!!!!!!!")
                                            console.log(result)
                                        }
                                        var date = new Date()
                                        var query = "INSERT INTO posts (creatorid, creationhour, creationminute, creationday, creationmonth, creationyear, tag, mention, type, contents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                                        connection.query(query, [result[0].id, String(date.getHours()), String(date.getMinutes()), String(date.getDate()), String(date.getMonth() + 1), String(date.getFullYear()), request.body.tag, request.body.mention, request.body.post_type, post_to_be_uploaded], function (error, result) {
                                            if (error) {
                                                response.json({
                                                    "general_type": "error",
                                                    "response_type": "internal_error"
                                                })
                                                throw error
                                            }
                                            response.json({
                                                "general_type": "success",
                                                "response_type": "post_uploaded"
                                            })
                                            if (logType == 0) {
                                                console.log("[i] A post was added!")
                                            } else {
                                                process.stdout.write("[+]")
                                            }
                                            if (logType == 2) {
                                                console.log(result)
                                            }
                                        })
                                    })
                                }
                            } else {
                                response.json({
                                    "general_type": "error",
                                    "response_type": "action_failed",
                                    "response_content": "post_type_mismatch"
                                })
                            }
                        }
                    }
                })
            }
        }    
    } else {
        response.json({
            "general_type": "error",
            "response_type": "action_denied",
            "response_content": "content_type_mismatch"
        })
    }
})

app.post("/get_posts", (request, response) => {
    if (request.headers['content-type'] == "application/json;charset=UTF-8") {
        if (["all", "mentions", "updates", "news", "tagged", "user", "mentioned", "help"].indexOf(request.body.post_type) > -1) {
            if (request.body.post_type == "all") {
                var query = "SELECT * FROM posts WHERE type = ? OR type = ? ORDER BY id DESC LIMIT 100"
                connection.query(query,  ["textpost", "activation"], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    
                    // console.log("Getting the posts!")
                    initial_posts = result

                    // new structure coming up
                    // 1. Get the posts. (v) Done!
                    // 2. Get all accounts' IDs, usernames and PFPs.
                    // 3. Attach them respectively.
                    // 4. Send over.
                    // I don't think that such batch requests like this one are the best idea ever
                    // but it's not going to be worse than requesting a PFP of a single user in a
                    // loop, right? hopefully it is a good idea.

                    var query = "SELECT id, username, pfpurl FROM accounts"
                    connection.query(query, function(error, result) {
                        all_accounts = result
                        posts_to_be_sent_over = []
                        for (var post of initial_posts) {
                            for (var account of all_accounts) {
                                // console.log(post.creatorid)
                                // console.log(account.id)
    
                                if (account.id == post.creatorid) {
                                    post.creatorusername = account.username
                                    post.creatorpfpurl = account.pfpurl
                                }
                            }
                        }

                        // ok so update
                        // this code seems to work! yay!!!!!!!!!
                        // now gotta send the posts over!
                        // console.log(initial_posts)

                        response.json(initial_posts)

                        if (logType == 0) {
                            console.log("[i] Getting all posts...")
                        } else {
                            process.stdout.write("[:]")
                        }
                    })

                })
            } else if (request.body.post_type == "mentions") {
                var query = "SELECT * FROM posts WHERE mention = ? ORDER BY id DESC LIMIT 100"
                connection.query(query, [request.body.mentions_target], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    
                    // console.log("Getting the posts!")
                    initial_posts = result

                    var query = "SELECT id, username, pfpurl FROM accounts"
                    connection.query(query, function(error, result) {
                        all_accounts = result
                        posts_to_be_sent_over = []
                        for (var post of initial_posts) {
                            for (var account of all_accounts) {
                                // console.log(post.creatorid)
                                // console.log(account.id)
    
                                if (account.id == post.creatorid) {
                                    post.creatorusername = account.username
                                    post.creatorpfpurl = account.pfpurl
                                }
                            }
                        }
                        response.json(initial_posts)

                        if (logType == 0) {
                            console.log("[i] Getting posts that mention someone...")
                        } else {
                            process.stdout.write("[:]")
                        }
                    })

                })
            } else if (request.body.post_type == "updates") {
                var query = "SELECT * FROM posts WHERE type = ? ORDER BY id DESC LIMIT 100"
                connection.query(query, ["status"], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    
                    // console.log("Getting the posts!")
                    initial_posts = result

                    var query = "SELECT id, username, pfpurl FROM accounts"
                    connection.query(query, function(error, result) {
                        all_accounts = result
                        posts_to_be_sent_over = []
                        for (var post of initial_posts) {
                            for (var account of all_accounts) {
                                // console.log(post.creatorid)
                                // console.log(account.id)
    
                                if (account.id == post.creatorid) {
                                    post.creatorusername = account.username
                                    post.creatorpfpurl = account.pfpurl
                                }
                            }
                        }
                        response.json(initial_posts)

                        if (logType == 0) {
                            console.log("[i] Getting status posts...")
                        } else {
                            process.stdout.write("[:]")
                        }
                    })

                })
            } else if (request.body.post_type == "news") {
                var query = "SELECT * FROM posts WHERE type = ? ORDER BY id DESC LIMIT 100"
                connection.query(query, ["news"], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    
                    // console.log("Getting the posts!")
                    initial_posts = result

                    var query = "SELECT id, username, pfpurl FROM accounts"
                    connection.query(query, function(error, result) {
                        all_accounts = result
                        posts_to_be_sent_over = []
                        for (var post of initial_posts) {
                            for (var account of all_accounts) {
                                // console.log(post.creatorid)
                                // console.log(account.id)
    
                                if (account.id == post.creatorid) {
                                    post.creatorusername = account.username
                                    post.creatorpfpurl = account.pfpurl
                                }
                            }
                        }
                        response.json(initial_posts)

                        if (logType == 0) {
                            console.log("[i] Getting news posts...")
                        } else {
                            process.stdout.write("[:]")
                        }
                    })

                })
            } else if (request.body.post_type == "tagged") {
                var query = "SELECT * FROM posts WHERE tag = ? ORDER BY id DESC LIMIT 100"
                connection.query(query, [request.body.tagged_with], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    
                    // console.log("Getting the posts!")
                    initial_posts = result

                    var query = "SELECT id, username, pfpurl FROM accounts"
                    connection.query(query, function(error, result) {
                        all_accounts = result
                        posts_to_be_sent_over = []
                        for (var post of initial_posts) {
                            for (var account of all_accounts) {
                                // console.log(post.creatorid)
                                // console.log(account.id)
    
                                if (account.id == post.creatorid) {
                                    post.creatorusername = account.username
                                    post.creatorpfpurl = account.pfpurl
                                }
                            }
                        }
                        response.json(initial_posts)

                        if (logType == 0) {
                            console.log("[i] Getting posts tagged something...")
                        } else {
                            process.stdout.write("[:]")
                        }
                    })

                })
            } else if (request.body.post_type == "mentioned") {
                var query = "SELECT * FROM posts WHERE mention = ? ORDER BY id DESC LIMIT 100"
                connection.query(query, [request.body.mentions_who], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    
                    // console.log("Getting the posts!")
                    initial_posts = result

                    var query = "SELECT id, username, pfpurl FROM accounts"
                    connection.query(query, function(error, result) {
                        all_accounts = result
                        posts_to_be_sent_over = []
                        for (var post of initial_posts) {
                            for (var account of all_accounts) {
                                // console.log(post.creatorid)
                                // console.log(account.id)
    
                                if (account.id == post.creatorid) {
                                    post.creatorusername = account.username
                                    post.creatorpfpurl = account.pfpurl
                                }
                            }
                        }
                        response.json(initial_posts)

                        if (logType == 0) {
                            console.log("[i] Getting posts that mention someone else...")
                        } else {
                            process.stdout.write("[:]")
                        }
                    })

                })
            } else if (request.body.post_type == "user") {
                var query = "SELECT id FROM accounts WHERE username = ?"
                connection.query(query, [request.body.username], function(error, result) {
                    if (error) {
                        response.json({
                            "general_type": "error",
                            "response_type": "internal_error"
                        })
                        throw error
                    }
                    if (logType == 2) {
                        console.log(result)
                    }
                    if (result.length < 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "no_such_account"
                        })
                    } else if (result.length > 1) {
                        response.json({
                            "general_type": "error",
                            "response_type": "action_failed",
                            "response_content": "multiple_accounts"
                        })
                    } else if (result.length == 1) {
                        var query = "SELECT * FROM posts WHERE creatorid = ? ORDER BY id DESC LIMIT 100"
                        connection.query(query, [result[0].id], function(error, result) {
                            if (error) {
                                response.json({
                                    "general_type": "error",
                                    "response_type": "internal_error"
                                })
                                throw error
                            }
                            
                            // console.log("Getting the posts!")
                            initial_posts = result
        
                            var query = "SELECT id, username, pfpurl FROM accounts"
                            connection.query(query, function(error, result) {
                                all_accounts = result
                                posts_to_be_sent_over = []
                                for (var post of initial_posts) {
                                    for (var account of all_accounts) {
                                        // console.log(post.creatorid)
                                        // console.log(account.id)
            
                                        if (account.id == post.creatorid) {
                                            post.creatorusername = account.username
                                            post.creatorpfpurl = account.pfpurl
                                        }
                                    }
                                }
                                response.json(initial_posts)
                                if (logType == 0) {
                                    console.log("[i] Getting a user's posts...")
                                } else {
                                    process.stdout.write("[:]")
                                }
                            })
        
                        })
                    }
                })
                // var query = "SELECT * FROM posts WHERE mention = ? ORDER BY id DESC LIMIT 100"
                // connection.query(query, [request.body.mentions_who], function(error, result) {
                //     if (error) {
                //         response.json({
                //             "general_type": "error",
                //             "response_type": "internal_error"
                //         })
                //         throw error
                //     }
                    
                //     // console.log("Getting the posts!")
                //     initial_posts = result

                //     var query = "SELECT id, username, pfpurl FROM accounts"
                //     connection.query(query, function(error, result) {
                //         all_accounts = result
                //         posts_to_be_sent_over = []
                //         for (var post of initial_posts) {
                //             for (var account of all_accounts) {
                //                 // console.log(post.creatorid)
                //                 // console.log(account.id)
    
                //                 if (account.id == post.creatorid) {
                //                     post.creatorusername = account.username
                //                     post.creatorpfpurl = account.pfpurl
                //                 }
                //             }
                //         }
                //         response.json(initial_posts)
                //     })

                // })
            }
        } else {
            response.json({
                "general_type": "error",
                "response_type": "action_denied",
                "response_content": "invalid_post_type"
            })
        }
    } else {
        response.json({
            "general_type": "error",
            "response_type": "action_denied",
            "response_content": "content_type_mismatch"
        })
    }
})

console.log("===[i] Starting server...")
app.listen(port, ()=>{
    console.log(`===[v] Started server on port ${port}!`)

    console.log("=========[i] Current working directory")
    console.log("===[:] The server is running at:")
    console.log("===[:] __dirname     : ", __dirname)
    console.log("===[:] process.cwd() : ", process.cwd())
    console.log("===[:] ./            : ", path.resolve("./"))
    console.log("===[:] filename      : ", __filename)
    console.log("=========[ ]")
})