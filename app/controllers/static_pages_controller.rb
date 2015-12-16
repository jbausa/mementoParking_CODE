class StaticPagesController < ApplicationController
  before_filter :authenticate_user!, :except => [:home, :about, :help]
  def home
  end

  def help
  end

  def about
  end

  def maps
    @car = User.find_by(email: current_user.email).car
  end

  def account
  end

  def coords
    # current_user.email
    mail = current_user.email
    @user = User.find_by(email: mail)
    @car = @user.car
    @car.update({coordinates: params[:coord], address: params[:address]})
    render "maps"
  end
  
end
