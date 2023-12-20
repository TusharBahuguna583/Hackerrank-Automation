const puppeteer = require('puppeteer');
const codeObj = require('./codes');

const {LOGINLINK, EMAIL, PASSWORD} = require('./credentials');

const loginLink = LOGINLINK;
const email = EMAIL;
const password = PASSWORD;

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
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.type('.monaco-editor.no-user-select.showUnused.showDeprecated.vs','a');
    await waitAndClick('.checkbox-input', page);
    await page.waitForSelector('textarea.custominput', page);
    await page.type('textarea.custominput', answer, { delay: 20 });
    await page.keyboard.down('Control');
    await page.keyboard.press('A', { delay: 100 });
    await page.keyboard.press('X', { delay: 100 });
    await page.keyboard.up('Control');
    await waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs', page);
    await page.keyboard.down('Control');
    await page.keyboard.press('F');
    await page.keyboard.up('Control');
    await waitAndClick('textarea[aria-label="Find"]', page);
    await page.type('textarea[aria-label="Find"]','a');
    await waitAndClick('div[aria-label="Toggle Replace"]', page);
    await waitAndClick('textarea[aria-label="Replace"]', page);
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    let selectorClicked = page.click('.hr-monaco__run-code', { delay: 50 });
    return selectorClicked;
}