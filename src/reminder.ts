class Reminder {
     _body: string;
     _tag: string;
     _done: boolean;
    constructor(body: string, tag: string, done: boolean = false){
        this._body = body;
        this._tag = tag.toUpperCase();
        this._done = done;
    }


};

export { Reminder };