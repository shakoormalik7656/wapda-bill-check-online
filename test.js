import https from 'https';

https.get('https://bill.pitc.com.pk/iescobill', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
