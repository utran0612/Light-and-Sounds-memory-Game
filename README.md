# Light-and-Sounds-memory-Game
# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Uyen (Holly) Tran

Time spent: 10 hours spent in total

Link to project: https://royal-motley-billboard.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] HTML page elements (title, buttons, fonts) have been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] A ticking timer that automatically reset everyround to let user knows how much time they have left 
- [x] Snack bar to notify user how many strikes they have taken
- [x] Pick random clueHoldTime for each button every round

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](https://media.giphy.com/media/DdAEhIWQoN5aNz8ADt/giphy.gif)
[Video showing the features (with sounds)](https://vimeo.com/694521819)
![](gif3-link-here)
![](gif4-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

W3school.com, stackoverflow, youtube videos, documentation, coolors (for color palette) 

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
- I had difficulty understanding individual lines of codes in the AudioContext tutorial. I read it multiple times and tried to figure out what each line of code does and try anything I think could work. I also look up the syntax and functions to see what they do on StackOverflow and w3school. I learnt from experimenting with the syntax and the functions in the tutorial.

- I also have difficulty coding the game logic. After a while experimenting with the logic, I realized that my codes were not organized, so I started to break the problem into 4 main steps. First, compare “guessCounter'' and “progress”. In each case, check if the button clicked is correct, what to do when the pressed button is correct, what to do when it’s not. The hardest part is to monitor “guessCounter'' and “progress”, and when to increment them. To ensure this, I printed “guessCounter” and “progress” to the console to check if they’re correctly updated and where things went wrong. Once I got this, the win/lose notification became easier.

- While I was testing the game logic, I encountered a bug that I haven’t found a direct way to fix. When the user correctly guessed all the buttons and then mistakenly pressed extra buttons, the program terminated. However, when the user hits “Start” again, the pattern from the last game keeps firing simultaneously with the pattern of the new game. It is because when the user did all the correct guesses, the next sequence is fired and when the program terminates because of wrong extra buttons, the fired sequence wasn’t completed. So in the next game, that sequence keeps firing simultaneously with the new pattern of the new game. Even when I plugged in codepath’s logic, this bug is still there. I tried a couple of ways to solve this problem, using var to track, looking it up on StackOverFlow and reading the documentation. I tried to track if the player pressed extra buttons by var “repeated” but it didn’t work. It turned out that the logic never gets to the condition where “guessCounter” > “progress” for the “repeated” var to be updated because when the player completes their guess, the guessCounter goes back to 0 immediately. I went on the slack channel for some help and I saw someone is trying to disable the buttons as an optional feature. And I thought it would be a good idea to solve this bug!


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
- I don’t know why the button jumps when it changes to the image every time I press it. My images and my buttons have the same width, height, margin and padding. 

- Also, I want to learn more about tools and rules (if there’s any) to design the website. For the color palette of my project, I asked my friend and she recommended me to try out coolers! It was actually very cool and I want to know more about tools like this one.

- I’m also wondering what are the procedures of building a website from scratch. his pre-work provides all the steps-by-steps instructions. Without it, the process would be much more complicated because the developers have to figure out where to start and what features are there in the project. I am also curious about what tools to debug aside from manual print the outputs to check.


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
- I will definitely implement the function to disable the buttons after the player correctly guesses the pattern to solve the bug

- I also want to refactor the buttons and image sizes so that whenever a player clicks, the buttons won’t move. 

- The pro function I want to add is not just randomly pick the pattern but also randomly select the tempo (clueHoldTime) of each note so that it sounds more like a melody. And the user guess is checked accordingly to the right button and the proportional tempo (clueHoldTime). For example, the program plays button one for 3 seconds and button two for 1 second, the player guess is correct as long as the tempo they play for button two is ⅓ of what they play for button one. 

- I also want to let the player choose the number of buttons they want to play, ranging from 3 to 7.



## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
