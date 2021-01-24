import {ReminderBook} from "./reminderBook";
import { question } from "readline-sync";

const menu = `
------------------------------
|      Reminders menu:       |
------------------------------
|  [1] Show all reminders 👀  
|  [2] Search reminders 🔎    
|  [3] Add reminder ✏️        
|  [4] Modify reminders ✍️   4
|  [5] Toggle completion ⭕️ 🔴  
|  [6] Exit 👋                
------------------------------
`;

let choice: number = 0;
let rBook = new ReminderBook();


let input:string = question("Hit [Enter] key to see main menu:");
if (input==="") {
    console.log(menu);   
}

function getInput(inputType:string) {
    let searchTerm:string = "";
    let confirm:string = "";

    while (confirm != "y") {
        searchTerm = question(`Enter a ${inputType} here: `);
        confirm = question(`You entered ${inputType}: '${searchTerm}', is it correct? y/n: `);
        if (confirm != "y"){
            console.log('Please try typing it again');
        }
    }
    return searchTerm;
}

while (choice != 6) {
    input = question("Choose a [Number] followed by [Enter]: ");
    
    choice = parseInt(input);

    if (input==="") { // redisplay menu when hit enter
        console.log(menu);   
    }
    else if ([1,2,3,4,5].includes(choice)) {
        let term: string = "";


        let searchTerm: string = "";

        let bodyConfirm:string = "n";
        let tagConfirm:string = "n";
        let searchConfirm: string = "";


        switch (choice) {
            case 1: // g
                console.log("Show all reminders");
                rBook.listNotes();
                break;
            case 2: // g
                console.log("Search reminders");
                term = getInput('keyword');

                rBook.searchNote(term);
                break;
            case 3: // g
                console.log("Add reminder");
                let reminderBody:string = "";
                let reminderTag:string = "";

                while (bodyConfirm != "y") {
                    reminderBody = getInput('reminder');
                }
                while (tagConfirm != "y") {
                    reminderTag = getInput('tag');
                }
                rBook.addNote(reminderBody,reminderTag);
                console.log('Reminder added');
                
                break;
            case 4:
                console.log("Modify reminders");
                break;
            case 5:
                console.log("Toggle completion");
                break;
            default:
                break;
        }
    }

    // while ()



}

console.log("zzz");

