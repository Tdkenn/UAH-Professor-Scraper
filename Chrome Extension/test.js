const text = document.querySelectorAll('pre')

let lName = 'Singh'
let fName = 'Samriddhi'

for (let i=0; i < text.length; i++)
{
    if(text[i].innerHTML.includes(lName+' '+fName)) 
    {
        text[i].innerHTML = text[i].innerHTML.replaceAll(lName+' '+fName, '<a href="https://www.ratemyprofessors.com/search/teachers?query='+fName+'%20+'+lName+'&sid=U2Nob29sLTEwNjA=" target="_blank">'+lName+' '+fName+'</a>');
    }
}