require "rubygems"
gem "rspec"
gem "selenium-client"
require "selenium/client"
require "selenium/rspec/spec_helper"
require "spec/test/unit"

describe "Acceso Usuario Página Maps" do
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
  
  it "test_acceso _usuario _página _maps" do
    page.open "/"
    page.click "link=Acceder"
    !60.times{ break if (page.is_element_present("id=user_email") rescue false); sleep 1 }
    !60.times{ break if (page.is_element_present("id=user_password") rescue false); sleep 1 }
    page.type "id=user_email", "usertest@gmail.com"
    page.type "id=user_password", "123456789"
    page.click "name=commit"
    page.wait_for_page_to_load "30000"
    !60.times{ break if (page.is_element_present("//div/div") rescue false); sleep 1 }
    ("xHas entrado correctamente.").should == page.get_text("//div/div")
    page.click "xpath=(//button[@type='button'])[2]"
    page.click "link=Mis ubicaciones"
    !60.times{ break if ("MementoParking | Mis ubicaciones" == page.get_title rescue false); sleep 1 }
    ("MementoParking | Mis ubicaciones").should == page.get_title
    page.click "xpath=(//button[@type='button'])[2]"
    page.click "link=Cerrar sesión"
  end
end
