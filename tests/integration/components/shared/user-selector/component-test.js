import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | shared/user-selector', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.set('selectedAuthors', [{ username: 'Jacek' }]);
    this.set('options', [{ username: 'Jacek' }, { username: 'Przemo' }]);
    this.set('chooseAuthors', () => {});
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Shared::UserSelector 
        @multipleType={{true}} 
        @selected={{this.selectedAuthors}} 
        @options={{this.options}}
        @onChange={{this.chooseAuthors}} 
        />
    `);

    assert.dom('.ember-power-select-multiple-option').exists();
  });

  test('display initial user', async function (assert) {
    await render(hbs`
      <Shared::UserSelector 
        @multipleType={{true}} 
        @selected={{this.selectedAuthors}} 
        @options={{this.options}}
        @onChange={{this.chooseAuthors}} 
        />
    `);

    assert.dom('.ember-power-select-multiple-option').includesText('Jacek');
  });

  test('display initial options', async function (assert) {
    await render(hbs`
      <Shared::UserSelector 
        @multipleType={{true}} 
        @selected={{this.selectedAuthors}} 
        @options={{this.options}}
        @onChange={{this.chooseAuthors}} 
        />
    `);

    // await this.pauseTest()

    assert.dom('.ember-power-select-multiple-option').exists();
  });
});
