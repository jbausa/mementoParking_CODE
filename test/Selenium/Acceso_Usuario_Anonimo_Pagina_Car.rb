require "rubygems"
gem "rspec"
gem "selenium-client"
require "selenium/client"
require "selenium/rspec/spec_helper"
require "spec/test/unit"

describe "Acceso Usuario Anónimo Página Car" do
  attr_reader :selenium_driver
  alias :page :selenium_driver

  before(:all) do
    @verification_errors = []
    @selenium_driver = Selenium::Client::Driver.new \
      :host => "localhost",
      :port => 4444,
      :browser => "*chrome",
      :url => "http://mementoparking.herokuapp.com/",
      :timeout_in_second => 60
  end

  before(:each) do
    @selenium_driver.start_new_browser_session
  end
  
  append_after(:each) do
    @selenium_driver.close_current_browser_session
    @verification_errors.should == []
  end
  
  it "test_acceso _usuario _anónimo _página _car" do
    page.open "/car"
    !60.times{ break if (page.is_element_present("//div/div") rescue false); sleep 1 }
    ("xYou need to sign in or sign up before continuing.").should == page.get_text("//div/div")
    page.open "/"
  end
end
