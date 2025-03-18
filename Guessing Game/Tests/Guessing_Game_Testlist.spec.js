import { test, expect } from '@playwright/test';
import path from 'path';


const filePath = path.join(__dirname, '../Game File/Guessing Game_2.1.html');
const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');

let easyMode, mediumMode, hardMode, hardcoreMode, toggleInfoBtn, difficultyInfo, livesInfo, timerInfo, restartBtn, guessInput, guessButton


test.describe.parallel("Guessing Game Local HTML Testing", () => {

    test.beforeEach(async ({ page }) => {
        console.log('Opening:', fileUrl); // Debugging line to check path
        await page.goto(fileUrl);

        easyMode = page.locator("#easyBtn");
        mediumMode = page.locator("#mediumBtn");
        hardMode = page.locator("#hardBtn");
        hardcoreMode = page.locator("#hardcoreBtn");
        toggleInfoBtn = page.locator("#toggleInfoBtn");
        difficultyInfo = page.locator("#difficultyInfo");
        livesInfo = page.locator("#lives");
        timerInfo = page.locator("#timer");
        restartBtn = page.locator("#restartBtn");
        guessInput = page.locator("#guessInput");
        guessButton = page.locator("#guessBtn");
    });



    test.only('Element Visibility and Functionality Checks', async ({ page }) => {

        const difficultyButtons = [
            { button: easyMode, label: 'Easy', expectedText: "You chose Easy: 1-10 range." },
            { button: mediumMode, label: 'Medium', expectedText: "You chose Medium: 1-50 range." },
            { button: hardMode, label: 'Hard', expectedText: "You chose Hard: 1-100 range." },
            { button: hardcoreMode, label: 'Hardcore', expectedText: "You chose Hardcore: 1-100 range, 10 attempts, timed." }
        ];

        await expect(page.locator("#gameContainer")).toBeVisible();
        await expect(page.locator("h1")).toHaveText(/Number Guessing Game/);
        await expect(toggleInfoBtn).toBeVisible();
        await expect(toggleInfoBtn).toBeEnabled();
        await expect(toggleInfoBtn).toHaveText("Hide Info");

        await toggleInfoBtn.click();
        await expect(toggleInfoBtn).toHaveText("Show Info");
        await toggleInfoBtn.click();

        await expect(difficultyInfo).toHaveText("Welcome to the Guessing Game! Choose a difficulty to start.");
        await expect(page.locator("//p[text()='Select difficulty:']")).toBeVisible();

        for (const { button, label, expectedText } of difficultyButtons) {
            await expect(button).toHaveText(label);
            await button.click();
            await expect(guessButton).toBeVisible();
            await expect(guessButton).toBeEnabled();
            await expect(guessInput).toBeVisible();
            await expect(guessInput).toBeEnabled();
            await expect(difficultyInfo).toHaveText(expectedText);
        }

        await expect(restartBtn).toBeVisible();
        await expect(livesInfo).toHaveText("Lives remaining: 10");
        await expect(timerInfo).toHaveText("Time remaining: 15.000 sec");

        const allElements = [
            page.locator("#gameContainer"),
            page.locator("h1"),
            toggleInfoBtn,
            difficultyInfo,
            page.locator("//p[text()='Select difficulty:']"),
            easyMode,
            mediumMode,
            hardMode,
            hardcoreMode,
            livesInfo,
            timerInfo,
            restartBtn,
            guessInput,
            guessButton
        ];
        let allVisible = true;

        for (const element of allElements) {
            try {
                await expect(element).toBeVisible();
                console.log(`Element is visible: ${element}`);
            } catch (error) {
                console.log(`Element not visible: ${element}`);
                allVisible = false;
            }
        }

        if (allVisible) {
            console.log("All elements are visible, exiting test!");
        } else {
            console.log("Some elements are not visible, check code!");
        }
    });




    test('Easy Mode Timeout', async ({ page }) => {
        await easyMode.click();









    });





})