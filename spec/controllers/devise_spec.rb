require 'rails_helper'

RSpec.describe StaticPagesController, :type => :controller do
	describe "anonymous user" do		
  		it "should be redirected to SIGN_IN_PAGE when visit MAPS_PATH unlogged" do
  			get :maps
  			expect( response ).to redirect_to( new_user_session_path )
  		end
  		
  		it "should be redirected to SIGN_IN_PAGE when visit ACCOUNT_PATH unlogged" do
  			get :account
  			expect( response ).to redirect_to( new_user_session_path )
  		end
  	end

  describe "authenticated user" do
    def setup
    @request.env["devise.mapping"] = Devise.mappings[:user]
    
  end

  		before :all do
			# Create a user at the start of the test
      		@user = FactoryGirl.create(:user)
  		end
  			# Destroy a user at the start of the test
  		after :all do
  			@user.destroy
  		end
  			# Sign in the user at the start of each test
  		before :each do
  			sign_in @user
  		end
  			# Sign out the user at the start of each test
  		after :each do
  			sign_out @user
  		end
  		
  		it "should be shown MAPS_PATH when visit MAPS_PATH and the user is logged" do
		    get :maps
		    expect( response ).to render_template( :maps )
  		end

      # NO FUNCIONA
  		 it "should be shown ACCOUNT_PATH when visit ACCOUNT_PATH and the user is logged" do
		     get "/users/edit"
		     expect( response ).to render_template( edit_user_registration_path )
  		 end
  	end
	
end