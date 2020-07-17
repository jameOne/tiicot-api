const appSpace = require('../bin/config').appSpace;

export class Document {
    title: string;
    appSpace: string
    constructor(
        title: string,
    ) {
        this.title = title;
        this.appSpace = appSpace;
    }
}
