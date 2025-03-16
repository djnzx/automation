function TRANSLIT(range) {
    return transliterateRange(range);
}

/////////////////////////////////////////////////////

function MK_LINK(repoCell) {
    if (!repoCell) return "no repo";
    return "...";
}

function extractCellRef(formula) {
    var found = formula.match(/\((.+)\)/);
    if (found == null) return null;
    return found[1].trim();
}

function l(x) {
    SpreadsheetApp.getUi().alert(x);
    var json = JSON.stringify(x);
    SpreadsheetApp.getUi().alert(json);
}

function updateCommitNotes(e) {
    var sheet = e.source.getActiveSheet();
    var range = e.range;
    var numRows = range.getNumRows();
    var numCols = range.getNumColumns();

    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            var cell = range.offset(row, col, 1, 1);
            if (cell.getValue() != "...") continue;

            var formula = cell.getFormula();

            if (!formula || !formula.includes("MK_LINK")) continue;

            var repoCellRef = extractCellRef(formula);
            if (repoCellRef == null) continue;

            var repoCell = sheet.getRange(repoCellRef);
            var repoUrl = repoCell.getValue().trim();

            if (!isValidGitHubRepo(repoUrl)) {
                cell.setNote("Invalid GitHub repository URL.");
                continue;
            }

            var history = fetchGitHubCommits(repoUrl);
            cell.setNote(history ? history : "No commits found.");
        }
    }
}
