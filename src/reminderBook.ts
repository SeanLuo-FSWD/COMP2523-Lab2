import { dir } from "console";
import {Reminder} from "./reminder";

interface ItemObj {
    "body" : string,
    "done" : boolean,
    "r_id" : number
}

class ReminderBook {
    noteList: Reminder[] = [];
        // [
        //     Reminder { body: 'r1', tag: 'T1', done: false, r_id: 1 },
        //     Reminder { body: 'r2', tag: 'T1', done: false, r_id: 2 },
        //     Reminder { body: 'r3', tag: 'T2', done: false, r_id: 3 },
        //     Reminder { body: 'r4', tag: 'R1', done: false, r_id: 4 }
        // ]

    itemList: ItemObj[] = [];

    // constructor() {
    //     this.addNote('buy large milk','grocery');
    //     this.addNote('buy oranges','grocery');
    //     this.addNote('learn typescript','coding');
    // }

    private _listObj()  {
        let listObj: { [key: string]: ItemObj[] } = {};

        this.noteList.forEach(ele => {
            let tag: string = ele.tag;
            let itemObj: ItemObj = {"body": ele.body, "done": ele.done, "r_id": ele.r_id}

            if(!listObj[tag]){ // If a new tag, start a new list
                listObj[tag] = [];
                listObj[tag].push(itemObj);
            }
            else { // otherwise push to existing
                listObj[tag].push(itemObj);
            }
        });
        return listObj;
    }

    // case 1
    listNotes(){
        if (this.noteList.length == 0) {
            console.log('\n You have no reminders \n');
        }
        else {
            Object.entries(this._listObj()).forEach(
                ([tag, itemObj]) => {
                    console.log(`\n[Tag]: ${tag} \n`)
                    itemObj.forEach((item)=> {
                        if(!item.done) {
                            console.log(`⭕️ ${item.body}`);
                        }
                        else {
                            console.log(`🔴 ${item.body} [complete]`);
                        }
                    })
                });
                console.log('');
        }

    }

    // case 2
    searchNote(term: string) {
        
        let listObj = this._listObj();
        let tagFound = false;
        
         // search exact matching tags
        Object.entries(listObj).forEach(
            ([tag, itemObj]) => {                
                if (tag === term.toUpperCase()) {
                    tagFound = true;
                    itemObj.forEach((item)=> {
                        if(!item.done) {
                            console.log(`⭕️ ${item.body}`);
                        }
                        else {
                            console.log(`🔴 ${item.body} [complete]`);
                        }
                    })
                }
            });
    

        if (!tagFound) { // if no tag found above, proceed to search body value
            Object.values(listObj).forEach( itemObj => { // looping tag level

                itemObj.forEach( item => { // looping item-obj array
                    if (item.body.toUpperCase() === term.toUpperCase() || item.body.toUpperCase().includes(term.toUpperCase()) ) {
                        if(!item.done) {
                            console.log(`⭕️ ${item.body}\n`);
                        }
                        else {
                            console.log(`🔴 ${item.body} [complete]\n`);
                        } 
                    }
                })
            });
        }
    }

    // case 3
    addNote(body: string, tag: string) {
        this.noteList.push(new Reminder(body, tag))
    }

    // display edit/toggle list
    displayList(){
        let counter: number = 1;
        this.noteList.forEach(ele => {
            let itemObj: ItemObj = {"body": ele.body, "done": ele.done, "r_id": ele.r_id}
            this.itemList.push(itemObj);
            console.log(`[${counter}] ${ele.body}`);
            counter++;
        });
    }

    // case 4
    editReminder(editChoice: number, newDescription: string) {
        let r_id = this.itemList[editChoice - 1].r_id;
        let r_index: number;

        this.noteList.forEach(reminder => {
            if (reminder.r_id === r_id) {
                r_index = this.noteList.indexOf(reminder);
                this.noteList[r_index].body = newDescription;
            }
        })
    }

    // case 5 
    toggleComplete(chosen_index: number) {
        let r_id = this.itemList[chosen_index - 1].r_id;
        let r_index: number;

        this.noteList.forEach( reminder => {
            if (reminder.r_id === r_id) {
                r_index = this.noteList.indexOf(reminder);
                this.noteList[r_index].done = !reminder.done;
            }
        })
        console.log('');
    }

};

export { ReminderBook };

