
const LoginInfo = [
    {
        type: 'input',
        name: 'email',
        message: 'Enter Your Email'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter Your Password'
    }
];
const registerInfo = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Your Name'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Your Email'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter Your Password'
    },
    {
        type: 'list',
        choices: ["male", "famel"],
        name: 'gender',
        message: 'Select Gender'
    }
];
const tweetInfo = [
    {
        type: 'input',
        name: 'content',
        message: 'Write Tweet'
    }
];
const commentInfo = [
    {
        type: 'input',
        name: 'comment',
        message: 'Write Comment'
    }
];
let tweetListInfo = (choices) => {
   return [
        {
            type: 'list',
            choices: choices,
            name: 'id',
            message: 'List Tweet'
        }
    ]
}

let tweetControlInfo = (tweet)=>[
    {
        type: 'list',
        choices: ["New Comment","Show Comments","Share"],
        name: 'control',
        message: tweet
    }
]

module.export = {LoginInfo, registerInfo, commentInfo, tweetInfo, tweetControlInfo, tweetListInfo}