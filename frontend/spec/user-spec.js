describe('another users page', function() {
  var elem;
  var url = "http://localhost:8080/ant-eater/users/3";

  beforeAll(function() {
    browser.get('/ant-eater');
    browser.driver.sleep(100);
    elem = browser.driver.findElement(by.css('.login-form'))
    elem.findElements(by.tagName('input')).then(function(inputs){
      inputs[0].sendKeys("my_1_own_email@exemple.com");
      inputs[1].sendKeys("Truepass1");
    });
    browser.driver.findElement(by.css('.login-form > button')).click()
    browser.driver.sleep(1000);
    browser.get('/ant-eater/users/3');
    browser.driver.sleep(1000);
  });

  it('there are no action to create or delete post', function() {
    expect(browser.getCurrentUrl()).toBe(url);
    elem = $('.edit-post')
    expect(elem).toEqual(0);
    elem = $('.new-post')
    expect(elem).toEqual(0);
  });

  it('friend actions', function() {
    elem = $('.friend-action')
    expect(elem).toEqual(0);
  });

  it('send message', function() {
    expect($(".send-message").isDisplayed()).toEqual(false);
    browser.driver.findElements(by.css('.friend-action')).then(function(buttons){
      buttons[0].click();
    });
    expect($(".send-message").isDisplayed()).toEqual(true);
    $('.message-create-body').sendKeys("My new very important message. Don't read this!");
    browser.driver.findElements(by.css('.send-message > form > button')).then(function(buttons){
      buttons[0].click();
    });
    expect($(".send-message").isDisplayed()).toEqual(false);
  });

  it('delete and create friend', function() {
    var userStatus;
    browser.driver.findElements(by.css('.friend-action')).then(function(buttons){
      userStatus = buttons[1].getText();
      buttons[1].click();
      browser.driver.sleep(500);
      expect(buttons[1].getText()).not.toEqual(userStatus);
      buttons[1].click();
      browser.driver.sleep(500);
      expect(buttons[1].getText()).toEqual(userStatus);
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
