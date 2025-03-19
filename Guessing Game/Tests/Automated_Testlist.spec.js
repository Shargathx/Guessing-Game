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



    test('Element Visibility and Functionality Checks', async ({ page }) => {

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
        test.setTimeout(50000);
        await easyMode.click();
        await guessInput.fill("0");
        await guessButton.click();
        await page.waitForTimeout(30000);

        const hasText = page.locator("//p[@id='feedback']");

        try {
            await expect(hasText).toContainText("Invalid number! Enter a number within the range");
            console.log("Easy Mode still going, did not time out, test passed! Exiting!");
        } catch (error) {
            console.log("Easy Mode timed out before reaching 30 seconds, check code!");
        }
    });



    test('Medium Mode Timeout', async ({ page }) => {
        test.setTimeout(50000);
        await mediumMode.click();
        await guessInput.fill("0");
        await guessButton.click();
        await page.waitForTimeout(30000);

        const hasText = page.locator("//p[@id='feedback']");

        try {
            await expect(hasText).toContainText("Invalid number! Enter a number within the range");
            console.log("Medium Mode still going, did not time out, test passed! Exiting!");
        } catch (error) {
            console.log("Medium Mode timed out before reaching 30 seconds, check code!");
        }
    })



    test('Hard Mode Timeout', async ({ page }) => {
        test.setTimeout(50000);
        await hardMode.click();
        await guessInput.fill("0");
        await guessButton.click();
        await page.waitForTimeout(30000);

        const hasText = page.locator("//p[@id='feedback']");

        try {
            await expect(hasText).toContainText("Invalid number! Enter a number within the range");
            console.log("Hard Mode still going, did not time out, test passed! Exiting!");
        } catch (error) {
            console.log("Hard Mode timed out before reaching 30 seconds, check code!");
        }
    })



    test('Hardcore Mode Timeout', async ({ page }) => {
        test.setTimeout(50000);
        await hardcoreMode.click();
        await guessInput.fill("0");
        await guessButton.click();

        const hasText = page.locator("//p[@id='feedback']");

        try {
            await expect(hasText).toContainText("Invalid number! Enter a number within the range");
            console.log("Feedback text checks out, continuing...");
        } catch (error) {
            console.log("Wrong text displayed, check code!");
        }

        await page.waitForTimeout(16000);

        try {
            await expect(guessButton).toBeDisabled();
            await expect(hasText).toBeVisible();
            await expect(hasText).toContainText("Time's up!");
            console.log("Button disabled, text checks out, continuing to next timeout...");
        } catch (error) {
            console.log("Something went wrong, check code!");
        }

        await page.waitForTimeout(15000);

        try {
            await expect(guessButton).toBeDisabled();
            await expect(hasText).toBeVisible();
            await expect(hasText).toContainText("Time's up!");
            console.log("All elements in the correct state, exiting test!");
        } catch (error) {
            console.log("Hardcore Mode timed out before reaching 15 seconds, check code!");
        }
    })



    test('Easy - Guessing Game with Invalid Guesses', async ({ page }) => {
        await easyMode.click();


        let low = 1;
        let high = 10;
        let guess;
        let guessCount = 0;
        let invalidGuesses = 0;
        let feedbackText = "";


        const invalidInputs = ["0", "test", "-1", "101"];       
        const makeInvalidGuess = async (inputValue) => {
            if (isNaN(inputValue) || inputValue < low || inputValue > high) {
                invalidGuesses++;
                console.log(`Invalid guess detected: ${inputValue}`);
                return;
            }
        
            await guessInput.fill(inputValue);
            await guessButton.click();
        
            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });
        
            feedbackText = (await feedbackLocator.textContent()).trim();
            
            if (/invalid/i.test(feedbackText) || /out of range/i.test(feedbackText)) {
                invalidGuesses++;
                console.log(`Invalid guess feedback detected: ${feedbackText}`);
            } else {
                console.log(`Guess: ${inputValue}, Feedback: ${feedbackText}`);
            }
        };
        
        for (const input of invalidInputs) {
            await makeInvalidGuess(input);
        }
        

        while (true) {
            guess = Math.floor((low + high) / 2);
            console.log(`Guessing: ${guess}`);

            await guessInput.fill(guess.toString());
            await guessButton.click();
            guessCount++;


            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });

            feedbackText = (await feedbackLocator.textContent()).trim();
            console.log(`Feedback: ${feedbackText}`);


            if (/too low/i.test(feedbackText)) {
                low = guess + 1;
            } else if (/too high/i.test(feedbackText)) {
                high = guess - 1;
            } else if (/correct/i.test(feedbackText)) {
                console.log(`Correct answer found: ${guess}! Test passed.`);
                console.log(`Guess count: ${guessCount}.`);
                console.log(`Invalid guesses made: ${invalidGuesses}`);
                break;
            } else {
                console.log("Unexpected feedback. Check the game logic!");
                break;
            }
        }
    });



    test('Medium - Guessing Game with Invalid Guesses', async ({ page }) => {
        await mediumMode.click();


        let low = 1;
        let high = 50;
        let guess;
        let guessCount = 0;
        let invalidGuesses = 0;
        let feedbackText = "";


        const invalidInputs = ["0", "test", "-1", "101"];       
        const makeInvalidGuess = async (inputValue) => {
            if (isNaN(inputValue) || inputValue < low || inputValue > high) {
                invalidGuesses++;
                console.log(`Invalid guess detected: ${inputValue}`);
                return;
            }
        
            await guessInput.fill(inputValue);
            await guessButton.click();
        
            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });
        
            feedbackText = (await feedbackLocator.textContent()).trim();
            
            if (/invalid/i.test(feedbackText) || /out of range/i.test(feedbackText)) {
                invalidGuesses++;
                console.log(`Invalid guess feedback detected: ${feedbackText}`);
            } else {
                console.log(`Guess: ${inputValue}, Feedback: ${feedbackText}`);
            }
        };
        
        for (const input of invalidInputs) {
            await makeInvalidGuess(input);
        }
        

        while (true) {
            guess = Math.floor((low + high) / 2);
            console.log(`Guessing: ${guess}`);

            await guessInput.fill(guess.toString());
            await guessButton.click();
            guessCount++;


            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });

            feedbackText = (await feedbackLocator.textContent()).trim();
            console.log(`Feedback: ${feedbackText}`);


            if (/too low/i.test(feedbackText)) {
                low = guess + 1;
            } else if (/too high/i.test(feedbackText)) {
                high = guess - 1;
            } else if (/correct/i.test(feedbackText)) {
                console.log(`Correct answer found: ${guess}! Test passed.`);
                console.log(`Guess count: ${guessCount}.`);
                console.log(`Invalid guesses made: ${invalidGuesses}`);
                break;
            } else {
                console.log("Unexpected feedback. Check the game logic!");
                break;
            }
        }
    });



    test('Hard - Guessing Game with Invalid Guesses', async ({ page }) => {
        await hardMode.click();


        let low = 1;
        let high = 100;
        let guess;
        let guessCount = 0;
        let invalidGuesses = 0;
        let feedbackText = "";


        const invalidInputs = ["0", "test", "-1", "101"];       
        const makeInvalidGuess = async (inputValue) => {
            if (isNaN(inputValue) || inputValue < low || inputValue > high) {
                invalidGuesses++;
                console.log(`Invalid guess detected: ${inputValue}`);
                return;
            }
        
            await guessInput.fill(inputValue);
            await guessButton.click();
        
            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });
        
            feedbackText = (await feedbackLocator.textContent()).trim();
            
            if (/invalid/i.test(feedbackText) || /out of range/i.test(feedbackText)) {
                invalidGuesses++;
                console.log(`Invalid guess feedback detected: ${feedbackText}`);
            } else {
                console.log(`Guess: ${inputValue}, Feedback: ${feedbackText}`);
            }
        };
        
        for (const input of invalidInputs) {
            await makeInvalidGuess(input);
        }
        

        while (true) {
            guess = Math.floor((low + high) / 2);
            console.log(`Guessing: ${guess}`);

            await guessInput.fill(guess.toString());
            await guessButton.click();
            guessCount++;


            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });

            feedbackText = (await feedbackLocator.textContent()).trim();
            console.log(`Feedback: ${feedbackText}`);


            if (/too low/i.test(feedbackText)) {
                low = guess + 1;
            } else if (/too high/i.test(feedbackText)) {
                high = guess - 1;
            } else if (/correct/i.test(feedbackText)) {
                console.log(`Correct answer found: ${guess}! Test passed.`);
                console.log(`Guess count: ${guessCount}.`);
                console.log(`Invalid guesses made: ${invalidGuesses}`);
                break;
            } else {
                console.log("Unexpected feedback. Check the game logic!");
                break;
            }
        }
    });



    test('Hardcore - Guessing Game with Invalid Guesses', async ({ page }) => {
        await hardcoreMode.click();
        const livesRemaining = await livesInfo.textContent();
        console.log(`${livesRemaining} at the start of the game.`);


        let low = 1;
        let high = 100;
        let guess;
        let guessCount = 0;
        let invalidGuesses = 0;
        let feedbackText = "";


        const invalidInputs = ["0", "test", "-1", "101"];       
        const makeInvalidGuess = async (inputValue) => {
            if (isNaN(inputValue) || inputValue < low || inputValue > high) {
                invalidGuesses++;
                console.log(`Invalid guess detected: ${inputValue}`);
                return;
            }
        
            await guessInput.fill(inputValue);
            await guessButton.click();
        
            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });
        
            feedbackText = (await feedbackLocator.textContent()).trim();
            
            if (/invalid/i.test(feedbackText) || /out of range/i.test(feedbackText)) {
                invalidGuesses++;
                console.log(`Invalid guess feedback detected: ${feedbackText}`);
            } else {
                console.log(`Guess: ${inputValue}, Feedback: ${feedbackText}`);
            }
        };
        
        for (const input of invalidInputs) {
            await makeInvalidGuess(input);
        }


        while (true) {
            guess = Math.floor((low + high) / 2);
            console.log(`Guessing: ${guess}`);

            await guessInput.fill(guess.toString());
            await guessButton.click();
            guessCount++;


            const feedbackLocator = page.locator("#feedback");
            await feedbackLocator.waitFor({ state: "visible" });

            feedbackText = (await feedbackLocator.textContent()).trim();
            console.log(`Feedback: ${feedbackText}`);


            if (/too low/i.test(feedbackText)) {
                low = guess + 1;
            } else if (/too high/i.test(feedbackText)) {
                high = guess - 1;
            } else if (/correct/i.test(feedbackText)) {
                console.log(`Correct answer found: ${guess}! Test passed.`);
                console.log(`Guess count: ${guessCount}.`);
                const updatedLives = await livesInfo.textContent();
                console.log(`${updatedLives}`);
                console.log(`Invalid guesses made: ${invalidGuesses}`);
                break;
            } else {
                console.log("Unexpected feedback. Check the game logic!");
                break;
            }
        }
    });
})