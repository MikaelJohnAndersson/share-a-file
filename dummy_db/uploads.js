// Extend standard Date API using sugar-date
require('sugar-date').Date.extend();

const createData = (name, type, size, timeOfUpload, timeOfExpire, link) => {
    return { name, type, size, timeOfUpload, timeOfExpire, link};
}

const UPLOADS = {
    1 : {
        uploads: [
            createData('puppy.jpg', 'image/jpeg', 155521, new Date('2017-02-02').short(), new Date('2017-02-02').advance({ weeks: 2 }).short(), 'https://file.io/78Gh53'),
            createData('notes.txt', 'text/plain', 1535, new Date('2018-11-02').short(), new Date('2018-11-02').advance({ weeks: 2 }).short(), 'https://file.io/hj67Fg5'),
            createData('presentation.pdf', 'pdf', 2804755, new Date('2018-11-02').short(), new Date('2018-11-02').advance({ weeks: 2 }).short(), 'https://file.io/ku78c80'),
            createData('chart.pdf', 'pdf', 1704720, new Date('2019-03-15').short(), new Date('2019-03-15').advance({ weeks: 2 }).short(), 'https://file.io/87H6kF'),
        ],
    }
};

module.exports = {
    UPLOADS,
};
