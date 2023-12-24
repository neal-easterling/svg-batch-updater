const fs = require("node:fs");
const {XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');

const importFolderPath = "./public/images";
const readFilePath = importFolderPath + "/";
const options = {
    ignoreAttributes: false, 
    commentPropName: "comment", 
    htmlEntities: true,
    attributeNamePrefix: ""
};
const parser = new XMLParser(options);
const importFolderDir = fs.readdirSync(importFolderPath);



fs.readFile( readFilePath + importFolderDir[0], 'utf8', (err, data) =>{
    if (err){
        console.error(err);
        return 0;
    }
    const importObj = parser.parse(data);
    //console.log(importObj);
});


