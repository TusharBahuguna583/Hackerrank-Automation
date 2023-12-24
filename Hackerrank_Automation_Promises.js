const puppeteer = require('puppeteer');
const chalk = require('chalk');
const ps = require('prompt-sync');
const prompt = ps();
const codeObj = require('./codes');

const loginLink = 'https://www.hackerrank.com/auth/login';
console.log(chalk.hex('#DEADED').bold.underline("-----------------ENTER LOGIN CREDENTIALS-----------------"));
let email = prompt(chalk.green.bold.italic("Enter email :"));
let password = prompt(chalk.green.bold.italic("Enter password :"));
if (!email && !password) return console.log(chalk.red.bold('!!!!!!!! PLEASE ENTER VALID EMAIL AND PASSWORD !!!!!!!!'));
console.log(chalk.hex('#DEADED').bold("LET'S START AUTOMATION 🚀"));
let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})

let page;

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab;
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email);
    return emailIsEntered;
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password);
    return passwordIsEntered;
}).then(function () {
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']");
    return loginButtonClicked;
})
    // .then(function(){
    //     let clickOnAccept = waitAndClick('button[data-attr1="Accept"]', page);
    //     return clickOnAccept;
    // })
    .then(function () {
        let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
        return clickOnAlgoPromise;
    }).then(function () {
        let getToWarmUp = waitAndClick('input[value="warmup"]', page);
        return getToWarmUp;
    }).then(function () {
        let waitFor3Seconds = page.waitForTimeout(3000);
        return waitFor3Seconds;
    }).then(function () {
        let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        return allChallengesPromise;
    }).then(function (questionArr) {
        let questionWillBeSolved = questionSolver(page, questionArr[1], codeObj.answer[0]);
        return questionWillBeSolved;
    }).then(function () {
        return console.log(chalk.blueBright.bold('@ @ # # @ @ # # @ @ # # @ @ # # 🎉🎉 AUTOMATION FINISHED SUCCESSFULLY 🎉🎉 @ @ # # @ @ # # @ @ # # @ @ # #'));
    }).catch(function () {
        return console.log(chalk.blueBright.bold('@ @ # # @ @ # # @ @ # # @ @ # # 😭😭 AUTOMATION FAILED DUE TO SOME ERROR 😭😭 @ @ # # @ @ # # @ @ # # @ @ # #'));
    })


function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function () {
            let clickModal = cPage.click(selector);
            return clickModal;
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function () {
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs', page);
            return EditorInFocusPromise;
        }).then(function () {
            return waitAndClick('.checkbox-input', page);
        }).then(function () {
            return page.waitForSelector('textarea.custominput', page);
        }).then(function () {
            return page.type('textarea.custominput', answer, { delay: 20 });
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 });
            return AisPressed;
        }).then(function () {
            let XisPressed = page.keyboard.press('X', { delay: 100 });
            return XisPressed;
        }).then(function () {
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function () {
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs', page);
            return mainEditorInFocus;
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 });
            return AisPressed;
        }).then(function () {
            let VisPressed = page.keyboard.press('V', { delay: 100 });
            return VisPressed;
        }).then(function () {
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function () {
            return page.click('.hr-monaco__run-code', { delay: 50 });
        }).then(function () {
            resolve();
        }).catch(function () {
            reject();
        })
    })
}