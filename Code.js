function ExportSheet_GoogleSpreadsheet() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var activesheet = ss.getActiveSheet();

    var ss_url = ss.getUrl();
    var activesheet_id = activesheet.getSheetId();
    var activesheet_param = '&gid=' + activesheet_id;

    var export_url = ss_url.replace(/\/edit.*$/, '')
        + '/export?exportFormat=pdf'
        + '&format=pdf'                              //PDF                              
        + '&size=A4'                                 //'A3' / 'A4' / 'A5' / 'B4' / 'B5' / 'letter' / 'tabloid' / 'legal' / 'statement' / 'executive' / 'folio'
        + '&portrait=true'                           //'true' ⟶ Potrait / 'false' ⟶ Landscape
        + '&scale=4'                                 //'1' ⟶ Normal 100% / '2' ⟶ Fit to Width / '3' ⟶ Fit to Height / '4' ⟶ Fit to Page
        + '&fitw=true'
        + '&top_margin=0.50'
        + '&bottom_margin=0.50'
        + '&left_margin=0.25'
        + '&right_margin=0.25'
        + '&horizontal_alignment=CENTER'             //'LEFT' / 'CENTER' / 'RIGHT'
        + '&vertical_alignment=CENTER'               //'TOP' / 'MIDDLE' / 'BOTTOM'
        + '&sheetnames=true'                         //'true' / 'false'
        + '&printtitle=true'                         //'true' / 'false'
        + '&pagenum=false'                           //'true' / 'false'
        + '&gridlines=true'                          //'true' / 'false'
        + '&printnotes=false'                        //'true' / 'false'
        + '&fzr=false'                               //'true' / 'false'
        + '&fzc=false'                               //'true' / 'false'
        + activesheet_param

    var response = UrlFetchApp.fetch(export_url, {
        headers: {
            Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        },
    })

    var blob = response.getBlob();

    blob = blob.setName('ExportSheet');

    var newfile = DriveApp.createFile(blob);
    var newfile_url = newfile.getUrl();

};
