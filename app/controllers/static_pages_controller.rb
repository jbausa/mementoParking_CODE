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
      @user = User.find_by(email: params[:mailOwner])
      @car = @user.car.find(params[:carId])

    if @car.update({coordinates: params[:coord], address: params[:address]})
      flash[:success] = "Dirección actualizada correctamente"
    else
      flash[:alert] = "Error al actualizar la dirección"
    end
    redirect_to maps_path
  end

  def car
  end

  def editCar
    mail = current_user.email
    @user = User.find_by(email: mail)
    @car = @user.car.find_by(_id: params[:id])

    @alert = true

    @car.set({shared: []})
    params[:shared].split(",").each do |sharedUser|
      if @car.add_to_set({shared: sharedUser})
        flash[:success] = "Compartido cambiado correctamente"
      else
        @alert = false
      end
    end

    if params[:newdescription] != ""
      if @car.update({description: params[:newdescription]})
        flash[:success] = "Descripción cambiada correctamente" + params[:shared]
      else
        @alert = false
      end
    end
    
    if(!@alert)
      flash[:alert] = "Error al realizar los cambios"
    end

    redirect_to car_path
  end

  def newCar
    mail = current_user.email
    @user = User.find_by(email: mail)    
    if params[:newdescription] != ""
      @user.car.create!(description: params[:newdescription])
      flash[:success] = "Se ha creado un nuevo coche"
    else
      flash[:alert] = "Error al crear el nuevo coche. Introduce una descripción."
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
      flash[:alert] = "Error al eliminar el coche"
    end
    redirect_to car_path
  end
  
end
