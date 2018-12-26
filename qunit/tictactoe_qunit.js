QUnit.test( "switch player", function( assert ) {
    testGame = new Game();
    assert.equal(testGame.currentPlayer, testGame.PLAYER1)
    testGame.switchPlayer()
    assert.equal(testGame.currentPlayer, testGame.PLAYER2)
  });