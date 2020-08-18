import showdownParse from './parse';

/* While it would be clever to have 1 function that does all parsing,
it's easier to break it up into a different function. All this does is
send back the Folder name, and the Team names with their respective 
team data using the showdownParse function for each one */

export default function folderParse(input: string) { 

  // parsing into sepearate teams if they exist (if they don't, theres no triple line break)

  const folderList = input.split('\n\n\n');

  console.log(folderList)

}