export type {
    TMDB_Date
}

class TMDB_Date {


    static format = 'YYYY-MM-DD';
    date: Date;

    constructor(date?: Date) {

        this.date = date ? date : new Date()
    }

    toString = () => {
        return this.date.toISOString().split('T')[0]
    }
}