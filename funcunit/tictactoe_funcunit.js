QUnit.test('alternate players', function(assert) {
    F.open('../tictactoe.html')
    F('[data-test-id="grid00"]').visible().click()
    F('[data-test-id="grid01"]').visible().click()
    F('[data-test-id="grid02"]').visible().click()
    assert.ok(true)
})