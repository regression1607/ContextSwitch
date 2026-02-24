const fs = require('fs');

// Simple 16x16 PNG icon (purple layers on dark background)
const icon16 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8ElEQVQ4T6WTuw3CQBBE3y0IkSAlUAIlUAIdkBIJhZAQEhKSE0JCSIgkJMSJE0JCSEg+gSNfJN+dlWzpwjN7Mzv7YcTPIZ6P+wWwBi7AHlj9C+AJuAGPwBo4/gawBC5ADMz/BLgCz0AAzH8EmIA7sAJmvwFOQAikwBToAVNgDIx+Alj9CZACQWAExIBBXYCVHwNDoA8MgCEwqAsQ+2NgAPSBHjAAenUB1n8M9IEO0AU6QLsuQOyPgR7QAdpAB2jXBYj9CdADWkATaAHNugCx/wF0gSbQAppAsy5A7E+BDtAAmkADaNQF/Pfz+gaVi2QRUcblRwAAAABJRU5ErkJggg==',
  'base64'
);

// Simple 48x48 PNG icon
const icon48 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB6ElEQVRoQ+2ZzU3DQBCFZ5wTokRKoARKoARKIBRACZRACZRAKIESKIESKIES0gGcECeyF8nKxvZ6d+eTJBc/z8x8b3d2Y0z8HOP58e8BXAC3wBXQ+DXABLgHHoAGcPkrwB1wDRwBzV8BboAr4BBoAo1fAU6BE+AQOAWawOlXAFb/EDgBDoATYAKc/QqAq38EnABHwAkwAc5+BcDqT4ETYACcABPg/FcArP4pcAKcACfA+a8AWP1T4BQYACfABLj4FQCrPwUGwDFwDBwDk7oAsf8ROAaOgWPgGJjUBYj9T8AxcAwcA8fApC5A7H8GjoFj4Bg4BiZ1AWL/C3AMHAPHwDEwqQsQ+9+AY+AYOAaOgUldgNj/DhwDx8AxcAxM6gLE/g/gGDgGjoFjYFIXIPZ/AsfAMXAMHAOTugCx/ws4Bo6BY+AYmNQFiP3fwDFwDBwDx8CkLkDs/wGOgWPgGDgGJnUBYv8vcAwcA8fAMTCpCxD7/4Bj4Bg4Bo6BSV2A2P8PHAPHwDFwDEzqAsT+CjgGjoFj4BiY1AWI/TVwDBwDx8AxMKkLEPsb4Bg4Bo6BY2BSFyD2t8AxcAwcA8fApC5A7O+AY+AYOAaOgUldgNjfA8fAMXAMHAOTugCxfwCOgWPgGDgGJj8G/ANY+JgxYQSL0AAAAABJRU5ErkJggg==',
  'base64'
);

// Simple 128x128 PNG icon
const icon128 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADgElEQVR4Xu2dS27CQBAE5yTkJuQm5CbkJuQm5CRwE3IT+Em8iCWM7ZnpnhlbKl7Yne6q6vEaG5P4d5z4+Pg7wAPgEjgHGr8GmAJ3wD3QAC5/BbgDLoAjoPlrgBvgCjgGmr8GuAYugWOg+WuAK+ASOAaOgeangCvgEjgGjoFm4Aq4BI6BY+D0VwCs/hFwDBwDx8DprwBY/SPgGDgGjoHT3wCw+kfAMXAMnP4KgNU/Ao6BY+D0NwCs/iFwDBwDp78CYPUPAWK/B3AMHAPHwOlvAFj9Q+AYOAZOf/XPIF8s/C7Q+h8E2M/K10kE+fkjYA/g8ncALv8aOAS+fwbY/H3gBDj5FQCb/wA4AU5+BcDmPwJOgJNfAbD5T4AT4ORXAGz+M+AEOPkVAJv/AjgBTn4FwOa/Ak6Ak18BsPmvgRPg5FcAbP4b4AQ4+RUAm/8WOAFOfgXA5r8DToBlL+6++VxpoPXn/+D71w9nT6UfBEhP8PcO8BUAX/47gMu/DY7+5kMG7Oj/DUAG/L0DyICt3wPI/OcOMuDb7wFk/t8fAmT+fweQ+X93EJn/7yEy/99PIjP//xmEzP9/FyHz/30ayfz/n0fG/P8/j4z5/3+gMf//D7Yx//8P9TH//w83Mv//j3cy//+POTP//4+5M///j/oz//+Peoz5/3/cZ8z//wNfY/7/H/kb8///0OeY//+Hn8f8/z8A4p9//sFf/+v/9l/E/L0H/vtPwvz9J//7b8L8/Sf/+4/C/P0n//uvwvz9J//7z8L8/Sf/++/C/P0n//sPw/z9J//7L8P8/Sf/+0/D/P0n//tvw/z9J//7j8P8/Sf/+6/D/P0n//vPw/z9J//778P8/Sf/+w/k/P0n//sv5Pz9J//7T+T8/Sf/+2/k/P0n//uP5Pz9J//7r+T8/Sf/+8/k/P0n//vv5Pz9J//7D+X8/Sf/+y/l/P0n//tP5fz9J//7b+X8/Sf/+4/l/P0n//uv5fz9J//7z+X8/Sf/++/l/P0n//sP5vz9J//7L+b8/Sf/+0/m/P0n//tv5vz9J//7j+b8/Sf/+6/m/P0n//vP5vz9J//77+b8/Sf/+w/n/P0n//sv5/z9J//7T+f8/Sf/+2/n/P0n//uP5/z9J//7r+f8/Sf/++/n/P0n//sP6Pz9J//7L+j8/Sf/+0/o/P0n//tv6Pz9J//7j+j8/U/+ACJyDLE78lgGAAAAAElFTkSuQmCC',
  'base64'
);

fs.writeFileSync('/Users/ekumar/Documents/eka/CareerCanvas/ContextSwitch/icons/icon16.png', icon16);
fs.writeFileSync('/Users/ekumar/Documents/eka/CareerCanvas/ContextSwitch/icons/icon48.png', icon48);
fs.writeFileSync('/Users/ekumar/Documents/eka/CareerCanvas/ContextSwitch/icons/icon128.png', icon128);

console.log('Icons created successfully!');
