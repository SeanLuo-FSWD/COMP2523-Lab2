import { dir } from "console";
import {Reminder} from "./reminder";

interface ItemObj {
    "body" : string,
    "done" : boolean
}

class ReminderBook {
    noteList: Reminder[] = [];
    constructor() {
        this.addNote('r1','t1');
        this.addNote('r2','t1');
        this.addNote('r3','t2');
        this.addNote('r4','r1');
    }



    private _listObj()  {
        let listObj: { [key: string]: ItemObj[] } = {};

        this.noteList.forEach(ele => {
            let tag: string = ele._tag;
            let body: string = ele._body;
            let done: boolean = ele._done;
            let itemObj: ItemObj = {"body": "none", "done": false}
            itemObj['body'] = body;
            itemObj['done'] = done;


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

    listNotes(){
        Object.entries(this._listObj()).forEach(
            ([tag, itemObj]) => {
                console.log(tag)
                itemObj.forEach((item)=> {
                    if(!item.done) {
                        console.log(`⭕️ ${item.body}`);
                    }
                    else {
                        console.log(`🔴 ${item.body} [complete]`);
                    }
                })
            });
    }

    searchNote(term: string) {
        
        let listObj = this._listObj();
        let tagFound = false;
        
        if (!tagFound) { // search exact matching tags
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
        };

        if (!tagFound) { // if no tag found above, proceed to search body value
            Object.values(listObj).forEach( itemObj => { // looping tag level

                itemObj.forEach( item => { // looping item-obj array
                    if (item.body.toUpperCase() === term.toUpperCase() || item.body.toUpperCase().includes(term.toUpperCase()) ) {
                        if(!item.done) {
                            console.log(`⭕️ ${item.body}`);
                        }
                        else {
                            console.log(`🔴 ${item.body} [complete]`);
                        } 
                    }
                })
                // dir(listObj);
                // dir(itemObj);
            });


        }


    }

    addNote(body: string, tag: string) {
        this.noteList.push(new Reminder(body, tag))
    }
};

export { ReminderBook };

