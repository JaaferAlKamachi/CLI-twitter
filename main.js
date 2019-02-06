let program = require('commander')
var {prompt} = require('inquirer')
let UserConfig = require('./src/user')

//Controlers
let UserController = require('./src/controllers/userController');
let TweetController = require('./src/controllers/tweetController');
let CommentController = require('./src/controllers/commentController');

//time stuff
let TimeAgo = require('javascript-time-ago')
let en = require('javascript-time-ago/locale/en')
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

//information collectors
let {logininfo, registerinfo, tweetinfo, commentinfo, tweetlistinfo, tweetcontrolinfo}=require('./src/info')




console.log('if you want to register to CLI-Twitter type: *node main.js register*, if you want to login type: *node main.js login* ')

//LogIn
program
    .command('login')
    .alias('l')
    .description('Login a user')
    .action(() => {
        prompt(logininfo).then(answers => {
            let userController = new UserController();
            let { email, password } = answers;
            userController.login(email, password, (error, data) => {
                if (!error) {
                    UserConfig.setLogin(data.uid)
                    console.log("You're Loged in")
                }
            })
        })
    });

// Register
program
    .command('register')
    .alias('r')
    .description('Create new user')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (!uid) {
                prompt(registerinfo).then(answers => {
                    let userController = new UserController();
                    userController.register(answers)
                })
            } else {
                console.log("Registerd, Welcome to CLI-twitter hope you'll like it.")
            }
        })
    });

// LogOut
program
    .command('logout')
    .alias('lo')
    .description('Logout')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (uid) {
                UserConfig.logout((uid) => {
                    console.log("logout successfully")
                })
            } else {
                console.log("you are not loged in, you need to log in first.")
            }
        })
    });


// Write and post a tweet
program
    .command('tweet')
    .alias('tw')
    .description('Create Tweet')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (uid) {
                prompt(tweetQuestions).then(answers => {
                    answers.uid = uid
                    answers.date = Date.now()
                    let tweetController = new TweetController();
                    tweetController.createTweet(answers)
                })
            } else {
                console.log("you are not loged in, you need to log in first.")
            }
        })
    });


// Go the newsfeed
program
    .command('home')
    .alias('h')
    .description('Show all Tweets')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (uid) {
                let tweetController = new TweetController();
                tweetController.showTweets((tw) => {
                    let tweets = []
                    tw.forEach(function (doc) {
                        tweets.push(doc.data().content + "\t (" + timeAgo.format(doc.data().date) + ") \n" + doc.id)
                    });
                    prompt(tweetListQuestions(tweets)).then((answers) => {
                        let id = answers.id.split("\n")[1]
                        prompt(tweetControlQuestions(tweets)).then((answers) => {
                            let commentController = new CommentController();
                            if (answers.control == 'New Comment') {
                                
                                prompt(commentQuestions).then((answers) => {
                                    answers.tweetId = id
                                    answers.uid = uid
                                    commentController.createComment(answers)
                                })
                            }
                            if(answers.control == 'Show Comments'){
                                commentController.showComments(id);
                            }
                        })
                    })
                })

            } else {
                console.log("you are not loged in, you need to log in first.")
            }
        })
    });



program.parse(process.argv);