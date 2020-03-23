#!/bin/sh

echo "Running Scripts for ExpressJS"
osascript <<END
tell application "Terminal"
    do script "cd \"`pwd`\" && npm run ui"
end tell
tell application "Terminal"
    do script "cd \"`pwd`\" && npm run dev"
end tell
END
