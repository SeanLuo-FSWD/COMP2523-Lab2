class Reminder {
    body: string;
    tag: string;
    done: boolean;
    r_id: number;
    static id_counter: number = 1;

    constructor(body: string, tag: string, done: boolean = false){
        this.body = body;
        this.tag = tag.toUpperCase();
        this.done = done;
        this.r_id = Reminder.id_counter;
        Reminder.id_counter++;
    }
};

export { Reminder };