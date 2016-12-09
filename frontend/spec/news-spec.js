describe('news page', function() {
  var elem;
  var url = "http://localhost:8080/ant-eater/users/2/posts";

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
    browser.driver.findElements(by.css('.main-menu > ul > a')).then(function(nav){
      nav[2].click()
    });
    browser.driver.sleep(500);
  });

  it('there are only ten news', function() {
    expect(browser.getCurrentUrl()).toBe(url);
    elem = $('.news')
    expect(elem).toEqual(10);
  });

  it('endleScroll add ten news', function() {
    elem = $('.news')
    expect(elem).toEqual(10);
    browser.driver.executeScript("window.scrollTo(0, 10000)");
    browser.driver.sleep(500);
    elem = $('.news')
    expect(elem).toEqual(20);
  });

  it('visit friend page', function() {
    browser.driver.findElements(by.css('.news > a')).then(function(friends){
      var userUrl = friends[0].getAttribute('href');
      friends[0].findElements(by.css('.pfofile-friend > p > img')).then(function(link){
        link[0].click();
        browser.driver.sleep(500);
      });
      expect(browser.getCurrentUrl()).toBe(userUrl);
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
