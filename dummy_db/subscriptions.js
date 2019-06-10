const SUBSCRIPTION_PLANS = [
    {
        id: 1,
        name: 'BASIC',
        available_space: '1 GB',
        expiry_time: '14 days',
        downloads: '1 download',
        price: 0,
        desc: `Files will have an expiry time of 14 days and be deleted after the first download.
        Perfect if you want to use Share-A-File as a way to share files quickly without hassle and don't need to preserve uploads for long,
        or as a way to make sure your files won't remain in any databases after they've been downloaded.`
    },
    {
        id: 2,
        name: 'MEDIUM',
        available_space: '10 GB',
        expiry_time: '30 days',
        downloads: '20 downloads',
        price: 9.99,
        desc: `Files will have an expiry time of 30 days and be deleted after 20 downloads.
        Ideal if you want to be able to share your files with multiple people and preserve your files for a longer period of time.`
    },
    {
        id: 3,
        name: 'PREMIUM',
        available_space: 'UNLIMITED',
        expiry_time: '60 days',
        downloads: '100 downloads',
        price: 19.99,
        desc: `Our most luxurious plan with unlimited data size. Files will be deleted after 100 downloads.
        If you want to be able to upload a large amount of files without worrying about size limits - this is for you!`
    },
];

module.exports = { 
    SUBSCRIPTION_PLANS
};
