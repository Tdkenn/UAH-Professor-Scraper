const pre = document.getElementsByTagName('pre');
chrome.storage.sync.get({'listStor': [[], []]}, function(data) { //Gets the data that is stored in the blacklist/whitelist
    lists = data.listStor
    highlightAttacher() //Calls two functions after the data is retrieved
    hyperlinkAttacher()
  })

function hyperlinkAttacher(){ //Function which replaces the professor names on the UAH page with hyperlinks
    for (const block of pre)
    {
        let lines = block.firstChild.innerText.split(/\r?\n|\r|\n/g)
        let profs = []
        let excludedNames = ['STAFF', 'Instructor', '-------------------------------------------------------']
    
        for (const line of lines){
            let valid = true
            const prof = line.substring(130).trim() 
            excludedNames.forEach(a => (valid = valid && !a.includes(prof))) //Checking for duplicates in the prof list
            if (valid && profs.indexOf(prof) === -1)
            profs.push(prof)
        }

        for (const prof of profs){ 
            let linkProf = prof.split(' ').join('%20+') //Creating RMP link
            block.firstChild.innerHTML = block.firstChild.innerHTML.replaceAll(prof, '<a href="https://www.ratemyprofessors.com/search/teachers?query='+linkProf+'&sid=U2Nob29sLTEwNjA=" target="_blank">'+prof+'</a>')
        }
    }
}

function highlightAttacher() { //Function which replaces the line text with highlighted line text. Color is dependent upon blacklist/whitelist.
    for (const block of pre) {
        let lines = block.firstChild.innerText.split(/\r?\n|\r|\n/g)
        for (const line of lines) {
            for (const excMultiWord of lists[0]) {
                let exclArray = excMultiWord.trim().split(/\s+/)
                for(const excl of exclArray) {
                    if (line.includes(excl)) {
                        block.firstChild.innerHTML = block.firstChild.innerHTML.replace(line.replaceAll('&', '&amp;'),'<span style="background-color: #FFCCCB">'+line.replaceAll('&', '&amp;')+'</span>')
                    }
                }
            }
            for (const inclMultiWord of lists[1]) {
                let inclArray = inclMultiWord.trim().split(/\s+/)
                for (const incl of inclArray) {
                    if (line.includes(incl)) {
                        block.firstChild.innerHTML = block.firstChild.innerHTML.replace(line.replaceAll('&', '&amp;'),'<span style="background-color: #90EE90">'+line.replaceAll('&', '&amp;')+'</span>')
                    }
                }
            }
        }
    }
}