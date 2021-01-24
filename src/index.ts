import {ReminderBook} from "./reminderBook";
import { question } from "readline-sync";

const menu = `
------------------------------
|      Reminders menu:       |
------------------------------
|  [1] Show all reminders 👀  
|  [2] Search reminders 🔎    
|  [3] Add reminder ✏️        
|  [4] Modify reminders ✍️   
|  [5] Toggle completion ⭕️ 🔴  
|  [6] Exit 👋                
------------------------------
`;

let choice: number = 0;
let rBook = new ReminderBook();


// let input:string = question("Hit [Enter] key to see main menu:");
// if (input==="") {
//     console.log(menu);   
// }

function getInput(inputType:string) {
    let searchTerm:string = "";
    let confirm:string = "";

    while (confirm != "y") {
        searchTerm = question(`Enter a ${inputType} here: `);
        confirm = question(`You entered ${inputType}: '${searchTerm}', is it correct? y/n: `);
        if (confirm === "n"){
            console.log('Please try typing it again');
        } 
        else if (confirm != "y") {
            console.log('Invalid input: Please enter either y/n');
        }
    }
    return searchTerm;
}

while (choice != 6) {
    let input1:string = question("Hit [Enter] key to see main menu:");
    if (input1==="") {
        console.log(menu);   
    }
    else {
        throw new Error('Invalid entry, press Enter to see menu')
    }

    let input2:string = question("Choose a [Number] followed by [Enter]: ");
    if (typeof input2 != "number" || [1,2,3,4,5,6].includes(input2)) {
        console.log(menu);   
    }
    else {
        throw new Error('Invalid entry, press Enter to see menu')
    }
    choice = parseInt(input2);

    // if (input==="") { // redisplay menu when hit enter
    //     console.log(menu);   
    // }
    if ([1,2,3,4,5].includes(choice)) {
        let term: string = "";

        switch (choice) {
            case 1: 
                rBook.listNotes();
                break;
            case 2: 
                term = getInput('keyword');

                rBook.searchNote(term);
                break;
            case 3:
                let reminderBody:string = "";
                let reminderTag:string = "";

                reminderBody = getInput('reminder');
                reminderTag = getInput('tag');

                rBook.addNote(reminderBody,reminderTag);
                console.log('Reminder added');
                
                break;

            case 4:
                rBook.displayList();
                let editChoice = parseInt(getInput('reminder number to edit'));
                let newDescription = getInput('Description');
                let statusToggle: string = "";
                rBook.editReminder(editChoice,newDescription);
                while (statusToggle != "y" && statusToggle != "n" ) {
                    statusToggle = question(`Do you wish to toggle the completed status? y/n: `);
                }
                if (statusToggle === "y"){
                    rBook.toggleComplete(editChoice);
                }
                break;

            case 5: 
                rBook.displayList();
                let toggleChoice = getInput('reminder number to toggle');
                rBook.toggleComplete(parseInt(toggleChoice));
                break;

            default:
                break;
        }
    }
}


