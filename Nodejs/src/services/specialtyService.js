const db = require("../models")
require('dotenv').config();

let createSpecialty = async (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            if(!data.name || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML ){
                resolve({
                    errCode : 1,
                    errMessage : 'Missing parameter'
                })

            }else{
                await db.Specialty.create({
                    name : data.name,
                    image : data.imageBase64,
                    descriptionMarkdown : data.descriptionMarkdown,
                    descriptionHTML : data.descriptionHTML

                })
                resolve({
                    errCode : 0,
                    errMessage : 'ok'
                })
            }

           
        }catch(e){
            reject(e);
        }
    }
    )}



module.exports = {
    createSpecialty : createSpecialty,
}