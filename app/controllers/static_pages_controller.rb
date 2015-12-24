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
    mail = current_user.email
    @user = User.find_by(email: mail)
    @car = @user.car.find(params[:carId])
    @car.update({coordinates: params[:coord], address: params[:address]})
    redirect_to maps_path
  end

  def car
  end

  def editCar
    mail = current_user.email
    @user = User.find_by(email: mail)
    @car = @user.car.find_by(_id: params[:id])
    @car.update({description: params[:newdescription]})
    redirect_to car_path
  end

  def newCar
    mail = current_user.email
    @user = User.find_by(email: mail)    
    @user.car.create!(description: params[:newdescription])
    redirect_to car_path
  end

  def deleteCar
    mail = current_user.email
    @user = User.find_by(email: mail)
    @car = @user.car.find_by(_id: params[:id])
    @car.delete
    redirect_to car_path
  end
  
end
