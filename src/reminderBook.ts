import { dir } from "console";
import {Reminder} from "./reminder";


class ReminderBook {

    noteList: Reminder[] = [];

    private _listObj() {
        let listObj: { [key: string]: { [key: string]: string | boolean }[] } = {};

        this.noteList.forEach(ele => {
            let tag: string = ele._tag;
            let body: string = ele._body;
            let done: boolean = ele._done;
            let itemObj: { [key: string]: string | boolean } = {};
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
                console.log('\n');
                itemObj.forEach((item)=> {
                    if(!item.done) {
                        console.log(`⭕️ ${item.body}`);
                    }
                    else {
                        console.log(`🔴 ${item.body} [complete]`);
                    }
                })
                console.log('\n');
            });
    }

    searchNote(term: string) {
        // search exact matching tags

    }

    addNote(body: string, tag: string) {
        this.noteList.push(new Reminder(body, tag))
    }
};

export { ReminderBook };