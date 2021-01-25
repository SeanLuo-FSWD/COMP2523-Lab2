import { ReminderBook } from "./reminderBook";
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
let choice2: number = 0;
let term: string = "";

let rBook = new ReminderBook();

function getInput(inputType: string) {
  let searchTerm: string = "";
  let confirm: string = "";

  while (confirm != "y") {
    searchTerm = question(`Enter a ${inputType} here: `);
    confirm = question(
      `You entered ${inputType}: '${searchTerm}', is it correct? y/n: `
    );
    if (confirm === "n") {
      console.log("Please try typing it again");
    } else if (confirm != "y") {
      console.log("Invalid input: Please enter either y/n");
    }
  }
  return searchTerm;
}

while (choice2 != 6) {
  let choice1: string = "none";
  let input: string = "";
  choice2 = 0;

  while (choice1 != "") {
    choice1 = question("Hit [Enter] key to see main menu:");
    if (choice1 != "") {
      console.log("Invalid entry, press Enter to see menu");
      continue;
    }
    console.log(menu);
  }

  while (
    typeof parseInt(input) != "number" ||
    ![1, 2, 3, 4, 5, 6].includes(parseInt(input))
  ) {
    input = question("Choose a [Number] followed by [Enter]: ");
    if (
      typeof parseInt(input) != "number" ||
      ![1, 2, 3, 4, 5, 6].includes(parseInt(input))
    ) {
      console.log("Invalid entry, press Enter number 1-6.");
    } else {
      choice2 = parseInt(input);
      switch (choice2) {
        case 1: // Show all reminders
          rBook.listNotes();
          break;
        case 2: // Search reminders
          term = getInput("keyword");

          rBook.searchNote(term);
          break;
        case 3: // Add reminder
          let reminderBody: string = "";
          let reminderTag: string = "";

          reminderBody = getInput("reminder");
          reminderTag = getInput("tag");

          rBook.addNote(reminderBody, reminderTag);
          console.log("Reminder added");

          break;

        case 4: // Modify reminders
          rBook.displayList();
          let editChoice = parseInt(getInput("reminder number to edit"));
          let newDescription = getInput("Description");
          let statusToggle: string = "";
          rBook.editReminder(editChoice, newDescription);
          while (statusToggle != "y" && statusToggle != "n") {
            statusToggle = question(
              `Do you wish to toggle the completed status? y/n: `
            );
          }
          if (statusToggle === "y") {
            rBook.toggleComplete(editChoice);
          }
          break;

        case 5: // Toggle completion
          rBook.displayList();
          let toggleChoice = getInput("reminder number to toggle");
          rBook.toggleComplete(parseInt(toggleChoice));
          break;

        default:
          break;
      }
    }
  }
}
