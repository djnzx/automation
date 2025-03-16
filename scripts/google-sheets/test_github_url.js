function testIsValidGitHubRepoTrue() {
    var x = isValidGitHubRepo("https://github.com/djnzx/rust-course");
    console.log(x);
}

function testIsValidGitHubRepoFalse() {
    var x = isValidGitHubRepo("https://github.com/rust-course");
    console.log(x);
}
