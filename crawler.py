# pylint: disable=import-error
from selenium import webdriver
import sys
import os
import configparser
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
chrome_path = r'/usr/local/bin/chromedriver' #path from 'which chromedriver'
driver = webdriver.Chrome(executable_path=chrome_path)
config = configparser.ConfigParser()
config.read('.ini')

class TwitterBot:
    def __init__(self,username,password):
        self.username = username
        self.password = password
        chrome_path = r'/usr/local/bin/chromedriver' #path from 'which chromedriver'
        self.bot = webdriver.Chrome(executable_path=chrome_path)

    def login(self):
        bot = self.bot
        bot.get('https://twitter.com/login')
        WebDriverWait(bot, 1000).until(EC.element_to_be_clickable((By.XPATH, "//input[@name='session[username_or_email]']"))).send_keys(self.username)
        bot.find_element_by_xpath("//input[@name='session[password]']").send_keys(self.password)
        bot.find_element_by_xpath("//input[@name='session[password]']").send_keys(u'\ue007')
        but= WebDriverWait(bot, 1000).until(EC.element_to_be_clickable((By.XPATH, "//*[@class='css-18t94o4 css-1dbjc4n r-1habvwh r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-oyd9sg r-13qz1uu']")))
        but.click()
        window_before = bot.window_handles[0]
        date = WebDriverWait(bot, 1000).until(EC.element_to_be_clickable((By.LINK_TEXT, 'Analytics')))
        date.click()
        window_after = bot.window_handles[1]
        bot.switch_to.window(window_after)
        element = WebDriverWait(bot, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'DataPoint-info'))
        )
        el = bot.find_elements_by_class_name('DataPoint-info')
        i=0
        for items in el:
            i = i+1
        tweet_impressions = el[5].text
        profile_visits = el[6].text
        print(tweet_impressions)
        print(profile_visits)
        sys.stdout.flush()
        bot.quit()
        

run = TwitterBot('tennisscores2', config['twitter']['password'])
run.login()