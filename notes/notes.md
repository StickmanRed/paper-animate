## The Import Workaround

I don't know why Github Actions won't modify the files. I kept struggling with npm until I somehow found that something *was* happening... just somewhere else. So the files on the runner, which wouldn't push, were uploaded as artifacts. Hooray. If anyone who happens to look here (probably no one other than myself) has a fix for this behaviour, it would definitely help to update paper.js easier.

Edit: I've found the problem, and it's because I don't know what I'm doing.

## Good Notes

You can interpolate Paths.<br>
You can tween Paths.

## what to do

- [ ] Figure out what to do
- [ ] Setup canvas, tools, and other stuff on page load
- [ ] Start on unified key detection system (take paper.js KeyEvent and jQuery on-keydown into account)

# Log

September 12, 2024 - This repository has now been stabilized. :P Now I can work on actually figuring out what to do.<br>
September 13, 2024 - I still don't know what I'm doing.<br>
September 15, 2024 - Not much progress today... just imagining.<br>
September 17, 2024 - Lots of progress today. So, the new and improved initiation process is as follows:<br><br>
First, to set up the global project, which has the undo/redo stack and key handlers.
Second, to set up the keymaps; certain key sequences with undo/redo functions already built in.
Third, to set up the tools; right now, there's only line and string.
Last, test the code!