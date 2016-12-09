describe('home page', function() {
  var elem;
  var url = "http://localhost:8080/ant-eater";

  beforeEach(function() {
    browser.get('/ant-eater');
    browser.driver.sleep(100);
  });

  it('visit home page', function() {
    expect($('#logo').getText()).toBe("Ant-eater");
    expect(browser.getCurrentUrl()).toBe(url);
    expect(browser.driver.findElement(by.id('logo')).getText()).toEqual('Ant-eater');
  });

  it('blank log_in', function() {
    browser.driver.findElement(by.css('.login-form > button')).click();
    expect($('.error').getText()).toBe("Invalid email/password");
  });

  it('blank registration', function() {
    browser.driver.findElement(by.css('.registration > form > button')).click();
    browser.driver.sleep(500);
    elem = browser.driver.findElement(by.css('.registration'))
    elem.findElements(by.tagName('h3')).then(function(line){
      expect(line[0].getText()).toMatch("Name can't be blank");
    });
  });

  it('log in', function() {
    elem = browser.driver.findElement(by.css('.login-form'))
    elem.findElements(by.tagName('input')).then(function(inputs){
      inputs[0].sendKeys("my_1_own_email@exemple.com");
      inputs[1].sendKeys("Truepass1");
    });
    browser.driver.findElement(by.css('.login-form > button')).click();
    browser.driver.sleep(1000);
    expect(browser.getCurrentUrl()).toBe(url+"/profile");
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
