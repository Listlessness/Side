export {
    TMDB_Date
}

class TMDB_Date {


    static format = 'YYYY-MM-DD';
    date: Date;

    constructor(date?: Date | string) {

        this.date = date ? (typeof date === 'string' ? new Date(date) : date) : new Date()
    }

    toString = () => {
        return this.date.toISOString().split('T')[0]
    }

    getDate = () => {
        return this.date
    }
}