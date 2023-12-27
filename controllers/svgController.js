const fs = require('node:fs');



module.exports = {
    svgToArray: (filePath) =>{
        const file = fs.readFileSync(filePath, {encoding:'utf-8'});
        const fileArray = file.split(/\r?\n|\r|\n/g);
        //console.log(fileArray);
        if(fileArray[fileArray.length - 1] == '')fileArray.pop();
        return fileArray;
    },
    removeFill: (fileAsArray)=>{
        const newArray = [fileAsArray[0]];
        for(let i=1; i < fileAsArray.length; i++){
            let line = fileAsArray[i];
            let newLine = line.replace(/fill="(.*)"/, "");
            newArray.push(newLine);
        }
       return newArray;
    },
    fixGroupElement: (fileAsArray)=>{
        let gLine = '<g fill="currentColor">';
        let i = -1;
        let index = 1;
        let replace = 0;
        fileAsArray.forEach((string)=>{
            i+=1;
            const addToG = 'fill="currentColor"';
            if(string.includes('<g')) {
                index = i;
                replace = 1;
                const lineArray = string.split(' ');
                lineArray.splice(2, 0, addToG );
                gLine = '';
                lineArray.forEach((item)=>{
                    const add = item + ' ';
                    gLine+=add;
                });

            }
        });
        fileAsArray.splice(index, replace, gLine);
        if(fileAsArray[fileAsArray.length - 2] == '</g>'){
            return;
        }
        fileAsArray.splice(fileAsArray.length - 1, 0, '</g>');
    },
    addClassAndAria: (string, ariaLabel) =>{
        const newString = string.replace(" ", ` aria-label="${ariaLabel}" class="a4e icon" ` );
        return newString;
    },
    addLicense: (fileAsArray, licenseAsString) => {
        const year = new Date().getFullYear();
        const licenseComment = `<!-- DO NOT REMOVE | copyright ${year} by apps4everyone.tech under ${licenseAsString} license -->`;
        fileAsArray.splice(1, 0, licenseComment);
    }, 
    parseArrayToString: (fileAsArray) => {
        let newFileAsString = '';
        fileAsArray.forEach((line)=>{
            let toAdd = line + "\n";
            newFileAsString += toAdd;
        });
        return newFileAsString;
    },
    writeFile: (fileAsString, fileNameAsString) =>{
        fs.writeFileSync(`./public/output/${fileNameAsString}`, fileAsString);
    }
 
}
