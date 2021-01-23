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

while (choice != 6) {
    input = question("Choose a [Number] followed by [Enter]: ");
    
    choice = parseInt(input);

    if (input==="") { // redisplay menu when hit enter
        console.log(menu);   
    }
    else if ([1,2,3,4,5].includes(choice)) {
        let reminderBody:string = "";
        let reminderTag:string = "";

        let bodyConfirm:string = "n";
        let tagConfirm:string = "n";

        switch (choice) {
            case 1: // g
                console.log("Show all reminders");
                rBook.listNotes();
                break;
            case 2: 
                console.log("Search reminders");
                break;
            case 3: // g
                console.log("Add reminder");
                while (bodyConfirm != "y") {
                    reminderBody = question("Enter a reminder here: ");
                    bodyConfirm = question(`You entered reminder: '${reminderBody}', is it correct? y/n: `);
                    if (bodyConfirm != "y"){
                        console.log('Please try typing it again');
                    }
                }
                while (tagConfirm != "y") {
                    reminderTag = question("Enter a tag here: ");
                    tagConfirm = question(`You entered tag: '${reminderTag}', is it correct? y/n: `);
                    if (tagConfirm != "y"){
                        console.log('Please try typing it again');
                    }
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

