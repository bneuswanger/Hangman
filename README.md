# Snowman
Let's build a snowman!

To Do List:
-Media query for tablet screen size
-Media queries for landscape at mobile/tablet sizes (move snowman to left)
-Animate section entrances on pageload
-Look for random word API with less obscure words
-Discuss 90-99% case range with snowman parts
-Add light snowfall during game which increases in proportion to puzzle completion?
-Add dropdown so user can choose hard words API vs. local array; this can be expanded in the future with
different APIs, difficulty levels, etc.

Update 2/24/22
1. Moved change-log to README.md file
2. Adjusted some text related to scoring 

Update 2/13/22
1. Implemented basic scoring system with difficulty modifiers 
2. Fixed display bug on hint text @ mobile query

Update 2/6/22
1. Added new size (360-1080p wide)

Update 2/3/22
1. Added some phrases to array

Update 2/1/22
1. A few snowman tweaks
2. Snow falls behind game now
3. Fixed win-after-lose bug reported by @Lisgevan (thanks!)
4. Fixed hint-toggle display bug

Update 1/31/22
1. Started snowman styling
2. Cleaned up CSS, changed color scheme
3. Added correct answer to loss screen, works for either array or API words
4. Switched keyboard removal to use 'visibility: hidden' instead of 'display: none'
5. added 'user select: none' to the snowflakes to prevent cursor display change/selectability

Update 1/30/22
1. Built snowman(Thanks @NoobNoob!)
2. Added JS to sequentially add snowman parts in relation to puzzle completion
3. A little refactoring
4. updated semicolons use to be consistent
5. updated all const variable names to ALLCAPS
6. Keys can no longer fire more than once

Update 1/29/22
1. Snow animation starts on win, removed with new puzzle
2. Snow animation created (@NoobNoob/@Keenai)
3. Set up random word API (@NoobNoob)
4. added hit-increment status bar functionality
5. hit status bar populates with correct # of letters

Update 1/28/22
1. Defined loss (6 fails) & added point accumulator math
2. added win/loss notifications
3. created elements & styles for the hit/miss status bars
4. added miss-increment status bar functionality

Update 1/25/22
1. Keyboard removed on win
2. Congrats Text added on win
3. Removed keyboard styling on win (wasn't working out)
4. Gets phrase on page refresh to prevent keyboard click from congratulating user
5. Hit/Miss tracker added in JS
