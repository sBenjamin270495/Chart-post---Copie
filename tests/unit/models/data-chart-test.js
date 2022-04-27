import { module, test } from 'qunit';
import { setupTest } from 'chart-post/tests/helpers';

module('Unit | Model | data chart', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('data-chart', {});
    assert.ok(model);
  });
});
