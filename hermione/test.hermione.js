const assert = require('chai').assert;

describe('Тестирование отрисовки элементов на примере основной ветки master', function() {
    it('должен находить ветку master', function() {
        return this.browser
            .url('http://localhost:3000')
            .getText('ul li a')
            .then(function(branch) {
                assert.equal(branch, 'master')
            });
    });

    it('should find hermione', function() {
        return this.browser
            .url('http://localhost:3000/master')
            .getText('p a')
            .then(function(branch) {
                assert.equal(branch, 'файловое дерево этой ветки')
            });
    });
});