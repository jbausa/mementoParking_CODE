require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do

  describe "GET #home" do
    it "returns http success" do
      get :home
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #about" do
    it "returns http success" do
      get :about
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #help" do
    it "returns http success" do
      get :help
      expect(response).to have_http_status(:success)
    end
  end
end

RSpec.describe ContactUs::ContactsController, type: :controller do
  describe "get #contact" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

end