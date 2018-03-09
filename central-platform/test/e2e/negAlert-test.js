import { Selector } from 'testcafe';

fixture `测试Newkit2中的NegAlert是否符合预期`
    .page `http://localhost:10000/`;

test('My test', async t => {
    await t
        .typeText('#usernameInput', 'jh3r')
        .typeText('#passwordInput', 'hm910705)')
        .click('button.btn-primary')
        .click('.bg-green.toolbar-item > a')
        .expect(Selector('.user-content span').innerText).eql('superuser');
});