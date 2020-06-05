const { Builder, By, Key, until } = require('selenium-webdriver');
const username = "";
const password = "";
var tweets = 0;
var profiles = 0;

  module.exports = {
    twt: function() {
        return tweets;
    },
    pro: function() {
        return profiles;
    },
    crawl: async function() {
    const webdriver = require('selenium-webdriver');
    require('chromedriver');
    const chrome = require('selenium-webdriver/chrome');

    let options = new chrome.Options();
    options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
    let serviceBuilder = new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH);

    //Don't forget to add these for heroku
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");


    let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    //.setChromeService(serviceBuilder)
    .build();

        /*let driver = await new Builder().forBrowser('chrome').build().catch(function () {
            console.log("Error creating new chrome browser");
            });*/
        try {
    
            //navigate to twitter login page
            await driver.get('https://twitter.com/login');
    
            //enter username and password
            const user = await driver.findElement(By.xpath("//input[@name='session[username_or_email]']"));
            user.sendKeys(username)
            const pass = await driver.findElement(By.xpath("//input[@name='session[password]']"));
            pass.sendKeys(password);
            await driver.findElement(By.xpath("//input[@name='session[password]']")).sendKeys('\n');
            const menu = await driver.findElement(By.xpath("//*[@class='css-18t94o4 css-1dbjc4n r-1habvwh r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-oyd9sg r-13qz1uu']"));
            menu.click();
    
            //Store the ID of the original window
            const originalWindow = await driver.getWindowHandle();
    
            //find and click link to analytics page
            await driver.wait(until.elementsLocated(By.xpath("//span[text()='Analytics']")), 1000).catch(function () {
            console.log("cannot find analytics button");
            });
            const analytic_button = await driver.findElement(By.xpath("//span[text()='Analytics']"));
            analytic_button.click()
        
    
            //Wait for the new window or tab
            await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 10000);
    
            //Loop through until we find a new window handle
            const windows = await driver.getAllWindowHandles();
            windows.forEach(async handle => {
                if (handle !== originalWindow) {
                    await driver.switchTo().window(handle);
                }
            });
    
            //Wait for the new tab to finish loading content
            var analytic = []
            await driver.wait(until.elementsLocated(By.xpath("//*[@class='DataPoint-info']")), 1000).catch(function () {
                console.log("cannot find analytic data");
            });
    
            analytic = await driver.findElements(By.xpath("//*[@class='DataPoint-info']"));
    
            for(var i =0; i< analytic.length; i++){
                analytic[i].getText().then(function (text) {
                    console.log(text);
                });
            }
    
            analytic[1].getText().then(function (text) {
                const twt_imprss = text;
                tweets = twt_imprss.substr(0, twt_imprss.indexOf(' ')); 
                console.log(twt_imprss)
                console.log("new values" + tweets + " " + twt_imprss)
            });
    
            analytic[2].getText().then(function (text) {
                const pro_visits = text;
                profiles = pro_visits.substr(0, pro_visits.indexOf(' '));
                console.log("new values" + profiles + " " + pro_visits)
            });
    
    
        } finally {
          await driver.quit();
        }
      }
};