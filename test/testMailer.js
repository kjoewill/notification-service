var mailer = require('../lib/mailer.js');

console.log('Making call to Mailer: email');

mailer({
    from: 'Simple Notification Service <kjwnotificationservice@gmail.com>',
    to: 'The Test Driver <kjoewill@gmail.com>',
    subject: 'Just testing the mail capability',
    body: 'This is just a test!'
});

console.log('Making call to Mailer: text msg');

mailer({
    from: 'Simple Notification Service <kjwnotificationservice@gmail.com>',
    to: '7193521495@gmail.com',
    subject: 'Just testing the text capability',
    body: 'This is just a test!'
});