const puppeteer = require('puppeteer');
const codeObj = require('./codes');

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'tusharbahuguna583@gmail.com';
const password = 'teriaukatichnahihai583@.com';

(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        })
        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']", email);
        await newTab.type("input[type='password']", password);
        await newTab.click("button[data-analytics='LoginPassword']");
        await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab);
        await waitAndClick('input[value="warmup"]', newTab);
        let allChallenges = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        await questionSolver(newTab, allChallenges[1], codeObj.answer[0]);

    } catch (error) {
        console.log(error);
    }

})();

async function waitAndClick(selector, cPage) {
    await cPage.waitForSelector(selector);
    let selectorClicked = cPage.click(selector);
    return selectorClicked;
}

async function questionSolver(page, question, answer) {
    await question.click();
    await waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs', page);
    await waitAndClick('.checkbox-input', page);
    await page.waitForSelector('textarea.custominput', page);
    await page.type('textarea.custominput', answer, { delay: 20 });
    await page.keyboard.down('Control');
    await page.keyboard.press('A', { delay: 100 });
    await page.keyboard.press('X', { delay: 100 });
    await page.keyboard.up('Control');
    await waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs', page);
    await page.keyboard.down('Control');
    await page.keyboard.press('A', { delay: 100 });
    await page.keyboard.press('V', { delay: 100 });
    await page.keyboard.up('Control');
    let selectorClicked = page.click('.hr-monaco__run-code', { delay: 50 });
    return selectorClicked;
}