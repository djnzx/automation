function test1_shouldBe1234() {
    var x = extractCellRef("=dsfhdf(1234)");
    console.log(x);
}

function test2_shouldBe1() {
    var x = extractCellRef("=dsfhdf(1)");
    console.log(x);
}

function test3_shouldBeNull() {
    [
        "=dsfhdf()",
        "=dsfhdf",
        "sfdv",
        ""
    ].forEach(x => {
        var r = extractCellRef(x);
        console.log(r);
    });
}

