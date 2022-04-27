import { module, test } from 'qunit';
import { setupTest } from 'chart-post/tests/helpers';

module('Unit | Model | instagram media', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('instagram-media', {});
    assert.ok(model);
  });
});
