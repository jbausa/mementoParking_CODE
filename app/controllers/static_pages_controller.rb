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
    if @car.update({coordinates: params[:coord], address: params[:address]})
      flash[:success] = "Dirección actualizada correctamente"
    else
      flash[:error] = "Error al actualizar la dirección"
    end
    redirect_to maps_path
  end

  def car
  end

  def editCar
    mail = current_user.email
    @user = User.find_by(email: mail)
    @car = @user.car.find_by(_id: params[:id])
    if @car.update({description: params[:newdescription]}) && @car.add_to_set({shared: 'test@gmail.com'})
      flash[:success] = "Cambios realizados correctamente"
    else
      flash[:error] = "Error al realizar los cambios"
    end
    redirect_to car_path
  end

  def newCar
    mail = current_user.email
    @user = User.find_by(email: mail)    
    if @user.car.create!(description: params[:newdescription])
      flash[:success] = "Se ha creado un nuevo coche"
    else
      flash[:error] = "Error al crear el nuevo coche"
    end
    redirect_to car_path
  end

  def deleteCar
    mail = current_user.email
    @user = User.find_by(email: mail)
    @car = @user.car.find_by(_id: params[:id])
    if @car.delete
      flash[:success] = "Coche eliminado correctamente"
    else
      flash[:error] = "Error al eliminar el coche"
    end
    redirect_to car_path
  end
  
end
