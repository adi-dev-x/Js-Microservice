// const {Client} = require('pg');
// const connection =  new Client({
//    // host: '127.0.0.1',   
//    host: '3.112.219.214',
//    user: 'powerta_user',
//    // database: ''+db_name+'',
//    database: 'powerta_db',
//    password: 'powert@123',
//    port: 4321,
//   });
// const terminateConnectionsQuery = `
//   SELECT pg_terminate_backend(pg_stat_activity.pid)
//   FROM pg_stat_activity
//   WHERE pg_stat_activity.datname = 'demo' 
//     AND pid <> pg_backend_pid();
// `;
// createDatabaseQuery='create database testing template powerta_db;'
// class terminator{

//     terminate(createDatabaseQuery){
//         connection.connect()
//         connection.query(terminateConnectionsQuery)
//         .then(() => {
//           console.log('All active connections terminated.');
//           return connection.query(createDatabaseQuery);
//         })
//         .then(() => {
//           console.log('Database created successfully.');
//          connection.end(); // Disconnect from the database
//         })
//         .catch((err) => {
//           console.error(err);
//          connection.end(); // Disconnect from the database
//         });  
 
//     }
// //    async chumma(){
// //         connection.connect()
// //         const createQuery = `INSERT INTO keymeta (instance,db,key,user_f_key) 
// //         VALUES($1, $2, $3, $4)
// //         returning *`;

// //         const values=[
// //             'uyzxta',
// //             'uyzxta',
// //             'uyzxta2926',
// //             '73938f34-a8cf-4652-862c-dda149d6038d'
// //           ]
        
// //           const r= await connection.query(createQuery, values)
// //           console.log(r)

// //     }
  

// }
// var t=new terminator()
// t.terminate(createDatabaseQuery);
// module.exports={terminator}
// // connection.query(terminateConnectionsQuery)
// //   .then(() => {
// //     console.log('All active connections terminated.');
// //     return connection.query(createDatabaseQuery);
// //   })
// //   .then(() => {
// //     console.log('Database created successfully.');
// //     connection.end(); // Disconnect from the database
// //   })
// //   .catch((err) => {
// //     console.error(err);
// //     connection.end(); // Disconnect from the database
// //   });

// class te{
//     ter(){


        
//     }
// }