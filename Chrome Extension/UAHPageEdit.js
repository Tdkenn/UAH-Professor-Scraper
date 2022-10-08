const pre = document.getElementsByTagName('pre');
var blacklistArray = []
chrome.storage.sync.get('blacklistStorage', function(data){
    console.log(1)
    blacklistArray = data.blacklistStorage
    blacklistAttacher ()
    hyperlinkAttacher()
})

function hyperlinkAttacher(){
    for (const block of pre)
    {
        let lines = block.firstChild.innerText.split(/\r?\n|\r|\n/g) //crazy looking shit just means '\n or \r' in regex
        let profs = []
        let excludedNames = ['STAFF', 'Instructor', '-------------------------------------------------------']
    
        for (const line of lines){
            let valid = true
            const prof = line.substring(130).trim() // Should be the entire professor's name with whitespace trimmed
            excludedNames.forEach(a => (valid = valid && !a.includes(prof))) // magic
            if (valid && profs.indexOf(prof) === -1)
            profs.push(prof)
        }

        for (const prof of profs){ 
            let linkProf = prof.split(' ').join('%20+') // replaces spaces with link version of a space
            block.firstChild.innerHTML = block.firstChild.innerHTML.replaceAll(prof, '<a href="https://www.ratemyprofessors.com/search/teachers?query='+linkProf+'&sid=U2Nob29sLTEwNjA=" target="_blank">'+prof+'</a>')
        }
    }
}

function blacklistAttacher(){
    for (const block of pre){
        block.firstChild.innerText = block.firstChild.innerText.replaceAll('&', '+') //temp fix
        let lines = block.firstChild.innerText.split(/\r?\n|\r|\n/g)
        for (const line of lines){
            for (const excl of blacklistArray){
                if (line.includes(excl)){
                    block.firstChild.innerHTML = block.firstChild.innerHTML.replace(line.trim(),'<span style="background-color: #FFCCCB">'+line+'</span>')
                }
            }
        }
    }
}