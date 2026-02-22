
//load action in dist to photoshop
var atnFile = new File("D:/RETOUCH ACAD.atn");
app.load(atnFile);

//Run action in photoshop

app.doAction(action, abc.atn)

//delete action in photoshop.
function deleteActionInPhotoshop(nameAction) {
    do {
        try {
            var idDlt = charIDToTypeID("Dlt ");
            var desc81 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref4 = new ActionReference();
            var idASet = charIDToTypeID("ASet");
            ref4.putName(idASet, nameAction);
            desc81.putReference(idnull, ref4);
            executeAction(idDlt, desc81, DialogModes.NO);
            bol = true
        } catch (error) {
            bol = false
        }
    } while (bol == true);

}
