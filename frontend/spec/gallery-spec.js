describe('gallery page', function() {
  var elem;
  var url = "http://localhost:8080/ant-eater/users/2/images";

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
      nav[5].click()
    });
    browser.driver.sleep(500);
  });

  it('images count', function() {
    expect(browser.getCurrentUrl()).toBe(url);
    elem = $('.one-img')
    expect(elem).toEqual(9);
  });

  it('show full size image', function() {
    browser.driver.findElements(by.css('.large-image')).then(function(images){
      expect(images[0].isDisplayed()).toEqual(false);
      browser.driver.findElements(by.css('.icon > p > img')).then(function(imgs){
        imgs[3].click();
        elem = imgs[3];
      });
      expect(images[0].isDisplayed()).toEqual(true);
      images[0].findElements(by.tagName('img')).then(function(e) {
        expect(e[0].getAttribute('src')).toEqual(elem.getAttribute('src'));
      });
      browser.driver.findElements(by.css('.img-hide')).then(function(buttons){
        buttons[0].click();
      });
      expect(images[0].isDisplayed()).toEqual(false);
    });
  });

  it('nav next', function() {
    browser.driver.findElements(by.css('.large-image')).then(function(images){
      expect(images[0].isDisplayed()).toEqual(false);
      browser.driver.findElements(by.css('.icon > p > img')).then(function(imgs){
        imgs[3].click();
        elem = imgs[4];
      });
      expect(images[0].isDisplayed()).toEqual(true);
      browser.driver.findElements(by.css('.img-nav > .next')).then(function(nav){
        nav[0].click();
      });
      images[0].findElements(by.tagName('img')).then(function(e) {
        expect(e[0].getAttribute('src')).toEqual(elem.getAttribute('src'));
      });
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
