require 'rails_helper'

RSpec.describe StaticPagesController, :type => :controller do
	describe "anonymous user" do
		before :each do
      		# This simulates an anonymous user
      		login_with nil
  		end
  		
  		it "should be redirected to SIGN_IN_PAGE when visit MAPS_PATH unlogged" do
  			get :maps
  			expect( response ).to redirect_to( new_user_session_path )
  		end
  		
  		it "should be redirected to SIGN_IN_PAGE when visit ACCOUNT_PATH unlogged" do
  			get :account
  			expect( response ).to redirect_to( new_user_session_path )
  		end


  		#NO FUNCIONA
  		it "should be shown MAPS_PATH when visit MAPS_PATH logged" do
  			@user = FactoryGirl.create(:user)
  			sign_out @user
		    sign_in @user
		    get :maps
		    expect( response ).to render_template( :maps )
  		end

	end
end