//imports
import inquirer from "inquirer";
import qr from 'qr-image';
import fs from 'fs';


//user questions
const questions = [
    {
        type: 'input',
        name: 'url',
        message: 'Plese paste or type you url.'
    }

]

inquirer.prompt(questions).then((answers)=>{
    linkConverter(answers.url);
}).catch((err)=>{
    if(err.isTtyError){
        console.log('There was a problem. sorry :(');
    }else{
        console.log('Invalid url')
    }
});

function linkConverter(userLink){
    var userLinkClean = new URL(userLink).hostname.replace('www.', '');
    //create new qr with the url
    var qr_pgn = qr.image(userLink, {type: 'png', size: 7});
    //save png image
    qr_pgn.pipe(fs.createWriteStream(`${userLinkClean}.png`));
    console.log(`Your qr code has been created :) file name: ${userLinkClean}.png`);
    //update text file
    saveUrl(userLink);
}

function saveUrl(url){
    fs.appendFile('URL.txt', `${url}\n`, {encoding:'utf-8'}, (err)=>{
        if(err) throw err;
        console.log('file updated');
    });
}
