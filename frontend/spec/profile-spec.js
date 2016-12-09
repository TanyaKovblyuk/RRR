describe('profile page', function() {
  var elem;
  var url = "http://localhost:8080/ant-eater/profile";

  beforeAll(function() {
    browser.get('/ant-eater');
    browser.driver.sleep(100);
    elem = browser.driver.findElement(by.css('.login-form'))
    elem.findElements(by.tagName('input')).then(function(inputs){
      inputs[0].sendKeys("my_1_own_email@exemple.com");
      inputs[1].sendKeys("Truepass1");
    });
    browser.driver.findElement(by.css('.login-form > button')).click()
    browser.driver.sleep(2000);
  });

  it('create post', function() {
    expect(browser.getCurrentUrl()).toBe(url);
    $('.new-post').click();
    browser.driver.findElement(by.css('.post-forms > form > textarea')).sendKeys("New posts test");
    browser.driver.findElement(by.css('.post-forms > form > button')).click();
    browser.driver.sleep(500);
    browser.driver.findElements(by.css('.post')).then(function(posts){
      expect(posts[0].findElement(by.css('.post-text')).getText()).toEqual("New posts test");
    });
    browser.driver.sleep(500);
  });

  it('create comment', function() {
    browser.driver.findElements(by.css('.new-comment')).then(function(buttons){
      buttons[0].click();
    });
    browser.driver.findElement(by.css('.comment-forms > form > textarea')).sendKeys("New comment test");
    browser.driver.findElement(by.css('.comment-forms > form > button')).click();
    browser.driver.sleep(500);
    browser.driver.findElements(by.css('.comment')).then(function(comments){
      expect(comments[0].findElement(by.css('.comment-text')).getText()).toEqual("New comment test");
    });
  });

  it('add rating to post', function() {
    browser.driver.findElements(by.css('.like')).then(function(buttons){
      buttons[0].click();
    });
    browser.driver.sleep(100);
    browser.driver.findElements(by.css('.like')).then(function(ratings){
      expect(ratings[0].getText()).toEqual("1");
    });
    browser.driver.findElements(by.css('.like')).then(function(buttons){
      buttons[0].click();
    });
    browser.driver.findElements(by.css('.dislike')).then(function(buttons){
      buttons[0].click();
    });
    browser.driver.sleep(100);
    browser.driver.findElements(by.css('.like')).then(function(ratings){
      expect(ratings[0].getText()).toEqual("1");
    });
    browser.driver.findElements(by.css('.dislike')).then(function(ratings){
      expect(ratings[0].getText()).toEqual("0");
    });
  });

  it('delete comment', function() {
    browser.driver.findElements(by.css('.edit-comment')).then(function(buttons){
      buttons[0].click();
    });
    browser.driver.sleep(500);
    elem = $('.comment')
    expect(elem).toEqual(0);
  });

  it('delete post', function() {
    browser.driver.findElements(by.css('.edit-post')).then(function(buttons){
      buttons[0].click();
    });
    browser.driver.sleep(500);
    browser.driver.findElements(by.css('.post')).then(function(posts){
      expect(posts[0].getText()).not.toEqual("New posts test");
    });
  });

  it('show full size avatar', function() {
    browser.driver.findElements(by.css('.large-image')).then(function(images){
      expect(images[0].isDisplayed()).toEqual(false);
      $('.avatar').click();
      expect(images[0].isDisplayed()).toEqual(true);
      browser.driver.findElements(by.css('.img-hide')).then(function(buttons){
        buttons[0].click();
      });
      expect(images[0].isDisplayed()).toEqual(false);
    });
  });

  afterAll(function() {
    browser.get('/ant-eater');
    browser.driver.sleep(500);
    browser.actions().mouseMove($('.dropdown')).perform();
    browser.driver.findElements(by.css('.dropdown-menu > a')).then(function(nav){
      nav[1].click();
    });
    browser.driver.sleep(500);
  });
});
