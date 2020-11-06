const mySql = require('mysql')

const DB = mySql.createConnection({
    host: 'remotemysql.com',
    user: 'XpJEL1NYu1',
    password: '8FgwsOqAgR',
    database: 'XpJEL1NYu1',
    multipleStatements: true
})

DB.connect((error) => {
    if(!error){
        console.log('Connected To Database')
        // Running Migration of Tables
        DB.query('SELECT 1 FROM posts LIMIT 1', (error, results) => {
            if(error){
                // Create Table
                console.log('Creating Table posts')
                DB.query(`CREATE TABLE posts(
                    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                    title VARCHAR(60) NOT NULL, 
                    description MEDIUMTEXT NOT NULL, 
                    image_url MEDIUMTEXT NOT NULL)`, (error, results) => {
                    if(error){
                        console.log('ERROR WITH CREATING TABLE')
                        console.log(error)
                    }else{
                        console.log('CREATED TABLE')
                    }
                })
            }else{
                // Notify Table Exists
                console.log('Table posts Already Exists')
            }
        }
        )
    }else{
        console.log('No Connection')
    }
})

module.exports = DB