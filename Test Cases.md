# Test Cases for Guessing Game

## Precondition: The game is opened and loaded in a supported web browser

## Test Case 1: All buttons are visible on load
- **Test Case ID:** TC001  
- **Description:** All possible buttons in the game (Hide/Show Info, Easy, Medium, Hard, Hardcore) are visible.
- **Steps:**   
  1. Verify that all the buttons are visible on first load.
  2. Refresh the page to see if buttons stay visible.
- **Expected Result:** 
- All the buttons are visible with and without refreshing the page.  
- **Status:** ✅ (Pass) 



## Test Case 2: Restart button is visible and interactable.
- **Test Case ID:** TC002
- **Description:** After a game mode has been selected, the restart button becomes visible and interactable.
- **Steps:**  
  1. Select any game mode.
  2. Enter any value into the field without entering / "guessing" it.
  3. Press the "Restart Game" button.
- **Expected Result:** 
- After selecting a game mode, the restart button becomes visible and interactable and when clicked, resets the game status.
- **Status:** ✅ (Pass) 



## Test Case 3: Show/Hide button is working
- **Test Case ID:** TC003 
- **Description:** Verify that clicking the Show/Hide button displays or hides info about the game.
- **Steps:**  
  1. Click on the "Hide Info" button (should be visible by default / on first load).
  2. Click on the "Show Info" button to make info visible again.
- **Expected Result:** 
- Game info will be displayed on first load, when "Hide Info" is clicked the info will be hidden until "Show Info" is clicked again.  
- **Status:** ✅ (Pass)  



## Test Case 4: Selecting Difficulties
- **Test Case ID:** TC004 
- **Description:** Veryify that different difficulties all display their own correct info.
- **Steps:**  
  1. Click on "Easy" button.
  2. The user sees the correct text ("You chose Easy: 1-10 range.") and the field to input guesses becomes visible.
  3. Click on the "Medium" button.
  4. The user sees the correct text ("You chose Medium: 1-50 range.") and the field to input guesses becomes visible.
  5. Click on the "Hard" button.
  6. The user sees the correct text ("You chose Hard: 1-100 range.") and the field to input guesses becomes visible.
  7. Click on the "Hardcore" button.
  8. The user sees the correct text ("You chose Hardcore: 1-100 range, 10 attempts, timed.") and below the difficulty options the user sees the text ("Lives remaining: 10
        Time remaining: 15.000 sec") and the field to input guesses becomes visible.
- **Expected Result:** 
- All difficulties have their own correct info visible with all UI elements present.
- **Status:** ✅ (Pass)  



## Test Case 5: Enter a valid guess into the "Enter your guess" field
- **Test Case ID:** TC005 
- **Description:** Verify that clicking the Show/Hide button displays or hides info about the game.
- **Steps:**  
  1. Click on "Easy" button.
  2. Enter a number between 1-10 in the "Enter your guess" field.
  3. Click on the "Medium" button.
  4. Enter a number between 1-50 in the "Enter your guess" field.
  5. Click on the "Hard" button.
  6. Enter a number between 1-100 in the "Enter your guess" field.
  7. Click on the "Hardcore" button.
  8. Enter a number between 1-100 in the "Enter your guess" field.
- **Expected Result:** 
- Easy mode accepts any number between 1-10.
- Medium mode accepts any number between 1-50.
- Hard mode accepts any number between 1-100.
- Hardcore mode accepts any number between 1-100; the timer starts a countdown after the first guess is made.
- **Status:** ✅ (Pass)  



## Test Case 6: Use the Up/Down value controller
- **Test Case ID:** TC006 
- **Description:** Verify that clicking on the Up/Down value controller works as intended.
- **Steps:**  
  1. Click on the "Up" value once.
  2. Enter / "Guess" the value.
  3. Click and hold on the "Up" value for a few moments.
  4. Enter / "Guess" the value.
  5. Click on the "Down" value once.
  6. Enter / "Guess" the value.
  7. Click and hold on the "Down" value for a few moments.
  8. Enter / "Guess" the value.
- **Expected Result:** 
- Clicking and holding Up or Down changes the values accordingly; all values are accepted (even invalid / negative values).
- **Status:** ✅ (Pass) 



## Test Case 7: Valid and invalid counter (all difficulties)
- **Test Case ID:** TC007A
- **Description:** Verify that both valid and invalid counters are working - entering an invalid number is possible, but does not count towards a valid guess. Make sure the invalid counter counts all invalid guesses.
- **Steps:**  
  1. Choose "Easy" mode.
  2. Enter / "Guess" an invalid value multiple times [e.g., "0", "-"5, "101", "-9999999", "500", "a", "@", "testc4s3#1"].
  3. Play the game until you win.
  4. Choose "Medium" mode.
  5. Enter / "Guess" an invalid value multiple times [e.g., "0", "-"5, "101", "-9999999", "500", "a", "@", "testc4s3#1"].
  6. Play the game until you win.
  7. Choose "Hard" mode.
  8. Enter / "Guess" an invalid value multiple times [e.g., "0", "-"5, "101", "-9999999", "500", "a", "@", "testc4s3#1"].
  9. Play the game until you win.
  10. Choose "Hardcore" mode.
  11. Enter / "Guess" an invalid value multiple times [e.g., "0", "-"5, "101", "-9999999", "500", "a", "@", "testc4s3#1"].
  12. Play the game until you win or lose.
- **Expected Result:** 
- All of the values can be entered, but do not count towards a valid guess.
- For every invalid guess, the game displays the message "❌ Invalid number! Enter a number within the range.".
- Invalid counter should tell the user they made 9 invalid guesses (going through all the numbers provided above).
- Hardcore mode should also tell the player if they ran out of lives or if the timer ran out before they could make the correct guess.
- All modes should tell the player how many total attempts they made during the game.
- **Status:** ✅ (Pass) 



## Test Case 8: Hardcore Timer (Win condition)
- **Test Case ID:** TC008 
- **Description:** Verify that the timer in Hardcore mode works as intended.
- **Steps:**  
  1. Select Hardcore mode.
  2. Enter a random guess between 1-100.
  3. Try to win the game as fast as possible.
- **Expected Result:** 
- The timer should continue counting down after each guess until it reaches 0 or the correct answer is entered.
- Upon entering a correct guess the timer stops and shows how long that attempt took (with 3 decimals).
- **Status:** ✅ (Pass) 



## Test Case 9: Hardcore Timer (Timer runs out)
- **Test Case ID:** TC009 
- **Description:** Verify that the timer in Hardcore mode works as intended.
- **Steps:**  
  1. Select Hardcore mode.
  2. Enter 5 random invalid guesses (negative numbers, text or above 100).
  3. Let the timer run out.
- **Expected Result:** 
- The timer reaches exactly 0.000; a message displaying "❌ Time's up! The correct number was 48." appears, followed by "🕹️ Total guesses before timeout: 5".
- **Status:** ✅ (Pass) 



## Test Case 10: Hardcore Timer (Restart)
- **Test Case ID:** TC010 
- **Description:** Verify that clicking "Restart Game" during the timer runtime resets the game and the timer.
- **Steps:**  
  1. Select Hardcore mode.
  2. Enter a random valid or invalid guess (valid guess CANNOT be the correct answer, refresh the page if that happens).
  3. Click the "Restart Game" button.
- **Expected Result:** 
- Clicking the "Restart Game" button resets the timer back to 15 seconds and does not start the timer before a new guess has been made.
- **Status:** ✅ (Pass) 



## Test Case 11: Timer Reset Behavior Regarding Hardcore Mode When Switching Difficulties (Hardcore to Easy/Medium/Hard)
- **Test Case ID:** TC011 
- **Description:** Verify that the timer resets when switching from Hardcore mode to any other difficulty (Easy, Medium, or Hard).
- **Steps:**  
  1. Select Hardcore mode.
  2. Begin making guesses and observe the timer countdown.
  3. While the timer is running, switch to Easy mode.
  4. Switch back to Hardcore mode.
  5. Verify that the timer is reset to its initial value (e.g., 15 seconds).
  6. Repeat steps 3-5 for Medium and Hard modes.
- **Expected Result:** 
- When switching from Hardcore mode to any other difficulty (Easy, Medium, or Hard), the timer should reset to 15 seconds and the countdown should start fresh after making the first guess.
- **Status:** ✅ (Pass) 



## Test Case 12: "Restart Game" Resets All Counters for Every Difficulty
- **Test Case ID:** TC012
- **Description:** Verify that "Restart Game" resets all counters (valid guesses, invalid guesses, total guesses, and lives (Hardcore)) for all difficulties.
- **Steps:**  
  1. Choose any difficulty (Easy, Medium, Hard, or Hardcore).
  2. Make 3 invalid guesses (e.g., text answers, 0, -5, or above the allowed threshold).
  3. Make a valid guess (e.g., 1). IF the valid guess ends up being the correct answer, refresh the page and start from step 1.
  4. Click on the "Restart Game" button.
  5. Make 1 invalid guess (e.g., 0).
  6. Make valid guesses until you win the game.
- **Expected Result:** 
- After restarting, all counters (valid guesses, invalid guesses, total guesses, and lives) should be reset to their initial values for the chosen difficulty.
- **Status:** ✅ (Pass) 



## Test Case 13: Correct Guess after Multiple Invalid Guesses
- **Test Case ID:** TC0013 
- **Description:** Verify that after multiple invalid guesses, a correct guess should still be accepted and the game should end after the correct guess is made.
- **Steps:**  
  1. Choose any difficulty.
  2. Enter multiple invalid guesses (e.g., 0, -5, 99999).
  3. Enter valid guesses until you win.
- **Expected Result:** The game should accept the correct/valid guesses after invalid guesses and correctly display the win message upon entering a correct guess.
- **Status:** ✅ (Pass) 



## Test Case 14: Correct Display of Messages (Game Over)
- **Test Case ID:** TC0014 
- **Description:** Verify that the game displays the correct message when the user runs out of lives or time.
- **Steps:**  
  1. Choose Hardcore mode.
  2. Make a series of invalid guesses until lives are exhausted or the timer runs out.
- **Expected Result:** The correct message should be displayed ("💀 You ran out of lives!") along with the number of attempts or guesses made during the game.
- **Status:** ✅ (Pass) 



## Test Case 15: "Restart Game" Resets The Hidden Timers for Easy/Medium/Hard Difficulties
- **Test Case ID:** TC015
- **Description:** Verify that "Restart Game" resets all timers for Easy/Medium/Hard Difficulties
- **Steps:**  
  1. Choose any difficulty between Easy, Medium or Hard.
  2. Make 3 invalid guesses (e.g., text answers, 0, -5, or above the allowed threshold).
  3. Wait for 10 seconds.
  4. Click on the "Restart Game" button.
  5. Make valid guesses as fast as you can until you win the game.
- **Expected Result:** 
- After restarting the game, the timer for Easy, Medium and Hard mode should be reset to their initial values (hidden) and upon completing the game as fast as possible, the timer would display correct information. 
- **Status:** ✅ (Pass) 


❌❌❌
✅✅✅
