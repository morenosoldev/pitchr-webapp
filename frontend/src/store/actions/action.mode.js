// Action/Dispatch
// Action for schememode
export const ModeAction = (value) => {
    if (value) {
        document.body.classList.add('dark')
    }
     else {
        document.body.classList.remove('dark')
    }
    return {type: 'DARKMODE', value}
}

export const DirAction = (value) => {
    if (value) {
        document.body.parentElement.setAttribute('dir','rtl')
    }
     else {
        document.body.parentElement.setAttribute('dir','ltr')
     }
    
    return {type: 'DIRMODE', value}
}